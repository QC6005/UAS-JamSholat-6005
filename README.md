# UAS-JamSholat-6005
UAS Pemrograman Aplikasi Mobile - Jam Sholat
<h1 align="center">Jam Sholat Digital</h1>

<p align="center">
<img src="./assets/images/logo.png" alt="Logo Aplikasi Jam Sholat Digital" width="128"/>
</p>

<p align="center">
Aplikasi jam sholat React Native (Expo)
</p>
<p align="center">
UAS Pemrograman Aplikasi Mobile(A2DLC)
</p>
<p align="center">
QORIDANI CHOIRUNNISAA / 24.01.53.6005
</p>

## 📖 Deskripsi
Aplikasi mobile berbasis React Native (Expo) yang menampilkan waktu sholat harian sesuai lokasi pengguna.
Fitur utama meliputi:

⏰ Jam real-time & hitung mundur ke sholat berikutnya

📍 Deteksi lokasi otomatis

🕌 Daftar waktu sholat harian

🔔 Alarm adzan (dengan opsi untuk dimatikan)

⚙️ Pengaturan metode perhitungan, mazhab, dan penyesuaian tanggal Hijriah

Tampilan sederhana, ramah pengguna, dan fokus pada fungsionalitas utama umat Muslim dalam menjalani ibadah harian.

Aplikasi ini dibuat untuk memenuhi UAS Mata Kuliah Pemrograman Aplikasi Mobile (QORIDANI CHOIRUNNISAA / 24.01.53.6005)


## ✏️ Memulai
### 1. Install Node.js
Pastikan Node.js sudah terinstall di, sebab React Native memerlukan Node.js untuk jalan.
### 2. Install Expo CLI
Buka cmd, lalu install Expo CLI dengan cara jalankan npm install -g expo-cli
### 3. Buat Project Baru
Untuk membuat project baru, ketik npx create-expo-app jamsholatku
setelah terinstall, masuk ke folder project baru tersebut, jalankan aplikasinya dengan mengetik npx expo start.
Jika sudah berhasil akan muncul QR code, scan menggunakan HP, pastikan sudah terinstall aplikasi ExpoGO, jangan lupa untuk login terlebih dahulu


## 🧾 Visual Studio code
Buka file yang sudah dibuat tadi melalui menu File-Open Folder, akan muncul folder dan file template

###🗂️ File app/_layout.js
Layout berisi entry point utama. Ktika mebuka aplikasi akan muncul splash screen, hingga font selesai dimuat, setelah siap, baru masuk ke halaman utama.

###🗂️ File app/_layout.js
Layout tab navigasi, letaknya dibawah, ada 2 tab: home & settings. Tab yang aktif berwarna kuning, yang tidak berwarna abu.

###🗂️ File app/(tabs)/index.js
Home Screen / halaman pertama ketika apps dibuka
Menampilkan informasi utama yaitu:
🕰️ Jam sekarang
📉 Hitung mundur ke waktu sholat berikutnya
📆 Tanggal Masehi & Hijriah
📍 Lokasi pengguna
🕌 Daftar waktu sholat

Salah satu  fungsi digunakan yaitu (usePrayerData) ➜ ambil data waktu sholat berdasarkan lokasi

###🗂️ File app/(tabs)/settings.js
Halaman Settings Screen, berisi pengaturan aplikasi, antara lain pengaturan metode perhitungan waktu sholat, mazhab Asar, penyesuaian tanggal Hijriah, dan toggle alarm adzan. Data pengaturan disimpan dan dimuat dari penyimpanan lokal lewat fungsi `loadSettings` dan `saveSettings`.


## 🔍 Preview / Simulasi Aplikasi
Preview aplikasi dilakukan melalui Aplikasi Expo Go. Gunakan 'expo go' untuk preview cepat, atau 'expo run:android' untuk tes fitur yang butuh akses langsung ke hardware atau build secara native

## 🛠 Build Aplikasi
Lakukan konfigurasi, gunakan '-eas build:configure' 
Kemudian untuk build aplikasinya, gunakan 'eas build --platform android'
Untuk menghasilkan file.apk agar dapat diinstal langsung (tidak perlu lewat playstore), perlu mengubah file eas.json.
cari profil preview (atau development).Tambahkan baris "android.buildType": "apk"

## 📲Download dan Install
Setelah proses build selesai, akan muncul tautan di terminal. Buka tautan tersebut di browser, lalu download file .apk yang sudah jadi. Pindahkan file tersebut ke perangkat Android, kemudian instal.

## 🔗Link JamSholat.APK
https://drive.google.com/drive/folders/1PKc5b3206LcJXVhauXH65nvfVz8fp-cA?usp=sharing
