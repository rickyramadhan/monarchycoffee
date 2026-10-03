# QA mockup Monarchy

- JavaScript: pemeriksaan `node --check`.
- Semua gambar, logo, dan aset yang direferensikan tersedia lokal.
- Pengujian DOM: routing utama, katalog/filter/pencarian/sort, detail produk, varian, keranjang/totals, checkout simulasi, tab B2B, brief konsultasi dengan escape input, dan validasi tools progresif.
- Batas: lingkungan pengujian DOM tidak melakukan layout browser, pemuatan font, atau inspeksi screenshot. Review visual desktop/mobile dan pengujian aksesibilitas browser aktual tetap diperlukan sebelum produksi.
- Tidak ada gateway pembayaran/CRM/order server yang terhubung; tidak ada klaim pembayaran berhasil yang nyata.

Hasil uji: 9 kelompok pengujian interaksi lulus, tanpa error runtime pada DOM pengujian. Input brief berkarakter HTML diuji agar dirender sebagai teks. Pemanggilan tool valid dan tidak valid diuji dalam registry yang disimulasikan; dukungan WebMCP browser aktual belum diverifikasi.
