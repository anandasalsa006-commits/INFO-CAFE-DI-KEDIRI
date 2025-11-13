/*
 * File: script.js
 * Deskripsi: Interaktivitas untuk Kafe Kopi Senja
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Ambil elemen-elemen yang dibutuhkan
    const header = document.querySelector('header');
    const menuItems = document.querySelectorAll('.menu-item'); // Ambil item menu kopi

    // --- Fungsi Scroll Header (Sticky Effect) ---
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
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            // Hapus kelas 'highlighted' dari semua item terlebih dahulu
            menuItems.forEach(i => i.classList.remove('highlighted'));

            // Tambahkan kelas 'highlighted' hanya pada item yang diklik
            item.classList.add('highlighted');
            
            const itemName = item.querySelector('h4').textContent;
            console.log(`Menu ${itemName} dipilih sebagai favorit!`);
        });
    });
});
