"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-2 text-yellow-500 hover:text-yellow-400 mb-6 transition-colors">
          <ArrowLeft size={16} /> Back to Home
        </Link>
        
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Refund Policy</h1>
        <p className="text-gray-500 text-sm mb-8">Last updated: April 27, 2025</p>
        
        <div className="space-y-6 text-gray-300">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Session Refunds</h2>
            <p>If you are unsatisfied with a counseling session, you may request a refund within 24 hours of the session completion. Each request is reviewed on a case-by-case basis.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Wallet Recharge Refunds</h2>
            <p>Wallet recharge amounts are non-refundable. However, unused wallet balance can be used for future sessions at any time.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. How to Request a Refund</h2>
            <p>To request a refund, please contact us at <a href="mailto:support@counselorscafe.com" className="text-yellow-500 hover:underline">support@counselorscafe.com</a> with your session details and reason for refund.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Processing Time</h2>
            <p>Refunds are typically processed within 5-7 business days after approval. The amount will be credited to your original payment method.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Non-Refundable Items</h2>
            <p>Services that have been fully delivered and completed are generally non-refundable unless there is a technical issue or counselor cancellation.</p>
          </section>
        </div>
      </div>
    </div>
  );
}