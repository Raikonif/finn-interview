# Finconecta Assessment - React Frontend

A responsive React application built as part of the Full Stack Engineer Assessment, demonstrating modern web development practices with integration capabilities for Spring Boot backends.

## 🚀 Features

- **Responsive Design**: Mobile-first approach with smooth animations and transitions
- **Navigation**: Header with animated navigation bar (4+ pages)
- **CRUD Operations**: Full Create, Read, Update, Delete functionality for items
- **JWT Authentication**: Secure authentication with token management
- **Real-time Ready**: Prepared for WebSocket integration
- **Mock API**: Built-in mock data for development without backend
- **Modern UI**: Custom CSS theme with hover animations and professional styling

## 🛠️ Technology Stack

- **React 19** with TypeScript
- **React Router DOM** for navigation
- **Axios** for HTTP requests
- **Vite** for build tooling and development
- **CSS3** with CSS variables and animations
- **ESLint** for code quality

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # App header with navigation
│   ├── NavBar.tsx      # Navigation with animations
│   ├── Footer.tsx      # App footer
│   ├── ItemCard.tsx    # Individual item display
│   ├── ItemList.tsx    # Items grid layout
│   └── Notification.tsx # Toast notifications
├── pages/              # Route pages
│   ├── Home.tsx        # Landing page
│   ├── Items.tsx       # Items list view
│   ├── NewItem.tsx     # Create item form
│   ├── About.tsx       # About page
│   └── Login.tsx       # Authentication page
├── routers/            # Routing configuration
│   └── AppRouter.tsx   # Main router setup
├── services/           # API and external services
│   └── api.ts          # HTTP client with mock fallback
├── styles/             # CSS styling
│   └── theme.css       # Main theme and animations
└── lib/                # Utilities
    └── utils.ts        # Helper functions
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (preferred) or npm

### Installation

1. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your backend URL:
   ```env
   VITE_API_BASE_URL=http://localhost:8080/api
   VITE_WS_URL=ws://localhost:8080/ws
   ```

3. **Start development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5174` (or the port shown in terminal)

## 🎯 Usage

### Development Mode (Mock API)
When no backend is available, the application uses mock data:
- **Login**: Use `admin` / `password`
- **Items**: Pre-populated with sample data
- **Create**: Adds items to local mock store
- **Delete**: Removes items from mock store

### Production Mode (Real Backend)
Configure the backend URL in `.env` and the app will:
- Connect to Spring Boot REST APIs
- Handle JWT authentication
- Perform real CRUD operations
- Support real-time updates via WebSocket

## 🔧 API Integration

The frontend expects these backend endpoints:

### Authentication
- `POST /auth/login` - Login with username/password
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
  Response: `{ "token": "jwt-token" }`

### Items CRUD
- `GET /api/items` - Fetch all items
- `POST /api/items` - Create new item
- `PUT /api/items/{id}` - Update item
- `DELETE /api/items/{id}` - Delete item

### Item Schema
```typescript
{
  id: string;
  title: string;
  description: string;
  price?: number;
  createdAt: string;
}
```

## 🎨 Features Showcase

### Navigation Animations
- Hover effects on navigation links
- Smooth transitions and transforms
- Active state indicators
- Responsive mobile menu

### Form Handling
- Real-time validation
- Loading states
- Error handling
- Success notifications

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimizations
- Flexible grid layouts
- Touch-friendly interactions

## 🏗️ Build and Deploy

### Development
```bash
pnpm dev
```

### Build for Production
```bash
pnpm build
```

### Preview Production Build
```bash
pnpm preview
```

### Linting
```bash
pnpm lint
```

## 🌐 Pages Overview

1. **Home** (`/`) - Landing page with feature showcase
2. **Items** (`/items`) - List all items with search and actions
3. **New Item** (`/new-item`) - Form to create new items
4. **About** (`/about`) - Technology stack and project info
5. **Login** (`/login`) - Authentication page

## 🔒 Authentication Flow

1. User enters credentials on `/login`
2. Token stored in localStorage
3. Axios interceptor adds `Authorization: Bearer <token>` to requests
4. 401 responses clear token and redirect to login
5. Protected routes check for token presence

## 🎭 Mock API Behavior

For development without backend:
- Login accepts `admin`/`password`
- Items stored in memory (reset on page refresh)
- All CRUD operations work locally
- Console warnings indicate mock usage

## 📱 Responsive Breakpoints

- **Mobile**: < 480px - Single column, stacked navigation
- **Tablet**: 481px - 768px - Adjusted grid, compact navigation  
- **Desktop**: > 768px - Full grid, horizontal navigation

---

**Assessment Requirements Fulfilled:**
- ✅ Responsive React application
- ✅ Header, footer, and navigation bar (4+ links)
- ✅ At least two pages using React Router
- ✅ Component that fetches data from backend API
- ✅ Form component to submit new data
- ✅ Real-time updates ready (WebSocket integration prepared)
- ✅ React Hooks for state management
- ✅ CSS animations for hover effects on navigation
- ✅ Custom design theme using CSS
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
