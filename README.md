# 📝 Diary App – React + Vite + Heroku + PostgreSQL
## Salfadira Putri Enjeli 2E (24083000091)

**Live Website:** [https://diarysalfa2e.netlify.app](https://diarysalfa2e.netlify.app)

## 📌 Deskripsi

Diary App ini adalah aplikasi web sederhana yang memungkinkan pengguna untuk menulis, membaca, mengedit, dan menghapus catatan harian. Proyek ini menggunakan React di frontend, Express di backend, dan PostgreSQL sebagai database.

---

## ⚙️ Teknologi yang Digunakan

### 🖥️ Frontend
- [React](https://reactjs.org/) – Library untuk membangun antarmuka pengguna
- [Vite](https://vitejs.dev/) – Build tool yang cepat dengan dukungan HMR
- [Netlify](https://www.netlify.com/) – Platform untuk deploy frontend

### 🔧 Backend
- [Node.js](https://nodejs.org/) & [Express](https://expressjs.com/) – Framework untuk membuat REST API
- [Heroku](https://www.heroku.com/) – Platform deployment backend
- [PostgreSQL](https://www.postgresql.org/) – Database relasional

---

## 🔗 API Endpoints

| Method | Endpoint              | Deskripsi                          |
|--------|-----------------------|------------------------------------|
| POST   | `/api/adddiary`       | Tambahkan catatan baru             |
| GET    | `/api/diary`          | Ambil semua catatan                |
| GET    | `/api/getdiary/:id`   | Ambil catatan berdasarkan ID       |
| PUT    | `/api/edit/:id`       | Edit catatan berdasarkan ID        |
| DELETE | `/api/delete/:id`     | Hapus catatan berdasarkan ID       |

---

## 📁 Struktur Folder

