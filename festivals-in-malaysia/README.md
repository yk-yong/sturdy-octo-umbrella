# Festivals in Malaysia 🇲🇾

A comprehensive web application showcasing Malaysia's rich cultural diversity through its traditional festivals and celebrations. Built with React, TypeScript, and Tailwind CSS.

## 🎯 Features

### Core Functionality

- **📅 Festival Overview**: Comprehensive list of Malaysian festivals with detailed information
- **🔍 Advanced Search**: Search by festival name, keywords, or descriptions
- **🏷️ Smart Filtering**: Filter by categories (Religious, Cultural, National, Local, Notable) and regions
- **🌐 Multi-language Support**: English, Bahasa Malaysia, and Chinese (中文)
- **📱 Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **✨ Interactive Animations**: Smooth hover effects and transitions

### User Interface

- **🎨 Card-based Layout**: Clean 4-column responsive grid layout
- **🔍 Detailed Modal View**: Rich festival details with cultural practices and significance
- **📊 Statistics Dashboard**: Live statistics showing festival distribution
- **🎯 Language Switcher**: Easy language switching with country flags
- **🎪 Visual Design**: Gradient backgrounds and modern UI components

### Technical Features

- **🚀 PWA Ready**: Progressive Web App with manifest.json
- **⚡ Fast Performance**: Optimized with Vite and lazy loading
- **♿ Accessible**: WCAG compliant with proper ARIA labels
- **🎨 Tailwind CSS v4**: Modern styling with custom animations
- **📱 Touch Friendly**: Optimized for mobile interactions

## 🏗️ Architecture

### Project Structure

```
src/
├── components/          # React components
│   ├── FestivalCard.tsx        # Individual festival card
│   ├── FestivalGrid.tsx        # Responsive grid layout
│   ├── FestivalDetailModal.tsx # Modal for festival details
│   ├── FilterComponent.tsx     # Search and filter controls
│   ├── Header.tsx              # Application header
│   ├── LanguageSwitcher.tsx    # Language selection
│   └── Statistics.tsx          # Festival statistics
├── data/               # Static festival data
│   └── festivals.json         # Festival information database
├── types/              # TypeScript definitions
│   └── festival.ts           # Festival-related types
├── utils/              # Utility functions
│   └── festivalUtils.ts      # Festival data processing
└── App.tsx            # Main application component
```

### Design Patterns

- **Multi-language Support**: `MultiLanguageText` interface for all user-facing content
- **Type Safety**: Comprehensive TypeScript interfaces for all data structures
- **Component Composition**: Modular, reusable components following single responsibility
- **State Management**: React hooks for local state with clear separation of concerns
- **Responsive Design**: Mobile-first approach with Tailwind CSS breakpoints

## 🌍 Festivals Included

### Religious Festivals

- **Chinese New Year** (农历新年) - The most important Chinese celebration
- **Hari Raya Aidilfitri** - Islamic celebration marking the end of Ramadan
- **Deepavali** (屠妖节) - Hindu festival of lights
- **Christmas** (圣诞节) - Christian celebration of Jesus Christ's birth
- **Thaipusam** (大宝森节) - Hindu festival dedicated to Lord Murugan

### National Holidays

- **Merdeka Day** (独立日) - Malaysia's Independence Day celebration

### Regional Coverage

- **Nationwide**: Festivals celebrated across Malaysia
- **Northern Region**: Kedah, Penang, Perak, Perlis
- **Central Region**: Selangor, Kuala Lumpur, Putrajaya, Negeri Sembilan
- **Southern Region**: Johor, Malacca
- **Eastern Region**: Kelantan, Terengganu, Pahang, Sabah, Sarawak

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- Modern web browser

### Installation

```bash
# Navigate to the project directory
cd festivals-in-malaysia

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

### Development

```bash
# Run linting
pnpm lint

# Type checking
npx tsc --noEmit
```

## 🎨 Customization

### Adding New Festivals

1. Edit `src/data/festivals.json`
2. Follow the `Festival` interface structure
3. Provide translations for all text fields
4. Include proper categorization and regional information

### Language Support

The application supports three languages:

- **English (en)**: Default language
- **Bahasa Malaysia (ms)**: Malaysian national language
- **Chinese (zh)**: For Chinese community

### Styling

- Uses Tailwind CSS v4 with custom color palette
- Responsive breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Custom animations for enhanced user experience

## 🌟 Key Features Implementation

### Multi-language Architecture

```typescript
interface MultiLanguageText {
  en: string; // English
  zh: string; // Chinese
  ms: string; // Bahasa Malaysia
}
```

### Responsive Grid System

- **Mobile**: 1 column
- **Small tablets**: 2 columns
- **Large tablets**: 3 columns
- **Desktop**: 4 columns

### Smart Search & Filtering

- Real-time search across festival names, descriptions, and keywords
- Category filtering (Religious, Cultural, National, Local, Notable)
- Regional filtering with support for nationwide festivals
- Combined filter logic with active filter display

## 📱 Progressive Web App

### PWA Features

- **Manifest**: App installation and branding
- **Responsive**: Works on all device sizes
- **Offline Ready**: Cached static assets
- **App-like Experience**: Standalone display mode

### Browser Support

- Chrome/Edge: Full support including PWA features
- Firefox: Core functionality (theme-color limited support)
- Safari: Core functionality with iOS PWA support
- Mobile browsers: Optimized touch experience

## 🤝 Contributing

### Development Guidelines

1. Follow the established TypeScript patterns
2. Maintain multi-language support for all user-facing text
3. Ensure responsive design across all components
4. Write accessible HTML with proper ARIA labels
5. Follow the component composition patterns
6. Test across different devices and browsers

### Code Style

- Use TypeScript for type safety
- Follow React best practices with hooks
- Implement responsive design mobile-first
- Maintain clean component interfaces
- Use meaningful component and variable names

## 📄 License

This project is part of the vibe-projects workspace showcasing Malaysian cultural diversity and educational content.

---

**Built with ❤️ to celebrate Malaysia's rich cultural heritage and promote understanding of its diverse traditions.**
