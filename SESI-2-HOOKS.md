# ⚛️ React Hooks — Sesi 2

## Requirements

- Sudah paham materi **Sesi 1** (Component, JSX, Props).
- Project React (Vite) sudah bisa jalan (`npm install` → `npm run dev`).
- Di sesi ini kita pakai project **Threadly** (mini sosmed) sebagai bahan praktek.

> 🎯 **Target Sesi 2:** paham 3 hooks paling penting → `useState`, `useEffect`, `useRef`.
> Plus ada **🎁 bonus custom hook** di paling bawah buat dibawa pulang.

---

## 🤔 Apa itu Hooks?

Di Sesi 1, component kita masih "diam" — cuma nampilin data dari props.
Tapi web asli itu **hidup**: tombol diklik, teks diketik, data berubah, layar update sendiri.

**Hooks** = fungsi spesial React (namanya selalu diawali `use...`) yang bikin component kita bisa:

- **Punya ingatan / data yang berubah** → `useState`
- **Melakukan sesuatu di waktu tertentu** (misal saat muncul / saat data berubah) → `useEffect`
- **Menyentuh elemen HTML langsung** (misal auto-focus) → `useRef`

### ⚠️ 2 Aturan Wajib Hooks

1. **Cuma dipanggil di paling atas component** — JANGAN di dalam `if`, `for`, atau function lain.
2. **Cuma dipanggil di dalam component React** (atau di dalam custom hook).

```jsx
function MyComponent() {
  const [x, setX] = useState(0); // ✅ paling atas, boleh

  if (x > 0) {
    const [y, setY] = useState(0); // ❌ di dalam if, DILARANG
  }
}
```

---

## 1️⃣ useState — Ingatan Component

> Ini sebenarnya sudah muncul di project Threadly. Kita review dulu biar mantap.

**State** = data yang **bisa berubah** dan kalau berubah, **tampilan ikut update otomatis**.

```jsx
import { useState } from "react";

function Counter() {
  //      nilai skrg   cara ganti      nilai awal
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Diklik {count} kali
    </button>
  );
}
```

**Poin penting:**

- `useState(0)` → `0` itu **nilai awal**.
- Return-nya **array 2 isi**: `[nilai sekarang, fungsi untuk mengubah]`.
- **JANGAN ubah state langsung** (`count = count + 1` ❌). Wajib pakai setter (`setCount(...)` ✅).
- Tiap `setCount` dipanggil → component **render ulang** dengan nilai baru.

### 🔎 Update state berdasarkan nilai sebelumnya

Kalau nilai baru bergantung nilai lama, pakai bentuk **function** biar aman:

```jsx
setCount((prev) => prev + 1); // ✅ lebih aman
```

Di Threadly, ini kepakai banget, contohnya waktu nambah post baru:

```jsx
setPosts((prev) => [newPost, ...prev]); // taruh post baru di paling atas
```

> 💡 **Note:** `...prev` (spread) artinya "salin semua isi lama, terus tambahin".
> Kita **bikin array/objek baru**, bukan mengubah yang lama. Ini penting di React!

---

## 2️⃣ useEffect — Ngelakuin Sesuatu di Waktu Tertentu

Kadang kita mau component **melakukan sesuatu di luar sekadar menampilkan JSX**, misalnya:

- ubah judul tab browser
- simpan data ke `localStorage`
- ambil data dari internet (nanti di sesi berikutnya)
- pasang / lepas event listener

Hal-hal ini disebut **side effect**. Tempatnya di `useEffect`.

```jsx
import { useEffect } from "react";

useEffect(() => {
  // kode yang mau dijalankan
}, [/* dependency array */]);
```

### 🔑 Yang paling bikin bingung: Dependency Array `[]`

Ini bagian **paling penting** dari `useEffect`. Isinya menentukan **KAPAN** efek dijalankan:

| Dependency Array | Kapan efek jalan? |
|---|---|
| `}, [])` **(kosong)** | **Sekali saja**, setelah render pertama |
| `}, [posts])` | Setiap kali `posts` **berubah** (+ render pertama) |
| `})` **(tidak ada array)** | **Setiap render** (jarang dipakai, sering jadi bug 😵) |

### 🧪 Praktek A — Update judul tab (di `App.jsx`)

Kita mau judul tab browser jadi `Threadly (4)`, dan berubah otomatis tiap ada post baru.

```jsx
import { useState, useEffect } from "react";

// ...di dalam App()
useEffect(() => {
  document.title = `Threadly (${posts.length})`;
}, [posts]); // jalan lagi tiap "posts" berubah
```

Coba: **tambah 1 post baru → lihat judul tab browser ikut berubah!** 🤯

### 🧹 Cleanup Function (buat yang perlu "dibersihin")

Beberapa efek perlu "dibersihkan" biar ga numpuk (misal `setInterval`, event listener).
Caranya: **return sebuah function** di dalam `useEffect`.

```jsx
useEffect(() => {
  const id = setInterval(() => console.log("tick"), 1000);

  return () => clearInterval(id); // 🧹 dibersihkan saat component hilang
}, []);
```

> 💡 Kalau ga di-cleanup, timer-nya jalan terus walau component udah ga ada = bug + boros memori.

---

## 3️⃣ useRef — Nyentuh Elemen HTML Langsung

Kadang kita butuh **pegang elemen HTML asli**, contoh paling umum: **auto-focus** ke input.

```jsx
import { useRef } from "react";

function SearchBox() {
  const inputRef = useRef(null); // 1. bikin ref, awalnya null

  useEffect(() => {
    inputRef.current.focus();    // 3. .current = elemen asli → panggil .focus()
  }, []);

  return <input ref={inputRef} />; // 2. tempelkan ref ke elemen
}
```

**Cara kerja:**

1. `useRef(null)` → bikin "kotak" yang isinya nanti kita akses lewat `.current`.
2. `ref={inputRef}` → React isi `inputRef.current` dengan elemen `<input>` aslinya.
3. `inputRef.current.focus()` → panggil method DOM biasa.

### 🆚 useRef vs useState (JANGAN ketuker!)

| | `useState` | `useRef` |
|---|---|---|
| Kalau nilainya berubah | **Render ulang** ✅ | **TIDAK** render ulang |
| Buat apa? | Data yang tampil di layar | Pegang elemen DOM / simpan nilai "diam-diam" |

> 💡 Aturan simpel: kalau perubahannya harus **kelihatan di layar**, pakai `useState`.
> Kalau cuma butuh **akses elemen** atau simpan nilai tanpa update tampilan, pakai `useRef`.

### 🧪 Praktek B — Auto-focus input username (di `LoginPage.jsx`)

```jsx
import { useState, useEffect, useRef } from "react";

const usernameRef = useRef(null);

useEffect(() => {
  usernameRef.current.focus();
}, []);

// ...
<input ref={usernameRef} type="text" placeholder="Username" ... />
```

Refresh halaman login → kursor langsung siap di kolom username. 😎

---

## 🧪 Praktek Utama — Simpan Draft Post (Gabungan useState + useEffect + useRef)

File: `src/components/PostComposer.jsx`

Kita bikin: **draft tulisan otomatis tersimpan**, jadi kalau ke-refresh, tulisan ga hilang.

```jsx
import { useState, useEffect, useRef } from "react";

const DRAFT_KEY = "threadly-draft";

function PostComposer({ currentUser, onNewPost }) {
  // baca draft lama sebagai nilai awal
  const [content, setContent] = useState(() => localStorage.getItem(DRAFT_KEY) || "");
  const textareaRef = useRef(null);

  // auto-focus saat muncul
  useEffect(() => {
    textareaRef.current.focus();
  }, []);

  // simpan tiap kali content berubah
  useEffect(() => {
    localStorage.setItem(DRAFT_KEY, content);
  }, [content]);

  function handlePost() {
    const trimmed = content.trim();
    if (!trimmed || trimmed.length > 280) return;
    onNewPost(trimmed);
    setContent("");
    localStorage.removeItem(DRAFT_KEY); // draft udah jadi post → hapus
  }

  // ...(pasang ref={textareaRef} di <textarea>)
}
```

**Coba:** ketik sesuatu → refresh halaman (F5) → tulisannya masih ada! ✨

---

## 🛠️ Tips & Tricks (buat debugging)

### 1. Lihat dampak input ke `username` di Console

Cara paling gampang lihat state berubah tiap ketik: taruh `console.log` di dalam component.
State di React itu update **tiap ketikan**, jadi tiap huruf yang diketik = 1 log.

```jsx
function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");

  console.log("username sekarang:", username); // 👀 jalan tiap render

  return (
    <input value={username} onChange={(e) => setUsername(e.target.value)} />
  );
}
```

Buka **DevTools → Console** (klik kanan halaman → *Inspect* → tab **Console**, atau `F12`).
Ketik `a`, `ab`, `abc`... → console nge-log tiap perubahan. Ini bukti bahwa **tiap ketik = state update = render ulang**.

> 💡 Mau lihat langsung di dalam handler tanpa nunggu render?
> ```jsx
> onChange={(e) => {
>   console.log("baru diketik:", e.target.value);
>   setUsername(e.target.value);
> }}
> ```

### 2. React DevTools (WAJIB install)

Install extension **React Developer Tools** (Chrome/Firefox). Setelah itu di DevTools muncul tab **⚛️ Components**:

- Klik component → lihat semua **state & props**-nya secara langsung.
- Nilainya update **real-time** saat kamu berinteraksi. Ga perlu `console.log` terus.

### 3. Lihat isi `localStorage`

DevTools → tab **Application** (Chrome) → **Local Storage** → pilih `localhost`.
Di sini kamu bisa lihat `threadly-draft` berubah tiap kamu ngetik. Bisa dihapus manual juga.

### 4. `console.log` objek/array dengan rapi

```jsx
console.log("posts:", posts);          // biasa
console.table(posts);                  // 📊 tampilan tabel, enak buat array of object
console.log({ username, password });   // { username: "...", password: "..." } — ada labelnya
```

### 5. Kalau layar putih / error

- Buka **Console**, baca pesan merahnya (biasanya sudah nunjuk file + baris).
- Error umum: `Cannot read properties of null (reading 'focus')` → biasanya `ref` belum ditempel ke elemen (`ref={...}` lupa dipasang).

---

## ✅ Rangkuman

| Hook | Fungsi | Trigger render ulang? |
|---|---|---|
| `useState` | Simpan data yang berubah & tampil di layar | ✅ Ya |
| `useEffect` | Jalankan "side effect" di waktu tertentu | — (dia bereaksi ke perubahan) |
| `useRef` | Pegang elemen DOM / simpan nilai diam-diam | ❌ Tidak |

Yeayy kalian udah paham dasar Hooks! 🥳

---

# 🎁 BONUS — Good to Know

> Bagian ini **di luar materi inti**. Ga wajib, tapi bagus buat nambah wawasan. Baca santai aja. 😎

## ✨ Custom Hook — Bikin Hook Sendiri

### Apa itu Custom Hook?

**Custom Hook** = function buatan sendiri yang **menggabungkan beberapa hook** biar bisa **dipakai ulang**.

Ingat kode "simpan draft ke localStorage" di `PostComposer` tadi? Itu gabungan `useState` + `useEffect`.
Kalau logika ini mau dipakai di banyak tempat, capek nulis ulang. Solusinya: **bungkus jadi 1 custom hook**.

### Aturan Custom Hook

1. **Nama wajib diawali `use`** → contoh: `useLocalStorage`.
2. Boleh memanggil hook lain di dalamnya (`useState`, `useEffect`, dst).

### Contoh: `useLocalStorage`

Buat file `src/hooks/useLocalStorage.js`:

```jsx
import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved !== null ? saved : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue]; // persis kayak useState!
}
```

### Cara pakai (di `PostComposer.jsx`)

```jsx
import { useLocalStorage } from "../hooks/useLocalStorage";

function PostComposer({ currentUser, onNewPost }) {
  // 1 baris ini menggantikan useState + useEffect localStorage tadi 🎉
  const [content, setContent] = useLocalStorage("threadly-draft", "");

  // ...sisanya sama
}
```

**Lihat bedanya?** Component jadi lebih bersih, dan `useLocalStorage` bisa dipakai di komponen lain juga.

> 💡 Custom hook lain yang umum: `useDocumentTitle(title)` (bungkus `useEffect` untuk `document.title`),
> atau `useWindowWidth()` (lebar layar yang update saat window di-resize). Intinya: **kalau ada logika hook yang berulang, bungkus jadi custom hook.**

---

## 🧭 Cara Pindah Halaman — `useState` vs `react-router-dom`

Di project Threadly ini, pindah halaman (login → home → profile) dibuat pakai **`useState`**:

```jsx
const [page, setPage] = useState("login");

if (page === "login") return <LoginPage ... />;
{page === "home" && <HomePage ... />}
```

Jadi "pindah halaman" = **ganti nilai state**. Simpel, ga perlu library tambahan, dan pas banget buat latihan `useState`. 👍

Tapi ini **bukan satu-satunya cara**. Ada library populer bernama **`react-router-dom`** yang khusus untuk routing.

### Bedanya apa?

| | `useState` (cara di project ini) | `react-router-dom` |
|---|---|---|
| URL berubah? | ❌ Tetap `localhost:5173` | ✅ Berubah (`/home`, `/profile`) |
| Tombol back/forward browser | ❌ Ga jalan | ✅ Jalan |
| Bookmark / share link halaman | ❌ Ga bisa | ✅ Bisa |
| Refresh → tetap di halaman itu | ❌ Balik ke awal | ✅ Tetap |
| Perlu install library? | Ga perlu | Perlu (`npm i react-router-dom`) |

### Sekilas kodenya (buat gambaran aja)

```jsx
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Link to="/home">Home</Link>       {/* pindah halaman lewat URL */}
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}
```

**Jadi mana yang bener?** Dua-duanya bener 🙂
- Buat app kecil / latihan → `useState` udah cukup.
- Buat app beneran yang butuh URL rapi & tombol back jalan → `react-router-dom` lebih pas.

> 👀 **Good to know aja** — cukup tau kalau routing pakai state itu salah satu opsi, dan `react-router-dom` itu alternatifnya. Ga perlu dihafal.

Kalau penasaran pengen liat versi Threadly yang pakai `react-router-dom`, ada di branch terpisah `feat/react-router` di repo ini — silakan diintip buat perbandingan. 🔍
