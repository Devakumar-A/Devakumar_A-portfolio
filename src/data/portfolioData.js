// ==============================================================================
// DEVAKUMAR A. — VERIFIED PORTFOLIO DATA REPOSITORY
// All information verified against academic transcripts, Scopus papers, and resume
// ==============================================================================

import { profile } from "./profile";

// Helper to dynamically resolve Vite base URL for static assets in dev and build
const base = import.meta.env.BASE_URL || "/";
const asset = (p) => `${base}${p.replace(/^\/+/, "")}`;

export const personalInfo = {
  name: "Devakumar A.",
  givenName: "Devakumar",
  familyBadge: "DA",
  title: "AI Engineer, Full-Stack Developer & Researcher",
  headline: "Building intelligent systems, deep neural interfaces, and scalable digital products.",
  location: "Puducherry, India",
  email: "devak9391@gmail.com",
  phone: "+91-6383066764",
  orcid: "0009-0003-8934-6744",
  orcidUrl: "https://orcid.org/0009-0003-8934-6744",
  github: "https://github.com/Devakumar-A",
  githubUsername: "Devakumar-A",
  linkedin: "https://www.linkedin.com/in/devakumar-a-129561305",
  blog: "https://devakumar-a.blogspot.com/2026/06/devakumar-computer-science-engineer.html",
  quora: "https://qr.ae/pFHgYY",
  instagram: "https://instagram.com",
  whatsapp: "https://wa.me/916383066764?text=Hi%20Devakumar!%20I%20came%20across%20your%20portfolio.",
  resumePath: asset("assets/resume/Devakumar-A_Resume_Portfolio.pdf"),
  profileImage: asset("assets/images/profile/Profile.PNG"),
  heroVideo: asset("assets/hero/hero.mp4"),
  heroPoster: asset("assets/hero/hero-poster.webp"),
  heroPosterJpg: asset("assets/hero/hero-poster.jpg")
};

export const verifiedStats = [
  {
    id: "stat-projects",
    value: "7+",
    label: "Production AI Systems",
    detail: "Full-Stack & Deep Learning",
    icon: "Code2"
  },
  {
    id: "stat-publication",
    value: "1",
    label: "Scopus Research Paper",
    detail: "IJDDT 2026 (DOI: 16.58S.21)",
    icon: "BookOpen"
  },
  {
    id: "stat-certs",
    value: "12+",
    label: "Industry Credentials",
    detail: "NPTEL Gold, Oracle, Google",
    icon: "Award"
  },
  {
    id: "stat-leadership",
    value: "600+",
    label: "Community Members Led",
    detail: "President, Mathoria Club",
    icon: "Users"
  }
];

export const heroRoles = [
  "AI Developer",
  "Full-Stack Developer",
  "Machine Learning Enthusiast",
  "Technology Researcher",
  "Product Builder"
];

export const techStrip = [
  { name: "React", category: "Frontend" },
  { name: "Python", category: "Core" },
  { name: "JavaScript", category: "Core" },
  { name: "Node.js", category: "Backend" },
  { name: "TensorFlow", category: "AI/ML" },
  { name: "PyTorch", category: "AI/ML" },
  { name: "PostgreSQL", category: "Database" },
  { name: "MongoDB", category: "Database" },
  { name: "Firebase", category: "Cloud" },
  { name: "FastAPI", category: "Backend" },
  { name: "OpenCV", category: "Vision" },
  { name: "Docker / AWS", category: "Cloud" }
];

export const aboutStory = {
  narrativeP1: `I am a Computer Science and Engineering developer, AI researcher, and product builder based in Puducherry, India. My passion lies at the convergence of advanced artificial intelligence, neural signal processing, and high-performance full-stack web architectures.`,
  narrativeP2: `Rather than treating AI as an isolated mathematical exercise, I build real-world software products that empower people. From developing an 89%-accuracy EEG Brain-Computer Interface that enables paralyzed patients to communicate without physical movement, to engineering multi-modal video genre classifiers and agricultural water intelligence engines, I turn complex algorithms into responsive, production-ready systems.`,
  narrativeP3: `As President of the Mathoria Mathematics Club at RGCET, I led and scaled a community of 600+ students, architecting custom digital management portals and mentoring peers in computational thinking. When I build software, I obsess over performance, clean systems architecture, and human-centered design.`,
  corePillars: [
    {
      title: "Neural Computing & BCI",
      desc: "Decoding non-invasive EEG brainwaves and multi-task convolutional architectures for assistive medical communication.",
      icon: "Brain"
    },
    {
      title: "Production Full-Stack AI",
      desc: "Deploying machine learning models behind robust FastAPI & Node.js services with reactive, cinematic web interfaces.",
      icon: "Layers"
    },
    {
      title: "Empathetic Product Engineering",
      desc: "Creating accessible platforms for speech and hearing-impaired communities and sustainable agriculture.",
      icon: "HeartHandshake"
    },
    {
      title: "Leadership & Community Scale",
      desc: "Organizing academic symposiums, hackathon teams, and community digital platforms reaching hundreds of active members.",
      icon: "Compass"
    }
  ]
};

export const experienceData = [
  {
    id: "exp-scientex",
    role: "Scientific Program Trainee",
    company: "Scientex MedTech Private Limited",
    duration: "2025 – Present",
    location: "Puducherry, On-site",
    type: "Research & Medical Tech",
    badge: "Medical AI & Data Pipelines",
    highlights: [
      "Conducted research on biomedical data collection, biosignal preprocessing, and assistive technology integrations.",
      "Assisted in formulating validation pipelines for neural signal analysis and physiological computing algorithms.",
      "Collaborated on technical documentation and research frameworks for clinical medical applications."
    ],
    technologies: ["Python", "Biosignal Processing", "NumPy", "SciPy", "Medical Data Pipelines"]
  },
  {
    id: "exp-twilight",
    role: "Web Framework Intern",
    company: "Twilight IT Solution Pvt. Ltd.",
    duration: "Aug 2025",
    location: "Puducherry, On-site",
    type: "Frontend Engineering",
    badge: "Production Web Frameworks",
    highlights: [
      "Built and styled responsive web applications using HTML5, CSS3, JavaScript (ES6+), and modern CSS architectures.",
      "Engineered dynamic, interactive UI components using React.js, significantly boosting modular component reusability.",
      "Implemented production frontend build workflows in a fast-paced collaborative development environment."
    ],
    technologies: ["React.js", "JavaScript", "HTML5", "CSS3", "Git"]
  },
  {
    id: "exp-askan",
    role: "Backend Development Intern",
    company: "Askan Technologies",
    duration: "Jul 2025",
    location: "Puducherry, On-site",
    type: "Backend Engineering",
    badge: "REST APIs & Databases",
    highlights: [
      "Developed robust server-side business logic and RESTful endpoints using Node.js and Express.",
      "Designed and managed NoSQL database collections with MongoDB and MongoDB Compass, ensuring optimal indexing.",
      "Rigorously tested, documented, and debugged API endpoints with Postman prior to deployment."
    ],
    technologies: ["Node.js", "MongoDB", "Express", "Postman", "REST APIs"]
  },
  {
    id: "exp-cognifyz",
    role: "Front-End Development Intern",
    company: "Cognifyz Technologies",
    duration: "Feb 2025 – Mar 2025",
    location: "Remote",
    type: "Frontend Development",
    badge: "Agile Sprint Delivery",
    highlights: [
      "Created polished, cross-browser responsive user interfaces using HTML, CSS, JavaScript, and Bootstrap.",
      "Collaborated directly with UI/UX designers through iterative sprint feedback loops to ensure visual consistency."
    ],
    technologies: ["JavaScript", "HTML5", "CSS3", "Bootstrap", "Responsive Design"]
  },
  {
    id: "exp-mathoria",
    role: "President & Lead Platform Architect",
    company: "Mathoria Mathematics Club, RGCET",
    duration: "Mar 2025 – Jun 2026",
    location: "RGCET, Puducherry",
    type: "Leadership & Product Building",
    badge: "600+ Member Community",
    highlights: [
      "Spearheaded operations, academic workshops, hackathons, and competitions for an active student community of 600+ members.",
      "Designed, developed, and deployed the official Mathoria digital platform using Firebase to automate membership registration and event tracking.",
      "Mentored peers in mathematical computing, algorithms, and analytical problem-solving."
    ],
    technologies: ["Leadership", "Firebase", "Web Portal Architecture", "Community Scale"]
  }
];

export const educationData = [
  {
    id: "edu-btech",
    degree: "B.Tech in Computer Science and Engineering",
    institution: "Rajiv Gandhi College of Engineering and Technology (RGCET)",
    university: "Pondicherry University",
    duration: "2022 – 2026",
    location: "Puducherry, India",
    grade: `CGPA: ${profile.cgpa}`,
    status: "Final Year Undergraduate",
    highlights: [
      "Published Scopus-indexed research on Deep Learning Brain-Computer Interfaces (IJDDT 2026).",
      "Elected President of Mathoria Mathematics Club; established student management and visualization systems.",
      "Selected participant for Smart India Hackathon 2024 (Team RGCET-TECHNOCRATS, PS #1717).",
      "Awarded Elite + Gold certifications from NPTEL / IIT Bombay & IIT Ropar."
    ]
  },
  {
    id: "edu-hsc",
    degree: "Higher Secondary Certificate (HSC — Class XII)",
    institution: "Amalorpavam Higher Secondary School",
    duration: "2020 – 2022",
    location: "Puducherry, India",
    grade: "82.8%",
    status: "Completed",
    highlights: [
      "Major coursework in Mathematics, Physics, Chemistry, and Computer Science.",
      "Active participant in science exhibitions, quiz competitions, and mathematical problem-solving leagues."
    ]
  },
  {
    id: "edu-sslc",
    degree: "Secondary School Leaving Certificate (SSLC — Class X)",
    institution: "Amalorpavam Higher Secondary School",
    duration: "2019 – 2020",
    location: "Puducherry, India",
    grade: "78.2%",
    status: "Completed",
    highlights: [
      "Distinction in Mathematics and Science.",
      "Foundational training in logic, analytical thinking, and basic computer fundamentals."
    ]
  }
];

export const skillsEcosystem = {
  categories: [
    {
      id: "ai-ml",
      title: "Artificial Intelligence & ML",
      icon: "Brain",
      description: "Deep neural networks, biosignal analysis, NLP transformers, and multi-modal computer vision.",
      skills: [
        { name: "TensorFlow", level: 90, tag: "Deep Learning" },
        { name: "Keras", level: 92, tag: "Deep Learning" },
        { name: "PyTorch", level: 82, tag: "Neural Networks" },
        { name: "EEGNet & BCI", level: 94, tag: "Brain Signals" },
        { name: "Scikit-Learn", level: 95, tag: "Machine Learning" },
        { name: "Sentence Transformers", level: 90, tag: "NLP" },
        { name: "BERT / Hugging Face", level: 88, tag: "NLP" },
        { name: "OpenCV", level: 86, tag: "Computer Vision" },
        { name: "MNE-Python", level: 88, tag: "Biosignals" },
        { name: "LSTM / Time Series", level: 89, tag: "Forecasting" }
      ]
    },
    {
      id: "languages",
      title: "Programming Languages",
      icon: "Code",
      description: "Core algorithmic languages for system development, data engineering, and automation.",
      skills: [
        { name: "Python", level: 96, tag: "Primary" },
        { name: "JavaScript (ES6+)", level: 92, tag: "Primary" },
        { name: "Java", level: 88, tag: "Object-Oriented" },
        { name: "C / C++", level: 84, tag: "Systems" },
        { name: "SQL", level: 90, tag: "Relational Query" },
        { name: "HTML5 / CSS3", level: 95, tag: "Web Markup" }
      ]
    },
    {
      id: "frontend",
      title: "Frontend Engineering",
      icon: "Layout",
      description: "Modern component architectures, interactive animations, and responsive web experiences.",
      skills: [
        { name: "React.js", level: 94, tag: "Framework" },
        { name: "Tailwind CSS", level: 92, tag: "Styling" },
        { name: "Framer Motion", level: 88, tag: "Motion" },
        { name: "Three.js", level: 78, tag: "3D Visuals" },
        { name: "Responsive UI/UX", level: 95, tag: "Design" },
        { name: "Zustand / Context", level: 86, tag: "State" },
        { name: "Vite", level: 92, tag: "Build Tool" }
      ]
    },
    {
      id: "backend",
      title: "Backend & APIs",
      icon: "Server",
      description: "Scalable server architectures, high-speed microservices, and asynchronous API design.",
      skills: [
        { name: "FastAPI", level: 92, tag: "Python Microservices" },
        { name: "Node.js & Express", level: 88, tag: "JavaScript Runtime" },
        { name: "Flask", level: 86, tag: "Python Backend" },
        { name: "RESTful API Design", level: 94, tag: "Architecture" },
        { name: "JWT Authentication", level: 86, tag: "Security" },
        { name: "Postman", level: 92, tag: "Testing" }
      ]
    },
    {
      id: "databases",
      title: "Databases & Storage",
      icon: "Database",
      description: "Relational schemas, document storage, real-time sync, and data warehousing.",
      skills: [
        { name: "PostgreSQL", level: 90, tag: "Relational" },
        { name: "MongoDB", level: 88, tag: "NoSQL" },
        { name: "Firebase Realtime DB", level: 92, tag: "Real-time" },
        { name: "SQLite", level: 90, tag: "Embedded" },
        { name: "Pandas & NumPy", level: 95, tag: "Data Ingestion" }
      ]
    },
    {
      id: "cloud-tools",
      title: "Cloud & Developer Tools",
      icon: "Cloud",
      description: "Version control, containerization concepts, deployment pipelines, and UI prototyping.",
      skills: [
        { name: "Git & GitHub", level: 94, tag: "Version Control" },
        { name: "Google Cloud APIs", level: 86, tag: "Cloud AI" },
        { name: "Android Studio", level: 80, tag: "Mobile" },
        { name: "VS Code", level: 96, tag: "Editor" },
        { name: "Streamlit", level: 92, tag: "Rapid AI Prototyping" },
        { name: "Figma", level: 84, tag: "Design" }
      ]
    }
  ]
};

export const projectsList = [
  {
    id: "neurosense",
    number: "01",
    title: "NeuroSense",
    subtitle: "Deep Learning-Based EEG Communication Aid for Paralyzed Patients",
    category: "AI & Biosignal Computing",
    tagline: "Scopus-Indexed Research • 89% Overall System Accuracy",
    image: asset("assets/projects/eeg.png"),
    overview: "A multi-task Brain-Computer Interface (BCI) system engineered to assist paralyzed and Locked-In Syndrome patients by translating non-invasive EEG signals into communication intent, emotional state, and pain severity.",
    problem: "Individuals with severe motor disabilities lose normal vocal and muscular communication channels. Traditional assistive tools demand physical gaze or micro-movements, which are unavailable in advanced paralysis.",
    solution: "Engineered an end-to-end multi-task deep learning architecture inspired by EEGNet. It processes continuous multi-channel raw EEG brainwaves, filters muscular artifacts (1–40 Hz), and classifies communication intent, emotion, and pain simultaneously in a single model pass.",
    results: [
      { metric: "Overall Accuracy", value: "89%" },
      { metric: "Pain Severity Detection", value: "92%" },
      { metric: "Emotion Recognition", value: "90%" },
      { metric: "Intent Detection", value: "86%" }
    ],
    architecture: "EEG Electrode Acquisition ➔ Preprocessing (Bandpass 1-40Hz, Artifact Removal) ➔ EEGNet Spatial-Temporal Feature Extraction ➔ Multi-Head Classification ➔ Caregiver Dashboard",
    techStack: ["Python", "TensorFlow", "Keras", "EEGNet", "MNE-Python", "NumPy", "Pandas", "Scikit-Learn"],
    datasets: ["KARA One (Intent & Imagined Speech)", "SEED-IV (Emotion Dynamics)", "PainMonit (Pain Severity Levels)"],
    publication: {
      title: "Deep Learning-Based EEG Communication Aid for Paralyzed Patients",
      journal: "International Journal of Drug Delivery Technology (IJDDT), Vol 16 (58s), 2026",
      doi: "10.25258/IJDDT.16.58S.21",
      scopus: true
    },
    github: "https://github.com/Devakumar-A/EEG-Communication-Aid",
    liveDemo: "https://github.com/Devakumar-A",
    featured: true
  },
  {
    id: "aquacommand",
    number: "02",
    title: "AquaCommandAI",
    subtitle: "AI-Powered Water Resource Intelligence Platform",
    category: "Full-Stack AI & Agriculture",
    tagline: "React + FastAPI + PostgreSQL • 4 Multi-Source ML Models",
    image: asset("assets/projects/farmer.png"),
    overview: "A production-grade agricultural decision support platform that combines 4 custom-trained Machine Learning models to optimize crop selection, yield forecasting, and reservoir water management.",
    problem: "Farmers and reservoir authorities lack unified, predictive tools. Inefficient water distribution leads to crop failure during droughts and flash flooding during unmanaged peak seasons.",
    solution: "Built a full-stack platform that harmonizes soil nutrient parameters (N, P, K, pH), meteorological forecasts, and water gauge telemetry into real-time decision recommendations behind an interactive React dashboard.",
    results: [
      { metric: "ML Models", value: "4 Custom Engines" },
      { metric: "Latency", value: "<120ms Inference" },
      { metric: "Coverage", value: "Multi-Source Agriculture" },
      { metric: "Architecture", value: "FastAPI + React" }
    ],
    architecture: "Multi-Source Environmental Datasets ➔ Scikit-Learn Model Pipelines ➔ FastAPI RESTful Services ➔ PostgreSQL ➔ React & Tailwind CSS Dashboard",
    techStack: ["React.js", "FastAPI", "Python", "Scikit-Learn", "PostgreSQL", "Zustand", "Framer Motion", "Pandas", "NumPy"],
    github: "https://github.com/Devakumar-A/AquaCommandAI.git",
    liveDemo: "https://drive.google.com/file/d/1kq0IgMlBVZiUfQvu0vChW-4wddhMs9aa/view?usp=drive_link",
    featured: true
  },
  {
    id: "resume-screener",
    number: "03",
    title: "Automated Resume Relevance Checker",
    subtitle: "NLP Semantic Candidate Evaluation & Scoring System",
    category: "Natural Language Processing",
    tagline: "Sentence Transformers • Cosine Similarity • Dual Dashboards",
    image: asset("assets/projects/movie.png"),
    overview: "An NLP-powered recruitment platform that moves beyond legacy keyword matching to evaluate candidate resumes contextually against job descriptions using deep semantic embeddings.",
    problem: "Traditional ATS screeners generate severe false negatives because they look only for literal keyword matches, missing lateral technical competencies and contextual experience.",
    solution: "Engineered a document parsing and transformer embedding pipeline using all-MiniLM-L6-v2. Resumes in PDF/DOCX are vectorized into dense semantic spaces, evaluated via cosine similarity, and classified with high/medium/low verdicts.",
    results: [
      { metric: "Embedding Model", value: "Sentence Transformers" },
      { metric: "Formats", value: "PDF & DOCX Multi-Column" },
      { metric: "Accuracy", value: "Contextual Scoring" },
      { metric: "Interface", value: "Student & HR Views" }
    ],
    architecture: "Document Ingestion (PDFPlumber, Docx2Txt) ➔ Sentence Transformer Vectorization ➔ Cosine Similarity Computation ➔ Automated Verdict Engine ➔ Streamlit Dashboard",
    techStack: ["Python", "Streamlit", "Sentence Transformers", "Hugging Face", "Scikit-Learn", "PDFPlumber", "Docx2Txt", "SQLite"],
    github: "https://github.com/Devakumar-A/Automated-Resume-Relevance-Check-System",
    liveDemo: "https://github.com/Devakumar-A",
    featured: true
  },
  {
    id: "movieverse",
    number: "04",
    title: "MovieVerse AI",
    subtitle: "Multi-Modal Movie Genre Classification & Recommendation",
    category: "Multi-Modal AI & Vision",
    tagline: "BERT Text + ResNet50 Vision + OpenCV Video Processing",
    image: asset("assets/projects/drone.png"),
    overview: "An intelligent multi-modal entertainment classification engine that simultaneously fuses movie plot text, visual poster aesthetics, and trailer video action dynamics to predict genres.",
    problem: "Single-modality recommendation engines fail when plot summaries are ambiguous or teaser visuals convey emotional tones that text descriptions do not capture.",
    solution: "Integrated BERT text embeddings for storylines, ResNet50 convolutional networks for poster color and composition, and OpenCV for temporal trailer transitions, merging feature vectors into an explainable multi-genre classifier.",
    results: [
      { metric: "Modalities", value: "Text, Image, Video" },
      { metric: "Vision Model", value: "ResNet50 Deep CNN" },
      { metric: "NLP Engine", value: "BERT Embeddings" },
      { metric: "Feature", value: "Explainable AI (XAI)" }
    ],
    architecture: "Multi-Modal Input (Plot, Poster, Trailer) ➔ Processing Layer (BERT + ResNet50 + OpenCV) ➔ Feature Fusion ➔ Multi-Genre Classifier ➔ Recommendation Engine",
    techStack: ["Python", "Streamlit", "TensorFlow", "Keras", "BERT", "ResNet50", "OpenCV", "NLTK", "SQLite"],
    github: "https://github.com/Devakumar-A/MovieVerse-AI-Multimodal-Genre-Classification",
    liveDemo: "https://github.com/Devakumar-A",
    featured: false
  },
  {
    id: "nagish",
    number: "05",
    title: "Nagish India",
    subtitle: "Accessible Communication Platform for Speech & Hearing Impairments",
    category: "Mobile & Assistive AI",
    tagline: "Smart India Hackathon 2024 • Real-Time Speech Transcription & TTS",
    image: asset("assets/projects/nagish.png"),
    overview: "An accessibility-focused Android application developed for Smart India Hackathon 2024 to empower hearing and speech-impaired individuals to engage in natural two-way conversations.",
    problem: "Over 63 million people in India face speech and hearing disabilities, facing profound communication barriers during phone calls and public interactions without expensive human interpreters.",
    solution: "Architected a real-time mobile translation client using Google Cloud Speech-to-Text for live conversational captioning and Text-to-Speech voice synthesis, supported by multilingual Indian language localization.",
    results: [
      { metric: "Hackathon", value: "Smart India Hackathon 2024" },
      { metric: "Team", value: "RGCET-TECHNOCRATS" },
      { metric: "Problem ID", value: "PS #1717" },
      { metric: "Sync", value: "Firebase Real-time" }
    ],
    architecture: "Microphone Audio ➔ Google Cloud Speech-to-Text ➔ Live On-Screen Captions ➔ User Keyboard ➔ Google Cloud Text-to-Speech ➔ Voice Synthesis",
    techStack: ["Android Studio", "Java", "Google Cloud Speech APIs", "Firebase Realtime DB", "Cryptography"],
    github: "https://github.com/Devakumar-A/LinguaAssist",
    liveDemo: "https://github.com/Devakumar-A",
    featured: false
  },
  {
    id: "quantpulse",
    number: "06",
    title: "QuantPulse AI",
    subtitle: "Comparative Stock Market Prediction & Volatility System",
    category: "Financial Machine Learning",
    tagline: "LSTM Neural Networks vs. Linear Regression • Yahoo Finance Live Telemetry",
    image: asset("assets/projects/movie.png"),
    overview: "A quantitative financial analytics platform comparing classical regression against 60-day historical window LSTM recurrent neural networks to forecast equity trends.",
    problem: "Financial markets are nonlinear and chaotic. Beginners struggle to determine whether deep learning temporal models outperform lightweight statistical baselines.",
    solution: "Engineered an automated data pipeline fetching live Yahoo Finance records, running dual inference pipelines, and displaying trend trajectories (UP/DOWN) with confidence scoring on an interactive console.",
    results: [
      { metric: "Neural Architecture", value: "60-Day Window LSTM" },
      { metric: "Data Source", value: "yfinance Real-time" },
      { metric: "Backend", value: "Flask Microservice" },
      { metric: "Visualization", value: "Chart.js Dynamic" }
    ],
    architecture: "Yahoo Finance API ➔ MinMaxScaler Preprocessing ➔ LSTM & Linear Regression Inference ➔ Flask API ➔ Chart.js Dynamic Dashboard",
    techStack: ["Python", "Flask", "TensorFlow", "Keras", "LSTM", "yfinance", "Scikit-Learn", "Chart.js"],
    github: "https://github.com/Devakumar-A/stock_market_prediction",
    liveDemo: "https://github.com/Devakumar-A",
    featured: false
  },
  {
    id: "mathoria",
    number: "07",
    title: "Mathoria Digital Platform",
    subtitle: "Mathematics Club Digital Infrastructure & Visualization Lab",
    category: "Full-Stack Web & Community",
    tagline: "600+ Active Members • Real-Time Event Management & Visual Lab",
    image: asset("assets/projects/drone.png"),
    overview: "The official digital platform created for the Mathematics Club of Rajiv Gandhi College of Engineering and Technology to streamline membership, event registration, and mathematical simulations.",
    problem: "Managing 600+ student members across multiple engineering batches using paper records and spreadsheets caused event scheduling delays and lost participation records.",
    solution: "Designed and shipped a responsive web portal backed by Firebase that provides instantaneous digital membership onboarding, an interactive events timeline, and a mathematical theorem animation lab.",
    results: [
      { metric: "Members", value: "600+ Students" },
      { metric: "Operations", value: "100% Paperless" },
      { metric: "Role", value: "Club President & Developer" },
      { metric: "Storage", value: "Firebase Real-time" }
    ],
    architecture: "Web Frontend (HTML, CSS, JS) ➔ Firebase Realtime DB & Authentication ➔ Event Timeline Engine ➔ Interactive Mathematical Visualizer",
    techStack: ["HTML5", "CSS3", "JavaScript", "Firebase", "Responsive Design", "Interactive Labs"],
    github: "https://github.com/Devakumar-A/Mathoria-Mathematics-Club-Portal",
    liveDemo: "https://github.com/Devakumar-A",
    featured: false
  }
];

export const researchPublication = {
  title: "Deep Learning-Based EEG Communication Aid for Paralyzed Patients",
  authors: ["Dr. R. G. Suresh Kumar", "Devakumar A.", "Roney Varughese Joseph", "Sivasubramanian J."],
  journal: "International Journal of Drug Delivery Technology (IJDDT)",
  volume: "Vol 16, Issue 58s, 2026",
  doi: "10.25258/IJDDT.16.58S.21",
  doiUrl: "https://doi.org/10.25258/IJDDT.16.58S.21",
  indexing: "Scopus-Indexed",
  abstract: "Severe neuromuscular impairments such as Amyotrophic Lateral Sclerosis (ALS) and Locked-In Syndrome leave patients mentally alert yet unable to communicate vocally or physically. This paper presents an end-to-end multi-task Brain-Computer Interface framework leveraging an EEGNet-inspired spatial-temporal convolutional network. The system decodes continuous non-invasive EEG signals to simultaneously predict communication intent, categorize 4 emotional states, and classify pain severity into mild, moderate, or severe.",
  keyFindings: [
    { label: "Overall System Accuracy", value: "89.0%", detail: "Across all concurrent evaluation tasks" },
    { label: "Pain Severity Classification", value: "92.0%", detail: "Precision: 0.92, Recall: 0.91, F1: 0.91" },
    { label: "Emotion Recognition", value: "90.0%", detail: "Calm, Stress, Distress, Anxiety (SEED-IV)" },
    { label: "Communication Intent Detection", value: "86.0%", detail: "KARA One Imagined Speech & Intended Prompts" }
  ],
  pipelineSteps: [
    { step: "01", name: "Signal Acquisition", desc: "Non-invasive multi-channel electrode arrays capturing neural microvolts" },
    { step: "02", name: "Signal Preprocessing", desc: "Band-pass filtering (1–40 Hz), ocular/muscular artifact removal & temporal segmentation" },
    { step: "03", name: "Spatial-Temporal CNN", desc: "EEGNet-inspired convolutional blocks learning cross-channel spatial representations" },
    { step: "04", name: "Multi-Head Inference", desc: "Unified loss optimization simultaneously classifying intent, emotion, and pain" },
    { step: "05", name: "Caregiver Interface", desc: "Real-time dispatch of alerts, patient needs, and emotional indicators to clinical dashboards" }
  ],
  ongoingGazeResearch: {
    title: "Intent-Aware Gaze & Ocular Communication Systems",
    summary: "Extending non-invasive communication aids by pairing EEG dynamics with computer-vision eye gaze tracking to build ultra-low-latency accessibility interfaces for patients with residual ocular mobility."
  }
};

export const certificatesList = [
  {
    id: "oci-ds",
    title: "OCI Data Science Professional",
    issuer: "Oracle",
    category: "AI & Data Science",
    badge: "Professional Level",
    image: asset("assets/certificates/oci-data-science.jpg"),
    featured: true
  },
  {
    id: "oci-genai",
    title: "OCI Generative AI Professional",
    issuer: "Oracle",
    category: "AI & Data Science",
    badge: "GenAI Specialization",
    image: asset("assets/certificates/oci-genai.jpg"),
    featured: true
  },
  {
    id: "deep-learning",
    title: "Deep Learning",
    issuer: "IIT Ropar (NPTEL)",
    category: "AI & Data Science",
    badge: "Elite + Gold",
    image: asset("assets/certificates/deep-learning.jpg"),
    featured: true
  },
  {
    id: "python",
    title: "Python for Data Science",
    issuer: "NPTEL",
    category: "AI & Data Science",
    badge: "Silver + Elite",
    image: asset("assets/certificates/python.jpg"),
    featured: true
  },
  {
    id: "google-da",
    title: "Google Data Analytics",
    issuer: "Coursera & Google",
    category: "Data Analytics",
    badge: "Professional Certificate",
    image: asset("assets/certificates/google-da.jpg"),
    featured: true
  },
  {
    id: "data-analytics",
    title: "Data Analytics",
    issuer: "Novitech R&D",
    category: "Data Analytics",
    badge: "Industry Certified",
    image: asset("assets/certificates/data-analytics.jpg"),
    featured: false
  },
  {
    id: "sql",
    title: "SQL (PostgreSQL)",
    issuer: "IBM",
    category: "Programming",
    badge: "Database Mastery",
    image: asset("assets/certificates/sql.jpg"),
    featured: false
  },
  {
    id: "cpp",
    title: "C++ Programming",
    issuer: "IIT Bombay",
    category: "Programming",
    badge: "Systems Programming",
    image: asset("assets/certificates/cpp.jpg"),
    featured: false
  },
  {
    id: "career",
    title: "Career Essentials: Software Development",
    issuer: "Microsoft",
    category: "Programming",
    badge: "Professional Development",
    image: asset("assets/certificates/career.jpg"),
    featured: false
  },
  {
    id: "drupal",
    title: "Drupal CMS Architecture",
    issuer: "IIT Bombay",
    category: "Web Technologies",
    badge: "Web Infrastructure",
    image: asset("assets/certificates/drupal.jpg"),
    featured: false
  },
  {
    id: "frontend",
    title: "Front-End Development",
    issuer: "Simplilearn",
    category: "Web Technologies",
    badge: "UI Engineering",
    image: asset("assets/certificates/frontend.jpg"),
    featured: false
  },
  {
    id: "ethical-hacker",
    title: "Ethical Hacker: Cloud",
    issuer: "Infosys Springboard",
    category: "Cybersecurity & Cloud",
    badge: "Cloud Security",
    image: asset("assets/certificates/ethical-hacker.jpg"),
    featured: false
  }
];
