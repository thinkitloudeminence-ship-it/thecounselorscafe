import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";
import LogoImage from "@/components/ui/thecounselorscafelogo.png";

const footerLinks = {
  Services: [
    { label: "Career Counselling", href: "/services#career" },
    { label: "Stream Selection", href: "/services#stream" },
    { label: "Study Abroad", href: "/services#abroad" },
    { label: "Resume & Interview Prep", href: "/services#resume" },
    { label: "Career Consultants", href: "/services#consultants" },
    { label: "Life Coach", href: "/services#lifecoach" },
    { label: "Image Consultants", href: "/services#image" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Our Counselors", href: "/counselors" },
    { label: "Blog", href: "/blog" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "FAQ", href: "/faq" },
    { label: "Get App", href: "/download-app" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Refund Policy", href: "/refund" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/5 text-gray-300">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        
        {/* Row 1: Logo + Services + Company + Legal - 4 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 pb-8 border-b border-white/10">
          
          {/* Column 1: Logo + Contact Details */}
          <div className="text-center lg:text-left">
            <Link href="/" className="inline-block mb-4">
              <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto lg:mx-0">
                <Image
                  src={LogoImage}
                  alt="CounselorsCafe"
                  width={160}
                  height={160}
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
            
            {/* Contact Details Below Logo */}
            <div className="flex flex-col gap-2 text-sm mt-4">
              <a 
                href="mailto:hello@counselorscafe.com" 
                className="flex items-center justify-center lg:justify-start gap-2 text-gray-400 hover:text-yellow-400 transition-colors duration-300 group"
              >
                <Mail size={14} className="text-yellow-500 group-hover:text-yellow-400" />
                hello@counselorscafe.com
              </a>
              <a 
                href="tel:+919876543210" 
                className="flex items-center justify-center lg:justify-start gap-2 text-gray-400 hover:text-yellow-400 transition-colors duration-300 group"
              >
                <Phone size={14} className="text-yellow-500 group-hover:text-yellow-400" />
                +91 98765 43210
              </a>
              <span className="flex items-center justify-center lg:justify-start gap-2 text-gray-400">
                <MapPin size={14} className="text-yellow-500" />
                New Delhi, India
              </span>
            </div>
          </div>

          {/* Column 2: Services */}
          <div className="text-center lg:text-left">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-2">
              {footerLinks.Services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-yellow-400 transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="text-center lg:text-left">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2">
              {footerLinks.Company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-yellow-400 transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div className="text-center lg:text-left">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Legal
            </h4>
            <ul className="space-y-2">
              {footerLinks.Legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-yellow-400 transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Row 2: Description - Single Line */}
        {/* <div className="py-6 border-b border-white/10"> */}
          <p className="text-gray-500 text-sm leading-relaxed text-center whitespace-nowrap overflow-x-auto max-w-full mx-auto">
            India's most trusted career counselling platform connecting students with verified expert counselors for personalized guidance.
          </p>
        {/* </div> */}

        {/* Row 3: Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 text-sm">
          <p className="text-gray-500 text-center md:text-left">
            © {currentYear} CounselorsCafe. All rights reserved.
          </p>
          <p className="flex items-center gap-1 text-gray-500">
            Made with <span className="text-red-500 animate-pulse">♥</span> for Indian students
          </p>
        </div>
      </div>
    </footer>
  );
}