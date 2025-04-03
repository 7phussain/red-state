import Head from "next/head";
import SectionHeader from "../home/_components/SectionHeader";

export default function PrivacyPolicy() {
  return (
    <>
      <div className="px-[20px] md:px-[50px] lg:px-[100px] py-5 my-5 text-black">
        {/* <div className="h-[50px]"></div> */}
        <SectionHeader
          title={"Privacy Policy"}
        />
        <div className="flex flex-col gap-3">
          <p>
            This privacy policy explains how we collect information from you and the purposes for which it is used.
          </p>
          <h2 className="text-2xl font-semibold mt-5">Information you provide</h2>
          <p>
            You may provide us with personal contact information in several ways,
            including but not limited to sending a property enquiry, corresponding
            with us via email, completing a survey, entering a competition,
            completing a review, providing feedback, or reporting an issue. We
            only store your personal data after you have consented by agreeing to
            our terms and conditions on the relevant form.
          </p>

          <h2 className="text-2xl font-semibold mt-5">Information we collect</h2>
          <p>
            We automatically collect metadata from your web browser, which may
            include the type and version, device make and model, IP address,
            referral domain, and browser language setting.
          </p>

          <h2 className="text-2xl font-semibold mt-5">
            Ways in which we may share your personal information
          </h2>
          <p>
            We may provide your name, email, and phone number to agents when you
            send a property enquiry through REDESTATE. Once this data is shared,
            the agent’s own privacy policy will apply. We may also send
            information about your visit to analytics and search engine providers
            to improve our services. This data may include your IP address, pages
            visited, and browser type but does not contain any direct personal
            identifiers such as your name or email address. Additionally, we may
            share your metadata with advertising networks to serve relevant ads.
            If REDESTATE or its assets are acquired, the user data we hold will be
            part of the transfer. If we obtain professional advice (e.g., from
            lawyers or financial advisors), we may disclose your personal
            information. We may also disclose your personal information if
            required by a government or regulatory authority.
          </p>

          <h2 className="text-2xl font-semibold mt-5">
            Ways in which we use your personal information
          </h2>
          <ul className="list-disc ml-6">
            <li>
              Fulfilling your requests, such as forwarding property enquiries to
              agents or developers.
            </li>
            <li>
              Providing you with information on REDESTATE services that may
              interest you. Any marketing emails we send will include an option to
              unsubscribe.
            </li>
            <li>
              Enhancing your experience of our services, e.g., ensuring content is
              presented in the most effective manner for your device.
            </li>
            <li>
              Delivering relevant advertising to you on our site or other sites
              operated by REDESTATE.
            </li>
            <li>
              Internal business administration, e.g., data analysis,
              troubleshooting, testing, and research.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-5">
            Storing your personal information
          </h2>
          <p>
            We may store your information on secure servers located worldwide. By
            submitting your personal information, you agree to this transfer,
            storing, or processing. We rely on approved data transfer mechanisms
            to ensure that your personal information is adequately safeguarded.
            While we use strict procedures to secure your data, we cannot
            guarantee its security. Any data you send to us is done at your own
            risk. Where you have a password to access certain parts of our
            website, you are responsible for keeping that password confidential.
            You must not share your password with anyone.
          </p>

          <h2 className="text-2xl font-semibold mt-5">
            Requesting data deletion
          </h2>
          <p>
            We retain your personal information for as long as necessary for the
            purposes for which it was collected. If you would like to delete your
            information from our servers, you may request us to do so by
            contacting us.
          </p>

          <h2 className="text-2xl font-semibold mt-5">Cookies</h2>
          <p>
            We use cookies to distinguish you from other users of REDESTATE,
            allowing us to customize your experience on our website, e.g., by
            remembering your chosen currency or favorite properties. The Google
            advertising network uses a cookie to record your activity (including
            pages visited) and estimate what information interests you most. They
            use this information in accordance with their own privacy policies.
          </p>

          <h2 className="text-2xl font-semibold mt-5">
            Links to third-party websites
          </h2>
          <p>
            Where our website contains links to other websites, this privacy
            policy does not apply to those other websites, and we do not accept
            liability for the content of any other website. Please check the
            privacy policy of any other website before submitting any personal
            information to it.
          </p>

          <h2 className="text-2xl font-semibold mt-5">Contacting us</h2>
          <p>
            Any changes we make to this policy in the future will be posted on
            this page. If you have any questions regarding this privacy policy,
            you may contact us.
          </p>
        </div>
      </div>
    </>
  );
}
