import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-8xl font-bold text-yellow-500 mb-4">404</div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Page Not Found</h1>
        <p className="text-gray-400 mb-8 max-w-md">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold hover:shadow-lg hover:shadow-yellow-500/25 transition-all duration-300"
          >
            <Home size={18} />
            Back to Home
          </Link>
          <Link
            href="/counselors"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/5 transition-all duration-300"
          >
            Browse Counselors
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}