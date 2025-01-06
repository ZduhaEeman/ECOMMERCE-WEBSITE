// Add-to-Cart functionality
document.getElementById('add-to-cart').addEventListener('click', function () {
    // Example product details (replace with dynamic data if available)
    const productDetails = {
        id: 1, // Example product ID
        name: "Mens Long Sleeve T-shirt Cotton Base Layer Slim Muscle",
        price: 98.00, // Example price
        quantity: 1,
    };

    // Get current cart from localStorage or initialize an empty cart
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the product is already in the cart
    const existingProduct = cart.find(item => item.id === productDetails.id);
    if (existingProduct) {
        // Increment quantity if already in cart
        existingProduct.quantity += 1;
    } else {
        // Add new product to cart
        cart.push(productDetails);
    }

    // Save updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Notify the user
    alert("Product added to cart!");
});



// Display cart items on the checkout page (task33.html)
function displayCartItems() {
    // Get cart data from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Get the container where the cart items will be displayed
    const cartContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    cartContainer.innerHTML = ''; // Clear previous content

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty!</p>';
        totalPriceElement.textContent = '$0.00';
        return;
    }

    let totalPrice = 0;

    // Loop through the cart and create HTML for each item
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('flex', 'items-center', 'justify-between', 'border-b', 'py-2');

        itemElement.innerHTML = `
            <div>
                <p class="font-semibold">${item.name}</p>
                <p class="text-sm text-gray-500">Price: $${item.price.toFixed(2)}</p>
                <p class="text-sm text-gray-500">Quantity: ${item.quantity}</p>
            </div>
            <button data-id="${item.id}" class="remove-item text-red-500 hover:underline">Remove</button>
        `;

        cartContainer.appendChild(itemElement);

        totalPrice += item.price * item.quantity;
    });

    totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;

    // Add event listeners to Remove buttons
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function () {
            removeFromCart(parseInt(this.dataset.id));
        });
    });
}

// Remove item from cart
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
}

// Call displayCartItems when the page loads
if (document.getElementById('cart-items')) {
    displayCartItems();
}
