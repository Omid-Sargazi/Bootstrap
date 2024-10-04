document.getElementById('categories-btn').addEventListener('click', () => {
    document.getElementById('category-overlay').classList.remove('hidden');
  });
  
  document.getElementById('close-overlay').addEventListener('click', () => {
    document.getElementById('category-overlay').classList.add('hidden');
  });
  
  // Simulate fetching categories from a JSON file
  const categories = [
    'Electronics', 'Fashion', 'Home & Kitchen', 'Sports', 'Toys', 'Books'
  ];
  
  const categoryList = document.getElementById('category-list');
  categories.forEach(category => {
    const li = document.createElement('li');
    li.textContent = category;
    categoryList.appendChild(li);
  });
  