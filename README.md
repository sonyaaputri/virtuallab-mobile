![Background](assets/images/Background.png)

# Virtual Lab Fisika — Mobile App

[![Platform](https://img.shields.io/badge/Platform-Android-green)](#)
[![Framework](https://img.shields.io/badge/Framework-Expo%20React%20Native-blue)](#)
[![Backend](https://img.shields.io/badge/Backend-Railway-purple)](#)

---

## Deskripsi Singkat
Virtual Lab Fisika adalah aplikasi pembelajaran fisika berbasis **mobile (Android)** yang menyediakan simulasi interaktif, games edukatif, dan quiz untuk membantu siswa memahami konsep fisika secara lebih visual dan praktis.  
Aplikasi ini merupakan hasil **konversi dari Virtual Lab Fisika versi web ke aplikasi mobile** menggunakan Expo (React Native).

---

## Fitur Utama
- **Autentikasi**: Login & registrasi pengguna
- **Modul**: Materi pembelajaran fisika
- **Simulasi**: Simulasi fisika interaktif dengan visualisasi real-time  
- **Games**: Permainan edukatif berbasis konsep fisika
- **Quiz**: Latihan soal dengan feedback instan

---

## Fitur Unggulan
- **Interactive Simulation**: Eksperimen virtual real-time  
- **Data Visualization**: Animasi & perhitungan simulasi secara langsung  
- **Progress Per User**: Data simulasi tersimpan untuk setiap pengguna  
- **Mobile Optimized UI**: Tampilan disesuaikan untuk perangkat Android  
- **Multiple Labs**: Beragam topik fisika  
- **Sound Animation**: Efek audio untuk pengalaman belajar yang lebih immersive  

> Catatan:  
> Fitur **download hasil simulasi** tidak tersedia pada versi mobile karena keterbatasan dukungan MediaRecorder pada WebView (Expo).

---

## Teknologi
- **Mobile App**: Expo (React Native), TypeScript  
- **Navigasi**: Expo Router  
- **Simulasi**: WebView (HTML, CSS, JavaScript)  
- **Penyimpanan Lokal**: AsyncStorage  
- **Backend API**: Railway  

---

## Cara Menjalankan (Development)
1. Install dependencies:
   
       npm install

2. Jalankan Expo:
   
       npx expo start

3. Jalankan di:
   - Android Emulator atau perangkat fisik (Expo Go)
   - Build APK sesuai kebutuhan tugas

---

## Struktur Singkat
- `app/` — halaman aplikasi (Expo Router)
- `assets/web/simulation/` — file HTML/CSS/JS simulasi (WebView)
- `app/api/` — helper request API (auth, config)
- `styles/` — styling tampilan

---

## Repository
- **GitHub (Mobile)**: https://github.com/sonyaaputri/virtuallab-mobile.git  
- **Backend API**: https://virtuallab-production.up.railway.app  
