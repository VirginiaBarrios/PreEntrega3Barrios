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

        if (existente) {
            existente.cantidad += 1;
        } else {
            const producto = { nombre, precio, cantidad: 1 };
            carrito.push(producto);
        }

        actualizarCarritoUI();
        localStorage.setItem('carrito', JSON.stringify(carrito));
    };

    window.eliminarDelCarrito = (index) => {
        carrito.splice(index, 1);
        actualizarCarritoUI();
        localStorage.setItem('carrito', JSON.stringify(carrito));
    };

    actualizarCarritoUI();
});
