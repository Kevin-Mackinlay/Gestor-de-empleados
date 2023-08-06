//  traemos los elementos del Html

let puesto = document.querySelector("#puesto");
let form = document.querySelector("#form");
let nombre = document.querySelector("#nombre");
let edad = document.querySelector("#edad");
let btn = document.querySelector("#btn");
let buscar = document.querySelector("#buscar");
let contenedorEmpleados = document.querySelector("#contenedorEmpleados");

class Empleado {
  constructor(nombre, puesto, edad, sueldo) {
    this.id = Date.now().toString(36); //genero un id ùnico
    this.nombre = nombre;
    this.puesto = puesto;
    this.edad = edad;
    this.sueldo = 0;
  }
}

let empleados = [];
let empleadoEditar;

form.onsubmit = (event) => {
  // Prevenimos el comportamiento por defecto que tienen los formularios de recargarse la página
  event.preventDefault();
  empleados.push(new Empleado(nombre.value, puesto.value, edad.value));
  form.reset();
  mostrarEmpleados();
};

const mostrarEmpleados = () => {
  // Borramos el html para poner el array actualizado
  contenedorEmpleados.innerHTML = " ";

  empleados.forEach((empleado, index) => {

    // console.log(`el empleado ${empleado.nombre} esta en la posicion del array ${index} `);
    let tarjetaEmpleado = document.createElement("div");
    tarjetaEmpleado.classList.add("mt-2", "border", "border-2", "p-3", "shadow", "shadow-md");
    tarjetaEmpleado.innerHTML = `
    <p>Nombre: ${empleado.nombre}</p>
    <p>Puesto: ${empleado.puesto}</p>
    <p>Edad: ${empleado.edad}</p>
    <p>Sueldo: ${empleado.sueldo}</p>`;

    contenedorEmpleados.appendChild(tarjetaEmpleado);

    //agregamos boton de eliminar

    let btnEliminar = document.createElement("button");
    btnEliminar.classList.add("btn", "btn-danger");
    btnEliminar.innerHTML = "Eliminar";
    tarjetaEmpleado.appendChild(btnEliminar);

    //agregamos boton de editar

    let btnEditar = document.createElement("button");
    btnEditar.classList.add("btn", "btn-info", "ms-2" );
    btnEditar.innerHTML = "Editar";
    tarjetaEmpleado.appendChild(btnEditar);

    let btnPagar = document.createElement("button");
    btnPagar.classList.add("btn", "btn-success", "ms-2" );
    btnPagar.innerHTML = "Pagar";
    tarjetaEmpleado.appendChild(btnPagar);

    btnEliminar.onclick = () => eliminarEmpleado(index);
  });

  
 
};

const eliminarEmpleado = (index) => {
    empleados = empleados.filter(empleado => empleado.id !== empleados[index].id );

    mostrarEmpleados();
}

const editarEmpleado = (index) => {
    empleadoEditar = empleados(index);
    nombre.value = empleadoEditar.nombre;
    puesto.value = empleadoEditar.puesto;
    edad.value = empleadoEditar.edad;
    
    btn.value = "Editar"
}