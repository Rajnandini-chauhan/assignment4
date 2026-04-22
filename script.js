const services = [
  { id: 1, name: 'Dry Cleaning', price: 200 },
  { id: 2, name: 'Wash & Fold', price: 100 },
  { id: 3, name: 'Ironing', price: 30 },
  { id: 4, name: 'Stain Removal', price: 500 }
];

let cart = [];

function renderServices() {
  const list = document.getElementById('services-list');

  list.innerHTML = services.map(s => `
    <div class="service-item">
      <span>${s.name} - ₹${s.price}</span>
      <button class="${cart.includes(s.id) ? 'btn-remove' : 'btn-add'}"
        onclick="toggleItem(${s.id})">
        ${cart.includes(s.id) ? 'Remove' : 'Add'}
      </button>
    </div>
  `).join('');
}

function toggleItem(id) {
  if (cart.includes(id)) {
    cart = cart.filter(i => i !== id);
  } else {
    cart.push(id);
  }
  renderServices();
  renderCart();
}

function renderCart() {
  const body = document.getElementById('cart-body');
  const table = document.getElementById('cart-table');
  const empty = document.getElementById('cart-empty-state');

  if (cart.length === 0) {
    empty.style.display = "block";
    table.style.display = "none";
    document.getElementById('total-amount').innerText = "₹0";
    return;
  }

  empty.style.display = "none";
  table.style.display = "table";

  let total = 0;

  body.innerHTML = cart.map(id => {
    const item = services.find(s => s.id === id);
    total += item.price;
    return `<tr><td>${item.name}</td><td>₹${item.price}</td></tr>`;
  }).join('');

  document.getElementById('total-amount').innerText = `₹${total}`;
}

function bookNow() {
  const name = document.getElementById('book-name').value;

  if (!name || cart.length === 0) {
    alert("Fill details + add service");
    return;
  }

  document.getElementById('book-success').style.display = "block";

  cart = [];
  renderServices();
  renderCart();
}

renderServices();
renderCart();