// app/ClientLayout.jsx
'use client';

import { usePathname } from 'next/navigation';
import ContactUs from './_components/ContactUs';
import Footer from './_components/footer';
import WhatsAppButton from './_components/WhatsappButton';
import Navbar from './_components/navbar';

export default function SubLayout({ children }) {
    const pathname = usePathname();
    // const isAdminRoute = pathname === '/admin';
    const isAdminRoute = pathname.startsWith('/admin');

    return (
        <>
            {!isAdminRoute && <Navbar />}
            {children}
            {!isAdminRoute && <ContactUs />}
            {!isAdminRoute && <Footer />}
            {!isAdminRoute && <WhatsAppButton />}
        </>
    );
}
