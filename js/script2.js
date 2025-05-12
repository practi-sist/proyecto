const detallesSegPan = document.getElementById('t');
const ticketsPantalla2 = document.getElementById('ticket-body-pantalla2');
const formBuscarPantalla2 = document.getElementById('form-buscar-pantalla2');
var paginaTicket = 1;
const resultadosPorPagina = 10;


formBuscarPantalla2.addEventListener('submit', async (e) => {
    e.preventDefault();

    paginaTicket = 1;
    const formData = new FormData(formBuscarPantalla2);
    const formDataJson = Object.fromEntries(formData.entries());
    obtenerDatosTicket(formDataJson)
})


async function obtenerDatosTicket(formData) {
    const URL = "php/ObtenerTickets.php?contenido=" + formData.contenido + "&pagina=" + paginaTicket + "&resultadosPorPagina=" + resultadosPorPagina;
    const modalCargando = document.querySelector('.contenedor-cargando');
    try {
        modalCargando.style.display = "flex";

        const response = await fetch(URL)

        if (!response.ok) {
            throw new Error('Error al obtener los datos')
        }

        const data = await response.json();
        mostrarTicket(data)
        paginacion(data.totalResultados)
        modalCargando.style.display = "none";
    } catch (error) {
        console.log(error)
        modalCargando.style.display = "none";
    }

}

function mostrarTicket(datos) {
    const tick = datos['datos'];

    if (tick.length === 0) {
        ticketsPantalla2
            .innerHTML = "";
    } else {
        ticketsPantalla2.innerHTML = "";
        tick.forEach(e => {
            const tr = document.createElement('tr');
            const td1 = document.createElement('td');
            const td2 = document.createElement('td');
            const td3 = document.createElement('td');
            const td4 = document.createElement('td');
            const td5 = document.createElement('td');
            const td6 = document.createElement('td');
            const td7 = document.createElement('td');

            td1.textContent = e.id_ticket;
            td2.textContent = e.usuario_solicito;
            td3.textContent = e.usuario_atendio ? e.usuario_atendio : 'Ninguno';
            td4.textContent = e.progreso;
            td5.textContent = e.tipo_ticket;
            td6.textContent = prioridad(e.prioridad);
            td7.classList.add('icon-eye');
            const img = document.createElement('img');
            img.src = 'img/icon-ojo.jpg';
            img.width = 24;
            img.height = 24;
            img.addEventListener('click', () => {
                verDetalles(e.id_ticket);
            })
            td7.appendChild(img);

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);
            tr.appendChild(td6);
            tr.appendChild(td7);
            ticketsPantalla2.appendChild(tr);
        });

    }

}

function saludar() {
    console.log("Hola")
}

function verDetalles(id) {
    console.log(id)
}

function prioridad(prioridad) {
    switch (prioridad) {
        case 1:
            return "Baja";
            break;
        case 2:
            return "Media";
            break;
        case 3:
            return "Alta";
            break;
        case 4:
            return "Urgente";
            break;
    }
}

function paginacion(filas) {
    const paginacionHtml = document.querySelector('.paginacion1');

    paginacionHtml.innerHTML = "";
    const totalPaginas = Math.ceil(filas / resultadosPorPagina);
    console.log(totalPaginas)
    const ul = document.createElement('ul');

    if (totalPaginas === 0) {
        paginacionHtml.innerHTML = "";
    } else if (totalPaginas < 4) {

        for (let i = 0; i < totalPaginas; i++) {
            const li = document.createElement('li');
            li.textContent = i + 1;
            if (paginaTicket === i + 1) {
                li.classList.add('enter');
            } else {
                li.addEventListener('click', () => {
                    paginaTicket = i + 1;
                    const formData = new FormData(formBuscarPantalla2);
                    SetTimeout(() => {
                        obtenerDatosTicket(formData)
                    }, 500)
                })
            }
            ul.appendChild(li);
        }

    } else {
        for (let i = 0; i < totalPaginas; i++) {

            const li = document.createElement('li');

            if ((paginaTicket + i - 1) > 0 && (paginaTicket + i - 1) <= totalPaginas) {
                li.textContent = (paginaTicket + i - 1);
                if (paginaTicket === paginaTicket + i - 1) {
                    li.classList.add('enter');
                } else {
                    li.addEventListener('click', () => {
                        paginaTicket = paginaTicket + i - 1;
                        console.log(paginaTicket)
                        setTimeout(() => {
                            const formData = new FormData(formBuscarPantalla2);
                            obtenerDatosTicket(formData)
                        }, 500)
                    })
                }
                ul.appendChild(li);
            }

        }

    }

    if ((paginaTicket - 2) > 0) {
        const li = document.createElement('li');
        li.textContent = "«";
        li.addEventListener('click', () => {
            paginaTicket = 1;
            formBuscarPantalla2.querySelector('input[type="submit"]').click();
        })
        const li2 = document.createElement('li');
        li2.textContent = "...";
        ul.insertBefore(li2, ul.firstChild);
        ul.insertBefore(li, ul.firstChild);
    }

    if ((paginaTicket + 2) < totalPaginas) {
        const li = document.createElement('li');
        li.textContent = "»";
        li.addEventListener('click', () => {
            paginaTicket = totalPaginas;
            /*             formBuscarPantalla2.querySelector('input[type="submit"]').click(); */
            const formData = new FormData(formBuscarPantalla2);
            SetTimeout(() => {
                obtenerDatosTicket(formData)
            }, 500)

        })
        const li2 = document.createElement('li');
        li2.textContent = "...";
        ul.appendChild(li2);
        ul.appendChild(li);
    }

    paginacionHtml.appendChild(ul);



    /*     <ul>
        <li> « </li>
        <li> 1</li>
        <li> 2</li>
        <li> 3 </li>
        <li>»</li>
    </ul> */
}