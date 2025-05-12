const formulario = document.getElementById('formulario');
const botonSelecionarImagen = document.getElementById('imagen-boton-preview');
const imagenPreview = document.getElementById('imagen-preview');

formulario.addEventListener('submit', (event) => {
    event.preventDefault();
    const form = new FormData(formulario);
    const formJson = Object.fromEntries(form.entries());
    console.log(formJson);

    registrarTicket(form);
});

async function registrarTicket(datos) {
    const url = 'php/TablaUsuarios.php';
    const modalCargando = document.querySelector(".contenedor-cargando");

    try {
        modalCargando.style.display = 'flex';
        const response = await fetch(url, {
            method: 'post',
            body: datos
        })

        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }

        const data = await response.json();
        modalCargando.style.display = 'none';

        Swal.fire({
            position: "center",
            icon: "success",
            title: data.message,
            showConfirmButton: false,
            timer: 1500
        });
        formulario.reset();
        imagenPreview.src = "";
    } catch (e) {
        console.error("Error en la consulta: " + e)
        modalCargando.style.display = 'none';
        Swal.fire({
            position: "center",
            icon: "error",
            title: "Error al registrar el ticket",
            showConfirmButton: false,
            timer: 1500
        });
    }
}


botonSelecionarImagen.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    imagenPreview.src = url;
})


