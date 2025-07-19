
# Deployment Guide untuk GitHub Pages

## Langkah-langkah Deploy Manual

### 1. Persiapan Repository GitHub
1. Buat repository baru di GitHub dengan nama `lamsel-maju`
2. Push kode Anda ke repository tersebut
3. Pastikan branch utama adalah `main`

### 2. Konfigurasi GitHub Pages
1. Masuk ke repository Settings
2. Scroll ke bagian "Pages"
3. Pilih source: "GitHub Actions"
4. GitHub Actions workflow akan otomatis berjalan saat ada push ke main

### 3. Deployment Otomatis
GitHub Actions akan otomatis:
- Install dependencies
- Build project dengan konfigurasi production
- Deploy ke GitHub Pages
- Website akan tersedia di: `https://YOUR_USERNAME.github.io/lamsel-maju/`

### 4. Deploy Manual (Backup Method)
Jika automated deployment bermasalah:

```bash
# Install dependencies
npm install

# Build project
npm run build

# Deploy menggunakan gh-pages
npm install -g gh-pages
gh-pages -d dist
```

### 5. Troubleshooting

#### Website Blank/404 Error
- Pastikan base path di vite.config.ts sudah benar
- Periksa GitHub Pages settings menggunakan "GitHub Actions" source
- Tunggu beberapa menit setelah deployment untuk propagation

#### Assets Tidak Load
- Periksa base path configuration
- Pastikan semua asset menggunakan relative path
- Check browser console untuk error

#### Routing Issues
- GitHub Pages tidak mendukung client-side routing secara default
- Sudah ditangani dengan 404.html redirect script
- Semua route akan redirect ke index.html

### 6. Update Website
Setiap kali push ke branch main, website akan otomatis update melalui GitHub Actions.

### 7. Custom Domain (Opsional)
Untuk menggunakan domain custom:
1. Tambahkan file `CNAME` di public folder dengan domain Anda
2. Konfigurasi DNS domain untuk point ke GitHub Pages
3. Update GitHub Pages settings dengan custom domain

## Penting!
- Pastikan environment variable `NODE_ENV=production` saat build
- Base path sudah dikonfigurasi untuk GitHub Pages (`/lamsel-maju/`)
- SPA routing sudah ditangani dengan redirect script
