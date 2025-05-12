const detallesSegPan = document.getElementById('t');
const ticketsPantalla2 = document.getElementById('ticket-body-pantalla2');
const formBuscarPantalla2 = document.getElementById('form-buscar-pantalla2');

formBuscarPantalla2.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(formBuscarPantalla2);
    const formDataJson = Object.fromEntries(formData.entries());
    obtenerDatosTicket(formDataJson)
})


async function obtenerDatosTicket(formData) {
    const URL = "php/ObtenerTickets.php?contenido=" + formData.contenido;
    const modalCargando = document.querySelector('.contenedor-cargando');
    try {
        modalCargando.style.display = "flex";

        const response = await fetch(URL)

        if (!response.ok) {
            throw new Error('Error al obtener los datos')
        }

        const data = await response.json();
        mostrarTicket(data)

        modalCargando.style.display = "none";
    } catch (error) {
        console.log(error)
        modalCargando.style.display = "none";
    }

}

function mostrarTicket(datos) {
 const tickets = datos.datos;
 
 if (tickets.length === 0) {
    ticketsPantalla2
    .innerHTML = "";
 }

}

function saludar() {
    console.log("Hola")
}
