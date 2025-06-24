# Urbanisme Participatif

A participatory urban planning application where users can suggest, vote, and comment on ideas to improve their neighborhood.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. **Clone the repository:**

   ```sh
   git clone <your-repo-url>
   cd urbanisme-participatif
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Start the development server:**
   ```sh
   npm run dev
   ```
   The app will be available at [http://localhost:5173](http://localhost:5173) (or as indicated in your terminal).

---

## 🗂️ Project Structure

- `src/`
  - `components/` – React UI components (Map, Suggestions, Layout, Errors)
  - `constants/` – Static constants (e.g., suggestion type labels)
  - `core/`
    - `api.ts` – Custom API wrapper for HTTP requests and token management
    - `services/` – Business logic for authentication, suggestions, users
    - `utils/` – Utility functions (e.g., auth, idea conversion)
  - `data/` – Mock data for development/testing
  - `pages/` – Main route pages (Home, Suggestions, Profile)
  - `store/` – Zustand store for global state management
  - `types/` – TypeScript types and enums

---

## 🛠️ Main Packages Used

- **React** – UI library
- **React Router DOM** – Routing
- **Zustand** – State management
- **Leaflet & React-Leaflet** – Interactive maps
- **Tailwind CSS** – Styling
- **Lucide React** – Icon set
- **React Select** – Select dropdowns
- **jwt-decode** – JWT token decoding

Dev dependencies include TypeScript, ESLint, Tailwind, and Vite.

---

## 🧩 Custom API Functions

All API logic is centralized in [`src/core/api.ts`](src/core/api.ts):

- Handles base URL, headers, and token (JWT) management.
- Automatically refreshes access tokens if expired.
- Provides methods: `get`, `post`, `put`, `delete`.

### Example Usage

```ts
import Api from './core/api';

// GET request
Api.get('/ideas');

// POST request
Api.post('/ideas/', { title: 'New Idea', ... });
```

---

## 🏪 State Management

Global state is managed with Zustand in [`src/store/useAppStore.ts`](src/store/useAppStore.ts):

- `suggestions`, `userSuggestions`, `user` – Main state slices
- Actions: `fetchSuggestions`, `addSuggestion`, `voteSuggestion`, `addComment`, etc.
- Handles optimistic updates for voting and commenting.

---

## 🔐 Authentication

- Login and logout handled via [`src/core/services/auth.service.ts`](src/core/services/auth.service.ts)
- JWT tokens are stored in `localStorage` and automatically refreshed.
- User info is persisted and restored on app load.

---

## 🗺️ Map & Suggestions

- Map: [`src/components/Map/InteractiveMap.tsx`](src/components/Map/InteractiveMap.tsx)
- Suggestions: [`src/components/Suggestions/SuggestionCard.tsx`](src/components/Suggestions/SuggestionCard.tsx)
- Users can add, vote, and comment on suggestions.

---

## 🧑‍💻 Development Scripts

- `npm run dev` – Start dev server
- `npm run build` – Build for production
- `npm run preview` – Preview production build
- `npm run lint` – Lint code

---

## 📁 Environment Variables

- `.env` file for API and admin URLs.

---

## 📚 Further Notes

- The backend API should be running at the URL specified in `.env`.
- For development, mock data is available in [`src/data/mockData.ts`](src/data/mockData.ts).
- All types and enums are defined in [`src/types/`](src/types/).

---

## 📝 License

MIT (or your chosen license)
