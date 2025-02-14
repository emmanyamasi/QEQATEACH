fetch('db.json')
  .then(response => response.json())
  .then(data => {
    const productsList = document.getElementById('product-list');

    data.products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.classList.add('product-card');

      productCard.innerHTML = `
        <h3>${product.name}</h3>
        <p><strong>Category:</strong> ${product.category}</p>
        <p><strong>Description:</strong> ${product.description}</p>
        <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
        <p><strong>Stock:</strong> ${product.stock} available</p>
        <button class="buy-button">Buy Now</button>
      `;

      productsList.appendChild(productCard);
    });
  })
  .catch(error => console.error('Error fetching the data:', error));
