// 🎁 BONUS (SOLUTION) — Custom Hook: useLocalStorage
// Ini contoh custom hook untuk section BONUS (take-home).
// Idenya: bungkus logika useState + localStorage yang tadi dipakai di PostComposer
// jadi 1 hook yang reusable.
//
// Cara pakai:
//   const [content, setContent] = useLocalStorage("threadly-draft", "");
// Sama persis seperti useState biasa, tapi nilainya otomatis tersimpan di localStorage.

import { useState, useEffect } from "react";

// ATURAN CUSTOM HOOK:
//   1. Namanya WAJIB diawali kata "use"  → useLocalStorage
//   2. Boleh memanggil hook lain di dalamnya (useState, useEffect, dll)
export function useLocalStorage(key, initialValue) {
  // baca nilai lama dari localStorage (kalau ada), kalau tidak pakai initialValue
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved !== null ? saved : initialValue;
  });

  // tiap value berubah → simpan ke localStorage
  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  // kembalikan [value, setValue] persis seperti useState
  return [value, setValue];
}

// ---------------------------------------------------------------
// Contoh PostComposer yang SUDAH pakai custom hook di atas:
//
// import { useLocalStorage } from "../hooks/useLocalStorage";
//
// function PostComposer({ currentUser, onNewPost }) {
//   const [content, setContent] = useLocalStorage("threadly-draft", "");
//   // ...sisanya sama, tapi useState + useEffect localStorage-nya HILANG,
//   //    karena logikanya udah pindah ke dalam useLocalStorage 🎉
// }
// ---------------------------------------------------------------
