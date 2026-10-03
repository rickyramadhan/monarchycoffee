# Monarchy Coffee — website mockup B2C + B2B

Front-end HTML, CSS, dan JavaScript murni. Tidak perlu build, framework, atau instalasi paket untuk menjalankan website.

## Menjalankan

Buka `dist/index.html` di browser modern, atau buka folder `dist` dengan VS Code Live Server. Alternatif dari terminal pada folder `dist`: `npx serve .`.

Pada paket ZIP, file website ditempatkan langsung pada folder utama: buka `index.html` atau jalankan `npx serve .`.

## Halaman dan interaksi

- Beranda editorial dengan dua pintu masuk: belanja dan bisnis.
- Katalog 7 produk asli: Spade Blend, Love Blend, Club Blend, Diamond Espresso, Americano Capsule, Sumatra Capsule, Monarchy Capsule Machine.
- Filter kategori, pencarian nama/rasa, pengurutan harga/nama, halaman detail, pilihan gilingan, jumlah produk.
- Keranjang lokal di browser; tambah, hapus, dan ubah jumlah.
- Checkout dengan validasi form, wilayah pengiriman, ongkir contoh, pilihan QRIS/VA/e-wallet, dan ringkasan simulasi.
- Landing page B2B: kafe/restoran, hotel/resort, kantor/coworking, olahraga/lifestyle; pasokan kopi, mesin dan program sewa, in-room coffee, persiapan kafe, pengembangan menu, white label, alur konsultasi, FAQ.
- Formulir B2B membuat brief untuk ditinjau, disalin, atau dibuka pada aplikasi email. Tidak mengirim otomatis.
- Cerita brand dan tiga Coffee Guide.
- Layout responsif, menu mobile, dialog native dengan keyboard Escape/focus containment, state kosong, feedback penambahan keranjang, reduced-motion support.

## Batas preview — baca sebelum digunakan untuk transaksi

Ini mockup front-end. Tidak ada gateway aktif, server pesanan, stok real-time, tarif pengiriman aktual, atau pembayaran nyata. Harga, kemasan jual (terutama 10 kapsul), opsi gilingan, dan ongkir adalah contoh; ketersediaan aktual belum diverifikasi. Produk dan foto berasal dari materi asli, bukan gambar produk yang digenerasi ulang. Tanggal pada foto kemasan merupakan bagian dari materi sumber, bukan informasi batch tersedia.

Pembayaran QRIS, Virtual Account, dan e-wallet memperlihatkan alur UI saja. Tidak ada kode QR atau nomor rekening transaksi nyata. Jangan memasukkan data pribadi aktual saat demonstrasi. Data checkout hanya hidup di memori halaman; data keranjang disimpan di localStorage perangkat ini.

Pasokan kopi, kapsul, mesin/sewa, dan white label tercantum pada company profile. Minimum white label: 250 kg/bulan. Layanan desain/pembangunan kafe, pelatihan, pendampingan menu, serta penerapan sektor baru dijabarkan sebagai kebutuhan konsultasi, bukan janji layanan yang telah terverifikasi. Model mesin, biaya, jangka waktu, cakupan konstruksi, pelaksana, dukungan, SLA, dan ketersediaan harus dikonfirmasi sebelum go-live.

Alamat email dari website resmi. Perbedaan nomor telepon pada website lama dan company profile tidak digunakan sebagai CTA WhatsApp agar tidak memilih kontak yang belum dikonfirmasi.

## Integrasi produksi yang perlu ditambahkan

1. Tetapkan katalog, harga, pajak, stok, ukuran kemasan, opsi giling, wilayah layanan, kebijakan pengiriman/retur, dan ketentuan kerja sama resmi.
2. Tambahkan backend checkout. Server memvalidasi ID produk, harga, stok, dan ongkir dari database; jangan percaya total dari browser.
3. Pilih payment gateway Indonesia (misalnya Midtrans atau Xendit) dan gunakan akun merchant serta sandbox resminya. Secret/API key hanya pada server. Front-end meminta sesi pembayaran dari server.
4. Gateway mengirim webhook ke backend; verifikasi signature, cocokkan nominal/order, dan proses secara idempoten. Status lunas berasal dari webhook terverifikasi, bukan tombol atau redirect browser.
5. Hubungkan pengiriman, database pesanan, notifikasi, serta pengurangan stok; uji gagal/batal/kedaluwarsa dan retry sebelum live.
6. Hubungkan lead B2B ke backend/CRM, tambahkan kebijakan privasi dan persetujuan final. Form saat ini hanya menyiapkan draft email.

## File yang sering diedit

- `index.html`: header, footer, metadata dan struktur utama.
- `styles.css`: token warna, typography, komponen, responsive, animasi.
- `app.js`: data produk, isi halaman, routing hash, keranjang, checkout dan brief.
- `assets/`: logo/foto lokal asli yang dipakai website.

Routing memakai hash agar tetap bekerja di hosting statis dan ketika file dibuka langsung. Font DM Sans dan Manrope melalui Google Fonts; fallback Arial tetap tersedia bila offline. Tanpa library JavaScript dari CDN.

## Arah desain dan referensi

Identitas kuning Monarchy dipadukan warna espresso dan latar terang. Fotografi asli menjadi fokus; ruang napas dan hierarki tipografi membuat B2C serta B2B sama-sama jelas. Tidak mengimpor foto, logo, atau klaim dari brand referensi.

- Monarchy Coffee: https://monarchycoffee.com/ — sumber logo, kapsul, mesin kapsul, brand dan kontak.
- `Comprof Renewed.pdf` dan screenshot yang dilampirkan pengguna — sumber foto signature blends, foto brand, white label, mesin komersial, sejarah dan portofolio pelanggan.
- Stumptown: https://www.stumptowncoffee.com/ — masukan pola navigasi shop/wholesale, mini cart, dan panduan memilih kopi.
- La Marzocco Australia: https://au.lamarzocco.com/ — masukan pemisahan kebutuhan home/commercial serta pembahasan alat dan dukungan.

Tidak ada klaim penghargaan, rating, testimoni, promo, atau jumlah pelanggan fiktif.

## Pengujian

Pemeriksaan sintaks JS, konsistensi referensi aset lokal, dan uji interaksi DOM tercatat di QA.md. Pengujian rendering visual lintas browser/perangkat belum dilakukan pada lingkungan ini; lakukan review Chrome/Safari mobile sebelum penggunaan produksi.
