// Mock data for developer portfolio

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
    { name: 'React', level: 95, version: '^19.0.0' },
    { name: 'Next.js', level: 90, version: '^15.0.0' },
    { name: 'TypeScript', level: 92, version: '^5.3.0' },
    { name: 'Tailwind CSS', level: 95, version: '^3.4.0' },
    { name: 'Vue.js', level: 85, version: '^3.4.0' },
    { name: 'Redux/Zustand', level: 88, version: '^5.0.0' }
  ],
  backend: [
    { name: 'Node.js', level: 93, version: '^20.0.0' },
    { name: 'Python', level: 88, version: '^3.12' },
    { name: 'FastAPI', level: 90, version: '^0.110.0' },
    { name: 'PostgreSQL', level: 87, version: '^16.0' },
    { name: 'MongoDB', level: 92, version: '^7.0' },
    { name: 'Redis', level: 85, version: '^7.2' }
  ],
  tools: [
    { name: 'Docker', level: 90, version: '^24.0' },
    { name: 'Kubernetes', level: 85, version: '^1.28' },
    { name: 'Git', level: 95, version: '^2.43' },
    { name: 'CI/CD', level: 88, version: 'Jenkins/GitHub Actions' },
    { name: 'AWS', level: 86, version: 'EC2/S3/Lambda' },
    { name: 'Nginx', level: 87, version: '^1.25' }
  ],
  architecture: [
    { name: 'Microservices', level: 89 },
    { name: 'RESTful APIs', level: 95 },
    { name: 'GraphQL', level: 87 },
    { name: 'WebSockets', level: 90 },
    { name: 'Event-Driven', level: 85 },
    { name: 'SOLID Principles', level: 92 }
  ]
};

export const experience = [
  {
    id: '1',
    commit: 'a3f8b2c',
    date: '2023-01 - Present',
    role: 'Senior Frontend Engineer',
    company: 'TechCorp Inc.',
    description: 'Leading frontend architecture and performance optimization initiatives. Built design system adopted across 5 product teams.',
    achievements: [
      'Reduced bundle size by 60% through code splitting',
      'Implemented micro-frontend architecture',
      'Mentored 6 junior developers',
      'Led migration from Vue 2 to React 18'
    ]
  },
  {
    id: '2',
    commit: 'b7d4e9a',
    date: '2021-06 - 2022-12',
    role: 'Full Stack Developer',
    company: 'StartupX',
    description: 'Built scalable web applications from scratch. Focused on performance, security, and user experience.',
    achievements: [
      'Architected real-time collaboration features',
      'Optimized database queries (50% faster)',
      'Implemented CI/CD pipeline',
      'Built RESTful and GraphQL APIs'
    ]
  },
  {
    id: '3',
    commit: 'c1a5f7e',
    date: '2019-03 - 2021-05',
    role: 'Frontend Developer',
    company: 'Digital Agency Co.',
    description: 'Developed responsive web applications and e-commerce platforms for diverse clients.',
    achievements: [
      'Delivered 20+ client projects',
      'Improved Lighthouse scores to 95+',
      'Created reusable component library',
      'Integrated payment gateways (Stripe, PayPal)'
    ]
  },
  {
    id: '4',
    commit: 'd9e2c4b',
    date: '2017-08 - 2019-02',
    role: 'Junior Developer',
    company: 'WebDev Studio',
    description: 'Started career building websites and learning modern web technologies.',
    achievements: [
      'Mastered JavaScript ES6+',
      'Built responsive UI components',
      'Collaborated with design team',
      'Learned Git workflow and Agile'
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
};