"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-2 text-yellow-500 hover:text-yellow-400 mb-6 transition-colors">
          <ArrowLeft size={16} /> Back to Home
        </Link>
        
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Cookie Policy</h1>
        <p className="text-gray-500 text-sm mb-8">Last updated: April 27, 2025</p>
        
        <div className="space-y-6 text-gray-300">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. What Are Cookies</h2>
            <p>Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. How We Use Cookies</h2>
            <p>We use cookies to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Remember your preferences and settings</li>
              <li>Keep you logged in during your session</li>
              <li>Understand how you use our website</li>
              <li>Improve our services based on usage patterns</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Types of Cookies We Use</h2>
            <p><strong>Essential Cookies:</strong> Required for basic website functionality.</p>
            <p className="mt-2"><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our site.</p>
            <p className="mt-2"><strong>Preference Cookies:</strong> Remember your settings and preferences.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Managing Cookies</h2>
            <p>You can control cookies through your browser settings. However, disabling certain cookies may affect website functionality.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Contact Us</h2>
            <p>For questions about our Cookie Policy, contact us at: <a href="mailto:support@counselorscafe.com" className="text-yellow-500 hover:underline">support@counselorscafe.com</a></p>
          </section>
        </div>
      </div>
    </div>
  );
}