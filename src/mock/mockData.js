import { FaReact, FaNode, FaJava,  FaAws, FaGithub } from 'react-icons/fa';
import { 
  SiNextdotjs, 
  SiTypescript, 
  SiTailwindcss, 
  SiRedux, 
  SiFastapi, 
  SiMongodb, 
  SiKubernetes, 
  SiGraphql 
} from 'react-icons/si';
import { VscAzureDevops } from "react-icons/vsc";
import { FaArrowsSpin, FaGear } from "react-icons/fa6";
import { TbPlugConnected } from "react-icons/tb";
import { TbTimelineEventExclamation } from "react-icons/tb";


export const projects = [
  {
    id: '1',
    name: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with real-time inventory management, payment processing, and admin dashboard.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redis'],
    features: [
      'Real-time inventory sync',
      'Stripe payment integration',
      'Admin dashboard with analytics',
      'Redis caching for performance',
      'JWT authentication'
    ],
    liveDemo: 'https://demo-ecommerce.example.com',
    githubRepo: 'https://github.com/username/ecommerce',
    status: 'production'
  },
  {
    id: '2',
    name: 'AI Chat Application',
    description: 'Real-time chat application with AI-powered message suggestions and sentiment analysis.',
    techStack: ['React', 'WebSocket', 'Python', 'TensorFlow', 'PostgreSQL'],
    features: [
      'WebSocket real-time messaging',
      'AI message suggestions',
      'Sentiment analysis',
      'End-to-end encryption',
      'Group chat support'
    ],
    liveDemo: 'https://ai-chat.example.com',
    githubRepo: 'https://github.com/username/ai-chat',
    status: 'production'
  },
  {
    id: '3',
    name: 'DevOps Dashboard',
    description: 'Kubernetes cluster monitoring dashboard with CI/CD pipeline visualization and log aggregation.',
    techStack: ['Vue.js', 'Go', 'Kubernetes', 'Prometheus', 'Grafana'],
    features: [
      'Real-time cluster metrics',
      'CI/CD pipeline tracking',
      'Log aggregation and search',
      'Alert management',
      'Custom dashboard builder'
    ],
    liveDemo: 'https://devops-dash.example.com',
    githubRepo: 'https://github.com/username/devops-dashboard',
    status: 'production'
  },
  {
    id: '4',
    name: 'Code Collaboration Tool',
    description: 'Real-time code collaboration platform with live cursors, syntax highlighting, and version control.',
    techStack: ['React', 'Node.js', 'Socket.io', 'Monaco Editor', 'Git'],
    features: [
      'Real-time collaborative editing',
      'Live cursor tracking',
      'Syntax highlighting for 50+ languages',
      'Built-in version control',
      'Voice/video chat integration'
    ],
    liveDemo: 'https://code-collab.example.com',
    githubRepo: 'https://github.com/username/code-collab',
    status: 'beta'
  },
  {
    id: '5',
    name: 'Performance Analytics Engine',
    description: 'High-performance analytics engine processing millions of events per second with custom query language.',
    techStack: ['Rust', 'TimescaleDB', 'React', 'GraphQL', 'Apache Kafka'],
    features: [
      'Custom query language (SQL-like)',
      'Real-time event processing',
      'Distributed architecture',
      'Sub-second query response',
      'Data visualization suite'
    ],
    liveDemo: 'https://analytics.example.com',
    githubRepo: 'https://github.com/username/analytics-engine',
    status: 'production'
  },
  {
    id: '6',
    name: 'Blockchain Explorer',
    description: 'Multi-chain blockchain explorer with transaction tracking, wallet analysis, and smart contract verification.',
    techStack: ['Next.js', 'Web3.js', 'Solidity', 'MongoDB', 'Redis'],
    features: [
      'Multi-chain support (ETH, BSC, Polygon)',
      'Smart contract verification',
      'Wallet transaction history',
      'Gas price predictions',
      'NFT gallery integration'
    ],
    liveDemo: 'https://explorer.example.com',
    githubRepo: 'https://github.com/username/blockchain-explorer',
    status: 'production'
  }
];

export const skills = {
  frontend: [
    { name: 'React', level: 95, version: '^19.0.0', icon: FaReact },
    { name: 'Next.js', level: 90, version: '^15.0.0', icon: SiNextdotjs },
    { name: 'TypeScript', level: 80, version: '^5.3.0', icon: SiTypescript },
    { name: 'Tailwind CSS', level: 95, version: '^3.4.0', icon: SiTailwindcss },
    { name: 'Redux/Zustand', level: 85, version: '^5.0.0', icon: SiRedux }
  ],
  backend: [
    { name: 'Node.js', level: 93, version: '^20.0.0', icon: FaNode },
    { name: 'Java SpringBoot', level: 88, version: '^3.12', icon: FaJava },
    { name: 'FastAPI', level: 90, version: '^0.110.0', icon: SiFastapi },
    { name: 'MongoDB', level: 92, version: '^7.0', icon: SiMongodb },
  ],
  tools: [
    { name: 'Azure', level: 90, version: '^24.0', icon: VscAzureDevops },
    { name: 'Kubernetes', level: 85, version: '^1.28', icon: SiKubernetes },
    { name: 'Git', level: 95, version: '^2.43', icon: FaGithub },
    { name: 'CI/CD', level: 88, version: 'Jenkins/GitHub Actions', icon: FaArrowsSpin },
    { name: 'AWS', level: 86, version: 'EC2/S3/Lambda', icon: FaAws },
  ],
  architecture: [
    { name: 'Microservices', level: 75, icon:FaGear },
    { name: 'RESTful APIs', level: 95, icon:TbPlugConnected },
    { name: 'GraphQL', level: 87, icon: SiGraphql },
    { name: 'Event-Driven', level: 85, icon:TbTimelineEventExclamation },
  ]
};

export const experience = [
  // {
  //   id: '1',
  //   commit: 'a3f8b2c',
  //   date: '2023-01 - Present',
  //   role: 'Senior Frontend Engineer',
  //   company: 'TechCorp Inc.',
  //   description: 'Leading frontend architecture and performance optimization initiatives. Built design system adopted across 5 product teams.',
  //   achievements: [
  //     'Reduced bundle size by 60% through code splitting',
  //     'Implemented micro-frontend architecture',
  //     'Mentored 6 junior developers',
  //     'Led migration from Vue 2 to React 18'
  //   ]
  // },
  {
    id: '1',
    commit: 'b7d4e9a',
    date: '2022-12 - Present',
    role: 'Full Stack Developer',
    company: 'Deloitte USI',
    description: 'Worked on scalable projects. Focused on performance, accesibility, reuseability , and user experience.',
    achievements: [
      'Designed and implemented microservices architecture with React-based UI components',
      'Enhanced database performance by 48% through strategic query optimization',
      'Developed WCAG 2.1 AA compliant components ensuring accessibility standards',
      'Elevated overall user interface and experience design patterns',
      'Built and maintained a component library powering 2800+ application screens',
    ]
  },
  {
    id: '2',
    commit: 'c1a5f7e',
    date: '2022-09 - 2022-12',
    role: 'Frontend Developer',
    company: 'FreeLancer.',
    description: 'Developed responsive web applications and e-commerce platforms for diverse clients.',
    achievements: [
      'Successfully delivered 5+ production-ready client projects on schedule',
      'Achieved Lighthouse performance scores of 95+ through optimization techniques',
      'Engineered a scalable, reusable component library for rapid development',
      'Integrated multiple payment gateways including Stripe, PayPal, and RazorPay'
    ]
  },
  {
    id: '3',
    commit: 'd9e2c4b',
    date: '2021-09 - 2021-10',
    role: 'Intern',
    company: 'SkillVertex',
    description: 'Started career building websites and learning modern web technologies.',
    achievements: [
      'Developed core Java applications and business logic implementations',
      'Created custom algorithms to address specific use case requirements',
      'Collaborated effectively with design teams and business analysts',
      'Adopted Git version control and Agile development methodologies'
    ]
  }
];

export const aboutData = {
  name: 'Devashish Surve',
  role: 'Engineer | Software Developer',
  location: 'Hyderabad, TN',
  email: 'devashishsurve.official@gmail.com',
  mindset: 'efficiency, performance, scalability',
  currentFocus: ['DSA','Web Development' ,'Developer Experience', 'System Design'],
  yearsOfExperience: 3,
  projectsCompleted: 5,
  coffeeConsumed: '∞',
  favoriteEditor: 'VS Code',
  resumeUrl: 'https://drive.google.com/file/d/1UqOngV49VOXqOYu-_LDhdUkDGVbLcS5a/view?usp=sharing'
};