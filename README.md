# 🚀 Chaitanya Sharma - Portfolio

A modern, feature-rich developer portfolio with integrated community management system. Built with React + Vite frontend and Spring Boot backend.

🌐 **Live Demo:** [41chaitanya.github.io/MyPortfolio](https://41chaitanya.github.io/MyPortfolio/)

---

## ✨ Features

### 🎨 Frontend Features
- **Animated Loading Screen** - GTA-style intro with theme music
- **Custom Cursor** - Interactive cursor effects
- **Flower Menu** - Unique radial navigation menu
- **Music Player** - Background music with multiple tracks (BGMI, GTA, RDR2, The Boys themes)
- **Smooth Animations** - Powered by GSAP and Framer Motion
- **Responsive Design** - Mobile-optimized with touch-friendly UI
- **Dark Theme** - Sleek dark mode aesthetic

### 📄 Pages
| Page | Description |
|------|-------------|
| **Home** | Hero section with intro and community link |
| **About** | Personal info, skills, and background |
| **Achievements** | Hackathons and competitions with detail modals |
| **Projects** | Project showcase with tech stack and live demos |
| **Contact** | Contact form powered by EmailJS |
| **Community** | Developer communities hub |
| **Community Detail** | Full community management with admin panel |

### 👥 Community System
- **Multiple Communities** - Support for multiple dev communities
- **Member Management** - Join requests, approvals, member profiles
- **Admin Panel** - Full CRUD for members (view/edit all details)
- **Role System** - Owner, Admin, Member roles
- **OTP Authentication** - Email-based login with OTP
- **GitHub Integration** - Auto-invite to GitHub org on approval
- **Welcome Emails** - Automated emails on member approval
- **Club Guidelines** - Rules and problem statements modals
- **Skeleton Loading** - Smooth loading states

### 🔧 Backend Features (Spring Boot)
- **RESTful API** - Clean API architecture
- **MongoDB** - NoSQL database for flexible data
- **JWT Authentication** - Secure token-based auth
- **Email Service** - Gmail SMTP integration
- **GitHub API** - Automatic org invitations
- **CORS Configuration** - Secure cross-origin setup

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 19 | UI Framework |
| Vite 7 | Build Tool |
| React Router 7 | Routing |
| Tailwind CSS 4 | Styling |
| GSAP | Animations |
| Framer Motion | Animations |
| React Icons | Icons |
| EmailJS | Contact Form |

### Backend
| Technology | Purpose |
|------------|---------|
| Java 17 | Language |
| Spring Boot 3 | Framework |
| Spring Data MongoDB | Database |
| Spring Mail | Email Service |
| Lombok | Boilerplate Reduction |
| JWT | Authentication |

### Deployment
| Service | Purpose |
|---------|---------|
| GitHub Pages | Frontend Hosting |
| Koyeb | Backend Hosting |
| MongoDB Atlas | Database |
| Cloudinary | Image CDN |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Java 17+
- MongoDB (local or Atlas)
- Maven

### Frontend Setup
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

### Backend Setup
```bash
cd backend

# Set environment variables (see .env.example)
cp .env.example .env

# Run with Maven
./mvnw spring-boot:run
```

### Environment Variables

**Frontend (.env.local)**
```env
VITE_API_URL=http://localhost:8080
```

**Backend (.env)**
```env
SPRING_DATA_MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your-secret-key
SPRING_MAIL_USERNAME=your-email@gmail.com
SPRING_MAIL_PASSWORD=your-app-password
GITHUB_TOKEN=your-github-token
CORS_ORIGINS=http://localhost:5173
```

---

## 📁 Project Structure

```
MyPortfolio/
├── src/
│   ├── components/
│   │   ├── CustomCursor/
│   │   ├── FlowerMenu/
│   │   ├── MusicPlayer/
│   │   ├── Navbar/
│   │   └── ...
│   ├── pages/
│   │   ├── Home/
│   │   ├── About/
│   │   ├── Achievements/
│   │   ├── Projects/
│   │   ├── Contact/
│   │   ├── Community/
│   │   └── CommunityDetail/
│   └── utils/
├── backend/
│   └── src/main/java/com/chaitanya/portfolio/
│       ├── controller/
│       ├── service/
│       ├── model/
│       └── repository/
└── public/
    └── audio/
```

---

## 🔗 Connect With Me

- **Portfolio:** [41chaitanya.github.io/MyPortfolio](https://41chaitanya.github.io/MyPortfolio/)
- **LinkedIn:** [linkedin.com/in/chaitanya-sharma-799041301](https://www.linkedin.com/in/chaitanya-sharma-799041301)
- **GitHub:** [github.com/41chaitanya](https://github.com/41chaitanya)
- **Email:** [chaitanya4141sharma@gmail.com](mailto:chaitanya4141sharma@gmail.com)
- **Community:** [com.the-boys-dev](https://github.com/com-the-boys-dev)

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

---

*Built with ❤️ by Chaitanya Sharma | Last updated: December 2025*
