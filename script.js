/*
 * File: script.js
 * Deskripsi: Keranjang multi-item + kirim ke WhatsApp
 * Asumsi HTML:
 * - Setiap .menu-item memiliki data-id (unik) dan data-price (angka tanpa pemisah)
 * - Ada tombol .add-to-cart di tiap menu-item
 * - Ada elemen #cartItems (ul), #cartTotal, #clearCartBtn, #tableNumberInput, #orderButton
 */

(() => {
  const phoneNumber = "6285850978793";
  const addButtons = document.querySelectorAll('.add-to-cart');
  const cartItemsEl = document.getElementById('cartItems');
  const cartTotalEl = document.getElementById('cartTotal');
  const orderButton = document.getElementById('orderButton');
  const tableInput = document.getElementById('tableNumberInput');
  const clearCartBtn = document.getElementById('clearCartBtn');

  const cart = {};

  addButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const itemEl = e.target.closest('.menu-item');
      const id = itemEl.dataset.id || itemEl.querySelector('h4').textContent.trim();
      const name = itemEl.querySelector('h4').textContent.trim();
      const price = parseInt(itemEl.dataset.price || itemEl.querySelector('.price')?.textContent?.replace(/[^\d]/g,'') || '0', 10);
      addToCart({ id, name, price });
    });
  });

  if (clearCartBtn) clearCartBtn.addEventListener('click', () => {
    if (confirm('Kosongkan keranjang?')) {
      for (const k of Object.keys(cart)) delete cart[k];
      renderCart();
    }
  });

  function addToCart({ id, name, price }) {
    if (!cart[id]) cart[id] = { id, name, price, qty: 1 };
    else cart[id].qty += 1;
    renderCart();
  }

  function updateQty(id, newQty) {
    if (!cart[id]) return;
    if (newQty <= 0) delete cart[id];
    else cart[id].qty = newQty;
    renderCart();
  }

  function renderCart() {
    if (!cartItemsEl) return;
    cartItemsEl.innerHTML = '';
    const keys = Object.keys(cart);
    if (keys.length === 0) {
      const li = document.createElement('li');
      li.className = 'empty';
      li.textContent = 'Belum ada pesanan';
      cartItemsEl.appendChild(li);
      cartTotalEl.textContent = formatRupiah(0);
      return;
    }
    let total = 0;
    keys.forEach(key => {
      const item = cart[key];
      total += item.price * item.qty;
      const li = document.createElement('li');
      li.innerHTML = `
        <div style="flex:1">
          <strong>${escapeHtml(item.name)}</strong>
          <div style="color:#666;font-size:13px">${formatRupiah(item.price)} / pcs</div>
        </div>
      `;
      const right = document.createElement('div');
      right.style.display = 'flex';
      right.style.alignItems = 'center';
      right.style.gap = '8px';

      const minus = document.createElement('button'); minus.textContent = '−';
      minus.addEventListener('click', () => updateQty(item.id, item.qty - 1));
      const qtySpan = document.createElement('span'); qtySpan.textContent = item.qty; qtySpan.style.minWidth='20px'; qtySpan.style.textAlign='center';
      const plus = document.createElement('button'); plus.textContent = '+';
      plus.addEventListener('click', () => updateQty(item.id, item.qty + 1));
      const subtotal = document.createElement('div'); subtotal.style.minWidth='90px'; subtotal.style.textAlign='right';
      subtotal.innerHTML = `<div style="font-weight:600">${formatRupiah(item.price * item.qty)}</div>`;
      const removeBtn = document.createElement('button'); removeBtn.textContent = 'Hapus';
      removeBtn.addEventListener('click', () => { if (confirm('Hapus item dari keranjang?')) { delete cart[item.id]; renderCart(); } });

      const qtyControls = document.createElement('div');
      qtyControls.appendChild(minus); qtyControls.appendChild(qtySpan); qtyControls.appendChild(plus);

      right.appendChild(qtyControls); right.appendChild(subtotal); right.appendChild(removeBtn);
      li.appendChild(right);
      cartItemsEl.appendChild(li);
    });
    cartTotalEl.textContent = formatRupiah(total);
  }

  function formatRupiah(value) {
    return 'Rp ' + String(value).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  function escapeHtml(text) {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return text.replace(/[&<>"']/g, m => map[m]);
  }

  if (orderButton) {
    orderButton.addEventListener('click', () => {
      const table = (tableInput?.value || '').trim();
      if (!/^\d+$/.test(table)) { alert('Silakan masukkan nomor meja yang valid.'); tableInput?.focus(); return; }
      const keys = Object.keys(cart);
      if (keys.length === 0) { alert('Keranjang kosong. Tambahkan minimal 1 item.'); return; }

      let lines = [];
      lines.push('Pesanan - Kopi Senja');
      lines.push(`Meja: ${table}`);
      lines.push('--------------------------------');
      let total = 0;
      keys.forEach(key => {
        const it = cart[key];
        const sub = it.price * it.qty; total += sub;
        lines.push(`${it.name} x${it.qty} — ${formatRupiah(sub)}`);
      });
      lines.push('--------------------------------');
      lines.push(`Total: ${formatRupiah(total)}`);
      lines.push('');
      lines.push('Mohon siapkan pesanan. Terima kasih!');

      const message = encodeURIComponent(lines.join('\n'));
      const waUrl = `https://wa.me/${phoneNumber}?text=${message}`;
      const newWin = window.open(waUrl, '_blank');
      if (!newWin) window.location.href = waUrl;
    });
  }

  // render awal
  renderCart();

})();
