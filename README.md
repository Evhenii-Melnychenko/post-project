# 📝 Post Project

A simple yet elegant **blog post management** application built with **Vue 3**, **TypeScript**, and **Pinia**. Browse, create, save, and delete posts — all powered by a lightweight JSON Server REST API.

---

## ✨ Features

- 📋 **View all posts** — sorted by date, newest first
- 🔖 **Save posts** — bookmark your favourite entries and filter by saved
- ✍️ **Create posts** — add new posts via a clean form with validation
- 🗑️ **Delete posts** — remove posts instantly
- ⚡ **Reactive state** — powered by Pinia store with loading & error handling

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [Vue 3](https://vuejs.org/) | UI Framework (Composition API) |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Vite](https://vite.dev/) | Build tool & dev server |
| [Pinia](https://pinia.vuejs.org/) | State management |
| [Vue Router](https://router.vuejs.org/) | Client-side routing |
| [JSON Server](https://github.com/typicode/json-server) | Mock REST API |
| [SCSS](https://sass-lang.com/) | Styling |

---

## 📁 Project Structure

```
src/
├── assets/             # Global styles
├── components/
│   ├── PostItem.vue    # Individual post card (save, delete)
│   └── MyWrapper.vue   # Layout wrapper component
├── router/
│   └── index.ts        # Route definitions
├── stores/
│   └── posts.ts        # Pinia store (state, getters, actions)
└── views/
    ├── HomeView.vue    # Post list with filter toggle
    └── PostCreate.vue  # New post form
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js `^20.19.0` or `>=22.12.0`

### Installation

```sh
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:3000
```

### Run the JSON Server (mock API)

```sh
npx json-server db.json
```

### Run the Development Server

```sh
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 📦 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build |
| `npm run type-check` | Run TypeScript type checking |

---

## 📄 Data Model

Each post has the following shape:

```ts
{
  id: number
  title: string
  body: string
  author: string
  created_at: string   // e.g. "4/10/2026"
  is_saved: boolean
}
```

---

## 🔌 API Endpoints

Base URL: `VITE_API_URL` (default: `http://localhost:3000`)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/posts` | Fetch all posts |
| `POST` | `/posts` | Create a new post |
| `PATCH` | `/posts/:id` | Update a post (e.g. save toggle) |
| `DELETE` | `/posts/:id` | Delete a post |
