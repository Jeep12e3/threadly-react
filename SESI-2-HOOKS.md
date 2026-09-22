# ⚛️ React Hooks — Sesi 2

## Requirements

- Sudah paham materi **Sesi 1** (Component, JSX, Props).
- Node.js & npm sudah terinstall (cek: `node -v` dan `npm -v`).

> 🎯 **Target Sesi 2:** paham 3 hooks paling penting → `useState`, `useEffect`, `useRef`.
> Plus ada **🎁 bonus** di paling bawah untuk tau menahu :).

---

## 🗺️ Alur Sesi Ini

Sesi ini dibagi jadi **2 fase**:

| Fase | Ngapain | Di mana |
|---|---|---|
| **Fase 1 — Belajar Konsep** | Pahamin `useState`, `useEffect`, `useRef` satu-satu | Di **local** |
| **Fase 2 — Praktek Beneran** | Terapin hooks ke aplikasi nyata | Dari repo **Threadly**(twitter clone) |

---

# 🧪 FASE 1 — Belajar Konsep Hooks

## Step 0: Bikin Playground Kosong

Revisi sesi 1 nich.
Buka terminal, lalu:

```bash
npm create vite@latest hooks-playground -- --template react
cd hooks-playground
npm install
npm run dev
```

`ctrl + click` link localhost-nya

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

**State** = data yang **bisa berubah** dan kalau berubah, **tampilan ikut update otomatis**.

Coba tempel ini di `src/App.jsx`:

```jsx
import { useState } from "react";

export default function App() {
  //const [x, setX] = useState(y)
  //dimana x adalah variabel yang menyimpan nilai, y adalah nilai awal dari variabel x
  //setX -> fungsi untuk mengubah nilai x 
  const [count, setCount] = useState(0);

  return (
    //1 command yang dijalanin
    <button onClick={() => setCount(count + 1)}>
      Diklik {count} kali
    </button>

    //klo mw banyak isinya(tambah console.log):
    <button 
      onClick={() => {
        count = count + 1;
        console.log(count)
      }}
    >
      Diklik {count} kali
    </button>
  );
}
```

Klik tombolnya → angkanya naik otomatis. Itu state bekerja! ✨

**Poin penting:**

- `useState(0)` → `0` itu **nilai awal**.
- Return-nya **array 2 isi**: `[nilai sekarang, fungsi untuk mengubah]`.
- **JANGAN ubah state langsung** (`count = count + 1` ❌). Wajib pakai setter (`setCount(...)` ✅).
- Tiap `setCount` dipanggil → component **render ulang** dengan nilai baru.

### 🔎 Update state berdasarkan nilai sebelumnya

Kalau nilai baru bergantung nilai lama, pakai bentuk **function** biar aman:

```jsx
setCount((prev) => prev + 1); // ✅ lebih aman dari setCount(count + 1)
```

> 💡 **Note tentang array/objek:** kalau state-nya array atau objek, JANGAN diubah langsung.
> Bikin yang **baru** pakai spread (`...`):
> ```jsx
> setItems((prev) => [...prev, itemBaru]); // salin lama + tambah baru
> ```

---

## 2️⃣ useEffect — Ngelakuin Sesuatu di Waktu Tertentu

Kadang kita mau component **melakukan sesuatu di luar sekadar menampilkan JSX**, misalnya:

- ubah judul tab browser
- simpan data ke `localStorage`
- ambil data dari internet
- pasang / lepas timer atau event listener

Hal-hal ini disebut **side effect**. Tempatnya di `useEffect`.

```jsx
import { useEffect } from "react";

useEffect(() => {
  // kode yang mau dijalankan
}, [/* dependency array */]);
```

### 🔑 Yang paling penting: Dependency Array `[]`

Isinya menentukan **KAPAN** efek dijalankan:

| Dependency Array | Kapan efek jalan? |
|---|---|
| `}, [])` **(kosong)** | **Sekali saja**, setelah render pertama |
| `}, [count])` | Setiap kali `count` **berubah** (+ render pertama) |
| `})` **(tidak ada array)** | **Setiap render** (jarang dipakai, sering jadi bug 😵) |

### 🧪 Coba di playground

Ganti `src/App.jsx` dengan ini — judul tab browser bakal ikut angka:

```jsx
import { useState, useEffect } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Diklik ${count} kali`;
  }, [count]); // efek jalan lagi tiap "count" berubah

  return (
    <button onClick={() => setCount(count + 1)}>
      Diklik {count} kali
    </button>
  );
}
```

Klik tombol → **lihat judul tab browser ikut berubah!** 🤯

### 🧹 Cleanup Function (buat yang perlu "dibersihin")

Beberapa efek perlu "dibersihkan" biar ga numpuk (misal `setInterval`, event listener).
Caranya: **return sebuah function** di dalam `useEffect`.

```jsx
import { useState, useEffect } from "react";

export default function App() {
  const [detik, setDetik] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setDetik((d) => d + 1), 1000);

    return () => clearInterval(id); // 🧹 dibersihkan saat component hilang
  }, []); // [] kosong → timer dipasang sekali aja

  return <h1>Sudah {detik} detik ⏱️</h1>;
}
```

> 💡 Kalau ga di-cleanup, timer-nya jalan terus walau component udah ga ada = bug + boros memori.

---

## 3️⃣ useRef — Nyentuh Elemen HTML Langsung

Kadang kita butuh **pegang elemen HTML asli**, contoh paling umum: **auto-focus** ke input.

Coba di playground:

```jsx
import { useEffect, useRef } from "react";

export default function App() {
  const inputRef = useRef(null); // 1. bikin ref, awalnya null

  useEffect(() => {
    inputRef.current.focus();    // 3. .current = elemen asli → panggil .focus()
  }, []);

  return <input ref={inputRef} placeholder="Aku auto-focus!" />; // 2. tempelkan ref
}
```

Refresh → kursor langsung siap di input tanpa diklik. 😎

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

---

## ✅ Rangkuman Konsep

| Hook | Fungsi | Trigger render ulang? |
|---|---|---|
| `useState` | Simpan data yang berubah & tampil di layar | ✅ Ya |
| `useEffect` | Jalankan "side effect" di waktu tertentu | — (dia bereaksi ke perubahan) |
| `useRef` | Pegang elemen DOM / simpan nilai diam-diam | ❌ Tidak |

Yeayy kalian udah paham dasar 3 Hooks! 🥳
Sekarang saatnya coba ke aplikasi beneran → lanjut ke **Fase 2**.

---

## 🛠️ Tips & Tricks (buat debugging)

### 1. Lihat perubahan state di Console

Cara paling gampang lihat state berubah tiap ketik: taruh `console.log` di dalam component.
State di React update **tiap kali berubah**, jadi tiap ketikan = 1 log.

```jsx
import { useState } from "react";

export default function App() {
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
Di sini kamu bisa lihat data yang tersimpan berubah real-time. Bisa dihapus manual juga.

### 4. `console.log` objek/array dengan rapi

```jsx
console.log("data:", data);          // biasa
console.table(data);                 // 📊 tampilan tabel, enak buat array of object
console.log({ username, password }); // { username: "...", password: "..." } — ada labelnya
```

### 5. Kalau layar putih / error

- Buka **Console**, baca pesan merahnya (biasanya sudah nunjuk file + baris).
- Error umum: `Cannot read properties of null (reading 'focus')` → biasanya `ref` belum ditempel ke elemen (`ref={...}` lupa dipasang).

---

# 🚀 FASE 2 — Praktek di Aplikasi Threadly

Sekarang kita pindah ke aplikasi beneran: **Threadly** (mini sosmed).
Di sini kamu bakal nerapin 3 hooks yang udah dipahami tadi ke fitur nyata.

## Setup

Ikuti instruksi mentor untuk membuka project **Threadly**, lalu:

```bash
npm install
npm run dev
```

## Yang bakal kita kerjain

Di dalam kode Threadly ada beberapa bagian yang sengaja dikosongkan (ditandai `// TODO (Sesi 2)`).
Tugas kamu mengisinya pakai hooks yang udah dipelajari:

| Fitur | Hook yang dipakai | File |
|---|---|---|
| Judul tab jadi `Threadly (jumlah post)` | `useEffect` | `src/App.jsx` |
| Auto-focus input username saat buka login | `useRef` + `useEffect` | `src/pages/LoginPage.jsx` |
| Auto-focus kotak tulis + simpan draft ke localStorage | `useRef` + `useEffect` + `useState` | `src/components/PostComposer.jsx` |

> 💡 Konsepnya **sama persis** kayak yang di playground tadi — cuma sekarang diterapkan ke
> data & elemen yang beneran (post, input login, kotak tulis). Kalau stuck, inget-inget lagi
> contoh di Fase 1.

**Contoh hasil akhir (fitur simpan draft):** ketik sesuatu di kotak tulis → refresh halaman (F5) → tulisannya masih ada! ✨

---

# 🎁 BONUS — Good to Know

> Bagian ini **di luar materi inti**. Ga wajib, tapi bagus buat nambah wawasan. Baca santai aja. 😎

## ✨ Custom Hook — Bikin Hook Sendiri

**Custom Hook** = function buatan sendiri yang **menggabungkan beberapa hook** biar bisa **dipakai ulang**.

Misal logika "simpan sesuatu ke localStorage" (gabungan `useState` + `useEffect`) sering dipakai di banyak tempat. Daripada nulis ulang terus, bungkus jadi 1 hook:

### Aturan Custom Hook

1. **Nama wajib diawali `use`** → contoh: `useLocalStorage`.
2. Boleh memanggil hook lain di dalamnya (`useState`, `useEffect`, dst).

### Contoh: `useLocalStorage`

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

### Cara pakai

```jsx
// dipakai persis seperti useState, tapi otomatis tersimpan di localStorage
const [content, setContent] = useLocalStorage("draft", "");
```

**Lihat bedanya?** Logika localStorage yang tadinya `useState` + `useEffect` sekarang cukup 1 baris, dan bisa dipakai ulang di komponen mana pun.

> 💡 Custom hook lain yang umum: `useDocumentTitle(title)` (bungkus `useEffect` untuk `document.title`),
> atau `useWindowWidth()` (lebar layar yang update saat window di-resize). Intinya: **kalau ada logika hook yang berulang, bungkus jadi custom hook.**

---

## 🧭 Cara Pindah Halaman — `useState` vs `react-router-dom`

Aplikasi yang punya banyak halaman butuh cara buat pindah-pindah halaman. Salah satu cara paling sederhana: pakai **`useState`** buat nyimpen "halaman yang lagi aktif":

```jsx
const [page, setPage] = useState("home");

{page === "home" && <HomePage />}
{page === "profile" && <ProfilePage />}
```

Jadi "pindah halaman" = **ganti nilai state**. Simpel & ga perlu library tambahan. 👍

Tapi ini **bukan satu-satunya cara**. Ada library populer bernama **`react-router-dom`** yang khusus untuk routing.

### Bedanya apa?

| | Pakai `useState` | Pakai `react-router-dom` |
|---|---|---|
| URL berubah? | ❌ Tetap sama | ✅ Berubah (`/home`, `/profile`) |
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

Ngomong-ngomong, Threadly juga pindah halaman pakai cara `useState` di atas. Kalau penasaran pengen liat versi Threadly yang udah pakai `react-router-dom`, ada di branch terpisah `feat/react-router` di repo Threadly — silakan diintip buat perbandingan. 🔍
