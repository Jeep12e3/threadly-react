# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


---

## 🧭 Branch `feat/react-router` (referensi / good to know)

Branch ini adalah **versi alternatif** Threadly yang navigasinya pakai
[`react-router-dom`](https://reactrouter.com/), bukan `useState`.

Tujuannya cuma **perbandingan** dengan versi utama (branch `main`) yang pindah
halaman pakai state `page`. Bukan materi wajib — silakan diintip buat lihat
bedanya routing berbasis URL.

**Yang berubah dibanding `main`:**

- `main.jsx` — dibungkus `<BrowserRouter>`
- `App.jsx` — state `page` dihapus, diganti `<Routes>` + `<Route>` (URL: `/login`, `/home`, `/profile`)
- `Navbar.jsx` — pakai `<NavLink>` (otomatis kasih class `active`)
- `LoginPage.jsx` — setelah login pakai `useNavigate("/home")`

Coba jalankan lalu perhatikan: URL ikut berubah, dan tombol back/forward browser berfungsi.
