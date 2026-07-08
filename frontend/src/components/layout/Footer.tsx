import Link from "next/link";
import { Mail, Phone, MapPin, ExternalLink, Clock, Shield, Users, Star, Award, Facebook, Instagram, Youtube } from "lucide-react";
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
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/counselorscafe", label: "Facebook" },
    { icon: Instagram, href: "https://www.instagram.com/counselorscafeindia/", label: "Instagram" },
    { icon: Youtube, href: "https://www.youtube.com/@counselorscafe", label: "YouTube" },
  ];

  return (
    <footer className="bg-black border-t border-white/5 text-gray-300 w-full flex-shrink-0">
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        
        {/* Row 1: Logo + Quick Links + Map */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 pb-6 border-b border-white/10">
          
          {/* Column 1: Logo + Description */}
          <div className="text-center lg:text-left lg:col-span-1">
            <Link href="/" className="inline-block mb-3">
              <div className="relative w-28 h-28 md:w-32 md:h-32 mx-auto lg:mx-0">
                <Image
                  src={LogoImage}
                  alt="CounselorsCafe"
                  width={128}
                  height={128}
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
            <p className="text-gray-500 text-xs md:text-sm leading-relaxed max-w-xs mx-auto lg:mx-0">
              India's most trusted career counselling platform connecting students with verified expert counselors.
            </p>
            
            <div className="flex flex-wrap gap-2 mt-3 justify-center lg:justify-start">
              <span className="flex items-center gap-1 text-[10px] text-gray-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                <Shield size={11} className="text-yellow-500" />
                100% Verified
              </span>
              <span className="flex items-center gap-1 text-[10px] text-gray-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                <Users size={11} className="text-yellow-500" />
                10K+ Students
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="text-center lg:text-left">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-gray-400 hover:text-yellow-400 transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="text-center lg:text-left">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">
              Contact Us
            </h4>
            <div className="flex flex-col gap-2 text-xs">
              <a 
                href="mailto:counselorscafeindia@gmail.com" 
                className="flex items-center justify-center lg:justify-start gap-2 text-gray-400 hover:text-yellow-400 transition-colors duration-300 group"
              >
                <Mail size={14} className="text-yellow-500 group-hover:text-yellow-400 flex-shrink-0" />
                <span>counselorscafeindia@gmail.com</span>
              </a>
              <a 
                href="tel:+919826667279" 
                className="flex items-center justify-center lg:justify-start gap-2 text-gray-400 hover:text-yellow-400 transition-colors duration-300 group"
              >
                <Phone size={14} className="text-yellow-500 group-hover:text-yellow-400 flex-shrink-0" />
                <span>+91 98266 67279</span>
              </a>
              <a 
                href={mapLocation}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center lg:justify-start gap-2 text-gray-400 hover:text-yellow-400 transition-colors duration-300 group"
              >
                <MapPin size={14} className="text-yellow-500 group-hover:text-yellow-400 flex-shrink-0" />
                <span>Indore, MP</span>
              </a>
              <span className="flex items-center justify-center lg:justify-start gap-2 text-gray-500">
                <Clock size={12} className="text-yellow-500" />
                <span>Mon-Sat: 9AM - 9PM</span>
              </span>
            </div>
          </div>

          {/* Column 4: Map */}
          <div className="lg:col-span-1">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3 text-center lg:text-left">
              Find Us
            </h4>
            <div className="w-full h-[140px] md:h-[160px] rounded-xl overflow-hidden border border-white/10 hover:border-yellow-500/50 transition-all duration-300">
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
                  <div className="bg-black/80 backdrop-blur-sm text-white px-2.5 py-1 rounded-lg text-[10px] font-medium flex items-center gap-1.5 border border-yellow-500/50">
                    <ExternalLink size={12} className="text-yellow-400" />
                    Open in Maps
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Row 2: Social Links + Stats */}
        <div className="py-4 border-b border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-gray-500 text-[10px] font-medium">Follow us:</span>
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-yellow-400 transition-colors duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <Star size={12} className="text-yellow-500 fill-yellow-500" />
                <span className="text-gray-400">4.9 Rating</span>
              </div>
              <div className="w-px h-3 bg-white/10" />
              <div className="flex items-center gap-1.5">
                <Users size={12} className="text-yellow-500" />
                <span className="text-gray-400">10K+ Students</span>
              </div>
              <div className="w-px h-3 bg-white/10" />
              <div className="flex items-center gap-1.5">
                <Award size={12} className="text-yellow-500" />
                <span className="text-gray-400">200+ Experts</span>
              </div>
            </div>
          </div>
        </div>

        {/* Row 3: Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-4 text-xs">
          <p className="text-gray-500 text-center md:text-left">
            © {currentYear} CounselorsCafe. All rights reserved.
          </p>
          <div className="flex items-center gap-3 text-gray-500">
            <Link href="/privacy" className="hover:text-yellow-400 transition-colors">
              Privacy
            </Link>
            <span className="text-white/10">|</span>
            <Link href="/terms" className="hover:text-yellow-400 transition-colors">
              Terms
            </Link>
            <span className="text-white/10">|</span>
            <Link href="/refund" className="hover:text-yellow-400 transition-colors">
              Refund
            </Link>
          </div>
          <p className="flex items-center gap-1 text-gray-500">
            Made with <span className="text-red-500 animate-pulse">♥</span> for Indian students
          </p>
        </div>
      </div>
    </footer>
  );
}