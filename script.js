
const addToCartButtons = document.querySelectorAll(".add-to-cart");
const cartModal = document.getElementById("cart-modal");
const cartToggle = document.getElementById("cart-toggle");
const closeCart = document.getElementById("close-cart");
const cartItemsContainer = document.querySelector(".cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");
const filterButtons = document.querySelectorAll(".filter-btn");
const searchBar = document.getElementById("search-bar");
const productCards = document.querySelectorAll(".product-card");

// Cart Array 
let cart = [];

// Cart Toggle
if (cartToggle && cartModal) {
  cartToggle.addEventListener("click", () => {
    cartModal.classList.toggle("active");
  });
}
if (closeCart && cartModal) {
  closeCart.addEventListener("click", () => {
    cartModal.classList.remove("active");
  });
}

// Add to Cart
addToCartButtons.forEach(button => {
  button.addEventListener("click", () => {
    const productCard = button.closest(".product-card");
    const id = productCard.getAttribute("data-id");
    const name = productCard.getAttribute("data-name");
    const price = parseFloat(productCard.querySelector("p").textContent.replace("$", ""));

    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ id, name, price, quantity: 1 });
    }

    updateCart();
    showToast(`🛒 ${name} added to cart!`);
  });
});

// Update Cart Display 
function updateCart() {
  cartItemsContainer.innerHTML = "";
  let total = 0;
  let count = 0;

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.name}</span>
      <span>x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</span>
      <button class="remove-btn" data-index="${index}"><i class="fas fa-trash-alt"></i></button>
    `;
    cartItemsContainer.appendChild(li);
    total += item.price * item.quantity;
    count += item.quantity;
  });

  cartTotal.textContent = total.toFixed(2);
  cartCount.textContent = count;

document.querySelectorAll(".remove-btn").forEach(button => {
  button.addEventListener("click", () => {
    const index = parseInt(button.getAttribute("data-index"));
    if (cart[index].quantity > 1) {
      cart[index].quantity--;
      showToast("➖ Quantity reduced!");
    } else {
      cart.splice(index, 1);
      showToast("❌ Item removed!");
    }
    updateCart();
  });
});

}

function showToast(message) {
  const toast = document.getElementById("toast");
  if (toast) {
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2000);
  }
}

// Filter by Category
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const category = button.getAttribute("data-category");

    productCards.forEach(card => {
      const cardCategory = card.getAttribute("data-category");
      card.style.display = (category === "all" || cardCategory === category) ? "block" : "none";
    });
  });
});

//Search 
searchBar.addEventListener("input", () => {
  const query = searchBar.value.toLowerCase();
  productCards.forEach(card => {
    const name = card.getAttribute("data-name").toLowerCase();
    card.style.display = name.includes(query) ? "block" : "none";
  });
});

