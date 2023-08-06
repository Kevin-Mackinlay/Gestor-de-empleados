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
  //metodo
  depositarSueldo(monto) {
    this.sueldo += monto;
  }
}

//variables
let empleados = [];
let empleadoEditar;
let modoEdicion = false;

form.onsubmit = (event) => {
  // Prevenimos el comportamiento por defecto que tienen los formularios de recargarse la página
  event.preventDefault();

  if (modoEdicion) {
    //Editar el empleado
    let index = empleados.findIndex((empleado) => empleado.id === empleadoEditar.id);
    empleados[index].nombre = nombre.value;
    empleados[index].puesto = puesto.value;
    empleados[index].edad = edad.value;
    btn.value = "Agregar";
    modoEdicion = false;
  } else {
    empleados.push(new Empleado(nombre.value, puesto.value, edad.value));
  }

  form.reset();

  mostrarEmpleados(empleados);
};

//funcion
const mostrarEmpleados = (empleados) => {
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
    btnEditar.classList.add("btn", "btn-info", "ms-2");
    btnEditar.innerHTML = "Editar";
    tarjetaEmpleado.appendChild(btnEditar);

    let btnPagar = document.createElement("button");
    btnPagar.classList.add("btn", "btn-success", "ms-2");
    btnPagar.innerHTML = "Pagar";
    tarjetaEmpleado.appendChild(btnPagar);

    btnEliminar.onclick = () => eliminarEmpleado(index);

    btnEditar.onclick = () => editarEmpleado(index);

    btnPagar.onclick = () => {
      let pagoInput = document.createElement("Input");
      pagoInput.classList.add("form-control", "mt-2");
      pagoInput.type = "number";
      pagoInput.placeholder = "Ingrese el monto a pagar y presione el boton";
      tarjetaEmpleado.appendChild(pagoInput);
      //recursividad
      btnPagar.onclick = () => pagarSueldo(index, pagoInput);
    };
  });
};

//funcion
const eliminarEmpleado = (index) => {
  empleados = empleados.filter((empleado) => empleado.id !== empleados[index].id);

  mostrarEmpleados(empleados);
};

//funcion
const editarEmpleado = (index) => {
  empleadoEditar = empleados[index];

  nombre.value = empleadoEditar.nombre;
  puesto.value = empleadoEditar.puesto;
  edad.value = empleadoEditar.edad;

  modoEdicion = true;
  btn.value = "Editar";
};

//function
const pagarSueldo = (index, pagoInput) => {
  empleados[index].depositarSueldo(parseFloat(pagoInput.value));
  mostrarEmpleados(empleados);
};

//Busqueda y filtrado de usuario

buscar.oninput = (event) => {
  console.log(event.target.value);

  if (event.target === " ") {
    mostrarEmpleados(empleados);
  } else {
    let empleadosfiltrados = empleados.filter(empleado => empleado.nombre.toLowerCase().includes(event.target.value))
    mostrarEmpleados(empleadosfiltrados)
  }
};
