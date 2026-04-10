<p align="center">
  <h1 align="center">FutureTech Blog Platform</h1>
  <p align="center">A full-stack blogging platform with JWT auth, nested comments, and real-time interactions</p>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/Redux_Toolkit-RTK_Query-764ABC?logo=redux&logoColor=white" alt="Redux" />
</p>

---

## 🖥️ Live Demo

**Frontend:** [blog-frontend-4j7d.onrender.com](https://blog-frontend-4j7d.onrender.com)  
**Backend API:** [blog-backend-m5ss.onrender.com](https://blog-backend-m5ss.onrender.com)

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| **JWT Authentication** | Secure register/login with bcrypt password hashing and token-based sessions |
| **CRUD Posts** | Create, read, update, delete posts with Markdown editor (SimpleMDE) |
| **Nested Comments** | Infinite-depth threaded replies with recursive data structure |
| **Likes & Shares** | Social interactions for both posts and comments |
| **Image Uploads** | Avatar and post cover images via Multer with file validation |
| **Dark/Light Theme** | Toggle between themes, persisted via Redux |
| **SEO Optimized** | Dynamic meta tags with react-helmet-async |
| **Code Splitting** | Lazy-loaded routes for optimized bundle size |
| **Responsive Design** | Mobile-first layout with SCSS breakpoints |
| **PDF Proxy & Cache** | Server-side PDF fetching with disk caching for resources page |

---

## 🛠️ Tech Stack

### Frontend
- **React 18** with Hooks & Suspense/Lazy
- **Redux Toolkit** + **RTK Query** for state & API caching
- **React Router 6** for client-side routing
- **SCSS** with mixins & CSS variables for theming  
- **react-hook-form** for form validation
- **react-markdown** with rehype plugins for post rendering

### Backend
- **Node.js** + **Express** (ES Modules)
- **MongoDB** with **Mongoose** ODM
- **JWT** for stateless authentication
- **bcrypt** for password hashing
- **Multer** for file uploads with MIME validation
- **express-validator** for input validation

---

## 📁 Project Structure

```
blog/
├── blog_backend/
│   ├── config/          # Multer configuration
│   ├── controllers/     # Business logic (user, post, message)
│   ├── models/          # Mongoose schemas (User, Post, Comment, Message)
│   ├── routes/          # Express routers (auth, post, message, upload)
│   ├── utils/           # Middleware (auth check, error handlers)
│   ├── validations/     # express-validator rules
│   └── index.js         # App entry point
│
├── blog_frontend/
│   ├── src/
│   │   ├── api/         # External API integrations
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Route-level page components
│   │   ├── redux/       # Store, slices (auth, theme)
│   │   ├── services/    # RTK Query API definitions
│   │   ├── styles/      # SCSS modules & global styles
│   │   └── utils/       # Helpers (reading time, TOC, constants)
│   └── public/
│
└── README.md
```

---

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/auth/registration` | ❌ | Register with name, email, password, avatar |
| `POST` | `/auth/login` | ❌ | Login, returns JWT token |
| `GET` | `/auth/profile` | ✅ | Get current user profile |

### Posts
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/posts` | ❌ | Get all posts |
| `GET` | `/post/:id` | ❌ | Get single post (increments views) |
| `POST` | `/post/create` | ✅ | Create new post |
| `PATCH` | `/post/:id` | ✅ | Update post |
| `DELETE` | `/post/:id` | ✅ | Delete post |
| `PATCH` | `/post/:id/likeToggle` | ✅ | Like/unlike post |
| `PATCH` | `/post/:id/shareToggle` | ✅ | Track post share |
| `PATCH` | `/post/:id/toggleComment` | ✅ | Add/remove comment |

### Uploads
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/upload` | ✅ | Upload post image |
| `GET` | `/proxy/pdf?url=` | ❌ | Proxy and cache PDF files |

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18
- MongoDB (local or [Atlas](https://cloud.mongodb.com))

### Backend Setup
```bash
cd blog_backend
npm install
cp .env.example .env    # Edit with your MongoDB URI and JWT secret
npm start               # Starts with nodemon on port 4444
```

### Frontend Setup
```bash
cd blog_frontend
npm install
cp .env.example .env    # Add your YouTube API key
npm start               # Starts on port 3000
```

---

## 🔒 Security

- Passwords hashed with **bcrypt** (12 salt rounds)
- JWT tokens with configurable expiration (env-based secret)
- File upload validation (MIME type + 5MB size limit)
- Input sanitization via **express-validator**
- Protected routes with authentication middleware

---

## ⚡ Performance Optimizations

- **Code splitting** — React.lazy + Suspense for route-level splitting
- **RTK Query caching** — Automatic cache invalidation with tags
- **PDF proxy caching** — Disk-based cache to avoid repeated fetches
- **Image lazy loading** — Native `loading="lazy"` on images
- **SEO** — Dynamic meta tags with react-helmet-async

---

## 📝 What I Learned

- Designing and implementing a **recursive comment system** with unlimited nesting depth
- Building **optimistic UI updates** for like/unlike interactions
- Architecting a **clean backend** with separated routes, controllers, models, and middleware
- Implementing **JWT authentication flow** end-to-end (register → login → protected routes → token refresh)
- Working with **RTK Query** for efficient server-state management with cache invalidation
- Setting up **file upload pipeline** with Multer (validation, storage, error handling)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
