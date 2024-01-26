document.addEventListener('DOMContentLoaded', () => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const actualizarCarritoUI = () => {
        const tablaCarrito = document.getElementById('tabla-carrito');
        tablaCarrito.innerHTML = `
            <thead>
                <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Total</th>
                    <th scope="col">Acción</th>
                </tr>
            </thead>
            <tbody id="lista-carrito"></tbody>
        `;

        const listaCarrito = document.getElementById('lista-carrito');
        listaCarrito.innerHTML = '';

        carrito.forEach((producto, index) => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${producto.nombre}</td>
                <td>$${producto.precio}</td>
                <td>${producto.cantidad}</td>
                <td>$${producto.precio * producto.cantidad}</td>
                <td><button class="btn btn-eliminar" onclick="eliminarDelCarrito(${index})">Eliminar</button></td>
            `;
            listaCarrito.appendChild(fila);
        });

        actualizarTotal();
    };

    const actualizarTotal = () => {
        const totalDiv = document.getElementById('total');
        const total = carrito.reduce((acumulador, producto) => acumulador + (producto.precio * producto.cantidad), 0);
        totalDiv.textContent = `Total: $${total}`;
    };

    window.agregarAlCarrito = (nombre, precio) => {
        const existente = carrito.find(producto => producto.nombre === nombre);
    
        let producto;
    
        if (existente) {
            existente.cantidad += 1;
            producto = existente;
        } else {
            producto = { nombre, precio, cantidad: 1 };
            carrito.push(producto);
        }
    
        Toastify({
            text: `Se agregó ${producto.nombre} al carrito.`,
            gravity: "bottom",
            position: "left",
            backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)"
        }).showToast();
    
        actualizarCarritoUI();
        localStorage.setItem('carrito', JSON.stringify(carrito));
    };
    
    window.eliminarDelCarrito = (index) => {
        carrito.splice(index, 1);
        actualizarCarritoUI();
        localStorage.setItem('carrito', JSON.stringify(carrito));
    };

    window.vaciarCarrito = () => {
        Swal.fire({
            title: "¿Estás seguro que querés vaciar el carrito?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Si",
            cancelButtonText: "No",
        }).then((resp) => {
            if (resp.isConfirmed) {
                vaciarCarrito();
            }
        });
    };

    const vaciarCarrito = () => {
        carrito.length = 0; // Vacía el array del carrito
        localStorage.removeItem('carrito'); // Elimina el carrito del localStorage
        actualizarCarritoUI();
    };

    const productos = [
        {"nombre":"Sansevieria", "precio": 1700, "thumbnailUrl": "img/sansevieria2.jpg", "id": 1},
        {"nombre":"Kalanchoe Floral", "precio": 990, "thumbnailUrl": "img/kalanchoe-floral2.png", "id": 2},
        {"nombre":"Malvon Italiano", "precio": 1800, "thumbnailUrl": "img/malvon-italiano-blanco.png", "id": 3},
        {"nombre":"Spathiphyllum", "precio": 6000, "thumbnailUrl": "img/spathiphyllum.jpg", "id": 4}
    ];

    const padreCards = document.querySelector('.padre-cards');

    productos.forEach(producto => {
        const card = document.createElement('div');
        card.className = 'card cards';
        card.style = 'width: 18rem;';

        card.innerHTML = `
            <img src="${producto.thumbnailUrl}" class="card-img-top" alt="${producto.nombre}">
            <div class="card-body">
                <h6 class="card-title">${producto.nombre}</h6>
                <p class="card-text">$${producto.precio}</p>
                <a href="#" class="btn btn-primary" onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio})">Agregar al carrito</a>
            </div>
        `;

        padreCards.appendChild(card);
    });

    actualizarCarritoUI();
});

fetch("/data/productos.json")
    .then(resp => resp.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => console.error("Error al obtener los datos:", error));
