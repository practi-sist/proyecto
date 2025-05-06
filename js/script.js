const formulario= document.getElementById('formulario');
formulario.addEventListener('submit', (event)=>{
    event.preventDefault();
    const form= new FormData(formulario);
    const formJson = Object.fromEntries(form.entries());
    console.log(formJson);
    registrarTicket (form);
});

async function registrarTicket(datos){
    const url='';
    const modalCargando = document.querySelector(".contenedor-cargando");
    
    try {
        modalCargando.style.display = 'flex';
        const responce= await fetch (url, {
            method: 'post',
            body: form,
        })
        
        const data = await responce.json();
        console.log(data);
    } catch (e) {
        
    }

}

const botonSelecionarImagen = document.getElementById ('imagen-boton-preview');
const imagenPreview = document.getElementById('imagen-preview');

botonSelecionarImagen.addEventListener('change', (event) =>{
    const file= event.target.files[0];
    const url= URL.createObjectURL(file);
    imagenPreview.src = url;
})
