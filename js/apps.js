const stockProductos = [
    {   id: 1,
        nombre: "RTX 2060",
        cantidad: 1,
        desc: "Tarjeta grafica nvidia gama media",
        precio: 200000,
        img: "img/rtx2060.jpg",
    },
    {
        id: 2,
        nombre: "Rtx 3070",
        cantidad: 1,
        desc: "Tarjeta grafica nvidia gama media",
        precio: 400000,
        img: "img/rtx3070.jpg",
    },
    {
        id: 3,
        nombre: "Rtx 3060",
        cantidad: 1,
        desc: "Tarjeta grafica Nvidia gama media",
        precio: 300000,
        img: "img/msi3060.jpg",
    },
    {
        id: 4,
        nombre: "Rx 5700xt",
        cantidad: 1,
        desc: "Tarjeta grafica radeon gama baja",
        precio: 130000,
        img: "img/rx5700xt.jpg",
    },
    {
        id: 5,
        nombre: "Rx 6600xt",
        cantidad: 1,
        desc: "Tarjeta grafica radeon gama media",
        precio: 250000,
        img: "img/rx6600xt.jpg",
    },
    {
        id: 6,
        nombre: "Rx 6800xt",
        cantidad: 1,
        desc: "Tarjeta grafica Radeon gama alta",
        precio: 600000,
        img: "img/rx6800xt.jpg",
    },
    {
        id: 7,
        nombre: "Playstation 5",
        cantidad: 1,
        desc: "Consola Playstation 5",
        precio: 1000000,
        img: "img/playstation5.jpg",
    },
    {
        id: 8,
        nombre: "Xbox series x",
        cantidad: 1,
        desc: "Consola Xbox series x",
        precio: 900000,
        img: "img/xboxsx.jpg",
    },
    {
        id: 9,
        nombre: "Dualsense ps5",
        cantidad: 1,
        desc: "Joystick de playstation 5",
        precio: 130000,
        img: "img/joystickdualsense.jpg",
    },
    {
        id: 10,
        nombre: "Joystick xbox",
        cantidad: 1,
        desc: "Joystick ultima generacion xbox",
        precio: 130000,
        img: "img/joystickxbox.jpg",
    },
    
];

let carrito = [];

const contenedor = document.querySelector("#contenedor");
const carritoContenedor = document.querySelector("#carritoContenedor");
const vaciarCarrito = document.querySelector("#vaciarCarrito");
const precioTotal = document.querySelector("#precioTotal");
const activarFuncion = document.querySelector("#activarFuncion");
const procesarCompra = document.querySelector("#procesarCompra");
const totalProceso = document.querySelector("#totalProceso");
const formulario = document.querySelector('#procesar-pago')

if (activarFuncion) {
    activarFuncion.addEventListener("click", procesarPedido);
}

document.addEventListener("DOMContentLoaded", () => {
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    mostrarCarrito();
    document.querySelector("#activarFuncion").click(procesarPedido);
});

if(formulario){
    formulario.addEventListener('submit', enviarCompra)
}


if (vaciarCarrito) {
    vaciarCarrito.addEventListener("click", () => {
    carrito.length = [];
    mostrarCarrito();
    });
}

if (procesarCompra) {
    procesarCompra.addEventListener("click", () => {
    if (carrito.length === 0) {
        Swal.fire({
            title: "¡Tu carrito está vacio!",
            text: "Compra algo para continuar con la compra",
            icon: "error",
            confirmButtonText: "Aceptar",
        });
    } else {
        location.href = "compra.html";
    }
    });
}

stockProductos.forEach((prod) => {
    const { id, nombre, precio, desc, img, cantidad } = prod;
    if (contenedor) {
        contenedor.innerHTML += `
        <div class="card mt-3" style="width: 18rem;">
        <img class="card-img-top mt-2 imagen" src="${img}" alt="Card image cap">
        <div class="card-body">
        <h5 class="card-title">${nombre}</h5>
        <p class="card-text">Precio: ${precio}$</p>
        <p class="card-text">Descripcion: ${desc}</p>
        <p class="card-text">Cantidad: ${cantidad}</p>
        <button class="btn btn-primary" onclick="agregarProducto(${id})">Comprar Producto</button>
        </div>
        </div>
    `;
    }
});

const agregarProducto = (id) => {
    const existe = carrito.some(prod => prod.id === id)  
    if(existe){
        const prod = carrito.map(prod => {
            if(prod.id === id){
                prod.cantidad++
            }
        })
    } else {
        const item = stockProductos.find((prod) => prod.id === id)
        carrito.push(item)
    }
    mostrarCarrito()
};

const mostrarCarrito = () => {
    const modalBody = document.querySelector(".modal .modal-body");
    if (modalBody) {
        modalBody.innerHTML = "";
        carrito.forEach((prod) => {
            const { id, nombre, precio, desc, img, cantidad } = prod;
            modalBody.innerHTML += `
            <div class="modal-contenedor">
            <div>
            <img class="img-fluid img-carrito" src="${img}"/>
            </div>
            <div>
            <p>Producto: ${nombre}</p>
            <p>Precio: ${precio}</p>
            <p>Cantidad :${cantidad}</p>
            <button class="btn btn-danger"  onclick="eliminarProducto(${id})">Eliminar producto</button>
            </div>
            </div>
            `;
        });
    }

    if (carrito.length === 0) {
        console.log("Nada");
        modalBody.innerHTML = `
        <p class="text-center text-primary parrafo">¡Aun no agregaste nada!</p>
        `;
    }
    carritoContenedor.textContent = carrito.length;

    if (precioTotal) {
        precioTotal.innerText = carrito.reduce(
        (acc, prod) => acc + prod.cantidad * prod.precio,
        0
        );
    }

    guardarStorage();
};

function guardarStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function eliminarProducto(id) {
    const juegoId = id;
    carrito = carrito.filter((juego) => juego.id !== juegoId);
    mostrarCarrito();
}

function procesarPedido() {
    carrito.forEach((prod) => {
        const listaCompra = document.querySelector("#lista-compra tbody");
        const { id, nombre, precio, img, cantidad } = prod;
        if (listaCompra) {
            const row = document.createElement("tr");
            row.innerHTML += `
                <td>
                <img class="img-fluid img-carrito" src="${img}"/>
                </td>
                <td>${nombre}</td>
                <td>${precio}</td>
                <td>${cantidad}</td>
                <td>${precio * cantidad}</td>
                `;
            listaCompra.appendChild(row);
        }
    });
    totalProceso.innerText = carrito.reduce(
    (acc, prod) => acc + prod.cantidad * prod.precio,
    0
    );
}

function enviarCompra(e){
    e.preventDefault()
    const cliente = document.querySelector('#cliente').value
    const email = document.querySelector('#correo').value

    if(email === '' || cliente == ''){
        Swal.fire({
        title: "¡Debes Ingresar tu Nombre y Correo!",
        text: "Completa todos los campos",
        icon: "error",
        confirmButtonText: "Aceptar",
        })
    } else {
        
        const btn = document.getElementById('button');
        btn.value = 'Enviando...';

        const serviceID = 'default_service';
        const templateID = 'template_qxwi0jn';

        emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
            btn.value = 'Finalizar compra';
            Swal.fire({
                title: "¡Pedido confirmado!",
                text: "Gracias por tu compra",
                icon: "success",
                confirmButtonText: "Seguir Comprando",
                })
        }, (err) => {
            btn.value = 'Finalizar compra';
            alert(JSON.stringify(err));
            }
        );

        const spinner = document.querySelector('#spinner')
        spinner.classList.add('d-flex')
        spinner.classList.remove('d-none')

        setTimeout(() => {
            spinner.classList.remove('d-flex')
            spinner.classList.add('d-none')
            formulario.reset()

        const alertExito = document.createElement('p')
        alertExito.classList.add('alert', 'alerta', 'd-block', 'text-center', 'col-12', 'mt-2', 'alert-success')
        alertExito.textContent = 'Compra Exitosa'
        formulario.appendChild(alertExito)

        setTimeout(() => {
            alertExito.remove()
        }, 3000)
        }, 3000)
    }
    localStorage.clear()

}