import React from 'react'
import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";

const PrivacyPolicy = () => {
  return (
    <MaxWidthWrapper>
      <div className="py-12">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="mb-4">Last updated: May 10, 2024</p>
        <p className="mb-6">At YouTubeToChapters, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information.</p>

        <h2 className="text-xl font-semibold mb-3">1. Information We Collect</h2>
        <p className="mb-4">We collect the following types of information:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Account information (e.g., email address) when you sign up</li>
          <li>Usage data related to the videos you process</li>
          <li>Authentication data through NextAuth</li>
        </ul>

        <h2 className="text-xl font-semibold mb-3">2. How We Use Your Information</h2>
        <p className="mb-4">We use your information to:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Provide and improve our timestamp generation service</li>
          <li>Authenticate your account and secure your access</li>
          <li>Communicate with you about your account and our service</li>
          <li>Analyze usage patterns to enhance user experience</li>
        </ul>

        <h2 className="text-xl font-semibold mb-3">3. Authentication and Security</h2>
        <p className="mb-4">We use NextAuth for authentication, which provides:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Secure sign-in options, including social logins</li>
          <li>Protection against common security threats</li>
          <li>Session management and token-based authentication</li>
        </ul>
        <p className="mb-4">Your authentication data is encrypted and securely stored. We do not have access to your passwords.</p>

        <h2 className="text-xl font-semibold mb-3">4. Data Sharing and Third Parties</h2>
        <p className="mb-4">We do not sell your personal information. We may share data with:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Service providers who help us operate our platform</li>
          <li>Legal authorities when required by law</li>
          <li>Third-party authentication providers (e.g., Google) when you choose to use social login</li>
        </ul>

        <h2 className="text-xl font-semibold mb-3">5. Your Rights and Choices</h2>
        <p className="mb-4">You have the right to:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Access, correct, or delete your personal information</li>
          <li>Opt-out of marketing communications</li>
          <li>Request a copy of your data</li>
        </ul>

        <h2 className="text-xl font-semibold mb-3">6. Cookies and Tracking</h2>
        <p className="mb-4">We use cookies and similar technologies to improve user experience and analyze usage patterns. You can manage cookie preferences through your browser settings.</p>

        <h2 className="text-xl font-semibold mb-3">7. Children's Privacy</h2>
        <p className="mb-4">Our service is not intended for children under 13. We do not knowingly collect personal information from children under 13.</p>

        <h2 className="text-xl font-semibold mb-3">8. Changes to This Policy</h2>
        <p className="mb-4">We may update this privacy policy from time to time. We will notify you of any significant changes by posting the new policy on this page.</p>

        <h2 className="text-xl font-semibold mb-3">9. Contact Us</h2>
        <p className="mb-4">If you have any questions about this Privacy Policy, please contact us at hello@alfiewebdev.com.</p>

        <p className="mt-8">By using YouTubeToChapters, you agree to the collection and use of information in accordance with this policy.</p>
      </div>
    </MaxWidthWrapper>
  )
}

export default PrivacyPolicy