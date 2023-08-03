// elementos del Html

const nombre =  document.querySelector("#nombre");
const puesto = document.querySelector("#puesto");
const edad = document.querySelector("#edad");
const btn = document.querySelector("#btn");
const buscar = document.querySelector("#buscar");
const contenedorEmpleados = document.querySelector("#contenedorEmpleados");


class Empleador{
    constructor(nombre, puesto, edad) {
        this.id = Date.now().toString(36); //genero un id ùnico
        this.nombre = nombre;
        this.puesto = puesto;
        this.edad = edad;
    }
}

let empleado = [new Empleador("Silvio", "jr", 30)];