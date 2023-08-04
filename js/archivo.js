//  traemos los elementos del Html

const form = document.querySelector("#form");
const nombre = document.querySelector("#nombre");
const puesto = document.querySelector("#puesto");
const edad = document.querySelector("#edad");
const btn = document.querySelector("#btn");
const buscar = document.querySelector("#buscar");
const contenedorEmpleados = document.querySelector("#contenedorEmpleados");

class Empleado {
  constructor(nombre, puesto, edad) {
    this.id = Date.now().toString(36); //genero un id ùnico
    this.nombre = nombre;
    this.puesto = puesto;
    this.edad = edad;
  }
}

let empleados = [];

form.onsubmit = (event) => {
  // Prevenimos el comportamiento por defecto que tienen los formularios de recargarse la página
  event.preventDefault();
  empleados.push(new Empleado(nombre.value, puesto.value, edad.value));
  console.log(empleados);
};

const mostrarEmpleados = (empleados) => {
  // Borramos el html para poner el array actualizado
  contenedorEmpleados.innerHTML = "";

  empleados.forEach((empleado, index) => {
    let empleadosContenedor = document.createElement("div");
    empleadosContenedor.classList.add("mt-2", "border", "border-2", "p-3", "shadow", "shadow-md");
    empleadosContenedor.innerHTML = `
    <p>Nombre: ${empleado.nombre}</p>
    <p>Puesto: ${empleado.puesto}</p>
    <p>Edad: ${empleado.edad}</p>`;
  });
};
