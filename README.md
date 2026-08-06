# Developer Portfolio - Terminal Theme 🚀

A modern, professional portfolio website with a terminal-inspired design. A static single-page React app — no backend required.

## ✨ Features

- 🎨 Terminal-themed UI with Matrix-style animations
- 📱 Fully responsive design
- 📊 Project showcase with search & tech-stack filtering
- 📧 Contact section (opens a pre-filled email via `mailto:`)
- ⚡ Fast and modern tech stack

## 🛠️ Tech Stack

- React 19 + Vite
- Tailwind CSS
- shadcn/ui components

## 🚀 Quick Start

### Prerequisites

- Node.js 18+

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd devashish
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the dev server**

   ```bash
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173

## 📦 Deployment

This is a static site — build it and deploy the `dist/` folder to any static host (Netlify, Vercel, GitHub Pages, Render static site, etc.).

```bash
npm run build
npm run preview   # preview the production build locally
```

## 📁 Project Structure

```
├── src/
│   ├── components/        # React components
│   ├── config/            # Contact info config
│   ├── mock/               # Static content (projects, skills, experience)
│   └── main.jsx            # React entry point
└── package.json             # Dependencies
```

## 🐛 Troubleshooting

**Build fails?**

- Clear cache: `rm -rf node_modules dist && npm install`
- Rebuild: `npm run build`

## 🤝 Contributing

Feel free to fork and customize for your own portfolio!

## 📄 License

MIT License - feel free to use for your own portfolio

## 🙏 Acknowledgments

- Built with React
- UI components from shadcn/ui
- Icons from Lucide React
