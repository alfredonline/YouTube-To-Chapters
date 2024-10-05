import React from 'react'
import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";

const TermsOfService = () => {
  return (
    <MaxWidthWrapper>
      <div className="py-12">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        <p className="mb-4">Last updated: May 10, 2024</p>
        <p className="mb-6">Welcome to YouTubeToChapters. By using our service, you agree to the following terms:</p>

        <h2 className="text-xl font-semibold mb-3">1. Service Description</h2>
        <p className="mb-4">YouTubeToChapters is a platform that generates timestamps for YouTube videos using AI technology.</p>

        <h2 className="text-xl font-semibold mb-3">2. Acceptable Use</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>Do not abuse or misuse the service.</li>
          <li>Do not attempt to process illegal or copyrighted content without proper authorization.</li>
          <li>Do not use the service to generate timestamps for content that violates the terms of service of YouTube or YouTubeToChapters.</li>
          <li>Only generate timestamps for videos you own the rights to and have uploaded yourself.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-3">3. Content Ownership and Responsibility</h2>
        <p className="mb-4">By using YouTubeToChapters, you affirm that:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>You own or have the necessary rights to the content for which you are generating timestamps.</li>
          <li>You are solely responsible for the content you process through our service.</li>
          <li>You will not use our service to infringe upon any third-party copyrights or intellectual property rights.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-3">4. Service Status</h2>
        <p className="mb-4">By using YouTubeToChapters, you acknowledge and agree that:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>The service is currently in progress and may contain bugs or errors.</li>
          <li>You use the service at your own risk.</li>
          <li>We do not guarantee 100% accuracy of the generated timestamps.</li>
          <li>We are not responsible for any consequences resulting from the use of our service, including but not limited to content removal, copyright strikes, or account termination on YouTube or any other platform.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-3">5. Limitation of Liability</h2>
        <p className="mb-4">YouTubeToChapters, its creators, employees, and affiliates shall not be held liable for any direct, indirect, incidental, special, consequential, or exemplary damages, including but not limited to:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Damages for loss of profits, goodwill, use, data, or other intangible losses.</li>
          <li>Any errors, mistakes, or inaccuracies in the generated timestamps.</li>
          <li>Personal injury or property damage resulting from your access to or use of our service.</li>
          <li>Any unauthorized access to or use of our servers and/or any personal information stored therein.</li>
          <li>Any interruption or cessation of transmission to or from our service.</li>
          <li>Any bugs, viruses, trojan horses, or the like that may be transmitted to or through our service.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-3">6. Indemnification</h2>
        <p className="mb-4">You agree to defend, indemnify, and hold harmless YouTubeToChapters and its affiliates from and against any claims, liabilities, damages, losses, and expenses, including without limitation reasonable attorney's fees and costs, arising out of or in any way connected with your access to or use of the service or your violation of these Terms of Service.</p>

        <h2 className="text-xl font-semibold mb-3">7. Changes to Terms</h2>
        <p className="mb-4">We reserve the right to modify these terms at any time. Please check this page periodically for updates.</p>

        <p className="mt-8">By using YouTubeToChapters, you agree to abide by these terms of service.</p>
      </div>
    </MaxWidthWrapper>
  )
}

export default TermsOfService