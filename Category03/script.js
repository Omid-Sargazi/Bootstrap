// Simulating category data retrieval from a JSON file
const categories = [
    { name: "Electronics", icon: "📱" },
    { name: "Clothing", icon: "👗" },
    { name: "Home Appliances", icon: "🏠" },
    // More categories...
];

// Navigation
const pages = {
    home: document.getElementById("home-page"),
    categories: document.getElementById("categories-page"),
    cart: document.getElementById("cart-page"),
    account: document.getElementById("account-page"),
};

document.getElementById("home-button").addEventListener("click", () => showPage("home"));
document.getElementById("categories-button").addEventListener("click", () => showPage("categories"));
document.getElementById("cart-button").addEventListener("click", () => showPage("cart"));
document.getElementById("account-button").addEventListener("click", () => showPage("account"));

function showPage(pageName) {
    Object.values(pages).forEach(page => page.classList.add("hidden"));
    pages[pageName].classList.remove("hidden");
    pages[pageName].classList.add("active");

    if (pageName === "categories") {
        loadCategories();
    }
}

// Load categories from the JSON object
function loadCategories() {
    const categoriesList = document.querySelector(".categories-list");
    categoriesList.innerHTML = ""; // Clear existing categories

    categories.forEach(category => {
        const categoryDiv = document.createElement("div");
        categoryDiv.classList.add("category");

        categoryDiv.innerHTML = `
            <img src="${category.icon}" alt="${category.name} Icon">
            <h3>${category.name}</h3>
        `;

        categoriesList.appendChild(categoryDiv);
    });
}

// Initial page load
showPage("home");
