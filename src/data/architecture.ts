/**
 * Content for the Architecture Lab page. Each project's `diagrams` array
 * starts empty until a real diagram image is supplied -- add the image
 * under public/architecture/<id>/ and push an entry here to wire it up;
 * nothing here is a placeholder or invented stand-in for missing content.
 */
import { Cloud, Eye, FileSearch, GraduationCap, ListChecks, Scale, ShieldCheck } from 'lucide-react'
import { GITHUB_URL, NAME } from './content'
import type { ArchitectureProject } from '../types/architecture'

export const ARCHITECTURE_EYEBROW = 'SYSTEM DESIGN • ARCHITECTURE • ENGINEERING'
export const ARCHITECTURE_HEADING = 'How My Systems Are Built'
export const ARCHITECTURE_SUBTITLE =
  'Explore the architecture behind my projects and see how interfaces, services, databases, AI pipelines, ' +
  'and security components work together.'

/** Section heading shown directly above the filters/grid -- distinct from
 * the hero above it, mirroring every other section on the site having its
 * own eyebrow/title/subtitle right above its content. */
export const ARCHITECTURE_SECTION_EYEBROW = 'Architecture'
export const ARCHITECTURE_SECTION_TITLE = 'System Architecture'
export const ARCHITECTURE_SECTION_SUBTITLE =
  'Explore the systems behind my projects — from application architecture and data flow to AI pipelines ' +
  'and security systems.'

export const ARCHITECTURE_PAGE_TITLE = `Architecture Lab | ${NAME} — Software & Cybersecurity Projects`
export const ARCHITECTURE_META_DESCRIPTION =
  `Explore the system architectures behind ${NAME}'s software engineering, cybersecurity, AI, and ` +
  'full-stack projects.'

export const ARCHITECTURE_PROJECTS: ArchitectureProject[] = [
  {
    id: 'phishguard',
    title: 'PhishGuard',
    category: 'Cybersecurity',
    description: 'Intelligent Phishing Detection & Awareness Platform',
    systemOverview:
      'A visitor submits an email or URL through the web frontend, which the Flask application passes to a ' +
      'detection engine combining rule-based checks with ML analysis. The result is classified into a risk ' +
      'level (safe, suspicious, or high risk), then both logged to the database as scan history and turned ' +
      'into a downloadable PDF risk-summary report.',
    components: ['Web Frontend', 'Flask Application', 'Detection Engine', 'Risk Classification', 'SQL Database', 'Report Generator'],
    technologies: ['Python', 'Flask', 'SQLite', 'Machine Learning', 'Cybersecurity'],
    diagrams: [
      {
        kind: 'architecture',
        label: 'System Architecture',
        imagePath: '/architecture/phishguard/architecture.png',
        imageAlt:
          'PhishGuard system architecture diagram: a user submits an email or URL to the web frontend, which ' +
          'is handled by a Flask application and passed to a detection engine performing rule-based and ML ' +
          'analysis, which classifies risk as safe, suspicious, or high risk, then writes scan history to a ' +
          'SQL database and generates a PDF report for the user to download.',
      },
    ],
    icon: ShieldCheck,
  },
  {
    id: 'rag-knowledge-assistant',
    title: 'RAG Knowledge Assistant',
    category: 'Artificial Intelligence',
    description: 'Retrieval-Augmented Generation system for intelligent document-based question answering.',
    systemOverview:
      'Two pipelines feed into a shared vector store. Ingestion: raw documents are loaded, text is extracted, ' +
      'split into chunks, and converted to embeddings stored in ChromaDB. Querying: a user question is parsed, ' +
      'embedded, and matched against ChromaDB via similarity search to retrieve the top-K most relevant ' +
      'chunks. That retrieved context is combined with the original query and sent to a Groq-hosted LLM, ' +
      'which generates the final answer returned to the user.',
    components: [
      'Document Loader',
      'Text Chunking',
      'Embedding Generation',
      'ChromaDB Vector Store',
      'Similarity Search',
      'LLM Generation (Groq)',
    ],
    technologies: ['Python', 'LangChain', 'Chroma', 'Groq', 'RAG'],
    githubUrl: `${GITHUB_URL}/RAG-Chatbot`,
    diagrams: [
      {
        kind: 'architecture',
        label: 'System Architecture',
        imagePath: '/architecture/rag-knowledge-assistant/architecture.png',
        imageAlt:
          'RAG Knowledge Assistant architecture diagram: an ingestion pipeline loads documents, extracts and ' +
          'chunks their text, and generates embeddings into ChromaDB, while a query pipeline parses and embeds ' +
          'the user question, runs a similarity search against ChromaDB to retrieve the top-K relevant chunks, ' +
          'combines them with the query, and sends them to a Groq language model that generates the answer ' +
          'returned to the user.',
      },
    ],
    icon: FileSearch,
  },
  {
    id: 'food-rescue',
    title: 'Food Rescue Platform',
    category: 'Full-Stack',
    description: 'A platform designed to connect food donors with organizations and help reduce food waste.',
    systemOverview:
      'Users (donors, organizations, volunteers, and admins) go through a React frontend -- dashboard, ' +
      'listings, and a map -- to a Node.js/Express backend API. The API is split into three domains ' +
      '(authentication, food listing management, and the donation request system), which all feed a central ' +
      'business-logic layer that matches donations to requests and detects expiring food. That layer persists ' +
      'to the database, computes distance through the map/location service, and triggers notifications.',
    components: [
      'React Frontend',
      'Backend API (Node.js/Express)',
      'Authentication',
      'Food Management',
      'Donation System',
      'Business Logic',
      'Database',
      'Map / Location',
      'Notifications',
    ],
    technologies: ['React', 'Node.js', 'Express', 'Database'],
    githubUrl: `${GITHUB_URL}/Food-Rescue-Donation-Platform`,
    diagrams: [
      {
        kind: 'architecture',
        label: 'System Architecture',
        imagePath: '/architecture/food-rescue/architecture.png',
        imageAlt:
          'Food Expiry Rescue Platform architecture diagram: users go through a React frontend to a Node.js ' +
          'and Express backend API, which splits into authentication, food management, and a donation system, ' +
          'all feeding a business logic layer that handles matching and expiry detection, which writes to a ' +
          'database, a map/location service, and a notifications system.',
      },
    ],
    icon: ListChecks,
  },
  {
    id: 'mms-student-companion',
    title: 'MMS Student Companion',
    category: 'Mobile Application',
    description: 'Student productivity application with academic utilities and student-focused features.',
    systemOverview:
      'A student uses the Flutter app\'s presentation layer (dashboard, CGPA, attendance), backed by Provider ' +
      'for app, user, and academic state management. State is synced with Supabase -- handling auth, ' +
      'PostgreSQL, and APIs -- which stores student, academic, and faculty data, while local storage caches ' +
      'preferences for a responsive experience.',
    components: [
      'Flutter App (Dart)',
      'Presentation Layer',
      'Provider State Management',
      'Supabase (Auth & APIs)',
      'Local Storage',
      'PostgreSQL Database',
    ],
    technologies: ['Flutter', 'Dart', 'Provider', 'Supabase'],
    githubUrl: `${GITHUB_URL}/MMS-Student-Companion`,
    diagrams: [
      {
        kind: 'architecture',
        label: 'System Architecture',
        imagePath: '/architecture/mms-student-companion/architecture.png',
        imageAlt:
          'MMS Student Companion architecture diagram: a student uses a Flutter app whose presentation layer ' +
          '(dashboard, CGPA, attendance) is backed by Provider state management, which syncs with Supabase ' +
          '(auth, PostgreSQL, APIs) backed by a database of student, academic, and faculty data, and with ' +
          'local storage for cached preferences.',
      },
    ],
    icon: GraduationCap,
  },
  {
    id: 'edgepilot-ai',
    title: 'EdgePilot AI',
    category: 'Artificial Intelligence',
    description:
      'An AI-powered safety monitoring platform that uses computer vision to detect safety events, assess ' +
      'risk, and provide actionable recommendations for industrial environments.',
    technologies: ['Python', 'FastAPI', 'React', 'Gemini API', 'Groq'],
    githubUrl: `${GITHUB_URL}/edgepilot-ai`,
    liveUrl: 'https://edgepilot-ai-wk15.vercel.app/',
    systemOverview:
      'A user interacts with a React/Vite frontend backed by a FastAPI REST API. Captured camera frames go ' +
      'through image analysis and Gemini Vision, which extracts objects, scene, and evidence. A deterministic ' +
      'risk engine applies rules and risk calculation on that output, then a Groq-hosted LLM reasons over the ' +
      'result to produce recommendations. Incidents and analytics are persisted to Supabase PostgreSQL and ' +
      'surfaced on a dashboard.',
    components: [
      'React / Vite Frontend',
      'FastAPI Backend',
      'Image / Camera Analysis',
      'Gemini Vision',
      'Deterministic Risk Engine',
      'Groq LLM',
      'Supabase PostgreSQL',
      'Dashboard',
    ],
    diagrams: [
      {
        kind: 'architecture',
        label: 'System Architecture',
        imagePath: '/architecture/edgepilot-ai/architecture.png',
        imageAlt:
          'EdgePilot AI architecture diagram: a user goes through a React/Vite frontend to a FastAPI backend, ' +
          'which passes captured images through Gemini Vision for object/scene/evidence analysis, into a ' +
          'deterministic risk engine, then a Groq LLM for reasoning and recommendations, persisting incidents ' +
          'and analytics to Supabase PostgreSQL and displaying them on a dashboard.',
      },
    ],
    icon: Eye,
  },
  {
    id: 'biasmap',
    title: 'BiasMap',
    category: 'Artificial Intelligence',
    description:
      'An AI fairness platform that analyzes AI systems and data for bias, visualizes fairness issues, and ' +
      'provides insights to help reduce bias.',
    technologies: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Groq'],
    githubUrl: `${GITHUB_URL}/BiasMap`,
    liveUrl: 'https://bias-map-pink.vercel.app/',
    systemOverview:
      'A user submits data through the web frontend to a JavaScript backend, which fans out to a data-process ' +
      'step (cleaning and preparing the data), an AI/ML layer running model inference, and an analysis engine ' +
      'applying scoring logic. All three converge into a set of analysis results -- scores, indicators, and ' +
      'insights -- rendered back to the user through the frontend results UI.',
    components: ['Frontend', 'JavaScript Backend', 'Data Process', 'AI / ML Layer', 'Analysis Engine', 'Analysis Results'],
    diagrams: [
      {
        kind: 'architecture',
        label: 'System Architecture',
        imagePath: '/architecture/biasmap/architecture.png',
        imageAlt:
          'BiasMap architecture diagram: a user submits data through a web frontend to a JavaScript backend, ' +
          'which fans out to a data-process step, an AI/ML inference layer, and an analysis engine applying ' +
          'scoring logic, all converging into analysis results (scores, indicators, insights) displayed back ' +
          'to the user through the frontend results UI.',
      },
    ],
    icon: Scale,
  },
  {
    id: 'everkeep',
    title: 'everKeep',
    category: 'Mobile Application',
    description:
      'A digital legacy and asset management app for securely storing documents, accounts, and wishes for ' +
      'trusted contacts.',
    technologies: ['Flutter', 'Dart', 'Provider'],
    githubUrl: `${GITHUB_URL}/everKeep`,
    systemOverview:
      'A user securely accesses the Flutter app (Dart, Material 3), which exposes feature layers for the ' +
      'vault, documents, wishes, and contacts. Provider handles app-wide state management, backed by a ' +
      'repositories/services layer implementing business logic and data access down to the underlying data ' +
      'layer of models and application data.',
    components: [
      'Flutter App (Dart)',
      'Feature Layers (Vault, Documents, Wishes, Contacts)',
      'Provider State Management',
      'Repositories / Services',
      'Data Layer',
    ],
    diagrams: [
      {
        kind: 'architecture',
        label: 'System Architecture',
        imagePath: '/architecture/everkeep/architecture.png',
        imageAlt:
          'everKeep architecture diagram: a user securely accesses a Flutter app whose feature layers (vault, ' +
          'documents, wishes, contacts) are backed by Provider state management, which flows through a ' +
          'repositories/services layer handling business logic and data access down to a data layer of models ' +
          'and application data.',
      },
    ],
    icon: Cloud,
  },
]
