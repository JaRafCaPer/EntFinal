// Definimos una variable global para llevar la cuenta de los productos creados
let idProducto = 1;
let totalCompra = 0;



const cardContainer = document.getElementById("card-container");
const listaItem = [];
let contHTML = ''
let fetchedItems = JSON.parse(localStorage.getItem('fetchedItems')) || {} // Recuperar los elementos almacenados en localStorage, o inicializar un objeto vacío si no hay elementos almacenados


function crearArticulo(id, nombre, precio, imagen, descripcion) {
  // Creamos un nuevo elemento LI
  const nuevoArticulo = document.createElement('li');
  nuevoArticulo.classList.add('list-group-item');

  // Creamos un objeto con la información del artículo
  const producto = {
    id: id,
    nombre: nombre,
    precio: precio,
    imagen: imagen,
    descripcion: descripcion,
    cantidad: 1 // Establecemos la cantidad en 1 por defecto
  };
  listaItem.push(producto);

  // Creamos el HTML para mostrar la información del artículo
  const contenidoHTML = `
    <div class="card w-100 h-50 bg-success text-white" style="width: 18rem;">
      <div class="card-body">
        <h4 class="card-title">${producto.nombre}</h4>
        <p class="card-text">Precio: $${producto.precio}</p>
        <img class="p-2 card-img-top img-thumbnail w-25 h-50" src=${producto.imagen} alt="Card image cap">
        <p class="p-2 card-text">Descripcion: ${producto.descripcion}</p>
        <input type="number" class="form-control w-25" id="c-${producto.id}" name="cantidad"><br>
        <button type="button" class="btn btn-danger btn-sm mb-2" data-mdb-toggle="tooltip" title="Mover a deseados">Me gusta</button>
        <a href="#" id="p-${producto.id}" class="btn btn-info btn-sm mb-2" data-mdb-toggle="tooltip" title="Agregar al carrito">Agregar</a>
      </div>
    </div>
  `;

  // Agregamos el HTML al LI
  nuevoArticulo.innerHTML = contenidoHTML;

  // Agregamos el LI a la lista de artículos
  listaArticulos.appendChild(nuevoArticulo);

  const btnAgregar = document.getElementById(`p-${producto.id}`);
  btnAgregar.addEventListener("click", () => {
    agregarAlCarrito(producto.id);
  });
}


const callApi = () => {
  let randomId = Math.floor(Math.random() * 954)
  while (fetchedItems[randomId]) { // Verificar si el ID ya ha sido registrado
      randomId = Math.floor(Math.random() * 954)
  }

  fetch(`https://pokeapi.co/api/v2/item/${randomId}`)
  .then( res => res.json())
  .then(data => {
      fetchedItems[randomId] = true // Registrar el ID del elemento obtenido
      localStorage.setItem('fetchedItems', JSON.stringify(fetchedItems)) // Almacenar los elementos en localStorage

      // Creamos los elementos HTML para mostrar la información del artículo
      const apiName = document.createElement('p');
      apiName.innerText = JSON.stringify(data.name);

      const apiId = document.createElement('p');
      apiId.innerText = JSON.stringify(data.id);

      const apiCost = document.createElement('p');
      apiCost.innerText = JSON.stringify(data.cost);

      const apiEfect = document.createElement('p');
      apiEfect.innerText = JSON.stringify(data.effect_entries[0].effect);

      const apiThumb = document.createElement('p');
      apiThumb.innerText = JSON.stringify(data.sprites.default);

      console.log(apiEfect)

      // Creamos la card del artículo
      crearArticulo(apiId.innerText, apiName.innerText, apiCost.innerText, apiThumb.innerText, apiEfect.innerText);
  })
}
apiBtn.addEventListener('click', callApi)

// Función para actualizar la tabla del carrito
function actualizarCarrito() {
  // Limpiamos la tabla del carrito
  tablaCarrito.innerHTML = '';

  // Creamos las filas de la tabla con la información de los productos en el carrito
  carrito.forEach(producto => {
    const fila = document.createElement('tr')
    const subtotal = parseInt(producto.cantidad) * parseInt(producto.precio);
    fila.innerHTML = `
      <td>${producto.nombre}</td>
      <td>$${producto.precio}</td>
      <td>${producto.cantidad}</td>
      <td>$${subtotal}</td>
      <td><button type="button" class="btn btn-danger btn-sm" id="q-${producto.id}" data-mdb-toggle="tooltip" title="Quitar producto">Quitar</button></td>
      <td><button type="button" class="btn btn-danger btn-sm" id="m-${producto.id}" data-mdb-toggle="tooltip" title="Quitar producto">-</button></td>
      <td><button type="button" class="btn btn-info btn-sm" id="s-${producto.id}" data-mdb-toggle="tooltip" title="Quitar producto">+</button></td>

    `;
    tablaCarrito.appendChild(fila);
  });

  // Actualizamos el total de la compra
  totalCompra = carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
  document.getElementById('total-compra').textContent = `$${totalCompra.toFixed(2)}`;

  // Actualizamos el carrito en el localStorage
  actualizarCarritoLocalStorage();


// Agregamos un evento a cada botón "Quitar producto"
carrito.forEach(producto => {
  const btnQuitar = document.getElementById(`q-${producto.id}`);
  btnQuitar.addEventListener("click", () => {
    eliminarProducto(producto.id);
  });
});
}

// Agregamos un evento al botón "Agregar al carrito" de cada producto para agregarlo al carrito
function agregarAlCarrito(idProducto) {
  const producto = listaProd.find(producto => producto.id === idProducto);
  const cantidad = parseInt(document.getElementById(`c-${idProducto}`).value);
  if (!cantidad) return; // Si la cantidad es 0 o no es un número, no hacemos nada

  // Buscamos si el producto ya está en el carrito
  const productoEnCarrito = carrito.find(producto => producto.id === idProducto);
  if (productoEnCarrito) {
    // Si el producto ya está en el carrito, actualizamos la cantidad
    productoEnCarrito.cantidad += cantidad;
  } else {
    // Si el producto no está en el carrito, lo agregamos
    producto.cantidad = cantidad;
    carrito.push(producto);
  }
  actualizarCarrito();
}

// Agregamos un evento al botón "Limpiar carrito" para vaciar el carrito y actualizar la tabla
document.getElementById('limpiar-carrito').addEventListener('click', function() {
  carrito.length = 0;
  actualizarCarrito();
});




