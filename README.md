# 🎰 Funky Leaderboard App

A full-stack points leaderboard system built with **Express**, **MongoDB**, **React (Vite)**, and **TailwindCSS**.  
Bright, animated, and playful UI for a bet/game vibe!

---

## 🚀 Features

- **Leaderboard:** See all users ranked by points, with medals for top 3.
- **Add User:** Add new users with a funky card UI.
- **Claim Points:** Select a user and claim random points with interactive popups.
- **Claim History:** View each user's claim history with timestamps.
- **Funky UI:** Vibrant colors, gradients, transitions, and playful design.
- **Reusable API Logic:** All frontend API calls use shared functions from the `common` folder.

---

## 📦 Folder Structure

```
d:\w3 assignment
│
├── backend/           # Express + MongoDB backend
│   ├── src/
│   │   ├── index.js   # Main server file
│   │   └── models/
│   │       ├── User.js
│   │       └── ClaimHistory.js
│   └── package.json
│
├── frontend/          # Vite + React + TailwindCSS frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── common/    # Shared API functions (api.js)
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── common/            # (Optional) Shared code for backend/frontend
│   └── README.md
│
└── README.md          # This file
```

---

## ⚡ Quick Start

### 1. Backend Setup

```sh
cd backend
npm install
# Set up your .env file with MONGO_URI
npm start
```

- MongoDB must be running and accessible via your `.env` `MONGO_URI`.
- Backend runs on port `5000` by default.

### 2. Frontend Setup

```sh
cd frontend
npm install
npm run dev
```

- Frontend runs on port `5173` by default.
- Vite proxies API requests to the backend.

### 3. Access the App

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🛠️ API Endpoints

- `GET /users` — Get all users (leaderboard)
- `POST /users` — Add a new user (`{ name }`)
- `POST /claim/:userId` — Claim random points for a user
- `GET /history/:userId` — Get claim history for a user

---

## 🎨 UI/UX

- **Navbar:** Funky, animated, and responsive.
- **Cards:** 3D effect, gradients, and playful headings.
- **Leaderboard:** Medals for top 3, vibrant row colors, transitions.
- **Popups:** Animated, interactive feedback when claiming points.
- **Mobile Friendly:** Responsive layout with TailwindCSS.

---

## 🧩 Shared API Logic

All frontend API calls use reusable functions from `src/common/api.js`:

```js
import { getUsers, addUser, claimPoints, getHistory } from './common/api'
```

---

## 📝 Customization

- Change initial users in `backend/src/index.js`.
- Tweak colors and animations in `frontend/src/index.css`.
- Add more features or pages as needed!

---

## 💡 Tips

- For production, build the frontend (`npm run build`) and serve it from the backend.
- Keep your `.env` file secret (never commit it).
- MongoDB Atlas is recommended for cloud database.

---

## 🏆 Credits

- Built with [Express](https://expressjs.com/), [Mongoose](https://mongoosejs.com/), [React](https://react.dev/), [Vite](https://vitejs.dev/), and [TailwindCSS](https://tailwindcss.com/).
- Emojis and colors for extra funkiness!

---

## 📬 License

MIT

