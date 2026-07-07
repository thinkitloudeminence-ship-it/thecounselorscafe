import Link from "next/link";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import Image from "next/image";
import LogoImage from "@/components/ui/thecounselorscafelogo.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const mapLocation = "https://www.google.com/maps?um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=KUEAAEBH_WI5Map5tsssF4KV&daddr=26,27,+Hotel+Amrit,+Near,+Sardar+Patel+Bridge,+Chhoti+Gwaltoli,+Indore,+Madhya+Pradesh+452001";

  return (
    <footer className="bg-black border-t border-white/5 text-gray-300">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        
        {/* Row 1: Logo + Map + Contact - 2 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 pb-8 border-b border-white/10">
          
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
              <a 
                href={mapLocation}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center lg:justify-start gap-2 text-gray-400 hover:text-yellow-400 transition-colors duration-300 group"
              >
                <MapPin size={14} className="text-yellow-500 group-hover:text-yellow-400" />
                <span>Indore, Madhya Pradesh</span>
                <ExternalLink size={12} className="text-gray-500 group-hover:text-yellow-400" />
              </a>
            </div>
          </div>

          {/* Column 2: Google Map */}
          <div className="w-full h-[300px] md:h-[350px] lg:h-[300px] rounded-xl overflow-hidden border border-white/10 hover:border-yellow-500/50 transition-all duration-300 shadow-lg shadow-yellow-500/5">
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
              
              {/* Overlay with "Click to Open in Google Maps" */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                <div className="bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 border border-yellow-500/50">
                  <ExternalLink size={16} className="text-yellow-400" />
                  Open in Google Maps
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* Row 2: Description */}
        <div className="py-6 border-b border-white/10">
          <p className="text-gray-500 text-sm leading-relaxed text-center max-w-3xl mx-auto">
            India's most trusted career counselling platform connecting students with verified expert counselors for personalized guidance.
          </p>
        </div>

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