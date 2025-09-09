# Bloglist — Full Stack Open, Part 5 (Frontend)

React frontend for the Part 5 blog application of **Full Stack Open**.  
Implements token-based authentication, blog CRUD, likes, notifications, and testing (unit + E2E).

## Features
- Login with JWT and persistence via `localStorage`.
- Create, list, like, and delete blogs (delete only if owner).
- Controlled forms and reusable components (`Togglable`, `Notification`, `BlogForm`).
- Error and loading states with inline messages/toasts.
- Tests:
  - Component/unit tests with React Testing Library (Jest/Vitest).
  - E2E tests with Cypress (login + blog flows).

## Tech Stack
- **React** + Hooks
- HTTP client: axios/fetch via a small API service layer
- **Vite** (dev/build)
- **ESLint** (Flat Config), optional Prettier
- **Testing**: React Testing Library + Jest/Vitest, **Cypress** for E2E

## Getting Started

### Prerequisites
- Node.js ≥ 18
- Backend running locally (default: `http://localhost:3003`)

### Installation
```bash
npm install
```
### Development

```bash
# Start the backend first (usually at :3001)
# then run the frontend:
npm run dev
```
### Build

```bash
# Start the backend first (usually at :3001)
# then run the frontend:
npm run build
```
### Lint

```bash
# Start the backend first (usually at :3001)
# then run the frontend:
npm run lint
# or auto-fix
npm run lint:fix
```
### Testing

```bash
# Unit/component tests
npm test
# or
npm run test

# End-to-end (Cypress)
npm run cypress
```

## Configuration

### API base URL

By default the app expects the backend under /api via Vite proxy.
Adjust one of the following depending on your setup:

* Vite proxy (in vite.config.js):

```js
server: {
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:3003',
      changeOrigin: true
    }
  }
}
```

* Direct base URL (in your API service):

```js
// services/blogs.js
const baseUrl = import.meta.env.VITE_API_BASE_URL ?? '/api/blogs';
```

* Set an env var if needed:
```bash
# .env
VITE_API_BASE_URL=http://127.0.0.1:3003/api/blogs;
```

### Auth token
Token is stored in localStorage (key: e.g. loggedBlogAppUser).
The API client attaches Authorization: Bearer <token> to protected requests.

## Notes
* Delete is only allowed for the blog’s owner (validated by backend).

* Tests cover login failure/success and blog interactions (create/like/delete).

## Acknowledgments

Part of **Full Stack Open**, University of Helsinki — Part 5.