// Simulating category and product data
const categories = [
    { name: "Electronics", icon: "📱", products: [{ name: "Smartphone", subItems: ["iPhone", "Samsung"] }, { name: "Laptop", subItems: ["Dell", "Macbook"] }] },
    { name: "Clothing", icon: "👗", products: [{ name: "Dress", subItems: ["Summer Dress", "Evening Gown"] }, { name: "Shoes", subItems: ["Sneakers", "Heels"] }] },
    // More categories...
];

// Handle navigation between pages
const pages = {
    home: document.getElementById("home-page"),
    categories: document.getElementById("categories-page")
};

document.getElementById("home-button").addEventListener("click", () => showPage("home"));
document.getElementById("categories-button").addEventListener("click", () => showPage("categories"));

function showPage(pageName) {
    Object.values(pages).forEach(page => page.classList.add("hidden"));
    pages[pageName].classList.remove("hidden");
    pages[pageName].classList.add("active");

    if (pageName === "categories") {
        loadCategories();
    }
}

// Load categories into the sidebar
function loadCategories() {
    const categoriesList = document.querySelector(".categories-list");
    categoriesList.innerHTML = "";

    categories.forEach(category => {
        const categoryDiv = document.createElement("div");
        categoryDiv.classList.add("category");
        categoryDiv.textContent = `${category.icon} ${category.name}`;

        // Click event to load products
        categoryDiv.addEventListener("click", () => loadCategoryProducts(category));

        categoriesList.appendChild(categoryDiv);
    });
}

// Load products for the selected category
function loadCategoryProducts(category) {
    document.getElementById("category-title").textContent = category.name;

    const productsList = document.querySelector(".products-list");
    productsList.innerHTML = "";

    category.products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product-item");

        productDiv.innerHTML = `
            <img src="path/to/icon.png" alt="${product.name}">
            <h4>${product.name}</h4>
        `;

        // Create sub-items container
        const subItemsDiv = document.createElement("div");
        subItemsDiv.classList.add("sub-items");

        product.subItems.forEach(subItem => {
            const subItemDiv = document.createElement("div");
            subItemDiv.textContent = subItem;
            subItemsDiv.appendChild(subItemDiv);
        });

        productDiv.addEventListener("click", () => {
            subItemsDiv.classList.toggle("active");
        });

        productDiv.appendChild(subItemsDiv);
        productsList.appendChild(productDiv);
    });
}

// Initial page load
showPage("home");
