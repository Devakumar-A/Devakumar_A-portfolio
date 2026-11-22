# Devakumar A — Personal Portfolio & Production Systems Showcase

<div align="center">

[![Live Portfolio](https://img.shields.io/badge/Live_Portfolio-000000?style=for-the-badge&logo=googlechrome&logoColor=22d3ee)](https://devakumar-a.github.io/Devakumar/)
[![React 19](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite_8-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Scopus Published](https://img.shields.io/badge/Scopus-Published_Researcher-FF6C37?style=for-the-badge&logo=elsevier&logoColor=white)](https://doi.org/10.25258/ijddt.16.58s.21)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

<br/>

**A tactile, hardware-inspired developer portfolio and interactive showcase featuring an 18-device physical synthesizer deck, peer-reviewed deep learning BCI research, and GPU-optimized 3D spatial experiences.**

[🌐 Explore Live Site](https://devakumar-a.github.io/Devakumar/) · [📄 Read Research Paper](https://doi.org/10.25258/ijddt.16.58s.21) · [💬 Get in Touch](mailto:devak9391@gmail.com)

<br/>

<img src="./public/og-image.jpg" alt="Devakumar A Portfolio — 18 Interactive Hardware Synthesizer Project Devices" width="100%" style="border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);" />

</div>

---

## ⚡ Highlights & Architecture

### 🎛️ 1. Interactive 18-Device Hardware Deck (DK-01 .. DK-18)
Instead of standard cards, projects are rendered as **physical hardware synthesizer devices** inspired by classic engineering instruments:
* **Interactive 1-Bit LCD Screens**: 18 SVG-animated 1-bit displays with distinct system architectures (neural nets, computer vision feeds, finance trees, IoT dashboards).
* **3-Page Screen Control**: Soft keys and rotary knobs switch each device between **View**, **Specs**, and **Stack**.
* **Tactile Physics**: Swipe/drag physics with fly-out reordering to the back of the deck and depth z-indexing.
* **Performance Selective Mounting**: Animated LCD screens mount only for visible depth (`depth <= 2`), while cards deeper in the stack remain static with paused CSS animations (`data-paused="true"`).
* **Compact Controls**: High-contrast `01 / 18` counter with a dynamic progress rail tailored for 360px mobile viewports.

### 🔬 2. Peer-Reviewed Deep Learning Research
* **Publication**: *"Deep Learning-Based EEG Communication Aid for Paralyzed Patients"* in the *International Journal of Drug Delivery Technology* (Vol 16, Issue 58s, pp. 235–241).
* **DOI**: [10.25258/ijddt.16.58s.21](https://doi.org/10.25258/ijddt.16.58s.21) — Scopus-indexed.
* **Scroll Transitions**: Symmetrical bidirectional physics (`stiffness: 260, damping: 30`) that smoothly glide in and out whether scrolling up or down, paired with ambient tracking backlights.

### 🌌 3. Interactive 3D Spatial Timeline & Credentials Ring
* **Time-Travel Flight Experience**: A spatial Three.js / Canvas timeline with time-dilation starfield navigation (`public/experience.html`).
* **3D Cylinder Credentials Ring**: Cylinder carousel with 17 verified technical certifications, procedural starfield warp, and haptic feedback.

### 🔋 4. Low-Power Mobile & Battery-Saver Engine
* **Capability Probing**: Auto-detects low-power mobile devices via `hardwareConcurrency <= 4`, `deviceMemory <= 4GB`, `saveData`, battery level `< 20%`, and degraded software WebGL renderers.
* **Canvas Lazy-Loading**: `IntersectionObserver` halts render loops and `requestAnimationFrame` ticks when sections are out of view, reaching 0% idle CPU and conserving mobile battery life.
* **Static Fallbacks**: Smoothly degrades complex particle simulations into GPU-accelerated gradient typography on constrained hardware.

---

## 🛠️ Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Frontend Framework** | React 19, Vite 8, JavaScript (ESNext) |
| **Animation & Physics** | Framer Motion, GSAP, CSS 3D Transforms, Canvas API, Three.js |
| **Styling & Design** | Modern CSS Variables, Tailwind CSS, Glassmorphism, Bricolage Grotesque, Manrope, Share Tech Mono |
| **AI / ML & Research** | Python, PyTorch, TensorFlow, Keras, EEGNet, MNE, Scikit-learn, OpenCV, BERT, Sentence Transformers |
| **Backend & Cloud** | FastAPI, Flask, PostgreSQL, Supabase, Firebase, Node.js |
| **Tooling & Build** | Vite, PostCSS, ESLint, Git, GitHub Pages, EmailJS |

---

## 📂 Project Catalog Overview

| Model | Project | Category | Key Metric / Highlight |
| :---: | :--- | :--- | :--- |
| **DK-01** | **EEG Communication Aid** | Research · Published | **89% Accuracy** across 3 BCI tasks |
| **DK-02** | **AquaCommandAI** | Full-Stack · AI Platform | **4 ML Models** served through FastAPI |
| **DK-03** | **MovieVerse AI** | Multi-Modal AI | **BERT + ResNet50** multi-modal fusion |
| **DK-04** | **NeuroSense AI** | Healthcare AI · BCI | **105 EEG features** classified via ResNet-MLP |
| **DK-05** | **HRMA-MudraVision** | Computer Vision | **70-D Feature Vector** (Hu moments + 63 MediaPipe landmarks) |
| **DK-06** | **ArcSentinel** | Computer Vision · Security | **512-D Face Embeddings** with ONNX YOLO pipeline |
| **DK-07** | **FinBot** | Multi-Agent AI · FinTech | **5 Cooperating Agents** (Master + 4 specialists) |
| **DK-08** | **I-Gaze** | Accessibility · On-Device ML | **33-Point Calibration** running fully on-device |
| **DK-09** | **Resume Relevance Check** | NLP · Recruitment | **384-D Embeddings** via all-MiniLM-L6-v2 |
| **DK-10** | **QuantPulse AI** | Time-Series · Forecasting | **Linear Regression vs. LSTM** comparative engine |
| **DK-11** | **SENTINEL** | Humanitarian · Hackathon | **3 Role Portals** with volunteer 3D routing |
| **DK-12** | **Starlight Hotels** | Full-Stack · Booking | **17+ Properties** with direct booking engine |
| **DK-13** | **Mathoria** | Web · Club Platform | **600+ Members** with math visualization lab |
| **DK-14** | **Nagish India** | Android · Accessibility | **Smart India Hackathon 2024** finalist |
| **DK-15** | **Kadal Vizhi** | Web · Hackathon | **3 Safety Tiers** with sea-weather advisories |
| **DK-16** | **EcoSmart** | IoT · AI · Sprintfest'25 | **Retrofit Smart Lid** for automated waste segregation |
| **DK-17** | **Rental & Housing Price** | ML · Streamlit | **545 Housing Records** modeled via Random Forest |
| **DK-18** | **NSG C4ISR Console** | Dashboard · Simulation | **6 Regional Hubs** with tactical video feeds |

---

## 🚀 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
* `npm` or `pnpm`

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Devakumar-A/Devakumar_A-portfolio.git
   cd Devakumar_A-portfolio/portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173/Devakumar/](http://localhost:5173/Devakumar/) in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```
   The production-ready assets will be generated in the `dist/` directory.

---

## 📁 Repository Structure

```
portfolio/
├── public/                     # Static assets, fonts, icons & 3D sub-apps
│   ├── assets/                 # Profile images, logos, and project media
│   ├── experience.html         # Standalone 3D flight experience timeline
│   ├── og-image.jpg            # 1200x630 OpenGraph social preview card
│   └── favicon.svg             # Vector site identity
├── src/
│   ├── components/
│   │   ├── Projects/           # 18-card tactile hardware deck & 1-bit screens
│   │   │   ├── Projects.jsx    # Deck controller, swipe physics & progress rail
│   │   │   ├── Projects.css    # Hardware styling, colourways & device frames
│   │   │   └── Screens.jsx     # 18 procedural 1-bit SVG vector screens
│   │   ├── Certificates/       # 3D credentials cylinder orbit
│   │   ├── skills/             # Dual-ribbon cinematic skills marquee
│   │   ├── AboutSection.jsx    # Gyroscopic composition & editorial bio
│   │   ├── ResearchSection.jsx # Scopus paper with bidirectional scroll physics
│   │   ├── ContactSection.jsx  # Kinetic typography & direct communication CTA
│   │   └── HeroSection.jsx     # Master hero entry & particle matrix
│   ├── data/
│   │   ├── projects.js         # Curated 18-project dataset (DK-01..DK-18)
│   │   └── credentials.js      # Certifications & licenses data
│   ├── utils/
│   │   └── performance.js      # Low-power GPU & battery-saver fallback engine
│   ├── App.jsx                 # Root application controller
│   └── main.jsx                # React DOM mount point
├── index.html                  # SEO, OpenGraph, JSON-LD Schema & meta tags
└── vite.config.js              # Vite bundler configuration
```

---

## 📬 Contact & Connect

* **Developer & Researcher**: Devakumar A
* **Email**: [devak9391@gmail.com](mailto:devak9391@gmail.com)
* **LinkedIn**: [linkedin.com/in/devakumar-a](https://www.linkedin.com/in/devakumar-a)
* **GitHub**: [@Devakumar-A](https://github.com/Devakumar-A)
* **ORCID**: [0009-0004-9721-6512](https://orcid.org/0009-0004-9721-6512)

---

<div align="center">
  <sub>Designed and engineered by Devakumar A. Open sourced under the <a href="LICENSE">MIT License</a>.</sub>
</div>
