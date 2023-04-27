let paso=1;const pasoInicial=1,pasoFinal=3,cita={nombre:"",fecha:"",hora:"",id:"",servicios:[]};function iniciarApp(){mostrarSeccion(),tabs(),botonesPaginador(),paginaSiguiente(),paginaAnterior(),consultarAPI(),nombreCliente(),seleccionarFecha(),seleccionarHora(),mostrarResumen(),idCliente()}function mostrarSeccion(){const e=document.querySelector(".mostrar");e&&e.classList.remove("mostrar");document.querySelector("#paso-"+paso).classList.add("mostrar");const t=document.querySelector(".actual");t&&t.classList.remove("actual");document.querySelector(`[data-paso="${paso}"]`).classList.add("actual")}function tabs(){document.querySelectorAll(".tabs button").forEach(e=>{e.addEventListener("click",e=>{paso=parseInt(e.target.dataset.paso),mostrarSeccion(),botonesPaginador(),3===paso&&mostrarResumen()})})}function botonesPaginador(){const e=document.querySelector("#anterior"),t=document.querySelector("#siguiente");1===paso?(e.classList.add("ocultar"),t.classList.remove("ocultar")):2===paso?(t.classList.remove("ocultar"),e.classList.remove("ocultar")):3===paso&&(e.classList.remove("ocultar"),t.classList.add("ocultar"),mostrarResumen()),mostrarSeccion()}function paginaAnterior(){document.querySelector("#anterior").addEventListener("click",()=>{paso<=1||(paso--,botonesPaginador())})}function paginaSiguiente(){document.querySelector("#siguiente").addEventListener("click",()=>{paso>=3||(paso++,botonesPaginador())})}async function consultarAPI(){try{const e="http://localhost:3000/api/servicios",t=await fetch(e);mostrarServicios(await t.json())}catch(e){console.log(e)}}function mostrarServicios(e){e.forEach(e=>{const{id:t,nombre:o,precio:a}=e,n=document.createElement("P");n.classList.add("nombre-servicio"),n.textContent=o;const r=document.createElement("P");r.classList.add("precio-servicio"),r.textContent="$ "+a;const c=document.createElement("DIV");c.classList.add("servicio"),c.dataset.idServicio=t,c.onclick=function(){seleccionarServicio(e)},c.appendChild(n),c.appendChild(r),document.querySelector("#servicios").appendChild(c)})}function seleccionarServicio(e){const{id:t}=e,{servicios:o}=cita,a=document.querySelector(`[data-id-servicio="${t}"]`);o.some(e=>e.id===t)?(cita.servicios=o.filter(e=>e.id!==t),a.classList.remove("seleccionado")):(cita.servicios=[...o,e],a.classList.add("seleccionado"))}function nombreCliente(){cita.nombre=document.querySelector("#nombre").value}function seleccionarFecha(){document.querySelector("#fecha").addEventListener("input",e=>{const t=new Date(e.target.value).getUTCDay();[6,0].includes(t)?(mostrarAlerta("Fines de semana no permitidos","error",".formulario"),e.target.value=""):cita.fecha=e.target.value})}function seleccionarHora(){document.querySelector("#hora").addEventListener("input",e=>{const t=e.target.value.split(":")[0];t<10||t>18?(mostrarAlerta("Hora no válida","error",".formulario"),e.target.value=""):cita.hora=e.target.value,console.log(cita)})}function mostrarAlerta(e,t,o,a=!0){const n=document.querySelector(".alerta");n&&n.remove();const r=document.createElement("DIV");r.textContent=e,r.classList.add("alerta"),r.classList.add(t);document.querySelector(o).appendChild(r),a&&setTimeout(()=>r.remove(),3e3)}function mostrarResumen(){const e=document.querySelector(".contenido-resumen");for(;e.firstChild;)e.removeChild(e.firstChild);if(Object.values(cita).includes("")||0===cita.servicios.length)return void mostrarAlerta("Faltan datos de Servicios,Fecha u Hora","error",".contenido-resumen",!1);const{nombre:t,fecha:o,hora:a,servicios:n}=cita,r=document.createElement("H3");r.textContent="Resumen de Servicios",e.appendChild(r),n.forEach(t=>{const{id:o,precio:a,nombre:n}=t,r=document.createElement("DIV");r.classList.add("contenedor-servicio");const c=document.createElement("P");c.textContent=n;const i=document.createElement("P");i.innerHTML="<span>Precio</span>$"+a,r.appendChild(c),r.appendChild(i),e.appendChild(r)});const c=document.createElement("P");c.innerHTML="<span>Nombre:</span>"+t;const i=new Date(o),s=i.getMonth(),d=i.getDate(),l=i.getFullYear(),u=new Date(Date.UTC(l,s,d)).toLocaleDateString("es-ES",{weekday:"long",year:"numeric",month:"long",day:"numeric"}),m=document.createElement("P");m.innerHTML="<span>Fecha:</span>"+u;const p=document.createElement("P");p.innerHTML=`<span>Hora:</span>${a} H`;const v=document.createElement("H3");v.textContent="Resumen de Cita",e.appendChild(v);const h=document.createElement("BUTTON");h.classList.add("boton"),h.textContent="Reservar Cita",h.onclick=reservarCita,e.appendChild(c),e.appendChild(m),e.appendChild(p),e.appendChild(h)}async function reservarCita(){const{nombre:e,fecha:t,hora:o,servicios:a,id:n}=cita,r=a.map(e=>e.id),c=new FormData;c.append("fecha",t),c.append("hora",o),c.append("servicios",r),c.append("usuarioId",n);try{const e="http://localhost:3000/api/citas",t=await fetch(e,{method:"POST",body:c});(await t.json()).resultado&&Swal.fire({icon:"success",title:"Cita Creada",text:"Tu cita fue creada correctamente"}).then(()=>{window.location.reload()})}catch(e){Swal.fire({icon:"error",title:"Error",text:"Hubo un error al reservar citas"}).then(()=>{window.location.reload()})}}function idCliente(){cita.id=document.querySelector("#id").value}document.addEventListener("DOMContentLoaded",()=>{iniciarApp()});