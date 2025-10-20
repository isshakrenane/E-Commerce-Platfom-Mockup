
// Sample Product Data
const products = [
    {
        id: 'p1',
        name: 'Wireless Bluetooth Headphones',
        price: 79.99,
        image: 'images/wirelessbluetoothheadphones1.jpg',
        description: 'Experience immersive sound with these comfortable and stylish wireless headphones. Featuring long-lasting battery life and crystal-clear audio.',
        category: 'Electronics'
    },
    {
        id: 'p2',
        name: 'Smartwatch with Heart Rate Monitor',
        price: 129.99,
        image: 'images/Smartwatch.jpg',
        description: 'Stay connected and track your fitness goals with this advanced smartwatch. Comes with a vibrant display and multiple sports modes.',
        category: 'Electronics'
    },
    {
        id: 'p3',
        name: 'Ergonomic Office Chair',
        price: 249.00,
        image: 'images/officechair.jpg',
        description: 'Improve your posture and comfort with this premium ergonomic office chair. Designed for long hours of work.',
        category: 'Home & Office'
    },
    {
        id: 'p4',
        name: 'Portable Espresso Maker',
        price: 59.50,
        image: 'images/espressomaker1.jpg',
        description: 'Enjoy your favorite coffee on the go with this compact and easy-to-use portable espresso maker. Perfect for travel and outdoor adventures.',
        category: 'Kitchen'
    },
    {
        id: 'p5',
        name: 'Noise-Cancelling Earbuds',
        price: 99.99,
        image: 'images/earbuds1.jpg',
        description: 'Immerse yourself in your music with these high-fidelity noise-cancelling earbuds. Perfect for commutes and focus.',
        category: 'Electronics'
    },
    {
        id: 'p6',
        name: 'Digital Camera 4K',
        price: 499.00,
        image: 'images/digitalcamera1.jpg',
        description: 'Capture stunning photos and videos with this professional-grade 4K digital camera. Easy to use for beginners, powerful for pros.',
        category: 'Electronics'
    },
    {
        id: 'p7',
        name: 'Robot Vacuum Cleaner',
        price: 349.00,
        image: 'images/vacuumcleaner1.jpg',
        description: 'Keep your home spotless effortlessly with this smart robot vacuum. Schedule cleanings and control from your phone.',
        category: 'Home Appliances'
    },
    {
        id: 'p8',
        name: 'Luxury Leather Wallet',
        price: 65.00,
        image: 'images/leatherwallet1.jpg',
        description: 'A sleek and durable leather wallet with multiple card slots and a coin pouch. Crafted for elegance and utility.',
        category: 'Accessories'
    }
];

let cart = []; // Stores items in the cart: [{ productId: 'p1', quantity: 1 }]

// --- Product Rendering ---
/**
 * Creates an HTML product card element.
 * @param {Object} product - The product object.
 * @returns {HTMLElement} The created product card element.
 */
function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <div class="product-card-content">
            <h3>${product.name}</h3>
            <p>${product.description.substring(0, 70)}...</p>
            <div class="product-card-footer">
                <span class="product-price">£${product.price.toFixed(2)}</span>
                <button class="button button-primary" onclick="addToCart('${product.id}')">Add to Cart</button>
            </div>
        </div>
    `;
    // Add click listener to navigate to product detail section
    productCard.addEventListener('click', () => showProductDetail(product.id));
    return productCard;
}

/**
 * Renders products into a specified grid container.
 * @param {Array<Object>} productsToRender - Array of product objects to render.
 * @param {string} gridId - The ID of the HTML element where products should be rendered.
 */
function renderProducts(productsToRender, gridId) {
    const productsGrid = document.getElementById(gridId);
    if (!productsGrid) {
        console.error(`Product grid with ID "${gridId}" not found.`);
        return;
    }
    productsGrid.innerHTML = ''; // Clear previous products
    productsToRender.forEach(product => {
        productsGrid.appendChild(createProductCard(product));
    });
}

/**
 * Renders the initial featured products on page load.
 */
function renderFeaturedProducts() {
    // Display first 4 products as featured
    renderProducts(products.slice(0, 4), 'featured-products-grid');
}

// --- Product Detail Logic ---
/**
 * Displays the product detail section for a given product ID.
 * @param {string} productId - The ID of the product to display.
 */
function showProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    const productDetailSection = document.getElementById('product-detail-section');
    const productDetailContent = document.getElementById('product-detail-content');

    if (product) {
        productDetailContent.innerHTML = `
            <div class="product-detail-image-container">
                <img src="${product.image}" alt="${product.name}" class="product-detail-image">
            </div>
            <div class="product-detail-info">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <div style="display: flex; align-items: center; margin-bottom: 24px;">
                    <span class="product-detail-price">\u00a3${product.price.toFixed(2)}</span>
                    <span class="product-category">${product.category}</span>
                </div>
                <div class="product-actions">
                    <button class="button button-primary" onclick="addToCart('${product.id}')">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Add to Cart</span>
                    </button>
                    <button class="button button-secondary" onclick="hideProductDetail()">Back to Products</button>
                </div>
            </div>
        `;
        productDetailSection.classList.remove('hidden'); // Show the section
        productDetailSection.scrollIntoView({ behavior: 'smooth' }); // Scroll to it
    } else {
        productDetailContent.innerHTML = `<p style="text-align: center; color: #ef4444;">Product not found.</p>`;
        productDetailSection.classList.remove('hidden');
        productDetailSection.scrollIntoView({ behavior: 'smooth' });
    }
}

/**
 * Hides the product detail section.
 */
function hideProductDetail() {
    document.getElementById('product-detail-section').classList.add('hidden');
    // Optionally scroll back to products section
    document.getElementById('products-section').scrollIntoView({ behavior: 'smooth' });
}

// --- Cart Logic ---
/**
 * Updates the displayed count of items in the cart.
 */
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = totalItems;
}

/**
 * Adds a product to the cart or increments its quantity if already present.
 * @param {string} productId - The ID of the product to add.
 */
function addToCart(productId) {
    const existingItem = cart.find(item => item.productId === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ productId: productId, quantity: 1 });
    }
    updateCartCount();
    renderCart(); // Re-render cart to show changes
    alertMessage('Item added to cart!', 'success');
}

/**
 * Removes a product from the cart.
 * @param {string} productId - The ID of the product to remove.
 */
function removeFromCart(productId) {
    cart = cart.filter(item => item.productId !== productId);
    updateCartCount();
    renderCart();
    alertMessage('Item removed from cart.', 'info');
}

/**
 * Updates the quantity of a product in the cart.
 * @param {string} productId - The ID of the product.
 * @param {number} newQuantity - The new quantity for the product.
 */
function updateCartQuantity(productId, newQuantity) {
    const item = cart.find(item => item.productId === productId);
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = newQuantity;
        }
    }
    updateCartCount();
    renderCart();
}

/**
 * Renders the current state of the shopping cart.
 */
function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalSpan = document.getElementById('cart-total');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const cartSummary = document.getElementById('cart-summary');

    cartItemsContainer.innerHTML = ''; // Clear previous cart items
    let total = 0;

    if (cart.length === 0) {
        emptyCartMessage.style.display = 'block';
        cartSummary.classList.add('hidden'); // Hide summary if empty
    } else {
        emptyCartMessage.style.display = 'none';
        cartSummary.classList.remove('hidden'); // Show summary if not empty
        cart.forEach(cartItem => {
            const product = products.find(p => p.id === cartItem.productId);
            if (product) {
                const itemTotal = product.price * cartItem.quantity;
                total += itemTotal;

                const cartItemDiv = document.createElement('div');
                cartItemDiv.className = 'cart-item';
                cartItemDiv.innerHTML = `
                    <div class="cart-item-details">
                        <img src="${product.image}" alt="${product.name}">
                        <div>
                            <h3>${product.name}</h3>
                            <p>\u00a3${product.price.toFixed(2)}</p>
                        </div>
                    </div>
                    <div class="cart-item-actions">
                        <div class="quantity-control">
                            <button onclick="updateCartQuantity('${product.id}', ${cartItem.quantity - 1})">-</button>
                            <span>${cartItem.quantity}</span>
                            <button onclick="updateCartQuantity('${product.id}', ${cartItem.quantity + 1})">+</button>
                        </div>
                        <span class="cart-item-total">\u00a3${itemTotal.toFixed(2)}</span>
                        <button class="remove-item-button" onclick="removeFromCart('${product.id}')">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                `;
                cartItemsContainer.appendChild(cartItemDiv);
            }
        });
    }
    cartTotalSpan.textContent = `\u00a3${total.toFixed(2)}`;
}

/**
 * Shows the checkout form section.
 */
function showCheckoutForm() {
    const checkoutSection = document.getElementById('checkout-section');
    checkoutSection.classList.remove('hidden');
    checkoutSection.scrollIntoView({ behavior: 'smooth' });
}

// --- Checkout Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(event) {
            event.preventDefault();
            // Simulate order placement
            alertMessage('Order placed successfully! Thank you for your purchase.', 'success');
            cart = []; // Clear cart after checkout
            updateCartCount();
            renderCart(); // Update cart display
            document.getElementById('checkout-section').classList.add('hidden'); // Hide checkout form
            document.getElementById('home').scrollIntoView({ behavior: 'smooth' }); // Go back to home section
        });
    }
});


// --- Alert Message (instead of alert()) ---
/**
 * Displays a custom alert message.
 * @param {string} message - The message to display.
 * @param {string} type - The type of alert ('success', 'info', 'error').
 */
function alertMessage(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert-message ${type}`;
    alertDiv.textContent = message;

    document.body.appendChild(alertDiv);

    // Show the alert (ensure it's visible before starting hide animation)
    requestAnimationFrame(() => {
        alertDiv.style.opacity = '1';
        alertDiv.style.transform = 'translateY(0)';
    });

    setTimeout(() => {
        alertDiv.classList.add('hide'); // Add hide class for animation
        alertDiv.addEventListener('transitionend', () => {
            alertDiv.remove(); // Remove element after transition
        }, { once: true }); // Ensure listener is only called once
    }, 3000); // Display for 3 seconds
}

// --- Sorting Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const sortByDropdown = document.getElementById('sort-by');
    if (sortByDropdown) {
        sortByDropdown.addEventListener('change', function(event) {
            const sortBy = event.target.value;
            let sortedProducts = [...products]; // Create a copy to sort

            if (sortBy === 'price-asc') {
                sortedProducts.sort((a, b) => a.price - b.price);
            } else if (sortBy === 'price-desc') {
                sortedProducts.sort((a, b) => b.price - a.price);
            } else if (sortBy === 'name-asc') {
                sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            } else if (sortBy === 'name-desc') {
                sortedProducts.sort((a, b) => b.name.locale(a.name)); // Fixed comparison for descending
            }
            renderProducts(sortedProducts, 'products-grid'); // Render into the main products grid
        });
    }
});


// Initial load:
window.onload = function() {
    renderFeaturedProducts(); // Render featured products on home page load
    renderProducts(products, 'products-grid'); // Render all products on the products section
    updateCartCount(); // Initialize cart count
    renderCart(); // Render cart initially (might be empty)
};
