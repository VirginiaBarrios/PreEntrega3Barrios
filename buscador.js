document.addEventListener('DOMContentLoaded', () => {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let productosDisponibles = [];

    async function fetchProducts() {
        try {
            const response = await fetch('/data/productos.json');
            productosDisponibles = await response.json();
            displayFilteredProducts(productosDisponibles); // Mostrar productos disponibles al cargar la página
        } catch (error) {
            console.error('Error al obtener los productos:', error);
        }
    }
    

    function displayFilteredProducts(filteredProducts) {
        const productosContainer = document.querySelector('.padre-cards');
        productosContainer.innerHTML = ''; // Limpiar la lista antes de mostrar los nuevos resultados
    
        filteredProducts.forEach(product => {
            const card = document.createElement('div');
            card.className = 'card cards';
            card.style = 'width: 18rem;';
    
            card.innerHTML = `
                <img src="${product.thumbnailUrl}" class="card-img-top" alt="${product.nombre}">
                <div class="card-body">
                    <h6 class="card-title">${product.nombre}</h6>
                    <p class="card-text">$${product.precio}</p>
                    <a href="#" class="btn btn-primary" onclick="agregarAlCarrito('${product.nombre}', ${product.precio})">Agregar al carrito</a>
                </div>
            `;
    
            productosContainer.appendChild(card);
        });
    }

    // Función de búsqueda que considera ambos conjuntos de productos
    function search(event) {
        event.preventDefault(); // Evitar que el formulario se envíe
    
        const searchQuery = document.getElementById('searchInput').value.toLowerCase();
    
        // Combinar los productos disponibles con los productos en el carrito
        const allProducts = productosDisponibles.concat(carrito);
    
        // Filtrar productos basados en la consulta de búsqueda
        const filteredProducts = allProducts.filter(product =>
            product.nombre.toLowerCase().includes(searchQuery)
        );
    
        displayFilteredProducts(filteredProducts);
        
    }
    

    // Asociar la función de búsqueda al formulario
    const searchBarForm = document.getElementById('navbarSearchForm');
    if (searchBarForm) {
        searchBarForm.addEventListener('submit', search);
    }

    // Obtener los productos al cargar la página
    fetchProducts();
});
