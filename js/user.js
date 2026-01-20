//Declaracion de Objetos
const txtUser = document.getElementById('txtUser');
const txtId = document.getElementById('txtId');
const txtTitle = document.getElementById('txtTitle');
const chkCompleted = document.getElementById('chkCompleted');

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
    let TITLE = txtTitle.value;
    let COMPLETED = chkCompleted.checked;

    if(!USER || !ID || !TITLE){
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
        c4.textContent = COMPLETED ? 'Sí' : 'No';
        fila.appendChild(c4);
    //Agregar la fila al cuerpo de la tabla
    tbody.appendChild(fila);
    //Agregar el cuerpo a la tabla
    tabla.appendChild(tbody);

    //Limpiar los campos
    txtUser.value = "";
    txtId.value = "";
    txtTitle.value = "";
    chkCompleted.checked = false;;
}

    //mostrar error
function mostrarError(mensaje, tiempo){
    pError.textContent = mensaje;
    pError.style.display = 'block';
    setTimeout(() => {
        pError.style.display = 'none';
    }, tiempo);
}

    //Peticion
function peticion(){
    fetch('https://jsonplaceholder.typicode.com/todos')//URL de la API
    .then(response => response.json())
    .then(data => {mostrarUsuario(data);
    })
    .catch(error => {mostrarError(error, 5000)});
}
    //Mostrar Usuarios
function mostrarUsuario(data){
    data.forEach(Usuario => {
        //Agrega informacion de manera dinamica a la tabla
        //agrega a la tabla
        const fila = document.createElement('tr');

        const c1 = document.createElement('td');
            c1.textContent = Usuario.userId;
            fila.appendChild(c1);

        const c2 = document.createElement('td');
            c2.textContent = Usuario.id;
            fila.appendChild(c2);

        const c3 = document.createElement('td');
            c3.textContent = Usuario.title;
            fila.appendChild(c3);

        const c4 = document.createElement('td');
            c4.textContent = Usuario.completed ? 'Sí' : 'No';
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