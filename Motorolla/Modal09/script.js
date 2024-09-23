let productsJson = [];

fetch('./products.json')
    .then(response => response.json())
    .then(data => {
        console.log(data); 
        productsJson = data;  // Update the array with fetched data
        renderItems();  // Render items once the data is fetched
    })
    .catch(error => console.error("Error fetching products:", error));

// Select DOM elements
const choiceItemBtn = document.getElementById('choiceItemBtn');
const choiceItemModal = document.getElementById('choiceItemModal');
const itemList = document.getElementById('itemList');
const searchBox = document.getElementById('searchBox');

// Open the modal
choiceItemBtn.addEventListener('click', function () {
    openModal();
    renderItems();  // Display items when the modal opens
});

function openModal() {
    choiceItemModal.style.display = 'flex';
}

function renderItems(searchTerm = "") {
    itemList.innerHTML = "";

    if (productsJson.length === 0) {
        itemList.innerHTML = "<p>No items available for selection.</p>";
        return;
    }

    const filteredProducts = productsJson.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filteredProducts.forEach(product => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('col-md-4', 'modal-item', 'text-center', 'mb-3');
        itemDiv.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="img-fluid">
            <h6 class="mt-2">${product.title}</h6>
            <p class="text-success">${product.price}</p>
            <button class="btn btn-outline-primary" onclick="selectItem(${product.id})">Select</button>
        `;
        itemList.appendChild(itemDiv);
    });

    if (filteredProducts.length === 0) {
        itemList.innerHTML = "<p>No items available for selection.</p>";
    }
}

searchBox.addEventListener('input', function () {
    const searchTerm = this.value;
    renderItems(searchTerm);
});

function selectItem(productId) {
    const selectedProduct = productsJson.find(product => product.id === productId);
    localStorage.setItem('selectedProduct', JSON.stringify(selectedProduct));
    window.location.reload();
}

function displayComparedProduct() {
    const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));

    if (selectedProduct) {
        const comparedProductDiv = document.getElementById('comparedProduct');
        comparedProductDiv.style.display = 'block';
        comparedProductDiv.innerHTML = `
            <img src="${selectedProduct.image}" alt="${selectedProduct.title}">
            <h5 class="mt-3">${selectedProduct.title}</h5>
            <p class="text-success">${selectedProduct.price}</p>
        `;
    }
}

displayComparedProduct();
