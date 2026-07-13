// app/categories/[slug]/page.tsx
import { notFound } from "next/navigation";
import CategoryDetailClient from "./CategoryDetailClient";

// ✅ Sabhi 7 categories ki details
const categoriesData = [
  {
    id: "education-career",
    title: "Education & Career",
    icon: "🎓",
    desc: "Expert guidance for career planning, study abroad, exam prep, and academic success.",
    color: "from-amber-500 to-yellow-600",
    subCategories: [
      "Career Counseling",
      "Subject & Stream Selection (7th class onwards)",
      "College Admissions",
      "Study Abroad Guidance",
      "Scholarship Guidance",
      "Resume Review",
      "Interview Preparation",
      "Career Change",
      "Skill Development",
      "Entrepreneurship Mentoring",
    ],
  },
  {
    id: "relationships-family",
    title: "Relationships & Family",
    icon: "❤️",
    desc: "Build stronger relationships with family, partners, and friends through expert counselling.",
    color: "from-rose-500 to-pink-500",
    subCategories: [
      "Relationship Counseling",
      "Marriage Counseling",
      "Premarital Guidance",
      "Parenting Support",
      "Teen Counseling",
      "Family Conflict Resolution",
      "Divorce & Separation Support",
    ],
  },
  {
    id: "mental-wellbeing",
    title: "Mental & Emotional Well-being",
    icon: "🧠",
    desc: "Support for stress, anxiety, depression, and overall mental well-being.",
    color: "from-purple-500 to-violet-500",
    subCategories: [
      "Stress Management",
      "Anxiety Support",
      "Burnout Recovery",
      "Confidence Building",
      "Emotional Wellness",
      "Life Coaching",
      "Mindfulness",
      "Habit Building",
      "Grief Support",
    ],
  },
  {
    id: "parenting",
    title: "Parenting",
    icon: "👶",
    desc: "Navigate every stage of parenting from infancy to adolescence with trusted expert advice.",
    color: "from-emerald-500 to-green-500",
    subCategories: [
      "Learning Difficulties",
      "Child Behaviour",
      "Parenting Coaching",
      "School Readiness",
      "Special Education Guidance",
    ],
  },
  {
    id: "legal-documentation",
    title: "Legal & Documentation",
    icon: "⚖️",
    desc: "Get clarity on legal matters from property and family law to contracts.",
    color: "from-blue-600 to-indigo-500",
    subCategories: [
      "Property Matters",
      "Consumer Rights",
      "Employment Law",
      "Family Law",
      "Legal Documentation",
      "Government Schemes",
      "RTI & Public Services",
    ],
  },
  {
    id: "child-safety",
    title: "Child Safety & Family Support",
    icon: "🛡️",
    desc: "Support for child safety, bullying, trauma, and family well-being.",
    color: "from-teal-500 to-cyan-500",
    subCategories: [
      "Child Abuse Support",
      "Bullying",
      "Emotional Trauma",
      "Parenting Guidance",
      "Child Behaviour Issues",
      "School Stress",
    ],
  },
  {
    id: "health-lifestyle",
    title: "Health & Lifestyle",
    icon: "🏃",
    desc: "Holistic wellness, fitness, nutrition, and lifestyle coaching for a better you.",
    color: "from-orange-500 to-red-500",
    subCategories: [
      "Nutrition",
      "Diet Planning",
      "Fitness Coaching",
      "Women's Health Education",
      "Men's Health Education",
      "Senior Care Guidance",
      "Sleep Improvement",
    ],
  },
];

export async function generateStaticParams() {
  return categoriesData.map((cat) => ({
    slug: cat.id,
  }));
}

export default async function CategoryPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  
  // ✅ Is category ko find karo
  const category = categoriesData.find((c) => c.id === slug);
  
  // ✅ Agar category nahi mili toh 404
  if (!category) return notFound();

  // ✅ Category detail page render karo
  return <CategoryDetailClient category={category} />;
}