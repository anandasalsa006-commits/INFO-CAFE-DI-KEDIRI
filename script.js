/*
 * File: script.js
 * Deskripsi: Interaktivitas untuk Kafe Kopi Senja
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Ambil elemen-elemen yang dibutuhkan
    const header = document.querySelector('header');
    const menuItems = document.querySelectorAll('.menu-item'); // Ambil item menu kopi
    
    // --- Elemen Baru untuk Pesanan WhatsApp ---
    const orderButton = document.querySelector('#orderButton'); // Tombol "Pesan Sekarang" (Asumsi: ID orderButton)
    const tableNumberInput = document.querySelector('#tableNumberInput'); // Input Nomor Meja (Asumsi: ID tableNumberInput)
    
    // --- Nomor WhatsApp Tujuan DENGAN PERBAIKAN ---
    // Nomor WhatsApp dalam format internasional (kode negara 62, tanpa 0 di depan, tanpa simbol).
    // Dulu: '085850978793'
    const whatsappNumber = '6285850978793'; // Diperbaiki: Menggunakan 62 sebagai kode negara

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

    // --- Fungsionalitas Pesanan WhatsApp Baru ---
    if (orderButton) {
        orderButton.addEventListener('click', () => {
            sendOrderToWhatsApp();
        });
    }

    function sendOrderToWhatsApp() {
        const selectedItem = document.querySelector('.menu-item.highlighted');
        const tableNumber = tableNumberInput ? tableNumberInput.value.trim() : 'Tidak Ada';

        // 1. Validasi
        if (!selectedItem) {
            alert('Mohon pilih satu menu terlebih dahulu sebelum memesan!');
            return;
        }

        // Memastikan input meja adalah angka dan tidak kosong
        if (tableNumber === '' || isNaN(tableNumber)) {
            alert('Mohon masukkan Nomor Meja yang valid!');
            if (tableNumberInput) tableNumberInput.focus();
            return;
        }

        // 2. Kumpulkan Detail Pesanan
        const itemName = selectedItem.querySelector('h4').textContent;
        const itemPrice = selectedItem.querySelector('.price').textContent; // Asumsi ada elemen dengan class 'price'
        
        // 3. Format Pesan
        // Menggunakan encodeURIComponent untuk memastikan pesan aman di URL
        let rawMessage = `☕ PESANAN BARU - KOPI SENJA ☕
-----------------------------------
Nomor Meja: *${tableNumber}*
-----------------------------------
Item Pesanan:
  - ${itemName} (${itemPrice})
-----------------------------------
Mohon segera diproses. Terima kasih!`;

        const encodedMessage = encodeURIComponent(rawMessage);

        // 4. Buat Tautan WhatsApp
        // Menggunakan API wa.me dengan nomor yang sudah diformat dan pesan yang di-encode
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        // 5. Arahkan ke WhatsApp
        window.open(whatsappURL, '_blank');
        
        console.log('Pesanan telah dikirim ke WhatsApp!');
        // Opsional: Hapus highlight setelah pesanan dikirim
        selectedItem.classList.remove('highlighted');
        if (tableNumberInput) tableNumberInput.value = '';
    }
});
