//Declaracion de Objetos
const txtId = document.getElementById('txtId');
const txtNombre = document.getElementById('txtNombre');
const txtEscuela = document.getElementById('txtEscuela');

const btnAgregar = document.getElementById('btnAgregar');
const tabla = document.getElementById('tabla');
const tbody = document.getElementById('tbody');

const pError = document.getElementById('pError');



// declaracion de funciones
function agregar(){
    //validar
    let id = txtId.value;
    let nombre = txtNombre.value;
    let escuela = txtEscuela.value;

    if(!id || !nombre || !escuela){
        mostrarError("faltaron datos por capturar", 5000);
        return;
    }
    
    //agregar a la tabla

    const fila = document.createElement('tr');
    
    const c1 = document.createElement('td');
        c1.textContent = id;
        fila.appendChild(c1);

    const c2 = document.createElement('td');
        c2.textContent = nombre;
        fila.appendChild(c2);

    const c3 = document.createElement('td');
        c3.textContent = escuela;
        fila.appendChild(c3);

      tbody.appendChild(fila);
      tabla.appendChild(tbody);

    //Limpiar los campos
    txtId.value = "";
    txtEscuela.value = "";
    txtNombre.value = "";

}

    //mostrar error
function mostrarError(mensaje, tiempo){
    pError.textContent = mensaje;
    pError.style.display = 'block';
    setTimeout(() => {
        pError.style.display = 'none';
    }, tiempo);
}

async function peticion(){

    let url = "../alumnos.json";

    try{
        const response = await fetch(url, {method: 'get'});
        const data = await response.json();
        mostrarAlumnos(data);

    } catch(error){ mostrarError(error, 5000);}

}

    //esta funcion tambien va a trarar de dibujar en la tabla
function otraTarea(){
    mostrarError("iniciando otra tarea", 3000);
    
    //agrgar 40 filas a la tabla
    for(let con = 0; con<40; con++){
        const fila = document.createElement('tr');

        const c1 = document.createElement('td');
        c1.textContent = con;
        fila.appendChild(c1);
        tbody.appendChild(fila);
    }  
    tabla.appendChild(tbody);  
}

//Funcion principal que va controlar los elementos
async function main(){
    await peticion();
    otraTarea();
}    

function mostrarAlumnos(data){
    data.forEach(Alumno => {

        //Agrega informacion de manera dinamica a la tabla
        //agrega a la tabla

        const fila = document.createElement('tr');
        
        const c1 = document.createElement('td');
            c1.textContent = Alumno.id;
            fila.appendChild(c1);

        const c2 = document.createElement('td');
            c2.textContent = Alumno.nombre;
            fila.appendChild(c2);

        const c3 = document.createElement('td');
            c3.textContent = Alumno.escuela;
            fila.appendChild(c3);
        
        tbody.appendChild(fila);
    });

    tabla.appendChild(tbody);
}

//Seccion de eventos

btnAgregar.addEventListener('click', agregar);  
document.addEventListener('DOMContentLoaded', main);//Cuando el documento se haya cargado, se ejecuta la funcion main