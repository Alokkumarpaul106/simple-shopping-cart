
const products = [
    { id: 1, name: "Mobile Phone",des:"This smartphone offers fast performance, long battery life, and a modern design for everyday use.",price: 200, img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400" },
    { id: 2, name: "Headphone",des:"This headphones deliver clear sound with deep bass for an immersive listening experience.", price: 50, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400" },
    { id: 3, name: "Laptop",des:"This laptop offers powerful performance and efficient multitasking for work and study.", price: 800, img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400" },
    { id: 4, name: "Smart Watch",des:"This smartwatch helps you track fitness activities and monitor health in real time.", price: 100, img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400" },
    { id: 5, name: "Mechanical Keyboard",des:"This mechanical keyboard provides tactile feedback and fast, accurate keystrokes for typing and gaming.", price: 20, img: "https://media.wired.com/photos/65b0438c22aa647640de5c75/1:1/w_1800,h_1800,c_limit/Mechanical-Keyboard-Guide-Gear-GettyImages-1313504623.jpg" },
    { id: 5, name: "Moush Pad", des:"This mouse pad provides a smooth surface for precise ,accurate cursor control andcomfort during long hours of use.",price: 5, img: "https://www.techlandbd.com/storage/cbs/uploads/products/P0122506022/cover.jpg" }

];


let cart = [];


function displayProducts() {
    const productContainer = document.getElementById("product-list");
    
    
    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        
       
        productContainer.innerHTML += `
            <div class="col-md-6 mb-4">
                <div class="card h-100">
                    <img src="${product.img}" class="card-img-top product-img" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p>${product.des}</p>
                        <p class="card-text"><b>Price:</b> $${product.price}</p>
                        <button class="btn btn-primary w-100" onclick="addToCart(${product.id})">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
    }
}


function addToCart(productId) {
    
    const product = products.find(p => p.id === productId);

   
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1; 
    } else {
        
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    updateCartUI(); 
}


function updateCartUI() {
    const cartList = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const cartCountElement = document.getElementById("cart-count");

    cartList.innerHTML = ""; 
    let total = 0;
    let totalCount = 0;

   
    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        totalCount += item.quantity;

        cartList.innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <div>
                    <strong>${item.name}</strong><br>
                    <small>$${item.price} x ${item.quantity}</small>
                </div>
                <div>
                    <button class="btn btn-sm btn-secondary" onclick="changeQuantity(${item.id}, -1)">-</button>
                    <span class="mx-2">${item.quantity}</span>
                    <button class="btn btn-sm btn-secondary" onclick="changeQuantity(${item.id}, 1)">+</button>
                </div>
            </li>
        `;
    });

   
    totalPriceElement.innerText = total;
    cartCountElement.innerText = totalCount;

   
    if (cart.length === 0) {
        cartList.innerHTML = "<li class='list-group-item text-center'>Cart is empty</li>";
    }
}


function changeQuantity(id, amount) {
    const item = cart.find(item => item.id === id);

    if (item) {
        item.quantity += amount;
        
        
        if (item.quantity <= 0) {
            cart = cart.filter(p => p.id !== id);
        }
    }
    updateCartUI();
}


function clearCart() {
    cart = []; 
    updateCartUI();
}


function checkout() {
    if (cart.length > 0) {
        alert("Thanks for purchasing! Total Bill: $" + document.getElementById("total-price").innerText);
        cart = [];
        updateCartUI();
        toggleCart(); 
    } else {
        alert("Your cart is empty!");
    }
}


function toggleCart() {
    const cartSection = document.getElementById("cart-section");
    if (cartSection.style.display === "none") {
        cartSection.style.display = "block";
    } else {
        cartSection.style.display = "none";
    }
}


displayProducts();