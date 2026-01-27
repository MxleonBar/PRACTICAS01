//Declarar objetos
const pError = document.getElementById('pError');
const tabla = document.getElementById('tabla');
const tbody = document.getElementById('tbody');
const comboBox = document.getElementById('comboBox');
const btnBuscar = document.getElementById('btnBuscar');
const totalBebidas = document.getElementById('totalBebidas');

//Funciones

    //mostrar error
function mostrarError(mensaje, tiempo){
    pError.textContent = mensaje;
    pError.style.display = 'block';
    setTimeout(() => {
        pError.style.display = 'none';
    }, tiempo);
}

    //Funcion Peticion
async function peticion(url = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic'){
    try{
        const response = await fetch(url, {method: 'get'});//se realiza una peticion y se guarda la respuesta
        const data = await response.json();//Hacer esperar a la funcion
        const drinks = data.drinks;
        limpiarTabla();
        listarBebidas(drinks);

    }catch(error){mostrarError(error, 3000);}
}

    //Funcion Limpiar Tabla
function limpiarTabla(){
    tbody.innerHTML = '';
}

    //Funcion Listar Bebidas
function listarBebidas(dinks){
    //ciclo para recorrer el arreglo
    dinks.forEach(d => {
        const fila = document.createElement('tr');
        const tdi = document.createElement('td');
            tdi.textContent = d.idDrink;
            fila.appendChild(tdi);
        const nombre = document.createElement('td');
            nombre.textContent = d.strDrink;
            fila.appendChild(nombre);

        const timagen = document.createElement('td');
        const img = document.createElement('img');
        img.src = d.strDrinkThumb;
        img.alt = d.strDrink;
        img.width = 100;
        timagen.appendChild(img);

        fila.appendChild(timagen);
        tbody.appendChild(fila);
    });
    //Actualizar total de bebidas
    totalBebidas.textContent = dinks.length;
}

//Funcion Buscar
async function buscar(){
    const opcion = comboBox.value;
    
    if(opcion === 'No Alcoholicas'){
        peticion('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic');
    }else if(opcion === 'Alcoholicas'){
        peticion('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic');
    }else if(opcion === 'Todas'){//Se hacen la peticiones por separado y luego se combina la data
        try{
            //Primera peticion - Alcoholicas
            const response1 = await fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic');
            const data1 = await response1.json();//Hacer esperar a la funcion esperando que se cumpla la promesa
            const bebidasAlcoholicas = data1.drinks;//Toma el arreglo que arroja la API y lo guarda en una variable
            
            //Segunda peticion - No Alcoholicas
            const response2 = await fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic');
            const data2 = await response2.json();//Hacer esperar a la funcion esperando que se cumpla la promesa
            const bebidasNoAlcoholicas = data2.drinks;//Toma el arreglo que arroja la API y lo guarda en una variable
            
            //Para mostrar todas la bebidas se combinan los dos arreglos bebidasAlcoholicas && bebidasNoAlcoholicas
            const todasLasBebidas = [...bebidasAlcoholicas, ...bebidasNoAlcoholicas];
            limpiarTabla();
            listarBebidas(todasLasBebidas);

        }catch(error){mostrarError(error, 3000);}
    }else{
        mostrarError('Selecciona una opción válida', 2000);
    }
}

async function main() {
    await peticion();
}

//eventos
document.addEventListener('DOMContentLoaded', main);
btnBuscar.addEventListener('click', buscar);