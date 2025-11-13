/*
 * File: script.js
 * Deskripsi: Interaktivitas untuk Kafe Kopi Senja
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Ambil elemen-elemen yang dibutuhkan
    const header = document.querySelector('header');
    const menuListItems = document.querySelectorAll('#menu ul li');

    // --- Fungsi Scroll Header ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            // Tambahkan kelas 'scrolled' setelah menggulir 50px
            header.classList.add('scrolled');
        } else {
            // Hapus kelas 'scrolled' jika kembali ke atas
            header.classList.remove('scrolled');
        }
    });

    // --- Fungsi Highlight Menu Item saat diklik ---
    menuListItems.forEach(item => {
        item.addEventListener('click', () => {
            // Hapus kelas 'highlighted' dari semua item terlebih dahulu
            menuListItems.forEach(i => i.classList.remove('highlighted'));

            // Tambahkan kelas 'highlighted' hanya pada item yang diklik
            item.classList.add('highlighted');
            
            // Opsional: Tampilkan pesan konfirmasi di console
            const itemName = item.querySelector('strong').textContent;
            console.log(`Item dipilih: ${itemName}`);
        });
    });
});
