"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-2 text-yellow-500 hover:text-yellow-400 mb-6 transition-colors">
          <ArrowLeft size={16} /> Back to Home
        </Link>
        
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Terms of Service</h1>
        <p className="text-gray-500 text-sm mb-8">Last updated: April 27, 2025</p>
        
        <div className="space-y-6 text-gray-300">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
            <p>By accessing or using Counselor's Cafe, you agree to be bound by these Terms of Service and our Privacy Policy.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Description of Service</h2>
            <p>Counselor's Cafe provides career counseling, educational guidance, and related services through our platform. We connect users with verified counselors for professional advice.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. User Accounts</h2>
            <p>You are responsible for maintaining the confidentiality of your account credentials. You agree to accept responsibility for all activities that occur under your account.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Payments and Refunds</h2>
            <p>Services may be subject to payment. All payments are processed securely. Refunds are handled according to our Refund Policy.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Prohibited Conduct</h2>
            <p>You agree not to misuse our services, harass other users, or violate any applicable laws. We reserve the right to terminate accounts that violate these terms.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Disclaimer of Warranties</h2>
            <p>Our services are provided &quot;as is&quot; without warranties of any kind. We do not guarantee the accuracy or completeness of any information provided.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Contact Us</h2>
            <p>For questions about these Terms, contact us at: <a href="mailto:support@counselorscafe.com" className="text-yellow-500 hover:underline">support@counselorscafe.com</a></p>
          </section>
        </div>
      </div>
    </div>
  );
}