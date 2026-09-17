/**
 * Centralized content for the portfolio site -- ported 1:1 from the
 * Flutter source's lib/data/content.dart. Everything a visitor sees as
 * text, a link, or a piece of personal data lives here. To update the
 * site's content, edit the values below -- no component code needs to
 * change.
 */
import {
  Briefcase,
  Bot,
  Brain,
  Cloud,
  Code2,
  Compass,
  Eye,
  FileSearch,
  GraduationCap,
  ListChecks,
  Mail,
  MessageSquare,
  Network,
  Scale,
  Search,
  Shield,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Terminal,
  Trophy,
  Users,
  Wrench,
} from 'lucide-react'

import type { Certificate, LearningItem, NavItem, Project, SkillCategory, SocialLink } from '../types/content'

// ---------------------------------------------------------------------
// Identity
// ---------------------------------------------------------------------
export const NAME = 'Mohamed Abdirahman Warsame'
export const SHORT_NAME = 'ODAY'
export const SITE_TITLE = 'Mohamed Abdirahman Warsame — Portfolio'

/** Rotating/typing-effect taglines shown under the hero name. */
export const TAGLINES = [
  'AI Automation Engineer',
  'Flutter Developer',
  'Security Enthusiast',
  'CS & Communication Engineering Student',
]

// ---------------------------------------------------------------------
// About
// ---------------------------------------------------------------------
export const BIO =
  "I'm a Computer Science & Communication Engineering student who loves " +
  'turning ideas into working software — from cross-platform mobile apps ' +
  "to AI-driven automation pipelines. Lately I've been pulled toward the " +
  "security side of engineering: understanding how systems break so I can " +
  "help build ones that don't."

export const EDUCATION = 'B.Tech, Computer Science & Communication Engineering — KIIT University, India'

export const CURRENT_FOCUS =
  'Building with Flutter & Firebase, designing AI automation agents, and ' +
  'leveling up in network security and incident response.'

/**
 * Path (relative to the site root) to the bundled resume asset in
 * public/documents/. Leave empty to show a "coming soon" state on the
 * "Download Resume" button instead.
 */
export const RESUME_URL = '/documents/Mohamed_Abdirahman_Warsame_Resume.pdf'

// ---------------------------------------------------------------------
// Contact
// ---------------------------------------------------------------------
export const EMAIL = 'zapiryre@gmail.com'
export const LINKEDIN_URL = 'https://www.linkedin.com/in/mohamed-abdirahman-warsame/'
export const GITHUB_URL = 'https://github.com/ODAY8'
export const STACKOVERFLOW_URL = 'https://stackoverflow.com/users/33082857/oday'

/** Formspree endpoint the contact form POSTs to. Submissions land in the inbox tied to this form. */
export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xoeqeggq'

export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'GitHub', url: GITHUB_URL, icon: Code2 },
  { label: 'LinkedIn', url: LINKEDIN_URL, icon: Briefcase },
  { label: 'StackOverflow', url: STACKOVERFLOW_URL, icon: MessageSquare },
  { label: 'Email', url: `mailto:${EMAIL}`, icon: Mail },
]

// ---------------------------------------------------------------------
// Navigation / sections
// ---------------------------------------------------------------------
export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'certificates', label: 'Certifications' },
  { id: 'learning', label: 'Learning' },
  { id: 'contact', label: 'Contact' },
]

// ---------------------------------------------------------------------
// Skills
// ---------------------------------------------------------------------
export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: 'Languages',
    icon: Terminal,
    skills: ['Python', 'Java', 'JavaScript', 'Dart', 'C', 'SQL'],
  },
  {
    name: 'Mobile & Backend',
    icon: Smartphone,
    skills: ['Flutter', 'Firebase', 'Firestore', 'firebase_auth', 'REST APIs'],
  },
  {
    name: 'Security & Networking',
    icon: Shield,
    skills: ['Linux', 'Wireshark', 'Nmap'],
  },
  {
    name: 'Tooling',
    icon: Wrench,
    skills: ['Git', 'GitHub', 'VS Code'],
  },
]

// ---------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------
export const PROJECTS: Project[] = [
  {
    title: 'EdgePilot AI',
    description:
      'An AI-powered safety monitoring platform that uses computer vision to detect safety events, assess ' +
      'risk, and provide actionable recommendations for industrial environments.',
    techStack: ['Python', 'FastAPI', 'React', 'Gemini API', 'Groq'],
    repoUrl: `${GITHUB_URL}/edgepilot-ai`,
    liveUrl: 'https://edgepilot-ai-wk15.vercel.app/',
    icon: Eye,
  },
  {
    title: 'BiasMap',
    description:
      'An AI fairness platform that analyzes AI systems and data for bias, visualizes fairness issues, and ' +
      'provides insights to help reduce bias.',
    techStack: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Groq'],
    repoUrl: `${GITHUB_URL}/BiasMap`,
    liveUrl: 'https://bias-map-pink.vercel.app/',
    icon: Scale,
  },
  {
    title: 'RAG Chatbot',
    description:
      'An AI assistant that combines document retrieval with LLM reasoning to provide context-aware answers ' +
      'from uploaded knowledge sources.',
    techStack: ['Python', 'LangChain', 'ChromaDB', 'Flask', 'Groq'],
    repoUrl: `${GITHUB_URL}/RAG-Chatbot`,
    icon: FileSearch,
  },
  {
    title: 'MMS Student Companion',
    description:
      'A student-focused mobile application for managing academic information such as CGPA, attendance, ' +
      'timetables, holidays, and faculty details.',
    techStack: ['Flutter', 'Dart', 'Supabase', 'Provider'],
    repoUrl: `${GITHUB_URL}/MMS-Student-Companion`,
    icon: GraduationCap,
  },
  {
    title: 'Food Rescue Donation Platform',
    description:
      'A platform connecting food donors with recipients in need, built ' +
      'with a Node.js/Express backend and Prisma ORM.',
    techStack: ['Node.js', 'Express', 'Prisma', 'JavaScript'],
    repoUrl: `${GITHUB_URL}/Food-Rescue-Donation-Platform`,
    icon: ListChecks,
  },
  {
    title: 'everKeep',
    description:
      'A digital legacy and asset management app for securely storing ' +
      'documents, accounts, and wishes for trusted contacts.',
    techStack: ['Flutter', 'Dart', 'Provider'],
    repoUrl: `${GITHUB_URL}/everKeep`,
    icon: Cloud,
  },
  {
    title: 'Shopping App',
    description: 'An e-commerce app with authentication, product catalog, and a Firebase-backed cloud backend.',
    techStack: ['Flutter', 'Dart', 'Firebase'],
    repoUrl: `${GITHUB_URL}/store_app`,
    icon: ShoppingBag,
  },
  {
    title: 'AI Automation System',
    description: 'An automation pipeline that orchestrates AI agents to handle repetitive workflows end-to-end.',
    techStack: ['Python', 'AI Agents'],
    repoUrl: `${GITHUB_URL}/agentic_outreach_project`,
    icon: Bot,
  },
]

// ---------------------------------------------------------------------
// Experience, Certifications & Achievements
// ---------------------------------------------------------------------
export const CERTIFICATES: Certificate[] = [
  {
    title: 'Summer Internship 2026',
    category: 'Internship',
    icon: Briefcase,
    organization: 'KIIT School of Computer Applications',
    date: 'May – Jul 2026',
    imagePath: '/certificates/summer-internship-2026.png',
    imageAlt:
      'Certificate awarded to Mohamed Abdirahman Warsame for completing ' +
      'an 8-week Summer Internship in AI/ML, Cybersecurity, Image ' +
      'Processing, and NLP, organized by the School of Computer ' +
      'Applications, KIIT Deemed to be University',
  },
  {
    title: 'Online Conference 333',
    category: 'Conference',
    icon: Users,
    organization: 'IMUN',
    date: 'Aug 29–30, 2026',
    imagePath: '/certificates/imun-online-conference-333.png',
    imageAlt:
      'Certificate of Appreciation awarded to Mohamed Abdirahman Warsame for successfully participating as a ' +
      'delegate in IMUN Online Conference 333, August 29-30, 2026',
  },
  {
    title: 'Certificate of Participation',
    category: 'AI / Workshop',
    icon: Trophy,
    organization: 'USC KIIT — Automatrix 2.0 (Agentic AI)',
    date: 'Aug 19, 2025',
    imagePath: '/certificates/automatrix-2-agentic-ai.png',
    imageAlt:
      'Certificate of Participation awarded to Mohamed Abdirahman Warsame for active participation in ' +
      'Automatrix 2.0, a workshop on Agentic AI conducted by USC KIIT under the Training & Placement ' +
      'Department of KIIT, led by Mr. Manoj Batra',
  },
  {
    title: 'Low-Resource NLP: Techniques and Applications with LLMs',
    category: 'AI / NLP',
    icon: Brain,
    organization: 'KIIT School of Computer Applications',
    date: 'Jun 6–10, 2026',
    imagePath: '/certificates/low-resource-nlp-llms.png',
    imageAlt:
      'Certificate awarded to Mohamed Abdirahman Warsame for successfully completing the 5-day workshop on ' +
      'Low-Resource NLP: Techniques and Applications with LLMs, organized by the School of Computer ' +
      'Applications, KIIT Deemed to be University, June 6-10, 2026',
  },
]

// ---------------------------------------------------------------------
// Currently learning
// ---------------------------------------------------------------------
export const LEARNING_ITEMS: LearningItem[] = [
  {
    title: 'Networking & Linux for Security Ops',
    description: 'Deepening hands-on skills with Linux internals and network fundamentals for security operations.',
    icon: Network,
  },
  {
    title: 'Threat Detection & Digital Investigation',
    description: 'Studying how incidents are detected, triaged, and investigated.',
    icon: Search,
  },
  {
    title: 'Wireshark, Nmap & Web Security',
    description: 'Practicing packet analysis, network reconnaissance, and web security fundamentals.',
    icon: ShieldCheck,
  },
  {
    title: 'AI Agent Design',
    description: 'Designing agentic systems for reliable, automated workflows.',
    icon: Brain,
  },
]

// Re-exported for the About section's info-card icons.
export const ICONS = { GraduationCap, Compass }
