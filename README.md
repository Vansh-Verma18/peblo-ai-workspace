# 🚀 Peblo AI Workspace

A production-quality full-stack AI collaborative notes workspace application built for the Peblo Full Stack Developer Challenge.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748)
![OpenRouter](https://img.shields.io/badge/OpenRouter-AI-412991)

## 🎥 Demo Video

> **[Add your demo video link here after recording]**
> 
> A 5-10 minute walkthrough showing all features in action.

## ✨ Features

### 🔐 Authentication
- Secure user registration and login
- JWT-based session management with NextAuth
- Password hashing with bcrypt
- Protected routes and API endpoints

### 📝 Notes Management
- Create, edit, and delete notes
- Rich text editor with markdown support
- Auto-save functionality (2-second debounce)
- Pin important notes
- Archive notes
- Real-time search
- Filter by tags and categories
- Organize with tags and categories

### 🤖 AI Features
- **AI Summaries**: Generate concise summaries of your notes
- **Action Items**: Extract actionable tasks from content
- **Smart Titles**: AI-generated note titles
- **Tag Suggestions**: Automatic tag recommendations
- **Writing Improvement**: Enhance clarity and grammar

### 📊 Dashboard
- Total notes count
- Weekly activity statistics
- AI usage tracking
- Popular tags visualization
- Activity chart with Recharts

### 🔗 Sharing
- Generate public share links
- Beautiful read-only public pages
- Share notes without authentication

### 🎨 Premium UI/UX
- Dark mode by default
- Glassmorphism effects
- Smooth animations with Framer Motion
- Responsive design
- Modern gradient backgrounds
- Interactive hover effects
- Loading skeletons
- Toast notifications

## 🛠️ Tech Stack

**Frontend:**
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Framer Motion
- Lucide Icons
- Recharts

**Backend:**
- Next.js API Routes
- Prisma ORM
- PostgreSQL

**Authentication:**
- NextAuth.js
- JWT sessions
- bcryptjs

**AI Integration:**
- OpenRouter AI (unified API for multiple AI models)

## 📦 Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd peblo-ai-workspace
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```env
# Database (SQLite for local development)
DATABASE_URL="file:./dev.db"

# For production, use PostgreSQL:
# DATABASE_URL="postgresql://user:password@localhost:5432/peblo_notes?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-generate-with-openssl-rand-base64-32"

# OpenRouter AI (get free API key from https://openrouter.ai/keys)
OPENROUTER_API_KEY="sk-or-v1-your-api-key-here"
```

4. **Run Prisma setup**
```bash
npx prisma generate
npx prisma db push
```

5. **Start the development server**
```bash
npm run dev
```

6. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Schema

- **Users**: User accounts with authentication
- **Notes**: Note content with metadata
- **Categories**: Note organization
- **Tags**: Flexible tagging system
- **NoteTags**: Many-to-many relationship
- **SharedLinks**: Public sharing tokens
- **AIUsage**: AI feature usage tracking

## 🎯 Key Features Implementation

### Auto-save
Notes automatically save 2 seconds after you stop typing using a custom `useAutosave` hook.

### AI Assistant
Floating AI panel with quick access to:
- Summarize content
- Extract action items
- Improve writing
- Suggest tags

### Search & Filter
Real-time search across note titles and content with filter options for tags and categories.

### Responsive Design
Fully responsive layout that works on desktop, tablet, and mobile devices.

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Environment Variables for Production

```env
DATABASE_URL="your-production-database-url"
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="your-production-secret"
OPENROUTER_API_KEY="your-openrouter-api-key"
```

### Getting OpenRouter API Key

1. Visit [https://openrouter.ai/keys](https://openrouter.ai/keys)
2. Sign up for a free account
3. Create a new API key
4. Add credits (free tier available)
5. Copy the key to your `.env` file

## 📁 Project Structure

```
peblo-ai-workspace/
├── app/
│   ├── (auth)/          # Authentication pages
│   ├── (dashboard)/     # Dashboard pages
│   ├── api/             # API routes
│   └── shared/          # Public shared notes
├── components/
│   ├── auth/            # Auth components
│   ├── dashboard/       # Dashboard components
│   ├── notes/           # Note components
│   └── ui/              # UI components (shadcn)
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
├── prisma/              # Database schema
└── types/               # TypeScript types
```

## 🎨 Design Philosophy

The application follows modern SaaS design principles:
- **Dark-first**: Optimized for dark mode
- **Glassmorphism**: Translucent cards with backdrop blur
- **Smooth animations**: Framer Motion for delightful interactions
- **Premium spacing**: Generous whitespace for clarity
- **Gradient accents**: Indigo to purple gradients
- **Micro-interactions**: Hover effects and transitions

## 🔒 Security

- Passwords hashed with bcrypt (12 rounds)
- JWT-based authentication
- Protected API routes
- SQL injection prevention with Prisma
- XSS protection with React
- CSRF protection with NextAuth

## 📝 License

MIT License - feel free to use this project for learning and portfolio purposes.

## 🙏 Acknowledgments

Built with modern web technologies and best practices for the Peblo Full Stack Developer Challenge.

---

**Made with ❤️ and ☕ by [VANSH VERMA]**
