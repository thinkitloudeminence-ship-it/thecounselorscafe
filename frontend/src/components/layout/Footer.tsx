import Link from "next/link";
import { Mail, Phone, MapPin, ExternalLink, Clock, Shield, Users, Star, Award, Twitter, Facebook, Instagram, Youtube, Linkedin, MessageCircle } from "lucide-react";
import Image from "next/image";
import LogoImage from "@/components/ui/thecounselorscafelogo.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const mapLocation = "https://www.google.com/maps?um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=KUEAAEBH_WI5Map5tsssF4KV&daddr=26,27,+Hotel+Amrit,+Near,+Sardar+Patel+Bridge,+Chhoti+Gwaltoli,+Indore,+Madhya+Pradesh+452001";

  const quickLinks = [
    { label: "About Us", href: "/about" },
    { label: "Counselors", href: "/counselors" },
    { label: "Services", href: "/services" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-black border-t border-white/5 text-gray-300">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        
        {/* Row 1: Logo + Quick Links + Map */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 md:gap-10 pb-8 border-b border-white/10">
          
          {/* Column 1: Logo + Description */}
          <div className="text-center lg:text-left lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <div className="relative w-32 h-32 md:w-36 md:h-36 mx-auto lg:mx-0">
                <Image
                  src={LogoImage}
                  alt="CounselorsCafe"
                  width={144}
                  height={144}
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto lg:mx-0">
              India's most trusted career counselling platform connecting students with verified expert counselors.
            </p>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3 mt-4 justify-center lg:justify-start">
              <span className="flex items-center gap-1.5 text-xs text-gray-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                <Shield size={12} className="text-yellow-500" />
                100% Verified
              </span>
              <span className="flex items-center gap-1.5 text-xs text-gray-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                <Users size={12} className="text-yellow-500" />
                10K+ Students
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="text-center lg:text-left">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
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

          {/* Column 3: Contact Info */}
          <div className="text-center lg:text-left">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Contact Us
            </h4>
            <div className="flex flex-col gap-3 text-sm">
              <a 
                href="mailto:hello@counselorscafe.com" 
                className="flex items-center justify-center lg:justify-start gap-2.5 text-gray-400 hover:text-yellow-400 transition-colors duration-300 group"
              >
                <Mail size={16} className="text-yellow-500 group-hover:text-yellow-400 flex-shrink-0" />
                <span>hello@counselorscafe.com</span>
              </a>
              <a 
                href="tel:+919876543210" 
                className="flex items-center justify-center lg:justify-start gap-2.5 text-gray-400 hover:text-yellow-400 transition-colors duration-300 group"
              >
                <Phone size={16} className="text-yellow-500 group-hover:text-yellow-400 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </a>
              <a 
                href={mapLocation}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center lg:justify-start gap-2.5 text-gray-400 hover:text-yellow-400 transition-colors duration-300 group"
              >
                <MapPin size={16} className="text-yellow-500 group-hover:text-yellow-400 flex-shrink-0" />
                <span>Indore, Madhya Pradesh</span>
              </a>
              <span className="flex items-center justify-center lg:justify-start gap-2.5 text-gray-500 text-xs">
                <Clock size={14} className="text-yellow-500" />
                <span>Mon-Sat: 9:00 AM - 9:00 PM</span>
              </span>
            </div>
          </div>

          {/* Column 4: Map (Corner) */}
          <div className="lg:col-span-1">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 text-center lg:text-left">
              Find Us
            </h4>
            <div className="w-full h-[180px] md:h-[200px] rounded-xl overflow-hidden border border-white/10 hover:border-yellow-500/50 transition-all duration-300 shadow-lg shadow-yellow-500/5">
              <a 
                href={mapLocation}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full relative group"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3679.87654321!2d75.857!3d22.719!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd0b95b36ab7%3A0x0!2zMjbCsDQzJzA4LjQiTiA3NcKwNTEnMjUuMiJF!5e0!3m2!1sen!2sin!4v1699781234567"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                  title="CounselorsCafe Office Location"
                />
                
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <div className="bg-black/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 border border-yellow-500/50">
                    <ExternalLink size={14} className="text-yellow-400" />
                    Open in Maps
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Row 2: Social Links + Stats */}
        <div className="py-6 border-b border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="text-gray-500 text-xs font-medium">Follow us:</span>
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-yellow-400 transition-colors duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Star size={14} className="text-yellow-500 fill-yellow-500" />
                <span className="text-gray-400">4.9 Rating</span>
              </div>
              <div className="w-px h-4 bg-white/10" />
              <div className="flex items-center gap-2">
                <Users size={14} className="text-yellow-500" />
                <span className="text-gray-400">10K+ Students</span>
              </div>
              <div className="w-px h-4 bg-white/10" />
              <div className="flex items-center gap-2">
                <Award size={14} className="text-yellow-500" />
                <span className="text-gray-400">200+ Experts</span>
              </div>
            </div>
          </div>
        </div>

        {/* Row 3: Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 text-sm">
          <p className="text-gray-500 text-center md:text-left">
            © {currentYear} CounselorsCafe. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-gray-500">
            <Link href="/privacy" className="hover:text-yellow-400 transition-colors text-xs">
              Privacy Policy
            </Link>
            <span className="text-white/10">|</span>
            <Link href="/terms" className="hover:text-yellow-400 transition-colors text-xs">
              Terms of Service
            </Link>
            <span className="text-white/10">|</span>
            <Link href="/refund" className="hover:text-yellow-400 transition-colors text-xs">
              Refund Policy
            </Link>
          </div>
          <p className="flex items-center gap-1 text-gray-500 text-xs">
            Made with <span className="text-red-500 animate-pulse">♥</span> for Indian students
          </p>
        </div>
      </div>
    </footer>
  );
}