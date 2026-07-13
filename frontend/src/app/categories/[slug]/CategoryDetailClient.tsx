// app/categories/[slug]/CategoryDetailClient.tsx
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronRight, Sparkles, Users, Calendar, Clock, Award } from "lucide-react";

export default function CategoryDetailClient({ category }: { category: any }) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 pt-28">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Back Button - Improved */}
        <button
          onClick={() => router.push("/services")}
          className="group inline-flex items-center gap-2 text-gray-500 hover:text-amber-600 transition-all duration-300 mb-6 text-sm font-medium bg-white px-4 py-2 rounded-full shadow-sm hover:shadow-md border border-gray-100"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Categories
        </button>

        {/* Header - Enhanced */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-amber-100 to-yellow-100 flex items-center justify-center text-5xl md:text-6xl shadow-lg shadow-amber-500/10 border border-amber-200/50 flex-shrink-0">
              {category.icon}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                {category.title}
              </h1>
              <p className="text-gray-500 text-sm md:text-base mt-2 max-w-2xl leading-relaxed">
                {category.desc}
              </p>
            </div>
          </div>
          <div className="mt-4 w-16 h-1 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full" />
        </div>

        {/* Sub-categories Grid - Improved */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {category.subCategories.map((sub: string, idx: number) => (
            <Link
              key={sub}
              href={`/counselors?category=${encodeURIComponent(category.title)}&sub=${encodeURIComponent(sub)}`}
              className="group bg-white border border-gray-200 hover:border-amber-400 hover:shadow-md transition-all duration-300 rounded-xl p-4 flex items-center justify-between relative overflow-hidden"
            >
              <span className="flex items-center gap-3 text-gray-700 text-sm group-hover:text-amber-600 transition-colors">
                <span className="w-6 h-6 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-xs font-bold text-amber-600 flex-shrink-0">
                  {idx + 1}
                </span>
                <span className="font-medium">{sub}</span>
              </span>
              <ChevronRight size={16} className="text-gray-300 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>

        {/* Stats - New Section */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="bg-white rounded-xl p-4 text-center border border-gray-100 shadow-sm">
            <Users size={20} className="text-amber-500 mx-auto mb-1" />
            <p className="text-gray-900 font-bold text-lg">{category.subCategories.length}</p>
            <p className="text-gray-400 text-xs">Services Available</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center border border-gray-100 shadow-sm">
            <Award size={20} className="text-amber-500 mx-auto mb-1" />
            <p className="text-gray-900 font-bold text-lg">100%</p>
            <p className="text-gray-400 text-xs">Verified Experts</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center border border-gray-100 shadow-sm">
            <Clock size={20} className="text-amber-500 mx-auto mb-1" />
            <p className="text-gray-900 font-bold text-lg">24/7</p>
            <p className="text-gray-400 text-xs">Available</p>
          </div>
        </div>

        {/* CTA - Enhanced */}
        <div className="mt-8 p-6 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-2xl text-center">
          <Sparkles size={20} className="text-amber-500 mx-auto mb-3" />
          <p className="text-gray-700 text-sm font-medium">
            Need help choosing the right service?
          </p>
          <Link
            href="/counselors"
            className="inline-flex items-center gap-2 mt-3 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300 text-sm"
          >
            Talk to an Expert <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}