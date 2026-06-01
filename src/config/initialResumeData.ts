import { DEFAULT_FIELD_ORDER } from "./constants";
import { GlobalSettings, DEFAULT_CONFIG, ResumeData } from "../types/resume";
const initialGlobalSettings: GlobalSettings = {
  baseFontSize: 16,
  pagePadding: 32,
  paragraphSpacing: 12,
  lineHeight: 1.5,
  sectionSpacing: 10,
  headerSize: 18,
  subheaderSize: 16,
  useIconMode: true,
  themeColor: "#000000",
  centerSubtitle: true,
};

export const initialResumeState = {
  title: "New Resume",
  basic: {
    name: "Jane Smith",
    title: "Senior Frontend Engineer",
    employementStatus: "Available",
    email: "jane.smith@example.com",
    phone: "555-123-4567",
    location: "San Francisco, CA",
    birthDate: "2025-01",
    fieldOrder: DEFAULT_FIELD_ORDER,
    icons: {
      email: "Mail",
      phone: "Phone",
      birthDate: "CalendarRange",
      employementStatus: "Briefcase",
      location: "MapPin",
    },
    photoConfig: DEFAULT_CONFIG,
    customFields: [
      {
        id: "personal",
        label: "Personal Website",
        value: "https://janesmith.dev",
        icon: "Globe",
      },
    ],
    photo: "/avatar.png",
    githubKey: "",
    githubUseName: "",
    githubContributionsVisible: false,
  },
  education: [
    {
      id: "1",
      school: "Stanford University",
      major: "Computer Science",
      degree: "",
      startDate: "2013-09",
      endDate: "2017-06",
      visible: true,
      gpa: "",
      description: `<ul>
        <li>Core courses: Data Structures, Algorithms, Operating Systems, Computer Networks, Web Development</li>
        <li>Top 5% of class, received Dean's List honors for three consecutive years</li>
        <li>Served as Technical Director of the Computer Science Association, organized multiple tech workshops</li>
        <li>Contributed to open-source projects, earned GitHub Campus Expert certification</li>
      </ul>`,
    },
  ],
  skillContent: `<div class="skill-content">
  <ul>
    <li>Frontend Frameworks: React, Vue.js, Next.js, Nuxt.js and other SSR frameworks</li>
    <li>Languages: TypeScript, JavaScript (ES6+), HTML5, CSS3</li>
    <li>UI/Styling: TailwindCSS, Sass/Less, CSS Modules, Styled-components</li>
    <li>State Management: Redux, Vuex, Zustand, Jotai, React Query</li>
    <li>Build Tools: Webpack, Vite, Rollup, Babel, ESLint</li>
    <li>Testing: Jest, React Testing Library, Cypress</li>
    <li>Performance: Browser rendering principles, performance metrics monitoring, code splitting, lazy loading</li>
    <li>Version Control: Git, SVN</li>
    <li>Technical Leadership: Team management experience, led technology selection and architecture design for large projects</li>
  </ul>
</div>`,
  selfEvaluationContent: "",
  experience: [
    {
      id: "1",
      company: "Acme Corp",
      position: "Senior Frontend Engineer",
      date: "2021.07 - 2024.12",
      visible: true,
      details: `<ul>
      <li>Led development and maintenance of the Creator Platform, driving technical solution design for core features</li>
      <li>Optimized build configuration, reducing build time from 8 minutes to 2 minutes, improving team development efficiency</li>
      <li>Designed and implemented a component library, increasing code reuse by 70% and significantly reducing development time</li>
      <li>Led performance optimization initiative, reducing first-screen load time by 50% and integrating APM monitoring</li>
      <li>Mentored junior engineers and organized technical sharing sessions to raise overall team capabilities</li>
    </ul>`,
    },
  ],
  draggingProjectId: null,
  projects: [
    {
      id: "p1",
      name: "Creator Analytics Platform",
      role: "Frontend Lead",
      date: "2022.06 - 2023.12",
      description: `<ul>
        <li>React-based analytics and content management platform serving millions of creators</li>
        <li>Includes data analytics, content management, and revenue management subsystems</li>
        <li>Implemented Redux for state management, enabling efficient handling of complex data flows</li>
        <li>Used Ant Design component library to ensure UI consistency and user experience</li>
        <li>Implemented code splitting and lazy loading strategies to optimize loading performance</li>
      </ul>`,
      visible: true,
    },
    {
      id: "p2",
      name: "Mini Program Developer Tools",
      role: "Core Developer",
      date: "2020.03 - 2021.06",
      description: `<ul>
        <li>All-in-one solution for mini program development, debugging, and publishing</li>
        <li>Cross-platform desktop application built with Electron</li>
        <li>Supports multiple platforms including Windows, macOS, and Linux</li>
        <li>Provides real-time error logging and performance analysis tools</li>
        <li>Integrates third-party plugins and SDKs for custom developer functionality</li>
      </ul>`,
      visible: true,
    },
    {
      id: "p3",
      name: "Frontend Monitoring Platform",
      role: "Technical Lead",
      date: "2021.09 - 2022.03",
      description: `<ul>
        <li>Complete frontend monitoring solution including error tracking, performance monitoring, and user behavior analysis</li>
        <li>Built with Vue and Element UI, providing real-time monitoring data and visualization tools</li>
        <li>Supports various metrics including error logs, performance indicators, and user behavior analysis</li>
        <li>Provides detailed error logs and performance analysis tools to help developers identify and resolve issues</li>
        <li>Integrates third-party plugins and SDKs for custom functionality</li>
      </ul>`,
      visible: true,
    },
  ],
  menuSections: [
    { id: "basic", title: "Profile", icon: "👤", enabled: true, order: 0 },
    { id: "skills", title: "Skills", icon: "⚡", enabled: true, order: 1 },
    {
      id: "experience",
      title: "Experience",
      icon: "💼",
      enabled: true,
      order: 2,
    },
    {
      id: "projects",
      title: "Projects",
      icon: "🚀",
      enabled: true,
      order: 3,
    },
    {
      id: "education",
      title: "Education",
      icon: "🎓",
      enabled: true,
      order: 4,
    },
  ],
  certificates: [],
  customData: {},
  activeSection: "basic",
  globalSettings: initialGlobalSettings,
};

export const initialResumeStateEn = {
  title: "New Resume",
  basic: {
    name: "Dva",
    title: "Senior Frontend Engineer",
    employementStatus: "Available",
    email: "john.smith@123.com",
    phone: "555-123-4567",
    location: "San Francisco, CA",
    birthDate: "",
    fieldOrder: DEFAULT_FIELD_ORDER,
    icons: {
      email: "Mail",
      phone: "Phone",
      birthDate: "CalendarRange",
      employementStatus: "Briefcase",
      location: "MapPin",
    },
    photoConfig: DEFAULT_CONFIG,
    customFields: [],
    photo: "/avatar.png",
    githubKey: "",
    githubUseName: "",
    githubContributionsVisible: false,
  },
  education: [
    {
      id: "1",
      school: "Stanford University",
      major: "Computer Science",
      degree: "",
      startDate: "2013-09",
      endDate: "2017-06",
      visible: true,
      gpa: "",
      description: `<ul>
        <li>Core courses: Data Structures, Algorithms, Operating Systems, Computer Networks, Web Development</li>
        <li>Top 5% of class, received Dean's List honors for three consecutive years</li>
        <li>Served as Technical Director of the Computer Science Association, organized multiple tech workshops</li>
        <li>Contributed to open-source projects, earned GitHub Campus Expert certification</li>
      </ul>`,
    },
  ],
  skillContent: `<div class="skill-content">
  <ul>
    <li>Frontend Frameworks: React, Vue.js, Next.js, Nuxt.js and other SSR frameworks</li>
    <li>Languages: TypeScript, JavaScript(ES6+), HTML5, CSS3</li>
    <li>UI/Styling: TailwindCSS, Sass/Less, CSS Modules, Styled-components</li>
    <li>State Management: Redux, Vuex, Zustand, Jotai, React Query</li>
    <li>Build Tools: Webpack, Vite, Rollup, Babel, ESLint</li>
    <li>Testing: Jest, React Testing Library, Cypress</li>
    <li>Performance: Browser rendering principles, performance metrics monitoring, code splitting, lazy loading</li>
    <li>Version Control: Git, SVN</li>
    <li>Technical Leadership: Team management experience, led technology selection and architecture design for large projects</li>
  </ul>
</div>`,
  selfEvaluationContent: "",
  experience: [
    {
      id: "1",
      company: "ByteDance",
      position: "Senior Frontend Engineer",
      date: "2021.07 - 2024.12",
      visible: true,
      details: `<ul>
      <li>Responsible for development and maintenance of TikTok Creator Platform, leading technical solution design for core features</li>
      <li>Optimized build configuration, reducing build time from 8 minutes to 2 minutes, improving team development efficiency</li>
      <li>Designed and implemented component library, increasing code reuse by 70%, significantly reducing development time</li>
      <li>Led performance optimization project, reducing platform first-screen loading time by 50%, integrated APM monitoring system</li>
      <li>Mentored junior engineers, organized technical sharing sessions to improve overall team technical capabilities</li>
    </ul>`,
    },
  ],
  draggingProjectId: null,
  projects: [
    {
      id: "p1",
      name: "TikTok Creator Platform",
      role: "Frontend Lead",
      date: "2022.06 - 2023.12",
      description: `<ul>
        <li>React-based analytics and content management platform serving millions of creators</li>
        <li>Includes data analytics, content management, and revenue management subsystems</li>
        <li>Implemented Redux for state management, enabling efficient handling of complex data flows</li>
        <li>Used Ant Design component library to ensure UI consistency and user experience</li>
        <li>Implemented code splitting and lazy loading strategies to optimize loading performance</li>
      </ul>`,
      visible: true,
    },
    {
      id: "p2",
      name: "WeChat Mini Program Developer Tools",
      role: "Core Developer",
      date: "2020.03 - 2021.06",
      description: `<ul>
        <li>All-in-one solution for mini program development, debugging, and publishing</li>
        <li>Cross-platform desktop application built with Electron</li>
        <li>Supports multiple platforms including Windows, macOS, and Linux</li>
        <li>Provides real-time error logging and performance analysis tools</li>
        <li>Integrates third-party plugins and SDKs for custom functionality</li>
      </ul>`,
      visible: true,
    },
    {
      id: "p3",
      name: "Frontend Monitoring Platform",
      role: "Technical Lead",
      date: "2021.09 - 2022.05",
      description: `<ul>
        <li>Complete frontend monitoring solution including error tracking, performance monitoring, and user behavior analysis</li>
        <li>Built with Vue and Element UI, providing real-time monitoring data and visualization tools</li>
        <li>Supports various monitoring metrics including error logs, performance indicators, and user behavior analysis</li>
        <li>Provides detailed error logs and performance analysis tools to help developers identify and optimize issues</li>
        <li>Integrates third-party plugins and SDKs for custom functionality</li>
      </ul>`,
      visible: true,
    },
  ],
  menuSections: [
    {
      id: "basic",
      title: "Profile",
      icon: "👤",
      enabled: true,
      order: 0,
    },
    {
      id: "skills",
      title: "Skills",
      icon: "⚡",
      enabled: true,
      order: 1,
    },
    {
      id: "experience",
      title: "Experience",
      icon: "💼",
      enabled: true,
      order: 2,
    },
    {
      id: "projects",
      title: "Projects",
      icon: "🚀",
      enabled: true,
      order: 3,
    },
    {
      id: "education",
      title: "Education",
      icon: "🎓",
      enabled: true,
      order: 4,
    },
  ],
  certificates: [],
  customData: {},
  activeSection: "basic",
  globalSettings: initialGlobalSettings,
};

export const blankResumeState = {
  ...initialResumeState,
  title: "New Resume",
  basic: {
    ...initialResumeState.basic,
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    birthDate: "",
    employementStatus: "",
    photo: "",
    customFields: [],
  },
  education: [],
  skillContent: "",
  selfEvaluationContent: "",
  experience: [],
  projects: [],
  certificates: [],
  menuSections: [initialResumeState.menuSections[0]],
};

export const blankResumeStateEn = {
  ...initialResumeStateEn,
  title: "New Resume",
  basic: {
    ...initialResumeStateEn.basic,
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    birthDate: "",
    employementStatus: "",
    photo: "",
    customFields: [],
  },
  education: [],
  skillContent: "",
  selfEvaluationContent: "",
  experience: [],
  projects: [],
  certificates: [],
  menuSections: [initialResumeStateEn.menuSections[0]],
};
