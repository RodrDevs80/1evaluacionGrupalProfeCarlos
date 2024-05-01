/*Caso de estudio:
Proceso de Recepción y Actualización del Stock de Maíz
Introducción:
La Cooperativa La Perdedora está a punto de iniciar la cosecha de maíz. El recibidor de granos 
tiene la responsabilidad de recibir un ingreso inicial de 3000 toneladas de maíz y actualizar el stock 
en el silo correspondiente. Para garantizar un proceso eficiente y seguro, es necesario seguir una 
serie de pasos específicos. 
Objetivos:
 Verificar el stock actual de maíz en el silo designado.
 Recibir 3000 toneladas de maíz del camión transportador.
 Actualizar el stock de maíz en el sistema de gestión de inventarios.
 Informar al personal de la cooperativa sobre el stock actualizado de maíz.
Procedimiento:
1. Verificación del stock actual:
 Consultar el stock actual del silo correspondiente a cereal maíz.
2. Recepción del maíz:
 Asegurarse de que el maíz descargado cumpla con los estándares de calidad 
establecidos por la cooperativa:
 Verificar el estado del maíz y dirigirlo al silo correspondiente:
 Si tiene cuerpos extraños, debe ir a un silo dos (2) reservado para este fin.
 Si tiene humedad, debe ir a silo tres (3) reservado para tal fin.
3. Actualización del stock:
 Sumar la cantidad de maíz descargado al stock actual
 */
//vamos a suponer que la empresa tiene 3 silos  1 de 4000 toneladas y 2 de 3000 toneladas cada uno;
//variables
let condicion;
//variable-array
const silos = [{
    nombre: 'Silo1',
    cantidadDeMaiz: 0,
    tipoDeMaiz: 'alta calidad',
    amacenamientoMaximo: 4000
},
{
    nombre: 'Silo2',
    cantidadDeMaiz: 0,
    tipoDeMaiz: 'presenta objetos extraños',
    amacenamientoMaximo: 3000
},
{
    nombre: 'Silo3',
    cantidadDeMaiz: 0,
    tipoDeMaiz: 'presenta humedad',
    amacenamientoMaximo: 3000
},
];
//variables-objetos
const maiz = {
    procedencia: '',
    cantidad: 0,
    estado: ''
}
//funciones
function validarEntradaDeDatos(origen, cantidad, estado) {

    if (origen === null || origen === "" || !isNaN(origen)) {
        return 'ERROR:No se ingreso un valor o el mismo no es valido!❌';
    }
    if (cantidad === null || cantidad === "") {
        return 'ERROR:No se ingreso ningún valor!❌';
    } else if (isNaN(cantidad)) {
        return 'ERROR:No ingreso un numero!❌';
    }
    if (isNaN(estado)) {
        return 'ERROR:No ingreso un dato valido!❌';
    } else {
        if (!(Number(estado) >= 1 && Number(estado) <= 3)) {
            return 'ERROR:Numero fuera de rango!❌';
        }
    }
    return [origen, Number(cantidad), Number(estado)];

}

function mostarStock(array) {
    for (let i = 0; i < array.length; i++) {
        alert(`El ${array[i].nombre}, tiene ${array[i].cantidadDeMaiz} toneladas, Calidad: ${array[i].tipoDeMaiz},Capacidad libre:${array[i].amacenamientoMaximo} Toneladas 🚚`);
    }
}

function ControlarIngresoAlSilo(array, index) {
    if (array[index].cantidadDeMaiz >= 0 && array[index].cantidadDeMaiz < 3000) {
        array[index].cantidadDeMaiz += maiz.cantidad;
        array[index].amacenamientoMaximo -= array[index].cantidadDeMaiz;
    } else {
        alert('Supera la cantidad de almacenaje del silo!⚠');
    }
}


function ingresarAndClasificarMaiz(array, maiz) {

    do {
        const maizIngresadoOrigen = prompt('Ingrese la procedencia del maíz:');
        const maizIngresadoCantidad = prompt('Ingrese la cantidad de maíz en toneladas:');
        const maizIngresadoEstado = prompt(`\n**Calidad del Maiz 🌽 **\n1️⃣. Alta calidad\n2️⃣.Presencia de cuerpos extraños \n3️⃣. Presencia de Humedad\n\nElija una opción:`);
        condicion = validarEntradaDeDatos(maizIngresadoOrigen, maizIngresadoCantidad, maizIngresadoEstado);
        if (condicion.includes('ERROR')) {
            alert(condicion);
        }
    } while (condicion.includes('ERROR'));
    maiz.procedencia = condicion[0];
    maiz.cantidad = condicion[1];
    maiz.estado = condicion[2];
    switch (maiz.estado) {
        case 1:
            array[0].amacenamientoMaximo < maiz.cantidad ? alert('Supera la capacidad maxima del silo,introduzca una cantidad valida ⚠') : ControlarIngresoAlSilo(array, 0);
            break;
        case 2:
            array[1].amacenamientoMaximo < maiz.cantidad ? alert('Supera la capacidad maxima del silo,introduzca una cantidad valida ⚠') : ControlarIngresoAlSilo(array, 1);
            break;
        case 3:
            array[2].amacenamientoMaximo < maiz.cantidad ? alert('Supera la capacidad maxima del silo,introduzca una cantidad valida ⚠') : ControlarIngresoAlSilo(array, 2);
            break;
        default:
            console.log('opción no valida!');
            break;
    }

}


//main->Menu principal
do {
    opcion = prompt(`\n**Empresa La Perdedora 🕋**\n**Sistema de Ingreso y Clasificación de Maiz 🌽 **\n1️⃣. Ingresar Maiz y Clasificar Maiz\n2️⃣.Mostrar stock actual \n3️⃣. Salir\n\nElija una opción:`);
    switch (opcion) {
        case '1':
            ingresarAndClasificarMaiz(silos, maiz);
            break;
        case '2':
            mostarStock(silos);
            break;
        case '3':
            break;
        default:
            alert('\nIngreso una opción no valida!\nLas opciones validas están en el rango de 1 a 3 ❌')
            break;
    }

} while (opcion != 3);
