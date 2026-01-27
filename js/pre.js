//Descripcion: script para pre examen, obtiene datos de usuario por ID haciendo una petición y los muestra en el formulario
//Declaracion de variables

const txtId = document.getElementById('txtId');
const txtNombre = document.getElementById('nombre');
const txtUsername = document.getElementById('username');
const txtEmail = document.getElementById('email');
const txtDomicilio = document.getElementById('domicilio');
const txtCodigoPostal = document.getElementById('codigoPostal');
const txtCiudad = document.getElementById('ciudad');
const pError = document.getElementById('pError');
const cardResultados = document.getElementById('cardResultados');

const btnMostrar = document.getElementById('btnMostrar');
//Establecer Funciones

    //peticion por index
    async function peticionTrabajador(id){
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        return await response.json();
    }

    //obtener usuario
    function obtenerUsuario(){
        let id = txtId.value;
        //Validacion del ID
        if(!id){
            pError.style.display = 'block';
            pError.textContent = 'Por favor ingrese un ID';
            cardResultados.style.display = 'none';
            return;
        }

        peticionTrabajador(id)
        .then(data => {
            mostrarTrabajador(data);
        })
        .catch(error => {
            pError.style.display = 'block';
            pError.textContent = 'Párrafo mostrar Error, o no encontró el ID';
            cardResultados.style.display = 'none';
            console.error('Error:', error);
        });
        
        //mostrar usuario
        function mostrarTrabajador(data){
            txtNombre.textContent = data.name;
            txtUsername.textContent = data.username;
            txtEmail.textContent = data.email;
            txtDomicilio.textContent = data.address.street;
            txtCodigoPostal.textContent = data.address.zipcode;
            txtCiudad.textContent = data.address.city;
            pError.style.display = 'none';
            cardResultados.style.display = 'block';
        }
    }

//Agregar Eventos
btnMostrar.addEventListener('click', obtenerUsuario);