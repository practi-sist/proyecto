const barraNavegacion = document.getElementById("barra-navegacion");

const botonesMenu = barraNavegacion.querySelectorAll("li");
const allSection= document.querySelectorAll(".pantalla");
console.log(allSection)
botonesMenu.forEach((botton,idx)=> {
    botton.addEventListener("click", (event) => {

        botonesMenu.forEach(botton => {

            botton.classList.remove("selected");

        })
        allSection.forEach((section,index)=> {
            if(idx === index){
                section.classList.remove("hidden");
            } else{
                section.classList.add("hidden");
            }
        })
botton.classList.add("selected");
    })
})