# Skateland West 🛼

A modern, vibrant website for Skateland West - San Antonio's premier family skating destination. Built with Next.js, Payload CMS, and featuring a fun, dynamic design inspired by retro roller rinks with a contemporary twist.

![Skateland West](https://img.shields.io/badge/Built%20with-Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![Payload CMS](https://img.shields.io/badge/CMS-Payload-000000?style=for-the-badge&logo=payload&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 🎯 About Skateland West

**Skateland West** has been San Antonio's beloved family skating destination since 1985. Located at 7322 US-90, we offer:

- **Family-friendly skating sessions** for all ages and skill levels
- **Birthday parties & private events** with dedicated party rooms
- **Learn-to-skate programs** with professional instruction
- **Modern facilities** with state-of-the-art sound and lighting systems
- **38+ years** of creating magical memories for families

## ✨ Features

### 🎨 Modern Design
- **Vibrant blue theme** with gradient animations
- **Split navigation** with centered logo design
- **Skating-inspired animations** (roll, float, disco effects)
- **Responsive design** optimized for all devices
- **Fun visual elements** that capture the excitement of skating

### 🛼 Custom Components
- **HeroSection** with floating elements and call-to-action
- **ScheduleCards** for displaying weekly skating schedules
- **Enhanced Footer** with gradient CTA section
- **Animated Headers** with scroll effects
- **Mobile-first navigation** with hamburger menu

### 📱 Contact & Information
- **Phone**: (210) 523-9664
- **Address**: 7322 US-90, San Antonio, TX 78227
- **Hours**: Wednesday-Sunday (Closed Monday & Tuesday)
- **Social Media**: Facebook, Instagram, Twitter integration

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/bufordeeds/skateland-west.git
   cd skateland-west
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your database credentials:
   ```env
   POSTGRES_URL=postgres://username@localhost:5432/skateland-west
   PAYLOAD_SECRET=your-secret-key
   NEXT_PUBLIC_SERVER_URL=http://localhost:3000
   ```

4. **Set up the database**
   ```bash
   # Create database (if using PostgreSQL locally)
   createdb skateland-west
   
   # Run migrations
   npm run payload migrate
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Access the application**
   - Website: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin

## 🎛️ Admin Setup

1. Navigate to http://localhost:3000/admin
2. Create your first admin user
3. Click "Seed your database" to populate with sample content
4. Start customizing content through the admin panel

## 🏗️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern React components
- **Lucide React** - Beautiful icons

### Backend
- **Payload CMS** - Headless CMS with admin panel
- **PostgreSQL** - Robust relational database
- **Node.js** - Runtime environment

### Key Features
- **Layout Builder** - Custom page layouts with drag-and-drop blocks
- **Draft Preview** - Preview content before publishing
- **SEO Optimization** - Built-in SEO controls
- **Image Optimization** - Automatic image resizing and optimization
- **Search Functionality** - Full-text search capabilities

## 📂 Project Structure

```
skateland-west/
├── src/
│   ├── app/(frontend)/          # Next.js frontend pages
│   ├── blocks/                  # Reusable content blocks
│   │   ├── HeroSection/         # Hero with animations
│   │   ├── ScheduleCards/       # Weekly schedule display
│   │   └── ...
│   ├── components/              # React components
│   │   ├── ui/                  # shadcn/ui components
│   │   └── ...
│   ├── Header/                  # Site header with navigation
│   ├── Footer/                  # Site footer with CTA
│   ├── lib/                     # Utility functions and constants
│   └── collections/             # Payload CMS collections
├── public/                      # Static assets
└── package.json
```

## 🎨 Design System

### Colors
- **Primary Blue**: `#4F7AFF` (Electric blue)
- **Secondary Cyan**: `#00D4FF` (Bright cyan)
- **Accent Purple**: `#9D4EDD` (Purple highlight)
- **Accent Pink**: `#FF006E` (Electric pink)

### Typography
- **Headings**: Bold, gradient text effects
- **Body**: Clean, readable fonts
- **Special**: Skating-themed animations and effects

### Animations
- `animate-roll` - Rotating elements
- `animate-float` - Floating motion
- `animate-disco` - Color-shifting gradients
- `animate-shimmer` - Sliding shine effects

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Payload CMS
npm run payload migrate      # Run database migrations
npm run payload migrate:create  # Create new migration

# Database
npm run payload seed    # Seed database with sample content
```

### Adding New Content Blocks

1. Create component in `src/blocks/YourBlock/`
2. Add configuration in `src/blocks/YourBlock/config.ts`
3. Import and register in `src/blocks/RenderBlocks.tsx`

### Customizing Styles

- Global styles: `src/app/(frontend)/globals.css`
- Component styles: Tailwind classes in components
- Custom animations: Add to globals.css

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main

### Manual Deployment
1. Build the application: `npm run build`
2. Start the server: `npm start`
3. Ensure PostgreSQL database is accessible

## 📋 Content Management

### Admin Panel Features
- **Pages**: Create custom pages with layout builder
- **Posts**: Blog posts and news articles
- **Media**: Image and file management
- **Categories**: Organize content by categories
- **Users**: Manage admin users and permissions

### Content Types
- **Hero Sections**: Featured content with CTAs
- **Schedule Cards**: Weekly skating sessions
- **Party Packages**: Birthday party offerings
- **Testimonials**: Customer reviews
- **Service Cards**: Features and amenities

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📞 Contact

**Skateland West**
- Website: [skatelandwest.com](https://skatelandwest.com)
- Phone: (210) 523-9664
- Email: info@skatelandwest.com
- Address: 7322 US-90, San Antonio, TX 78227

**Development**
- Repository: [github.com/bufordeeds/skateland-west](https://github.com/bufordeeds/skateland-west)
- Issues: [GitHub Issues](https://github.com/bufordeeds/skateland-west/issues)

## 📄 License

This project is proprietary software for Skateland West. All rights reserved.

---

**Roll into the fun at Skateland West!** 🛼✨

*Built with ❤️ for the San Antonio skating community*