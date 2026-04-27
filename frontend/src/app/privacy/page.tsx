"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-2 text-yellow-500 hover:text-yellow-400 mb-6 transition-colors">
          <ArrowLeft size={16} /> Back to Home
        </Link>
        
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Privacy Policy</h1>
        <p className="text-gray-500 text-sm mb-8">Last updated: April 27, 2025</p>
        
        <div className="space-y-6 text-gray-300">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Information We Collect</h2>
            <p>We collect information you provide directly to us, such as when you create an account, fill out a form, or contact us. This may include your name, email address, phone number, and any other information you choose to provide.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. How We Use Your Information</h2>
            <p>We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to personalize your experience.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Sharing of Information</h2>
            <p>We do not share your personal information with third parties except as necessary to provide our services, comply with the law, or protect our rights.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Data Security</h2>
            <p>We take reasonable measures to protect your personal information from unauthorized access, alteration, or destruction.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:support@counselorscafe.com" className="text-yellow-500 hover:underline">support@counselorscafe.com</a></p>
          </section>
        </div>
      </div>
    </div>
  );
}