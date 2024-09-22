const productsJson = [
    { "id": 1, "title": "Item 1", "price": "$30", "image": "https://via.placeholder.com/100" },
    { "id": 2, "title": "Item 2", "price": "$40", "image": "https://via.placeholder.com/100" },
    { "id": 3, "title": "Item 3", "price": "$25", "image": "https://via.placeholder.com/100" }
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