// Datos de lista de productos de SimRacing
const productos = [
    {
        nombre: "Volante Logitech G29",
        categoria: "volantes",
        precio: 6500,
        imagen: "./img/VolanteG29.png"
    },
    {
        nombre: "Volante Thrustmaster T300 RS",
        categoria: "volantes",
        precio: 9500,
        imagen: "./img/VolanteRs.png"
    },
    {
        nombre: "Pedales Fanatec CSL Elite",
        categoria: "pedales",
        precio: 7200,
        imagen: "./img/PedalesFanatec.png"
    },
    {
        nombre: "Pedales Logitech Pro Racing",
        categoria: "pedales",
        precio: 5600,
        imagen: "./img/PedalesLogitech.png"
    },
    {
        nombre: "Base Direct Drive Moza R9",
        categoria: "bases",
        precio: 11000,
        imagen: "./img/BaseMoza.png"
    },
    {
        nombre: "Base Fanatec DD1",
        categoria: "bases",
        precio: 23000,
        imagen: "./img/BaseFanatec.png"
    },
    {
        nombre: "Asiento Playseat Challenge",
        categoria: "accesorios",
        precio: 8500,
        imagen: "./img/AsientoPlayseat.png"
    },
    {
        nombre: "Soporte de monitor triple",
        categoria: "accesorios",
        precio: 4500,
        imagen: "./img/SoporteTriple.png"
    }
];

// Inicio carrito de compras vacío
let carrito = [];

// Referencias a los elementos del DOM
const tablaProductos = document.querySelector("#tablaProductos tbody");
const tablaCarrito = document.querySelector("#tablaCarrito tbody");
const totalSpan = document.getElementById("total");
const categoriaSelect = document.getElementById("categoria");
const filtrarBtn = document.getElementById("filtrar");

// Función para mostrar los productos
function mostrarProductos(lista) {
    tablaProductos.innerHTML = "";
    lista.forEach((p, index) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td><img src="${p.imagen}" alt="${p.nombre}"></td>
            <td>${p.nombre}</td>
            <td>${p.categoria}</td>
            <td>$${p.precio.toFixed(2)}</td>
            <td><input type="number" min="1" value="1" id="cant${index}" style="width:60px"></td>
            <td><button onclick="agregarAlCarrito(${index})">Agregar</button></td>
        `;
        tablaProductos.appendChild(fila);
    });
}

// Agregar producto al carrito
function agregarAlCarrito(indice) {
    const producto = productos[indice];
    const cantidad = parseInt(document.getElementById(`cant${indice}`).value);
    if (cantidad <= 0) return alert("Cantidad no válida");

    const existente = carrito.find(item => item.nombre === producto.nombre);
    if (existente) {
        existente.cantidad += cantidad;
    } else {
        carrito.push({ ...producto, cantidad });
    }
    actualizarCarrito();
}

// Mostrar los productos del carrito
function actualizarCarrito() {
    tablaCarrito.innerHTML = "";
    let total = 0;

    carrito.forEach((item, index) => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${item.nombre}</td>
            <td>${item.cantidad}</td>
            <td>$${item.precio.toFixed(2)}</td>
            <td>$${subtotal.toFixed(2)}</td>
            <td><button onclick="eliminarDelCarrito(${index})">X</button></td>
        `;
        tablaCarrito.appendChild(fila);
    });

    totalSpan.textContent = total.toFixed(2);
}

// Eliminar producto del carrito
function eliminarDelCarrito(indice) {
    carrito.splice(indice, 1);
    actualizarCarrito();
}

// Filtrar por categoría
filtrarBtn.addEventListener("click", () => {
    const categoria = categoriaSelect.value;
    if (categoria === "todas") {
        mostrarProductos(productos);
    } else {
        const filtrados = productos.filter(p => p.categoria === categoria);
        mostrarProductos(filtrados);
    }
});

// Finalizar la compra 
document.getElementById("finalizarCompra").addEventListener("click", () => {
    if (carrito.length === 0) {
        alert("El carrito está vacío");
        return;
    }
    alert("Compra realizada con éxito");
    carrito = [];
    actualizarCarrito();
});

// Mostrar todos los productos sin filtrar
mostrarProductos(productos);
