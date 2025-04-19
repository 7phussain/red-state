import { NextResponse } from 'next/server';
import tls from 'tls';

export async function POST(request) {
    const { to, subject, message } = await request.json();

    if (!to || !subject || !message) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = parseInt(process.env.SMTP_PORT || '465');
    const smtpUsername = process.env.SMTP_USERNAME;
    const smtpPassword = process.env.SMTP_PASSWORD;
    const fromEmail = process.env.FROM_EMAIL;
    const fromName = process.env.FROM_NAME;

    if (!smtpHost || !smtpPort || !smtpUsername || !smtpPassword || !fromEmail) {
        return NextResponse.json({ error: 'SMTP configuration missing' }, { status: 500 });
    }

    const from = `"${fromName}" <${fromEmail}>`;

    return new Promise((resolve) => {
        // Establish a TLS connection to the SMTP server
        const client = tls.connect(
            {
                host: smtpHost,
                port: smtpPort,
                secure: true, // Use SSL/TLS from the start (port 465)
                rejectUnauthorized: false, // Allow self-signed certificates (for testing)
            },
            () => {
                console.log('Connected to SMTP server');
            }
        );

        let buffer = '';
        let step = 0;

        client.on('data', (data) => {
            buffer += data.toString();
            console.log('Server:', buffer);

            if (buffer.includes('220') && step === 0) {
                // Connection established, send EHLO
                client.write('EHLO localhost\r\n');
                step = 1;
                buffer = '';
            } else if (buffer.includes('250') && step === 1) {
                // EHLO response, authenticate
                client.write('AUTH LOGIN\r\n');
                step = 2;
                buffer = '';
            } else if (buffer.includes('334') && step === 2) {
                // Username prompt
                client.write(`${Buffer.from(smtpUsername).toString('base64')}\r\n`);
                step = 3;
                buffer = '';
            } else if (buffer.includes('334') && step === 3) {
                // Password prompt
                client.write(`${Buffer.from(smtpPassword).toString('base64')}\r\n`);
                step = 4;
                buffer = '';
            } else if (buffer.includes('235') && step === 4) {
                // Authentication successful, send MAIL FROM
                client.write(`MAIL FROM:<${fromEmail}>\r\n`);
                step = 5;
                buffer = '';
            } else if (buffer.includes('250') && step === 5) {
                // MAIL FROM accepted, send RCPT TO
                client.write(`RCPT TO:<${to}>\r\n`);
                step = 6;
                buffer = '';
            } else if (buffer.includes('250') && step === 6) {
                // RCPT TO accepted, send DATA
                client.write('DATA\r\n');
                step = 7;
                buffer = '';
            } else if (buffer.includes('354') && step === 7) {
                // DATA accepted, send email content
                const email = [
                    `From: ${from}`,
                    `To: ${to}`,
                    `Subject: ${subject}`,
                    `Content-Type: text/html; charset=UTF-8`,
                    '',
                    message,
                    '.',
                ].join('\r\n');
                client.write(`${email}\r\n`);
                step = 8;
                buffer = '';
            } else if (buffer.includes('250') && step === 8) {
                // Email sent successfully, send QUIT
                client.write('QUIT\r\n');
                step = 9;
                buffer = '';
                resolve(NextResponse.json({ message: 'Email sent successfully' }, { status: 200 }));
            } else if (buffer.includes('221') && step === 9) {
                // Connection closed
                client.end();
            }
        });

        client.on('error', (err) => {
            console.error('SMTP Error:', err.message);
            resolve(NextResponse.json({ error: `Failed to send email: ${err.message}` }, { status: 500 }));
        });

        client.on('end', () => {
            console.log('Disconnected from SMTP server');
        });
    });
}