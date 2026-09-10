
// ================= PRODUCTS =================

const products = [

    {
        id: 1,
        name: "Cairo Oversized Tee",
        price: 32,
        category: "Streetwear",
        gender: "Men",
        description: "Relaxed oversized t-shirt inspired by Cairo street style.",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=85"
    },

    {
        id: 2,
        name: "Alexandria Linen Shirt",
        price: 48,
        category: "Women",
        gender: "Women",
        description: "Light linen shirt made for warm summer days.",
        image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=700&q=85"
    },

    {
        id: 3,
        name: "Downtown Jacket",
        price: 85,
        category: "Jackets",
        gender: "Men",
        description: "A clean everyday jacket with a relaxed fit.",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=700&q=85"
    },

    {
        id: 4,
        name: "Nile Blue Dress",
        price: 65,
        category: "Women",
        gender: "Women",
        description: "Simple flowing dress with a soft modern look.",
        image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=700&q=85"
    },

    {
        id: 5,
        name: "Desert Sand Hoodie",
        price: 58,
        category: "Streetwear",
        gender: "Men",
        description: "Comfortable hoodie in a warm neutral tone.",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=700&q=85"
    },

    {
        id: 6,
        name: "Cairo Night Blazer",
        price: 95,
        category: "Women",
        gender: "Women",
        description: "Elegant blazer designed for a clean evening look.",
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=700&q=85"
    },

    {
        id: 7,
        name: "Classic Street Sneakers",
        price: 72,
        category: "Men",
        gender: "Men",
        description: "Everyday sneakers that work with casual outfits.",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85"
    },

    {
        id: 8,
        name: "Velora Mini Bag",
        price: 45,
        category: "Accessories",
        gender: "Women",
        description: "Small everyday bag with a simple modern shape.",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=85"
    }

];


// ================= CART =================

let cart = JSON.parse(localStorage.getItem("veloraCart")) || [];


// ================= ELEMENTS =================

const productsContainer =
    document.getElementById("products-container");

const homeProducts =
    document.getElementById("home-products");

const cartContainer =
    document.getElementById("cart-container");

const cartCount =
    document.getElementById("cart-count");

const totalPrice =
    document.getElementById("total-price");

const messageBox =
    document.getElementById("message-box");


// ================= DISPLAY PRODUCTS =================

function displayProducts(list, container) {

    if (!container) {
        return;
    }

    container.innerHTML = "";

    if (list.length === 0) {

        container.innerHTML =
            "<p>No products found.</p>";

        return;
    }


    list.forEach(function(product) {

        const card =
            document.createElement("div");

        card.classList.add("product-card");


        card.innerHTML = `

            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

                <span class="product-label">
                    ${product.gender}
                </span>

            </div>


            <div class="product-info">

                <h3>${product.name}</h3>

                <p class="product-category">
                    ${product.category}
                </p>

                <p class="product-price">
                    $${product.price}
                </p>


                <div class="product-actions">

                    <button
                        class="add-cart"
                        data-id="${product.id}">
                        Add to Cart
                    </button>

                    <button
                        class="details-btn"
                        data-id="${product.id}">
                        View
                    </button>

                </div>

            </div>
        `;


        container.appendChild(card);

    });

}


// ================= HOME PRODUCTS =================

displayProducts(
    products.slice(0, 4),
    homeProducts
);


// ================= SHOP PRODUCTS =================

displayProducts(
    products,
    productsContainer
);


// ================= ADD TO CART =================

document.addEventListener("click", function(event) {

    if (
        event.target.classList.contains("add-cart")
    ) {

        const id =
            Number(event.target.dataset.id);

        addToCart(id);

    }

});


function addToCart(id) {

    const product =
        products.find(function(item) {

            return item.id === id;

        });


    const existingProduct =
        cart.find(function(item) {

            return item.id === id;

        });


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({

            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1

        });

    }


    saveCart();

    showMessage(
        "Product Added Successfully"
    );

}


// ================= SAVE CART =================

function saveCart() {

    localStorage.setItem(
        "veloraCart",
        JSON.stringify(cart)
    );

    updateCart();

}


// ================= UPDATE CART =================

function updateCart() {

    let count = 0;

    let total = 0;


    cart.forEach(function(item) {

        count += item.quantity;

        total +=
            item.price * item.quantity;

    });


    if (cartCount) {

        cartCount.textContent = count;

    }


    if (totalPrice) {

        totalPrice.textContent =
            total.toFixed(2);

    }


    displayCart();

}


// ================= DISPLAY CART =================

function displayCart() {

    if (!cartContainer) {

        return;

    }


    cartContainer.innerHTML = "";


    if (cart.length === 0) {

        cartContainer.innerHTML = `

            <div class="empty-cart">

                <p>Your cart is empty.</p>

            </div>

        `;

        return;

    }


    cart.forEach(function(item) {

        const cartItem =
            document.createElement("div");


        cartItem.classList.add("cart-item");


        cartItem.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
            >


            <div>

                <h3>
                    ${item.name}
                </h3>

                <p>
                    $${item.price} each
                </p>

            </div>


            <div class="quantity-controls">

                <button
                    class="decrease"
                    data-id="${item.id}">
                    -
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button
                    class="increase"
                    data-id="${item.id}">
                    +
                </button>

            </div>


            <strong>

                $${(
                    item.price *
                    item.quantity
                ).toFixed(2)}

            </strong>


            <button
                class="remove-btn"
                data-id="${item.id}">
                Remove
            </button>

        `;


        cartContainer.appendChild(
            cartItem
        );

    });

}


// ================= CART BUTTONS =================

document.addEventListener(
    "click",
    function(event) {

        const id =
            Number(event.target.dataset.id);


        if (
            event.target.classList.contains(
                "increase"
            )
        ) {

            const item =
                cart.find(function(product) {

                    return product.id === id;

                });


            item.quantity++;

            saveCart();

        }


        if (
            event.target.classList.contains(
                "decrease"
            )
        ) {

            const item =
                cart.find(function(product) {

                    return product.id === id;

                });


            if (item.quantity > 1) {

                item.quantity--;

            } else {

                cart =
                    cart.filter(function(product) {

                        return product.id !== id;

                    });

            }


            saveCart();

        }


        if (
            event.target.classList.contains(
                "remove-btn"
            )
        ) {

            cart =
                cart.filter(function(product) {

                    return product.id !== id;

                });


            saveCart();

            showMessage(
                "Product Removed"
            );

        }

    }
);


// ================= SEARCH =================

const searchInput =
    document.getElementById(
        "search-input"
    );


const categoryFilter =
    document.getElementById(
        "category-filter"
    );


function filterProducts() {

    if (!productsContainer) {

        return;

    }


    const searchValue =
        searchInput.value.toLowerCase();


    const categoryValue =
        categoryFilter.value;


    const filtered =
        products.filter(function(product) {

            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(searchValue);


            const matchesCategory =
                categoryValue === "All" ||
                product.gender === categoryValue ||
                product.category === categoryValue;


            return (
                matchesSearch &&
                matchesCategory
            );

        });


    displayProducts(
        filtered,
        productsContainer
    );

}


if (searchInput) {

    searchInput.addEventListener(
        "input",
        filterProducts
    );

}


if (categoryFilter) {

    categoryFilter.addEventListener(
        "change",
        filterProducts
    );

}


// ================= URL CATEGORY =================

const urlParams =
    new URLSearchParams(
        window.location.search
    );


const urlCategory =
    urlParams.get("category");


if (
    urlCategory &&
    categoryFilter
) {

    categoryFilter.value =
        urlCategory;

    filterProducts();

}


// ================= PRODUCT MODAL =================

const modal =
    document.getElementById(
        "product-modal"
    );


const closeModal =
    document.getElementById(
        "close-modal"
    );


let selectedProduct = null;


document.addEventListener(
    "click",
    function(event) {

        if (
            event.target.classList.contains(
                "details-btn"
            )
        ) {

            const id =
                Number(event.target.dataset.id);


            selectedProduct =
                products.find(
                    function(product) {

                        return product.id === id;

                    }
                );


            if (!modal) {

                return;

            }


            document.getElementById(
                "modal-image"
            ).src =
                selectedProduct.image;


            document.getElementById(
                "modal-name"
            ).textContent =
                selectedProduct.name;


            document.getElementById(
                "modal-category"
            ).textContent =
                selectedProduct.category;


            document.getElementById(
                "modal-description"
            ).textContent =
                selectedProduct.description;


            document.getElementById(
                "modal-price"
            ).textContent =
                selectedProduct.price;


            modal.style.display = "flex";

        }

    }
);


if (closeModal) {

    closeModal.addEventListener(
        "click",
        function() {

            modal.style.display = "none";

        }
    );

}


const modalAdd =
    document.getElementById(
        "modal-add"
    );


if (modalAdd) {

    modalAdd.addEventListener(
        "click",
        function() {

            if (selectedProduct) {

                addToCart(
                    selectedProduct.id
                );

            }

        }
    );

}


// ================= DARK MODE =================

const darkModeButton =
    document.getElementById(
        "dark-mode"
    );


const savedMode =
    localStorage.getItem(
        "veloraDarkMode"
    );


if (savedMode === "enabled") {

    document.body.classList.add(
        "dark"
    );

}


if (darkModeButton) {

    darkModeButton.addEventListener(
        "click",
        function() {

            document.body.classList.toggle(
                "dark"
            );


            if (
                document.body.classList.contains(
                    "dark"
                )
            ) {

                localStorage.setItem(
                    "veloraDarkMode",
                    "enabled"
                );

            } else {

                localStorage.setItem(
                    "veloraDarkMode",
                    "disabled"
                );

            }

        }
    );

}


// ================= MESSAGE =================

function showMessage(text) {

    if (!messageBox) {

        return;

    }


    messageBox.textContent = text;

    messageBox.style.display = "block";


    setTimeout(
        function() {

            messageBox.style.display =
                "none";

        },
        2000
    );

}


// ================= CONTACT FORM =================

const contactForm =
    document.getElementById(
        "contact-form"
    );


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "contact-name"
                ).value.trim();


            const email =
                document.getElementById(
                    "contact-email"
                ).value.trim();


            const message =
                document.getElementById(
                    "contact-message"
                ).value.trim();


            if (
                name === "" ||
                email === "" ||
                message === ""
            ) {

                showMessage(
                    "Please fill in all fields."
                );

                return;

            }


            showMessage(
                "Message Sent Successfully"
            );


            contactForm.reset();

        }
    );

}


// ================= CHECKOUT =================

const checkoutButton =
    document.getElementById(
        "checkout-btn"
    );


const checkoutModal =
    document.getElementById(
        "checkout-modal"
    );


const closeCheckout =
    document.getElementById(
        "close-checkout"
    );


if (checkoutButton) {

    checkoutButton.addEventListener(
        "click",
        function() {

            if (cart.length === 0) {

                showMessage(
                    "Your cart is empty."
                );

                return;

            }


            checkoutModal.style.display =
                "flex";

        }
    );

}


if (closeCheckout) {

    closeCheckout.addEventListener(
        "click",
        function() {

            checkoutModal.style.display =
                "none";

        }
    );

}


const checkoutForm =
    document.getElementById(
        "checkout-form"
    );


if (checkoutForm) {

    checkoutForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "customer-name"
                ).value.trim();


            const email =
                document.getElementById(
                    "customer-email"
                ).value.trim();


            const address =
                document.getElementById(
                    "customer-address"
                ).value.trim();


            if (
                name === "" ||
                email === "" ||
                address === ""
            ) {

                showMessage(
                    "Please fill in all fields."
                );

                return;

            }


            cart = [];


            localStorage.removeItem(
                "veloraCart"
            );


            checkoutModal.style.display =
                "none";


            updateCart();


            checkoutForm.reset();


            showMessage(
                "Order placed successfully!"
            );

        }
    );

}


// ================= START =================

updateCart();

