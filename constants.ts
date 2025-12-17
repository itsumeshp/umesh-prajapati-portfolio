import { Profile, SkillCategory, ExperienceItem, ProjectItem, BlogPost } from './types';

// RECRUITER-FOCUSED CONTENT STRATEGY
// Tone: Professional, confident, architectural, solutions-oriented.

export const PROFILE: Profile = {
  name: "Umesh Prajapati",
  title: "Senior Laravel Developer",
  tagline: "Architecting scalable SaaS ecosystems and high-performance APIs.",
  bio: "I am a Senior Backend Engineer with 5+ years of experience specializing in the Laravel ecosystem. I don't just write code; I engineer scalable multi-tenant SaaS architectures, optimize high-traffic database queries, and build secure API infrastructures. Currently focused on helping businesses transition from legacy systems to modern, cloud-native solutions.",
  location: "Ahmedabad, Gujarat (Open to Remote)",
  email: "itsumeshp@gmail.com",
  availability: "Open to Offers",
  resumeUrl: "/resume.pdf",
  socials: [
    { platform: "GitHub", url: "https://github.com/itsumeshp", icon: "github" },
    { platform: "LinkedIn", url: "https://linkedin.com/in/itsumeshp", icon: "linkedin" },
    { platform: "Twitter", url: "https://twitter.com/itsumeshp", icon: "twitter" },
  ]
};

// Skills organized by "Tech Stack" layers rather than generic categories
export const SKILLS: SkillCategory[] = [
  {
    category: "The Core Stack",
    skills: [
      { name: "Laravel 10/11", level: 98 },
      { name: "PHP 8.2+", level: 95 },
      { name: "MySQL Optimization", level: 90 },
      { name: "Redis Caching", level: 85 },
    ]
  },
  {
    category: "Modern Frontend",
    skills: [
      { name: "React.js", level: 85 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Livewire / Alpine", level: 80 },
      { name: "TypeScript", level: 75 },
    ]
  },
  {
    category: "Infrastructure & DevOps",
    skills: [
      { name: "AWS (EC2, RDS, S3)", level: 80 },
      { name: "Docker & CI/CD", level: 75 },
      { name: "Nginx Configuration", level: 80 },
      { name: "REST / GraphQL", level: 95 },
    ]
  }
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: 1,
    role: "Software Engineer",
    company: "Bytes Technolab",
    duration: "2024 - Present",
    description: "Deployed on-site at Divya Bhaskar (Media Giant). Engineered the backend for high-traffic event platforms handling millions of participants. Reduced API response latency by 40% through aggressive query optimization and Redis caching. Automated complex coupon validation workflows using AI integration.",
    technologies: ["Laravel Enterprise", "MySQL Tuning", "Redis", "FCM", "System Architecture"]
  },
  {
    id: 2,
    role: "Software Developer",
    company: "WebMob Technologies",
    duration: "2023 - 2024",
    description: "Architected secure GraphQL APIs for a Mental Wellness SaaS serving 10k+ active users. Integrated Stripe and Tap payments for global billing. Streamlined deployment processes by implementing AWS CI/CD pipelines, cutting deployment time by 50%.",
    technologies: ["Laravel", "GraphQL", "AWS Lambda", "Stripe API", "Multi-tenancy"]
  },
  {
    id: 3,
    role: "PHP Developer",
    company: "RainStream Technologies",
    duration: "2021 - 2023",
    description: "Developed modular CRM systems with Role-Based Access Control (RBAC). Migrated legacy PHP applications to modern Laravel architectures, reducing technical debt and improving maintainability. Managed 99.9% uptime on AWS EC2 instances.",
    technologies: ["Modern PHP", "Laravel Migration", "Docker", "SaaS Logic"]
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 1,
    title: "SaaS Onboarding Platform",
    category: "B2B Automation",
    description: "A specialized SaaS platform that streamlines customer onboarding and document management. The system automates data collection workflows, ensuring compliance and significantly reducing administrative processing time for businesses.",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    technologies: ["Laravel", "Vue.js", "MySQL", "REST API", "AWS"],
    isFeatured: true,
    role: "Core Backend Developer",
    features: [
      "Dynamic form management engine",
      "Role-based access control (RBAC)",
      "Automated document verification"
    ],
    challenge: "Developing a flexible form builder that allows non-technical administrators to create complex, conditional data collection workflows per client."
  },
  {
    id: 2,
    title: "Multi-Tenant Sports Hub",
    category: "Club Management",
    description: "A comprehensive digital ecosystem for sports academies. This multi-tenant platform enables independent operation for multiple clubs, handling player development tracking, team management, and operations in multiple languages.",
    imageUrl: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=2370&auto=format&fit=crop",
    technologies: ["Laravel", "Multi-tenancy", "i18n", "MySQL", "AWS"],
    isFeatured: true,
    role: "System Architect",
    features: [
      "Strict tenant data isolation",
      "Multi-language (i18n) support",
      "Customizable admin panels"
    ],
    challenge: "Architecting a secure multi-tenant foundation that scales horizontally while keeping maintenance overhead low for individual tenant configurations."
  },
  {
    id: 3,
    title: "AI Mental Wellness App",
    category: "HealthTech & AI",
    description: "An AI-powered application providing personalized mental health insights. The platform analyzes user behavioral data to offer tailored wellness recommendations, mood tracking, and guided activities within a secure, privacy-focused environment.",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2340&auto=format&fit=crop",
    technologies: ["Laravel", "GraphQL", "AI Integration", "MySQL", "AWS"],
    isFeatured: true,
    role: "Backend Engineer",
    features: [
      "AI-driven insight generation",
      "Secure GraphQL API endpoints",
      "Real-time mood analytics"
    ],
    challenge: "Integrating complex AI models for real-time data analysis while ensuring strict compliance with health data privacy standards and low API latency."
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "Optimizing Eloquent Queries for High Traffic Apps",
    excerpt: "Learn how to use Eager Loading, Caching, and Chunking to handle millions of records in Laravel without crashing your server.",
    date: "Oct 12, 2023",
    readTime: "5 min read",
    slug: "optimizing-eloquent",
    tags: ["Laravel", "Performance"]
  },
  {
    id: 2,
    title: "Building Multi-Tenant Systems with Laravel",
    excerpt: "A deep dive into database separation vs. shared database strategies for SaaS applications.",
    date: "Sep 28, 2023",
    readTime: "8 min read",
    slug: "multi-tenant-laravel",
    tags: ["SaaS", "Architecture"]
  }
];