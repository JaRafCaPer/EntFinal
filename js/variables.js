const apiBtn = document.getElementById('crear-items')
const apiData = document.getElementById('api-data')



// Obtenemos el elemento UL donde se mostrarán los productos
const listaArticulos = document.getElementById('lista-articulos');

// Obtenemos la tabla donde se mostrará el carrito
const tablaCarrito = document.getElementById('tabla-carrito');

// Obtenemos el carrito guardado en el localStorage y lo cargamos en la variable carrito
const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));
const carrito = carritoGuardado || [];

const cardContainer = document.getElementById("card-container");
const listaItem = [];