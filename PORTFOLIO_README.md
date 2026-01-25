# Developer Portfolio - Terminal Theme

A hardcore developer-themed portfolio website with terminal/CLI aesthetic, featuring interactive command execution, real-time project management, and a full admin panel.

## 🚀 Features

### Frontend
- **Interactive Terminal Interface**: Fully functional CLI with real command parsing
- **Cyberpunk Design**: Purple/pink neon color scheme with JetBrains Mono font
- **Responsive Layout**: Mobile-friendly design with smooth animations
- **Working Commands**: `whoami`, `help`, `about`, `skills`, `projects`, `experience`, `contact`, `clear`, `github`, `linkedin`
- **Real-time Project Search & Filtering**: Filter projects by tech stack
- **Contact Form**: Integrated contact form with terminal-style feedback

### Backend
- **FastAPI Backend**: High-performance async Python API
- **MongoDB Database**: NoSQL database for projects and contacts
- **JWT Authentication**: Secure admin authentication
- **RESTful API**: Well-structured API endpoints
- **CRUD Operations**: Full create, read, update, delete for projects

### Admin Panel
- **Secure Login**: JWT-based authentication (default: admin/admin123)
- **Project Management**: Add, edit, delete projects
- **Contact Management**: View, mark as read, archive, delete contact messages
- **Real-time Updates**: Changes reflect immediately on the portfolio

## 🛠️ Tech Stack

**Frontend:**
- React 19
- React Router v7
- Tailwind CSS
- shadcn/ui components
- Axios
- Lucide React icons

**Backend:**
- FastAPI
- MongoDB (Motor async driver)
- PyJWT
- Passlib (bcrypt)
- Python-Jose

## 📋 API Endpoints

### Public Endpoints
- `GET /api/` - API info
- `GET /api/health` - Health check
- `GET /api/projects` - Get all projects (with optional filters)
- `GET /api/projects/{id}` - Get single project
- `POST /api/contact` - Submit contact form

### Protected Endpoints (Admin)
- `POST /api/admin/login` - Admin login
- `POST /api/admin/logout` - Admin logout
- `GET /api/admin/contacts` - Get all contacts
- `POST /api/admin/projects` - Create project
- `PUT /api/admin/projects/{id}` - Update project
- `DELETE /api/admin/projects/{id}` - Delete project
- `PUT /api/admin/contacts/{id}` - Update contact status
- `DELETE /api/admin/contacts/{id}` - Delete contact

## 🚦 Getting Started

### Admin Access
- Navigate to `/admin` to access the admin panel
- Default credentials:
  - Username: `admin`
  - Password: `admin123`
  - **⚠️ Change these credentials in production!**

### Database
- MongoDB is already configured and seeded with 6 sample projects
- Connection string is in `/app/backend/.env`

### Services
All services are managed by supervisorctl:
```bash
sudo supervisorctl status
sudo supervisorctl restart all
sudo supervisorctl restart backend
sudo supervisorctl restart frontend
```

## 📁 Project Structure

```
/app
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TerminalHero.jsx
│   │   │   ├── AboutSection.jsx
│   │   │   ├── SkillsSection.jsx
│   │   │   ├── ProjectsSection.jsx
│   │   │   ├── ExperienceSection.jsx
│   │   │   ├── ContactSection.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── admin/
│   │   │       └── ProjectModal.jsx
│   │   ├── pages/
│   │   │   ├── AdminLogin.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── mock/
│   │   │   └── mockData.js (static data for Skills, Experience, About)
│   │   └── App.js
│   └── package.json
├── backend/
│   ├── server.py
│   ├── models.py
│   ├── auth.py
│   ├── routes/
│   │   ├── projects.py
│   │   ├── contact.py
│   │   └── admin.py
│   ├── seed_data.py
│   └── requirements.txt
└── contracts.md (API documentation)
```

## 🎨 Design Guidelines

- **Color Scheme**: Dark background with purple (#a855f7) and pink (#ec4899) accents
- **Typography**: JetBrains Mono monospace font throughout
- **Icons**: Lucide React (no emojis)
- **Components**: shadcn/ui for modern, accessible UI
- **No Gradients on Buttons**: Solid colors only for better accessibility

## 🔒 Security Notes

- JWT tokens expire after 7 days
- Passwords are hashed using bcrypt
- Admin endpoints require authentication
- CORS is enabled for all origins (configure for production)

## 📝 Customization

### Static Content (No Database)
Edit `/app/frontend/src/mock/mockData.js` for:
- Skills
- Experience timeline
- About/bio information

### Dynamic Content (Database)
Use the admin panel at `/admin` to manage:
- Projects (full CRUD)
- Contact messages

### Styling
- Main colors: `/app/frontend/src/index.css` (CSS variables)
- Component styles: Inline with Tailwind classes

## 🐛 Troubleshooting

**Backend not starting:**
```bash
tail -n 50 /var/log/supervisor/backend.err.log
```

**Frontend not loading:**
```bash
tail -n 50 /var/log/supervisor/frontend.err.log
```

**Database connection issues:**
```bash
# Check MongoDB URL in backend/.env
cat /app/backend/.env
```

## 📧 Contact Form

The contact form saves submissions to MongoDB but does NOT actually send emails (mocked for demo purposes). All submissions are viewable in the admin panel.

## 🎯 Future Enhancements

- Email integration (SendGrid, Mailgun)
- Blog/articles section
- Analytics dashboard
- Dark/light theme toggle
- Export portfolio as PDF
- Multi-language support

---

Built with ❤️ using modern web technologies and a hardcore developer aesthetic.
