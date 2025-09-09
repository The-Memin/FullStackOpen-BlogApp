# Full Stack Open – Progress Repository

This repository contains my exercises and projects from the **Full Stack Open** course by the University of Helsinki.  
It includes implementations for frontend, backend, and automated end-to-end testing with both **Playwright** and **Cypress**.

---

## 📂 Project Structure

- **`frontend/`** – React applications and exercises.
- **`backend/`** – Node.js + Express + MongoDB implementations.
- **`playwright-e2e-tests/`** – End-to-end tests using [Playwright](https://playwright.dev/).
- **`cypress-e2e-tests/`** – End-to-end tests using [Cypress](https://www.cypress.io/).

> ⚡ Each folder is an independent project and requires its own installation and setup.

---

## 🚀 Installation

Clone the repository:
```bash
git https://github.com/The-Memin/FullStackOpen-BlogApp.git
cd fullstack-open
```

Navigate into the desired project and install dependencies:

```bash
cd frontend
npm install
```

Repeat the same steps for:
- `backend/`
- `playwright-e2e-tests/`
- `cypress-e2e-tests/`

---

## ▶️ Running the Projects

- **Frontend**  
  ```bash
  cd frontend
  npm run dev
  ```

- **Backend**  
  ```bash
  cd backend
  npm run dev
  ```

- **Playwright Tests**  
  ```bash
  cd playwright-e2e-tests
  npx playwright test
  ```

- **Cypress Tests**  
  ```bash
  cd cypress-e2e-tests
  npx cypress open
  ```

---

## 📚 About the Course

The **[Full Stack Open](https://fullstackopen.com/en/)** course provides in-depth learning of modern web development with:
- React
- Node.js & Express
- MongoDB
- GraphQL
- TypeScript
- Testing (Unit & E2E)

---

## 📌 Notes

- Each subproject has its own `.gitignore` and dependencies.  
- Configurations may vary between frontend, backend, and testing tools.  
- This repository serves as a collection of my progress throughout the course.