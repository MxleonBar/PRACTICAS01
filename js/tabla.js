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

function mostrarError(mensaje, tiempo){
    pError.textContent = mensaje;
    
    //callback: funcion que reciba otra funcion, y un valor entero = tiempo
    setTimeout(() => {
        pError.textContent = "*";//Es para limpiar el mensaje de error
    }, tiempo);
}

btnAgregar.addEventListener('click', agregar);