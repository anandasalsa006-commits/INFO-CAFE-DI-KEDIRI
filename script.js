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
    
    // --- Nomor WhatsApp Tujuan ---
    // Ganti dengan nomor WhatsApp kafe Anda (tanpa tanda +, spasi, atau kurung)
    const whatsappNumber = '085850978793'; // Contoh: Ganti dengan nomor yang benar

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

        if (tableNumber === '' || isNaN(tableNumber)) {
            alert('Mohon masukkan Nomor Meja yang valid!');
            if (tableNumberInput) tableNumberInput.focus();
            return;
        }

        // 2. Kumpulkan Detail Pesanan
        const itemName = selectedItem.querySelector('h4').textContent;
        const itemPrice = selectedItem.querySelector('.price').textContent; // Asumsi ada elemen dengan class 'price'
        
        // 3. Format Pesan
        let message = `*☕ PESANAN BARU - KOPI SENJA ☕*%0a`; // %0a adalah karakter baris baru
        message += `-----------------------------------%0a`;
        message += `Nomor Meja: *${tableNumber}*%0a`;
        message += `-----------------------------------%0a`;
        message += `Item Pesanan:%0a`;
        message += `  - ${itemName} (${itemPrice})%0a`;
        message += `-----------------------------------%0a`;
        message += `Mohon segera diproses. Terima kasih!%0a`;

        // 4. Buat Tautan WhatsApp
        // Menggunakan API wa.me untuk chat
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${message}`;

        // 5. Arahkan ke WhatsApp
        window.open(whatsappURL, '_blank');
        
        console.log('Pesanan telah dikirim ke WhatsApp!');
        // Opsional: Hapus highlight setelah pesanan dikirim
        selectedItem.classList.remove('highlighted');
        if (tableNumberInput) tableNumberInput.value = '';
    }
});
