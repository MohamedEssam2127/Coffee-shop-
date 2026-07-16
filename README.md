<div align="center">

<img src="https://img.shields.io/badge/CoffeeShop-App-6F4E37?style=for-the-badge&logo=coffee&logoColor=white" alt="Coffee Shop Banner" />

# ☕ Coffee Shop — Your Daily Brew, Delivered

**A full-stack artisan coffee ordering platform, built with React Native (Expo) & Node.js**

[![React Native](https://img.shields.io/badge/React%20Native-0.74-61DAFB?style=flat-square&logo=react&logoColor=white)](https://reactnative.dev)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://mongodb.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-Full-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)

[Features](#-features) • [Architecture](#-architecture) • [Getting Started](#-getting-started) • [API Reference](#-api-reference) • [Contributors](#-contributors)

---

</div>

## 🌟 What is Coffee Shop?

**Coffee Shop** is a premium mobile experience designed for coffee enthusiasts. It allows users to browse a curated selection of artisan coffees, customize their orders (size, quantity), manage a personal cart, and maintain a wishlist of their favorite blends. Built with a modern tech stack to ensure speed and reliability.

---

## ✨ Features

### 📱 Mobile App (React Native/Expo)
- 🔐 **Authentication** — Secure login/register flow with Token persistence (`SecureStore`)
- 🏠 **Home Feed** — Browse products with category filtering
- 🛒 **Cart Management** — Add, update, and remove items with real-time feedback
- 💖 **Wishlist** — Save your favorite coffee blends for later
- 👤 **Profile** — Manage account details, secure logout, and personal preferences
- 🎨 **Modern UI** — Clean, responsive design using Tailwind (NativeWind)

### 🖥️ Backend (Node.js / Express)
- 🔐 **JWT Auth** — Secure endpoint protection
- 📦 **CRUD Operations** — Full management for Products, Categories, and Users
- 🛒 **Cart & Wishlist Logic** — Seamless state management for orders
- 🛡️ **Validation** — Robust request handling

---

## 🏛️ Architecture

Coffee-shop/
├── 📱 app/                 # Expo Router (Navigation)
│   ├── (auth)/             # Login & Register
│   └── (tabs)/             # Main application tabs
├── 🧩 components/          # Reusable UI components
├── 📦 store/               # Global State (Zustand)
├── 🛠️ lib/                 # API Clients & Interceptors
├── ⚙️ services/            # API Service layer
├── 📋 constants/           # App-wide constants
└── 📄 types/               # TypeScript interfaces


---

## 🚀 Getting Started


### 📱 Mobile App Setup
1. Install dependencies: `npm install`
2. Configure the `BASE_URL` in `lib/api.ts`.
3. Run the app: `npx expo start`

---

## 📡 API Reference

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/auth/register` | ❌ | Create new account |
| `POST` | `/auth/login` | ❌ | Login user |
| `GET`  | `/users/me` | ✅ | Get profile |
| `GET`  | `/products` | ❌ | List all coffees |
| `POST` | `/cart` | ✅ | Add item to cart |
| `GET`  | `/wishlist` | ✅ | View wishlist |

---

## 🛠️ Tech Stack

| Frontend | Backend |
|----------|---------|
| React Native / Expo | Node.js / Express |
| Zustand (State) | MongoDB / Mongoose |
| Axios | JWT |
| Expo SecureStore | Zod Validation |

---

## 🤝 Contributors

- 👨🏻‍💻 **Mohamed Essam** [Github](https://github.com/MohamedEssam2127)
- 👨🏻‍💻 **Abdelrahman** [Github](https://github.com/abdelrahman-334)
- 👩🏻‍💻 **Mariam Essam** [Github](https://github.com/MariamEssam5)
- 👨🏻‍💻 **Ziad Alaa** [Github](https://github.com/ZiadAlaa955)
- 👨🏻‍💻 **Mahmoud Hassan** [Github](https://github.com/mahmoud-hassan1)
- 👨🏻‍💻 **Ahmed Elkady** [Github](https://github.com/ahmedellkady)


---

<div align="center">

**⭐ If this Coffee Shop app brewed something great for you, give it a star!**

</div>
