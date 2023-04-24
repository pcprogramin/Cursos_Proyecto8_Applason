let paso = 1;
document.addEventListener('DOMContentLoaded',()=>{
    iniciarApp();
});
function iniciarApp(){
    mostrarSeccion();
    tabs();
}
function mostrarSeccion(){
    const seccionAnterior = document.querySelector('.mostrar');
    
    if(seccionAnterior){
        seccionAnterior.classList.remove('mostrar');
    }
        
    const seccion = document.querySelector(`#paso-${paso}`);
    seccion.classList.add('mostrar');

    const tabAnterior =document.querySelector('.actual');
    if(tabAnterior){
        tabAnterior.classList.remove('actual')
    }

    const tab = document.querySelector(`[data-paso="${paso}"]`);
    tab.classList.add("actual")
}
function tabs (){
    const botones = document.querySelectorAll('.tabs button');
    botones.forEach((boton)=> {
        boton.addEventListener('click',e=>{
            paso = parseInt(e.target.dataset.paso);
            mostrarSeccion()
        })
    });
}