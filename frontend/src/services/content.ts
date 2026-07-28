// Central Content Repository for Vasant Valley School Website

export const schoolContent = {
  hero: {
    badge: "Admissions Open For Academic Session 2026-27",
    headingMain: "Shaping Minds.",
    headingGradient: "Inspiring Futures.",
    description: "Vasant Valley School offers a transformative education blending academic rigor, creative innovation, and character building. Recognized among India's premier educational institutions.",
    stats: [
      { number: "100%", label: "CBSE Pass Rate" },
      { number: "1:10", label: "Teacher-Student Ratio" },
      { number: "35+", label: "Years of Excellence" },
      { number: "40+", label: "National Sports Trophies" }
    ]
  },

  features: [
    {
      id: "stem",
      title: "STEM & Robotics Innovation Center",
      category: "Innovation",
      description: "Equipped with high-end workstation PCs, 3D printers, drone mechanics, and AI learning modules.",
      detail: "Our STEM lab allows students from Grade VI onwards to design real-world prototypes, write custom code in Python and C++, and participate in international robotics olympiads."
    },
    {
      id: "sports",
      title: "Olympic-Standard Sports Infrastructure",
      category: "Athletics",
      description: "25m semi-covered swimming pool, synthetic basketball courts, FIFA-grade turf ground, and indoor badminton arena.",
      detail: "Led by certified coaches, our athletic programs train students for national level CBSE tournaments and state championships."
    },
    {
      id: "arts",
      title: "Performing & Visual Arts Studio",
      category: "Creativity",
      description: "Dedicated spaces for classical music ensembles, drama rehearsals, pottery workshops, and oil painting.",
      detail: "Every academic year culminates in the Grand Symphony Night and Visual Arts Exhibition attended by renowned artists."
    },
    {
      id: "global",
      title: "Global Exchange & MUN Conferences",
      category: "Leadership",
      description: "Collaborations with international partner schools in the UK, Germany, and Singapore.",
      detail: "Students regularly participate in Model United Nations (MUN) events worldwide, developing diplomatic negotiation skills."
    }
  ],

  feeCalculator: {
    grades: [
      { name: "Nursery / LKG / HKG", tuition: 25000, labFee: 2000, activityFee: 3000 },
      { name: "Primary (Grades 1 - 5)", tuition: 28000, labFee: 3500, activityFee: 3500 },
      { name: "Middle (Grades 6 - 8)", tuition: 32000, labFee: 5000, activityFee: 4000 },
      { name: "Secondary (Grades 9 - 10)", tuition: 36000, labFee: 6500, activityFee: 4500 },
      { name: "Senior Secondary (Grades 11 - 12)", tuition: 40000, labFee: 8000, activityFee: 5000 }
    ]
  },

  testimonials: [
    {
      quote: "Vasant Valley gave our daughter the confidence to present her robotics research paper at an international youth symposium. The faculty's mentorship is unparalleled.",
      author: "Priya & Rajesh Malhotra",
      role: "Parents of Ananya (Class XII)"
    },
    {
      quote: "The focus on sports combined with top-notch academics allowed me to represent Delhi in national athletics while securing 96% in my CBSE boards.",
      author: "Kabir Verma",
      role: "Alumnus (Batch of 2024, Stanford University)"
    },
    {
      quote: "As a teacher here for 12 years, I cherish the environment of inquiry and freedom that encourages every child to discover their unique strengths.",
      author: "Sujata Sengupta",
      role: "Senior HOD Physics"
    }
  ]
};
