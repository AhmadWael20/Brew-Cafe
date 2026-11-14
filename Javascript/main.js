// ================= PRODUCT DATA =================

const products = [
    {
        id: 1,
        nameEn: "Espresso",
        nameAr: "إسبريسو",
        descriptionEn: "Strong and rich Italian coffee.",
        descriptionAr: "قهوة إيطالية قوية وغنية بالنكهة.",
        category: "Coffee",
        price: 65,
        image: "Images/espresso.jpg",
        badge: "Popular"
    },
    {
        id: 2,
        nameEn: "Cappuccino",
        nameAr: "كابتشينو",
        descriptionEn: "Espresso with steamed milk foam.",
        descriptionAr: "إسبريسو مع رغوة الحليب الكريمية.",
        category: "Coffee",
        price: 85,
        image: "Images/cappuccino.jpg",
        badge: "Best Seller"
    },
    {
        id: 3,
        nameEn: "Cafe Latte",
        nameAr: "كافيه لاتيه",
        descriptionEn: "Smooth coffee with fresh milk.",
        descriptionAr: "قهوة ناعمة مع الحليب الطازج.",
        category: "Coffee",
        price: 90,
        image: "Images/latte.jpg",
        badge: ""
    },
    {
        id: 4,
        nameEn: "Americano",
        nameAr: "أمريكانو",
        descriptionEn: "Classic espresso with hot water.",
        descriptionAr: "إسبريسو كلاسيكي مع الماء الساخن.",
        category: "Coffee",
        price: 70,
        image: "Images/americano.jpg",
        badge: ""
    },
    {
        id: 5,
        nameEn: "Iced Coffee",
        nameAr: "آيس كوفي",
        descriptionEn: "Refreshing iced coffee.",
        descriptionAr: "قهوة مثلجة منعشة ولذيذة.",
        category: "Cold Drinks",
        price: 95,
        image: "Images/iced-coffee.jpg",
        badge: "Popular"
    },
    {
        id: 6,
        nameEn: "Frappe",
        nameAr: "فرابيه",
        descriptionEn: "Cold blended coffee drink.",
        descriptionAr: "مشروب قهوة بارد مخفوق.",
        category: "Cold Drinks",
        price: 110,
        image: "Images/frappe.jpg",
        badge: ""
    },
    {
        id: 7,
        nameEn: "Hot Chocolate",
        nameAr: "هوت شوكليت",
        descriptionEn: "Rich and creamy hot chocolate.",
        descriptionAr: "شوكولاتة ساخنة غنية وكريمية.",
        category: "Hot Drinks",
        price: 85,
        image: "Images/hot-chocolate.jpg",
        badge: ""
    },
    {
        id: 8,
        nameEn: "Fresh Tea",
        nameAr: "شاي",
        descriptionEn: "A classic cup of fresh tea.",
        descriptionAr: "كوب شاي كلاسيكي طازج.",
        category: "Hot Drinks",
        price: 35,
        image: "Images/tea.jpg",
        badge: ""
    },
    {
        id: 9,
        nameEn: "Cheesecake",
        nameAr: "تشيز كيك",
        descriptionEn: "Creamy cheesecake with a soft base.",
        descriptionAr: "تشيز كيك كريمي بطبقة طرية.",
        category: "Desserts",
        price: 100,
        image: "Images/cheesecake.jpg",
        badge: "Special"
    }
];


// ================= GLOBAL VARIABLES =================

let currentLanguage = localStorage.getItem("language") || "en";

let currentTheme = localStorage.getItem("theme") || "dark";

let currentCategory = "All";

let cart = [];


// ================= SELECT ELEMENTS =================

const productsContainer =
    document.getElementById("productsContainer");

const categoryList =
    document.getElementById("categoryList");

const searchInput =
    document.getElementById("searchInput");

const emptyMessage =
    document.getElementById("emptyMessage");

const languageToggle =
    document.getElementById("languageToggle");

const themeToggle =
    document.getElementById("themeToggle");

const cartButton =
    document.getElementById("cartButton");

const cartCount =
    document.getElementById("cartCount");

const cartItems =
    document.getElementById("cartItems");

const cartTotal =
    document.getElementById("cartTotal");

const checkoutBtn =
    document.getElementById("checkoutBtn");


// ================= LANGUAGE SYSTEM =================

function changeLanguage(language) {

    currentLanguage = language;

    document.documentElement.lang = language;

    document.documentElement.dir =
        language === "ar" ? "rtl" : "ltr";

    document.body.dir =
        language === "ar" ? "rtl" : "ltr";

    // Change all translated elements

    const translatedElements =
        document.querySelectorAll("[data-en][data-ar]");

    translatedElements.forEach(element => {

        element.textContent =
            language === "ar"
                ? element.dataset.ar
                : element.dataset.en;

    });

    // Change search placeholder

    searchInput.placeholder =
        language === "ar"
            ? searchInput.dataset.placeholderAr
            : searchInput.dataset.placeholderEn;

    // Change language button

    languageToggle.querySelector("span").textContent =
        language === "ar" ? "EN" : "AR";

    // Update product cards

    displayProducts();

    // Update shopping cart

    displayCart();

    // Save language preference

    localStorage.setItem("language", language);

}


// Language button event

languageToggle.addEventListener("click", () => {

    const newLanguage =
        currentLanguage === "en" ? "ar" : "en";

    changeLanguage(newLanguage);

});


// ================= DARK / LIGHT MODE =================

function changeTheme(theme) {

    currentTheme = theme;

    document.body.classList.toggle(
        "light-mode",
        theme === "light"
    );

    const themeIcon =
        themeToggle.querySelector("i");

    if (theme === "light") {

        themeIcon.className = "fa-solid fa-moon";

    } else {

        themeIcon.className = "fa-solid fa-sun";

    }

    localStorage.setItem("theme", theme);

}


// Theme button event

themeToggle.addEventListener("click", () => {

    const newTheme =
        currentTheme === "dark" ? "light" : "dark";

    changeTheme(newTheme);

});


// ================= DISPLAY PRODUCTS =================

function displayProducts() {

    const searchValue =
        searchInput.value.trim().toLowerCase();

    // Filter products

    const filteredProducts = products.filter(product => {

        const productName =
            currentLanguage === "ar"
                ? product.nameAr
                : product.nameEn;

        const productDescription =
            currentLanguage === "ar"
                ? product.descriptionAr
                : product.descriptionEn;

        const matchesCategory =
            currentCategory === "All" ||
            product.category === currentCategory;

        const matchesSearch =
            productName.toLowerCase().includes(searchValue) ||
            productDescription.toLowerCase().includes(searchValue);

        return matchesCategory && matchesSearch;

    });

    // Clear old products

    productsContainer.innerHTML = "";

    // Show empty message

    emptyMessage.classList.toggle(
        "d-none",
        filteredProducts.length !== 0
    );

    // Create product cards

    filteredProducts.forEach(product => {

        const productName =
            currentLanguage === "ar"
                ? product.nameAr
                : product.nameEn;

        const productDescription =
            currentLanguage === "ar"
                ? product.descriptionAr
                : product.descriptionEn;

        const badgeText =
            currentLanguage === "ar"
                ? (
                    product.badge === "Popular" ? "الأكثر طلبًا" :
                    product.badge === "Best Seller" ? "الأكثر مبيعًا" :
                    product.badge === "Special" ? "مميز" : ""
                )
                : product.badge;

        const priceText =
            currentLanguage === "ar"
                ? `${product.price} ج.م`
                : `${product.price} EGP`;

        const card = document.createElement("div");

        card.className = "col-lg-4 col-md-6";

        card.innerHTML = `

            <div class="product-card">

                <div class="product-image">

                    <img
                        src="${product.image}"
                        alt="${productName}"
                        loading="lazy">

                    ${
                        product.badge
                            ? `<span class="product-badge">
                                ${badgeText}
                               </span>`
                            : ""
                    }

                </div>

                <div class="product-info">

                    <h5>${productName}</h5>

                    <p>${productDescription}</p>

                    <div class="product-bottom">

                        <span class="product-price">
                            ${priceText}
                        </span>

                        <button
                            class="add-cart-btn"
                            data-id="${product.id}"
                            aria-label="Add ${productName} to cart">

                            <i class="fa-solid fa-plus"></i>

                        </button>

                    </div>

                </div>

            </div>

        `;

        productsContainer.appendChild(card);

    });

}


// ================= CATEGORY FILTER =================

categoryList.addEventListener("click", event => {

    const button =
        event.target.closest(".category-btn");

    if (!button) return;

    // Remove active class

    document.querySelectorAll(".category-btn")
        .forEach(btn => btn.classList.remove("active"));

    // Add active class

    button.classList.add("active");

    // Get selected category

    currentCategory = button.dataset.category;

    displayProducts();

});


// ================= SEARCH =================

searchInput.addEventListener("input", () => {

    displayProducts();

});


// ================= ADD TO CART =================

productsContainer.addEventListener("click", event => {

    const button =
        event.target.closest(".add-cart-btn");

    if (!button) return;

    const productId =
        Number(button.dataset.id);

    const selectedProduct =
        products.find(product => product.id === productId);

    if (!selectedProduct) return;

    // Check if product already exists

    const existingItem =
        cart.find(item => item.id === productId);

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            ...selectedProduct,
            quantity: 1
        });

    }

    updateCart();

});


// ================= UPDATE CART =================

function updateCart() {

    const totalQuantity = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    cartCount.textContent = totalQuantity;

    displayCart();

}


// ================= DISPLAY CART =================

function displayCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="cart-empty">

                <i class="fa-solid fa-cart-shopping fa-2x mb-3"></i>

                <p>
                    ${
                        currentLanguage === "ar"
                            ? "سلة المشتريات فارغة"
                            : "Your shopping cart is empty"
                    }
                </p>

            </div>

        `;

    }

    let totalPrice = 0;

    cart.forEach(item => {

        const itemTotal =
            item.price * item.quantity;

        totalPrice += itemTotal;

        const itemName =
            currentLanguage === "ar"
                ? item.nameAr
                : item.nameEn;

        const itemElement =
            document.createElement("div");

        itemElement.className = "cart-item";

        itemElement.innerHTML = `

            <div class="cart-item-info">

                <h6>${itemName}</h6>

                <span>
                    ${item.price} EGP
                </span>

            </div>

            <div class="cart-quantity">

                <button
                    class="quantity-btn"
                    data-id="${item.id}"
                    data-action="decrease"
                    aria-label="Decrease quantity">
                    -
                </button>

                <span>${item.quantity}</span>

                <button
                    class="quantity-btn"
                    data-id="${item.id}"
                    data-action="increase"
                    aria-label="Increase quantity">
                    +
                </button>

            </div>

        `;

        cartItems.appendChild(itemElement);

    });

    cartTotal.textContent =
        currentLanguage === "ar"
            ? `${totalPrice} جنيه`
            : `${totalPrice} EGP`;

}


// ================= CHANGE CART QUANTITY =================

cartItems.addEventListener("click", event => {

    const button =
        event.target.closest(".quantity-btn");

    if (!button) return;

    const productId =
        Number(button.dataset.id);

    const action =
        button.dataset.action;

    const item =
        cart.find(product => product.id === productId);

    if (!item) return;

    if (action === "increase") {

        item.quantity++;

    } else if (action === "decrease") {

        item.quantity--;

        if (item.quantity <= 0) {

            cart = cart.filter(
                product => product.id !== productId
            );

        }

    }

    updateCart();

});


// ================= OPEN CART MODAL =================

const cartModalElement =
    document.getElementById("cartModal");

const cartModal =
    new bootstrap.Modal(cartModalElement);

cartButton.addEventListener("click", () => {

    displayCart();

    cartModal.show();

});


// ================= CHECKOUT =================

checkoutBtn.addEventListener("click", () => {

    if (cart.length === 0) {

        alert(
            currentLanguage === "ar"
                ? "سلة المشتريات فارغة!"
                : "Your cart is empty!"
        );

        return;

    }

    alert(
        currentLanguage === "ar"
            ? "تم تجهيز طلبك بنجاح! هذه نسخة تجريبية من الموقع."
            : "Your order is ready! This is a website demo."
    );

    cart = [];

    updateCart();

    cartModal.hide();

});


// ================= NAVBAR ACTIVE LINKS =================

const navLinks =
    document.querySelectorAll(".nav-link");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navLinks.forEach(navLink => {
            navLink.classList.remove("active");
        });

        link.classList.add("active");

    });

});


// ================= INITIALIZE WEBSITE =================

// Apply saved theme

changeTheme(currentTheme);

// Apply saved language

changeLanguage(currentLanguage);

// Display initial products

displayProducts();

// Initialize cart

updateCart();