//Declaracion de Objetos
const txtId = document.getElementById('txtId');
const txtNombre = document.getElementById('txtNombre');
const txtEscuela = document.getElementById('txtEscuela');

const btnAgregar = document.getElementById('btnAgregar');
const tabla = document.getElementById('tabla');
const tbody = document.getElementById('tbody');

const pError = document.getElementById('pError');

//Establecer funciones
    //Funcion Agregar Usuario
function agregar(){
    //validar
    let USER = txtUser.value;
    let ID = txtId.value;
    let TITLE = txtTitle.value; //Pregunta el titulo
    let COMPLETED = txtCompleted.value; //Preguntar si es true o false

    if(!USER || !ID || !TITLE || !COMPLETED){
        mostrarError("faltaron datos por capturar", 5000);
        return;
    }

    //agregar a la tabla
    const fila = document.createElement('tr');

    const c1 = document.createElement('td');
        c1.textContent = USER;
        fila.appendChild(c1);

    const c2 = document.createElement('td');
        c2.textContent = ID;
        fila.appendChild(c2);

    const c3 = document.createElement('td');
        c3.textContent = TITLE;
        fila.appendChild(c3);

    const c4 = document.createElement('td');
        c4.textContent = COMPLETED;
        fila.appendChild(c4);
    //Agregar la fila al cuerpo de la tabla
    tbody.appendChild(fila);
    //Agregar el cuerpo a la tabla
    tabla.appendChild(tbody);

    //Limpiar los campos
    txtUser.value = "";
    txtId.value = "";
    txtTitle.value = "";
    txtCompleted.value = "";
}

    //mostrar error
function mostrarError(mensaje, tiempo){
    pError.textContent = mensaje;
    setTimeout(() => {
        pError.textContent = "*";//Es para limpiar el mensaje de error
    }, tiempo);
}

    //Peticion
function peticion(){
    fetch('')//URL de la API
    fetch(url, {method:'get'})
    .then(response => response.json())
    .then(data => {mostrarUsuario(data)})
    .catch(error => {mostrarError(error, 5000)});
}
    //Mostrar Usuarios
function mostrarUsuario(data){
    data.forEach(Usuario => {
        //Agrega informacion de manera dinamica a la tabla
        //agrega a la tabla
        const fila = document.createElement('tr');

        const c1 = document.createElement('td');
            c1.textContent = Usuario.USER;
            fila.appendChild(c1);

        const c2 = document.createElement('td');
            c2.textContent = Usuario.ID;
            fila.appendChild(c2);

        const c3 = document.createElement('td');
            c3.textContent = Usuario.TITLE;
            fila.appendChild(c3);

        const c4 = document.createElement('td');
            c4.textContent = Usuario.COMPLETED;
            fila.appendChild(c4);

        //Agregar la fila al cuerpo de la tabla
        tbody.appendChild(fila);
       
    });
     //Agregar el cuerpo a la tabla
    tabla.appendChild(tbody);
}

//Agregar Eventos
btnAgregar.addEventListener('click', agregar);
document.addEventListener('DOMContentLoaded', peticion);//Cuando el documento se haya cargado, se ejecuta la funcion peticion