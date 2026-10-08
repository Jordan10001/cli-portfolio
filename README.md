# Interactive Terminal Portfolio

A modern, high-performance developer portfolio built as an **Interactive Terminal / CLI Experience**, powered by **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS v4**.

---

## ⚡ Live Demo

- **Author:** Aaron Jordan (Data Science & Analytics Undergraduate, Petra Christian University)
- **Role:** Data Science & Analytics

---

## 🖥️ Key Features

### 1. Interactive Terminal Shell
- **Functional Command Interpreter**: Executes commands directly with formatted output and interactive UI widgets (`help`, `about`, `projects`, `skills`, `experience`, `awards`, `contact`, `cv`, `theme`, `clear`, etc.).
- **Keyboard Shortcuts**:
  - `Enter`: Execute command.
  - `↑` / `↓`: Cycle through command history.
  - `Ctrl + L`: Clear the terminal output buffer.
  - `Tab`: Auto-complete known commands.
  - `Esc`: Close open modal inspectors.
- **Blinking Cursor & Window Controls**: Authentic OS-style window frame with maximize toggle, close, and minimize actions.

### 2. Dual-Mode UX (CLI + Visual Explorer)
- You don't need to type commands to explore:
  - **Quick Command Chips**: One-click pills execute terminal commands instantly.
  - **Projects Explorer**: File-manager style project directory with live keyword search (`grep`) and category filters (All, Featured, AI & FinTech, Event Platforms, Full-Stack Web).
  - **Project Inspector Modal**: Detailed technical case studies featuring problem breakdown, system architecture, specific architectural builds, AI pipeline diagrams, and proof screenshots.
  - **Git-Log Timeline**: Career and organization leadership history visualized as an interactive commit tree graph (`git log --graph`).

### 3. Dynamic Theme System (Design Tokens)
- 4 pre-configured terminal color schemes:
  - **Matrix Green** (Default classic terminal / phosphor green)
  - **Cyber Purple** (Synthwave / cyberpunk neon lilac)
  - **Arctic Blue** (Oceanic / developer editor cyan-blue)
  - **Crimson Red** (Monokai / emergency terminal scarlet)
- **Hydration-Safe Persistence**: Saved in `localStorage` with zero flash of unstyled theme and zero React hydration mismatch.
- Can be switched via CLI (`$ theme purple`) or the interactive topbar `ThemeSwitcher`.

### 4. Performance & Motion Stack
- **Lenis Smooth Scrolling**: Seamless vertical scrolling with lifecycle cleanup and native fallback for reduced motion.
- **Tailwind CSS v4 & Monospace Typography**: Design tokens integrated directly with CSS variables and Geist Mono font.
- **Accessibility & Motion Standards**: Full keyboard navigability, semantic buttons/anchors, and full support for `@media (prefers-reduced-motion: reduce)`.

---

## 📂 Project Structure

```text
portfolio/
├── app/
│   ├── globals.css          
│   ├── layout.tsx          
│   └── page.tsx             
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx       
│   │   └── Footer.tsx       
│   ├── providers/
│   │   ├── ThemeProvider.tsx
│   │   └── SmoothScrollProvider.tsx 
│   ├── sections/
│   │   ├── ProjectsExplorer.tsx     
│   │   ├── ProjectDetailModal.tsx   
│   │   ├── SkillsMatrix.tsx         
│   │   ├── ExperienceTimeline.tsx   
│   │   ├── AwardsSection.tsx        
│   │   ├── TerminalHeroSection.tsx  
│   │   └── ContactSection.tsx       
│   ├── terminal/
│   │   ├── TerminalWindow.tsx       
│   │   ├── TerminalHeader.tsx       
│   │   ├── TerminalPrompt.tsx       
│   │   ├── TerminalOutput.tsx       
│   │   └── QuickCommands.tsx        
│   └── ui/
│       └── ThemeSwitcher.tsx        
├── data/
│   ├── projects.ts          
│   ├── capabilities.ts      
│   ├── experience.ts        
│   ├── awards.ts            
│   └── site.ts              
├── lib/
│   └── terminalEngine.tsx   
├── public/
│   ├── assets/              
│   └── images/              
├── types/
│   ├── index.ts             
│   └── terminal.ts          
├── package.json
├── tsconfig.json
└── next.config.ts
```

---

## ⌨️ Terminal Commands Reference

| Command | Arguments | Description |
| :--- | :--- | :--- |
| `help` / `?` | None | Displays all available commands with clickable quick-execution |
| `whoami` / `about` | None | Profile summary, headline, current status, and GPA |
| `projects` / `ls` | `[slug]` | List all projects or view specific project inline |
| `skills` / `stack` | None | Grouped capabilities (Product Engineering, AI & Data, etc.) |
| `experience` / `work` | None | Timeline of work experience and event IT coordination |
| `awards` | None | Hackathons, academic achievements, and band competitions |
| `services` / `fiverr` | None | Freelance offerings with starting prices and direct order links |
| `contact` | None | Interactive links to email, LinkedIn, GitHub, Upwork, Fiverr |
| `cv` / `resume` | None | Direct download link CV (PDF) |
| `theme` | `[green\|purple\|blue\|red]` | Switch terminal color scheme |
| `clear` | None | Clear terminal output buffer (`Ctrl + L`) |
| `matrix` | None | Display ASCII matrix banner |
| `date` / `echo` | `[text]` | System utility commands |

---

## 🚀 Getting Started

### Prerequisites
- Node.js `18.18+` or `20+` / `22+`
- npm, pnpm, or yarn

### Installation

1. Navigate to the project directory:
   ```bash
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔨 Available Scripts

| Script | Purpose |
| :--- | :--- |
| `npm run dev` | Starts local Next.js dev server with Turbopack |
| `npm run build` | Builds optimized production bundle with typecheck and lint |
| `npm run start` | Runs the production build server locally |
| `npm run lint` | Runs ESLint validation across all TypeScript and React files |

---

## 📝 Content Management

All data is decoupled from markup and stored in TypeScript structures in `data/`:

- **Projects**: Edit [`data/projects.ts`](file:///D:/CODING/Node/pp/portfolio/data/projects.ts) to add or edit case studies, features, screenshots, and AI architecture.
- **Capabilities**: Update [`data/capabilities.ts`](file:///D:/CODING/Node/pp/portfolio/data/capabilities.ts) to manage skill categories.
- **Experience**: Edit [`data/experience.ts`](file:///D:/CODING/Node/pp/portfolio/data/experience.ts) to add career milestones.
- **Site Info & Rates**: Update [`data/site.ts`](file:///D:/CODING/Node/pp/portfolio/data/site.ts) for social links, Fiverr gig prices, and headlines.

---

## 🌐 Deployment

This project is optimized for deployment on [Vercel](https://vercel.com):

```bash
# Verify build passes locally before pushing
npm run lint
npm run build
```

Link your Git repository to Vercel with the root set to `portfolio/` for automated CI/CD and custom domain management.

---
