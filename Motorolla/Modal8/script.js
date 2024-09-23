let productsJson = [
    { "id": 1, "title": "Item 1", "price": "$30", "image": "./Image/1.png" },
    { "id": 2, "title": "Item 2", "price": "$40", "image": "./Image/2.png" },
    { "id": 3, "title": "Item 3", "price": "$25", "image": "./Image/3.png" }
];

const choiceItemBtn = document.getElementById('choiceItemBtn');
const choiceItemModal = document.getElementById('choiceItemModal');
const itemList = document.getElementById('itemList');
const searchBox = document.getElementById('searchBox');

// Function to open the modal
choiceItemBtn.addEventListener('click', function() {
    openModal();
    renderItems();  // Display items when the modal opens
});

// Function to open the modal
function openModal() {
    choiceItemModal.style.display = 'flex';
}

// Function to close the modal
function closeModal() {
    choiceItemModal.style.display = 'none';
}

// Function to render items inside the modal
function renderItems(searchTerm = "") {
    itemList.innerHTML = "";  // Clear previous items

    // Filter products based on search term
    const filteredProducts = productsJson.filter(product => 
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Loop through filtered products and add them to the modal
    filteredProducts.forEach(product => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');
        itemDiv.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <div class="title">${product.title}</div>
            <div class="price">${product.price}</div>
        `;
        itemDiv.addEventListener('click', () => selectItem(product));  // Add click event to select item
        itemList.appendChild(itemDiv);
    });

    // If no products, show a message
    if (filteredProducts.length === 0) {
        itemList.innerHTML = "<p>No items available for selection.</p>";
    }
}

// Add search functionality
searchBox.addEventListener('input', function() {
    const searchTerm = this.value;
    renderItems(searchTerm);
});

// Function to handle item selection from the modal
function selectItem(product) {
    localStorage.setItem('selectedProduct', JSON.stringify(product));  // Save selected item to localStorage
    window.location.reload();  // Reload the page to reflect the selected item
}

// Function to display the selected product for comparison
function displayComparedProduct() {
    const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));  // Get selected item from localStorage

    if (selectedProduct) {
        const comparedProductDiv = document.getElementById('comparedProduct');
        comparedProductDiv.style.display = 'block';  // Show the compared product div
        comparedProductDiv.innerHTML = `
            <img src="${selectedProduct.image}" alt="${selectedProduct.title}">
            <div class="title">${selectedProduct.title}</div>
            <div class="price">${selectedProduct.price}</div>
        `;
    }
}

// Call the function to display the compared product on page load
displayComparedProduct();