# Bloglist E2E Tests With Playwright

This project contains the **end-to-end (E2E) tests** for the **Bloglist** application, developed during the [Full Stack Open](https://fullstackopen.com/) course.

## 🚀 Requirements

Before running the tests, make sure you have:

- Node.js and npm installed.
- The following projects cloned in the **same folder** and running:
  - Backend: [fullstackopen-bloglist](https://github.com/The-Memin/fullstackopen-bloglist)
  - Frontend: [bloglist-frontend](https://github.com/The-Memin/bloglist-frontend)

Example structure:
```
📂 bloglist-projects
│── 📂 fullstackopen-bloglist (backend)
│── 📂 bloglist-frontend (frontend)
│── 📂 Playwright (this repo)
```

## 📦 Installation

Clone this repository inside the same folder where you have the **backend** and **frontend**, then install the dependencies:

```bash
git clone https://github.com/The-Memin/Playwright.git
cd Playwright
npm install
```
## ▶️ Running the tests

Make sure both backend and frontend are running before executing the tests.

### UI Mode (recommended for development):

```bash
npm run test -- --ui
```
### Normal test
```bash
npm test
```

> 💡 Tip: by default, the backend should run on port 3001 and the frontend on 5173.

> If you’re using different ports, update the Playwright configuration accordingly.