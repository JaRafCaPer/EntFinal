// Definimos una variable global para llevar la cuenta de los productos creados
let idProducto = 1;
let totalCompra = 0;


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
let contHTML = ''
let fetchedItems = JSON.parse(localStorage.getItem('fetchedItems')) || {} // Recuperar los elementos almacenados en localStorage, o inicializar un objeto vacío si no hay elementos almacenados

const callApi = () => {
    let randomId = Math.floor(Math.random() * 954)
    while (fetchedItems[randomId]) { // Verificar si el ID ya ha sido registrado
        randomId = Math.floor(Math.random() * 954)
    }
    fetch(`https://pokeapi.co/api/v2/item/${randomId}`)
    .then( res => res.json())
    .then(data => {
        console.log(data)
        fetchedItems[randomId] = true // Registrar el ID del elemento obtenido
        localStorage.setItem('fetchedItems', JSON.stringify(fetchedItems)) // Almacenar los elementos en localStorage
        apiData.innerText = JSON.stringify(data.name)
        function crearArticulo(nombre, precio, descripcion) {
          // Creamos un nuevo elemento LI
          const nuevoArticulo = document.createElement('li');
          nuevoArticulo.classList.add('list-group-item');

          // Creamos un objeto con la información del artículo
          const producto = {
            id: idProducto++,
            nombre: nombre,
            precio: precio,
            descripcion: descripcion,
            cantidad: 1 // Establecemos la cantidad en 1 por defecto
          };
          listaItem.push(producto);

          // Creamos el HTML para mostrar la información del artículo
          const contenidoHTML = `
          <div class="card w-100 bg-success text-white" style="width: 18rem;">
          <img class="card-img-top img-thumbnail" src=${data.sprites.default} alt="...">
          <div class="card-body">
          <h4 class="card-title">${data.name}</h4>
          <p class="card-text">Precio: $${data.cost}</p>
          <p class="card-text">${data.attributes.name}</p>
          <input type="number" class="form-control w-50" id="c-${data.id}" name="cantidad"><br>
          <button type="button" class="btn btn-danger btn-sm mb-2" data-mdb-toggle="tooltip" title="Mover a deseados">Me gusta</button>
          <a href="#" id="p-${data.id}" class="btn btn-info btn-sm mb-2" data-mdb-toggle="tooltip" title="Agregar al carrito">Agregar</a>
          </div>
        </div>`;

          // Agregamos el HTML al LI
          nuevoArticulo.innerHTML = contenidoHTML;

          // Agregamos el LI a la lista de artículos
          listaArticulos.appendChild(nuevoArticulo);

          const btnAgregar = document.getElementById(`p-${producto.id}`);
          btnAgregar.addEventListener("click", () => {
            agregarAlCarrito(producto.id);
          });
        }
    })
    .catch(e => console.error( new Error(e)));
}
apiBtn.addEventListener('click', callApi)

