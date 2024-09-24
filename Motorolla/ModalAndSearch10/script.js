// let productsJson = [];
// fetch('./products.json')
//     .then(response => response.json())
//     .then(data => {
//         console.log("Data fetched: ", data);  // Debugging to check if data is fetched
//         productsJson = data;  
//         renderItems();  
//     })
//     .catch(error => console.error("Error fetching products:", error));
//     const choiceItemBtn = document.getElementById('choiceItemBtn');
//     const itemList = document.getElementById('itemList');
//     const searchBox = document.getElementById('searchBox');
    
//     // Open the modal
//     choiceItemBtn.addEventListener('click', function () {
//         alert('Modal button clicked');  // Debugging to check if modal button works
//         renderItems();  // Display items when the modal opens
//     });
    
//     function renderItems(searchTerm = "") {
//         itemList.innerHTML = "";
    
//         if (productsJson.length === 0) {
//             console.log("No products in JSON file.");  // Debugging to check if JSON file is empty
//             itemList.innerHTML = "<p>No items available for selection.</p>";
//             return;
//         }
    
//         const filteredProducts = productsJson.filter(product =>
//             product.title.toLowerCase().includes(searchTerm.toLowerCase())
//         );
    
//         filteredProducts.forEach(product => {
//             const itemDiv = document.createElement('div');
//             itemDiv.classList.add('col-md-4', 'modal-item', 'text-center', 'mb-3');
//             itemDiv.innerHTML = `
//                 <img src="${product.image}" alt="${product.title}" class="img-fluid">
//                 <h6 class="mt-2">${product.title}</h6>
//                 <p class="text-success">${product.price}</p>
//                 <button class="btn btn-outline-primary" onclick="selectItem(${product.id})">Select</button>
//             `;
//             itemList.appendChild(itemDiv);
//         });
    
//         if (filteredProducts.length === 0) {
//             itemList.innerHTML = "<p>No items available for selection.</p>";
//         }
//     }
    
//     searchBox.addEventListener('input', function () {
//         const searchTerm = this.value;
//         renderItems(searchTerm);
//     });
    
//     function selectItem(productId) {
//         const selectedProduct = productsJson.find(product => product.id === productId);
//         localStorage.setItem('selectedProduct', JSON.stringify(selectedProduct));
//         window.location.reload();
//     }
    
//     function displayComparedProduct() {
//         const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
    
//         if (selectedProduct) {
//             const comparedProductDiv = document.getElementById('comparedProduct');
//             comparedProductDiv.style.display = 'block';
//             comparedProductDiv.innerHTML = `
//                 <img src="${selectedProduct.image}" alt="${selectedProduct.title}">
//                 <h5 class="mt-3">${selectedProduct.title}</h5>
//                 <p class="text-success">${selectedProduct.price}</p>
//             `;
//         }
//     }
    
//     displayComparedProduct();


let productsJson = [];
let displayedProducts = 3;  // Number of initially displayed products

fetch('./products.json')
    .then(response => response.json())
    .then(data => {
        console.log("Data fetched: ", data);  
        productsJson = data;  
        renderItems();  
    })
    .catch(error => console.error("Error fetching products:", error));

// Select DOM elements
const choiceItemBtn = document.getElementById('choiceItemBtn');
const itemList = document.getElementById('itemList');
const searchBox = document.getElementById('searchBox');
const moreProductsBtn = document.getElementById('moreProductsBtn');

// Open the modal and render items
choiceItemBtn.addEventListener('click', function () {
    renderItems();  // Display initial items when the modal opens
});

// Render items with a search term
function renderItems(searchTerm = "") {
    itemList.innerHTML = "";
    
    // Filter products based on search term
    const filteredProducts = productsJson.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Show only the first 'displayedProducts' (initially 3) items
    const initialProducts = filteredProducts.slice(0, displayedProducts);

    initialProducts.forEach(product => {
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

    // If there are more products, show the "More Products" button
    if (filteredProducts.length > displayedProducts) {
        moreProductsBtn.style.display = 'block';
    } else {
        moreProductsBtn.style.display = 'none';
    }

    // If no items match the search term
    if (filteredProducts.length === 0) {
        itemList.innerHTML = "<p>No items available for selection.</p>";
    }
}

// Add search functionality
searchBox.addEventListener('input', function () {
    const searchTerm = this.value;
    renderItems(searchTerm);
});

// Handle the "More Products" button click
moreProductsBtn.addEventListener('click', function() {
    displayedProducts += 3;  // Show 3 more products each time
    renderItems();  // Re-render the items with the updated number
});

// Function to select an item and save it
function selectItem(productId) {
    const selectedProduct = productsJson.find(product => product.id === productId);
    localStorage.setItem('selectedProduct', JSON.stringify(selectedProduct));
    window.location.reload();
}

// Display the selected product
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

// Call the function to display the compared product on page load
displayComparedProduct();
