let paso = 1;
const pasoInicial = 1;
const pasoFinal = 3;

const cita = {
    nombre:'',
    fecha: '',
    hora:'',
    servicios:[]
}
document.addEventListener('DOMContentLoaded',()=>{
    iniciarApp();
});
function iniciarApp(){
    mostrarSeccion();
    tabs();
    botonesPaginador ();
    paginaSiguiente();
    paginaAnterior();

    consultarAPI();
    nombreCliente();
    seleccionarFecha();
    seleccionarHora();
    mostrarResumen();

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
            mostrarSeccion();
            botonesPaginador();
            if(paso===3){
                mostrarResumen()
            }
        })
    });
}
function botonesPaginador(){
    const paginaAnterior = document.querySelector ('#anterior');
    const paginaSiguiente = document.querySelector('#siguiente');
    if(paso===1){
        paginaAnterior.classList.add('ocultar')
        paginaSiguiente.classList.remove('ocultar')
    }else if (paso ===2 ){
        paginaSiguiente.classList.remove('ocultar')
        paginaAnterior.classList.remove('ocultar')
    }else if (paso === 3){
        paginaAnterior.classList.remove('ocultar')
        paginaSiguiente.classList.add('ocultar')
        mostrarResumen()
    }
    mostrarSeccion();
}
function paginaAnterior(){
    const paginaAnterior = document.querySelector ('#anterior');
    paginaAnterior.addEventListener('click', ()=>{
        if (paso <= pasoInicial) return;
        paso--;
        botonesPaginador();
    })
}
function paginaSiguiente(){
    const paginaSiguiente = document.querySelector('#siguiente');
    paginaSiguiente.addEventListener('click', ()=>{
        if (paso >= pasoFinal) return;
        paso++;
        botonesPaginador();
    })
}
async function consultarAPI(){
    try{
        const url = 'http://localhost:3000/api/servicios';
        const resultado = await fetch(url);
        const servicios = await resultado.json();
        mostrarServicios(servicios);

    }catch(error){
        console.log(error);
    }
}

function mostrarServicios (servicios){
    servicios.forEach(servicio=>{
        const { id, nombre, precio }= servicio;

        const nombreServicio = document.createElement('P');
        nombreServicio.classList.add('nombre-servicio');
        nombreServicio.textContent= nombre;

        const precioServicio = document.createElement('P');
        precioServicio.classList.add('precio-servicio');
        precioServicio.textContent = `$ ${precio}`;

        const servicioDiv= document.createElement('DIV');
        servicioDiv.classList.add('servicio');
        servicioDiv.dataset.idServicio = id;
        servicioDiv.onclick = function () {seleccionarServicio(servicio)};


        servicioDiv.appendChild(nombreServicio);
        servicioDiv.appendChild(precioServicio);

        document.querySelector('#servicios').appendChild(servicioDiv);
        

    })
}
function seleccionarServicio(servicio){
    const { id } = servicio;
    const {servicios} = cita;
    const divServicio = document.querySelector(`[data-id-servicio="${id}"]`)
    if(servicios.some(agregado => agregado.id === id )){
        cita.servicios= servicios.filter( agregado => agregado.id !== id)
        divServicio.classList.remove('seleccionado');
    }else{
        cita.servicios=[...servicios,servicio];
        divServicio.classList.add('seleccionado');
    }
}
function nombreCliente(){
    cita.nombre= document.querySelector('#nombre').value;
}
function seleccionarFecha(){
    const inputFecha = document.querySelector('#fecha');
    inputFecha.addEventListener('input' ,e => {

        const dia = new Date(e.target.value).getUTCDay();

        if([6,0].includes(dia)){
            mostrarAlerta ("Fines de semana no permitidos","error",".formulario");
            e.target.value=""
        }else{
            cita.fecha = e.target.value
        }
    })
}
function seleccionarHora (){
    const intputHora = document.querySelector('#hora');
    intputHora.addEventListener('input',e=>{
        const horaCita = e.target.value;
        const hora = horaCita.split(':')[0];
        if (hora < 10 || hora > 18){
            mostrarAlerta('Hora no válida','error','.formulario')
            e.target.value=""
        }else{
            cita.hora=e.target.value;
        }
        console.log(cita);
    })
}
function mostrarAlerta (mensaje, tipo,elemento,desaparece = true ){
    const alertaPrevia = document.querySelector('.alerta');
    if(alertaPrevia) {
        alertaPrevia.remove();
    };
    const alerta = document.createElement('DIV');
    alerta.textContent= mensaje;
    alerta.classList.add('alerta');
    alerta.classList.add(tipo);


    const formulario = document.querySelector(elemento);
    formulario.appendChild(alerta);

    if (desaparece)
        setTimeout(()=> alerta.remove(),3000)
}
function mostrarResumen(){
    const resumen = document.querySelector('.contenido-resumen');

    while(resumen.firstChild){
        resumen.removeChild((resumen.firstChild))
    }

    if (Object.values(cita).includes('') || cita.servicios.length===0){
        mostrarAlerta('Faltan datos de Servicios,Fecha u Hora','error','.contenido-resumen',false);
        return;
    }


    const {nombre,fecha,hora,servicios} = cita;

    const nombreCliente = document.createElement('P');
    nombreCliente.innerHTML=`<span>Nombre:</span>${nombre}`;
    const fechaCita = document.createElement('P');
    nombreCliente.innerHTML=`<span>Nombre:</span>${fecha}`;
    const horaCita = document.createElement('P');
    nombreCliente.innerHTML=`<span>Hora:</span>${hora}`;

    servicios.forEach(servicio => {
        const {id,precio,nombre}= servicio;
        const contenedorServicio = document.createElement('DIV');
        contenedorServicio.classList.add('contenedor-servicio');
        const textServicio = document.createElement('P');
        textServicio.textContent= nombre;
        const precioServicio = document.createElement('P');
        precioServicio.innerHTML=`<span>Precio</span>$${precio}`;

        contenedorServicio.appendChild(textServicio);
        contenedorServicio.appendChild(precioServicio);
        resumen.appendChild(contenedorServicio);

    })
    resumen.appendChild(nombreCliente);
    resumen.appendChild(fechaCita);
    resumen.appendChild(horaCita);

}

