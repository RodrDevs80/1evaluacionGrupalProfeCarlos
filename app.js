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
    almacenamientoMaximo: 4000
},
{
    nombre: 'Silo2',
    cantidadDeMaiz: 0,
    tipoDeMaiz: 'presenta objetos extraños',
    almacenamientoMaximo: 3000
},
{
    nombre: 'Silo3',
    cantidadDeMaiz: 0,
    tipoDeMaiz: 'presenta humedad',
    almacenamientoMaximo: 3000
},
];
const ingresos = [];
let idMaiz = 0;
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
        alert(`El ${array[i].nombre}, tiene ${array[i].cantidadDeMaiz} toneladas, Calidad: ${array[i].tipoDeMaiz},Capacidad libre:${array[i].almacenamientoMaximo - array[i].cantidadDeMaiz} Toneladas 🚚`);
    }
}
//⚠❓
function ControlarIngresoAlSilo(array, index, cant) {
    if (array[index].cantidadDeMaiz >= 0 && array[index].cantidadDeMaiz <= array[index].almacenamientoMaximo) {
        array[index].cantidadDeMaiz += cant;
        alert('Ingreso realizado con éxito!💾✔')
    } else {
        alert('Supera la cantidad de almacenaje del silo!⚠');
    }

}

function informeGeneralSilos(array) {
    const informe = `\n**INFORME GENERAL DE LOS INGRESOS DE MAÍZ 🖨***\n${array[0].nombre},contiene:🌽${array[0].cantidadDeMaiz} TN 🚍. Espacio disponible: ${array[0].almacenamientoMaximo - array[0].cantidadDeMaiz}TN 🚍. Calidad: ${array[0].tipoDeMaiz} 🥇 \n ${array[1].nombre},contiene:🌽${array[1].cantidadDeMaiz} TN 🚍. Espacio disponible: ${array[1].almacenamientoMaximo - array[1].cantidadDeMaiz}TN 🚍. Calidad: ${array[1].tipoDeMaiz} 🧩\n${array[2].nombre},contiene:🌽${array[2].cantidadDeMaiz} TN 🚍. Espacio disponible: ${array[2].almacenamientoMaximo - array[2].cantidadDeMaiz}TN 🚍. Calidad: ${array[2].tipoDeMaiz} 💧 `;
    return informe;
}

function mostarIngresosDeMaiz(array) {
    for (let i = 0; i < array.length; i++) {
        alert(`\n N° de Ingreso: ${i + 1}\n Procedencia: ${array[i].procedencia}🚚\n Cantidad: ${array[i].cantidad} TN ⚖\n Tipo: ${array[i].estado} 📝`);
    }
}

function ingresarAndClasificarMaiz(array, maiz) {

    do {
        const maizIngresadoOrigen = prompt('Ingrese la procedencia del maíz:');
        const maizIngresadoCantidad = prompt('Ingrese la cantidad de maíz en toneladas:');
        const maizIngresadoEstado = prompt(`\n**Calidad del Maiz 🌽 **\n1️⃣. Alta calidad🥇\n2️⃣. Presencia de cuerpos extraños🧩\n3️⃣. Presencia de Humedad💧\n\nElija una opción:`);
        condicion = validarEntradaDeDatos(maizIngresadoOrigen, maizIngresadoCantidad, maizIngresadoEstado);
        if (condicion.includes('ERROR')) {
            alert(condicion);
        }
    } while (condicion.includes('ERROR'));
    maiz.procedencia = condicion[0];
    maiz.cantidad = condicion[1];
    maiz.estado = condicion[2];

    ingresos.push({
        id: idMaiz,
        procedencia: condicion[0],
        cantidad: condicion[1],
        estado: condicion[2]
    });
    idMaiz++;
    console.log(ingresos);
    switch (maiz.estado) {
        case 1:
            array[0].almacenamientoMaximo < maiz.cantidad || array[0].almacenamientoMaximo - array[0].cantidadDeMaiz < maiz.cantidad ? alert('Supera la capacidad maxima del silo,introduzca una cantidad valida ⚠') : ControlarIngresoAlSilo(array, 0, maiz.cantidad);
            break;
        case 2:
            array[1].almacenamientoMaximo < maiz.cantidad || array[1].almacenamientoMaximo - array[1].cantidadDeMaiz < maiz.cantidad ? alert('Supera la capacidad maxima del silo,introduzca una cantidad valida ⚠') : ControlarIngresoAlSilo(array, 1, maiz.cantidad);
            break;
        case 3:
            array[2].almacenamientoMaximo < maiz.cantidad || array[2].almacenamientoMaximo - array[2].cantidadDeMaiz < maiz.cantidad ? alert('Supera la capacidad maxima del silo,introduzca una cantidad valida ⚠') : ControlarIngresoAlSilo(array, 2, maiz.cantidad);
            break;
        default:
            console.log('opción no valida!');
            break;
    }

}


//main->Menu principal
do {
    opcion = prompt(`\n**Empresa La Perdedora 🕋**\n**Sistema de Ingreso y Clasificación de Maiz 🌽 **\n1️⃣. Ingresar Maiz y Clasificar Maiz🏷\n2️⃣. Mostrar stock actual👁\n3️⃣. Mostrar Ingresos de Maiz ⏬🗃\n4️⃣. Salir🚪\n\nElija una opción:`);
    switch (opcion) {
        case '1':
            ingresarAndClasificarMaiz(silos, maiz);
            break;
        case '2':
            mostarStock(silos);
            break;
        case '3':
            ingresos.length == 0 ? alert('No se realizo ningún ingreso!🚨') : mostarIngresosDeMaiz(ingresos);
            break;
        case '4':
            alert(informeGeneralSilos(silos));
            break;
        default:
            alert('\nIngreso una opción no valida!\nLas opciones validas están en el rango de 1 a 4 ❌')
            break;
    }

} while (opcion != 4);
