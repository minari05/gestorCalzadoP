let indexEmpleadoSeleccionado;
let empleados = [];

export function iniciar() {
    //setDetalleVisible(false);
    servicioTabla();
}

export function setDetalleVisible(valor) {

    if (valor) {
        document.getElementById("divDetalle").style.display = "";
        document.getElementById("divCatalogo").style.display = "none";
    } else {
        document.getElementById("divDetalle").style.display = "none";
        document.getElementById("divCatalogo").style.display = "";
    }
}



export function servicioTabla() {

    let url = "api/empleado/getAll";
    fetch(url)
            .then(response => {
                return response.json();
            })
            .then(function (data) {
                if (data.exception != null) {
                    Swal.fire('', 'error interno del servidor.Intete nuevamente mas tarde.', 'error');
                    // alert("error interno del servidor, intenta mas tarde");
                    return;
                }
                if (data.error != null) {
                    Swal.fire('', data.error, 'Warning');
                    //alert("data error");
                    return;
                }

                cargarTabla(data);
            });
}

export function cargarTabla(datos) {
    let cuerpo = "";
    empleados = datos;
    empleados.forEach(function (empleado) {
        let registro =
                '<tr onclick="moduloEmpleado.selectEmpleado(' + empleados.indexOf(empleado) + ');">' +
                '<td>' + empleado.nombre + '</td>' +
                '<td>' + empleado.primerApellido + ' ' + empleado.segundoApellido + '</td>' +
                '<td>' + empleado.puesto + '</td>' +
                '<td>' + empleado.departamento + '</td>' +
                '<td>' + empleado.prestaciones + '</td></tr>';
        cuerpo += registro;
    });
    document.getElementById("tblEmpleados").innerHTML = cuerpo;
}

export function guardarEmp() {

    let datos = null;
    let params = null;
    let empleado = new Object();

    if (document.getElementById("txtIdEmpleado").value.trim().length < 1) {
        empleado.idEmpleado = 0;

    } else {
        empleado.idEmpleado = parseInt(document.getElementById("txtIdEmpleado").value);

    }

    empleado.nombre = document.getElementById("txtNombre").value;
    empleado.primerApellido = document.getElementById("txtPrimerApellido").value;
    empleado.segundoApellido = document.getElementById("txtSegundoApellido").value;
    empleado.genero = document.getElementById("txtGenero").value;
    empleado.rfc = document.getElementById("txtRFC").value;
    empleado.curp = document.getElementById("txtCURP").value;
    empleado.nss = document.getElementById("txtNSS").value;
    empleado.fechaInicioTrabajo = document.getElementById("txtFechaInicioTrabajo").value;
    empleado.salario = document.getElementById("txtTipoSalario").value;
    empleado.puesto = document.getElementById("txtPuesto").value;
    empleado.departamento = document.getElementById("txtDepartamento").value;
    empleado.prestaciones = document.getElementById("txtPrestaciones").value;

    datos = {
        datosEmpleado: JSON.stringify(empleado)};

    params = new URLSearchParams(datos);

    fetch("api/empleado/guardar", {
        method: "POST",
        headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
        body: params
    })
            .then(response => {
                return response.json();
            })
            .then(function (data) {
                if (data.exception != null) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error en el servidor',
                        text: 'Ha ocurrido un error interno en el servidor. Por favor, inténtelo nuevamente más tarde.'
                    });
                    return;
                }
                if (data.error != null) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al guardar empleado',
                        text: 'Ha ocurrido un error al guardar el empleado. Por favor, verifique los datos e inténtelo nuevamente.'
                    });
                    return;
                }
                if (data.errorperm != null) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Permiso denegado',
                        text: 'No tiene los permisos necesarios para realizar esta acción.'
                    });
                }

                Swal.fire({
                    icon: 'success',
                    title: 'Empleado guardado',
                    text: 'El empleado se ha guardado correctamente.',
                    timer: 2000,
                    showConfirmButton: false
                }).then(() => {
                    servicioTabla();
                    limpiar();
                });
            });
    //setDetalleVisible(false);
}

export function eliminar() {
    let datos = null;
    let params = null;

    let empleado = new Object();

    empleado.idEmpleado = parseInt(document.getElementById("txtIdEmpleado").value);

    datos = {
        datosEmpleado: JSON.stringify(empleado)
    };

    params = new URLSearchParams(datos);

    fetch("api/empleado/eliminar", {
        method: "POST",
        headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
        body: params
    })
            .then(response => {
                if (!response.ok) {
                    throw new Error('La solicitud ha fallado. Código de estado: ' + response.status);
                }
                return response.json();
            })
            .then(function (data) {
                Swal.fire({
                    icon: 'success',
                    title: 'Empleado eliminado',
                    text: 'El empleado se ha eliminado correctamente.',
                    timer: 2000,
                    showConfirmButton: false
                }).then(() => {
                    servicioTabla();
                    limpiar();
                });
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error en la solicitud',
                    text: 'Ha ocurrido un error en la solicitud al servidor. Por favor, inténtelo nuevamente.'
                });
                console.error(error);
            });
}

export function selectEmpleado(index) {
    document.getElementById("txtIdEmpleado").value = empleados[index].idEmpleado;
    document.getElementById("txtNombre").value = empleados[index].nombre;
    document.getElementById("txtPrimerApellido").value = empleados[index].primerApellido;
    document.getElementById("txtSegundoApellido").value = empleados[index].segundoApellido;
    document.getElementById("txtRFC").value = empleados[index].rfc;
    document.getElementById("txtCURP").value = empleados[index].curp;
    document.getElementById("txtFechaInicioTrabajo").value = empleados[index].fechaInicioTrabajo;
    document.getElementById("txtNSS").value = empleados[index].nss;
    document.getElementById("txtPuesto").value = empleados[index].puesto;
    document.getElementById("txtDepartamento").value = empleados[index].departamento;
    document.getElementById("txtPrestaciones").value = empleados[index].prestaciones;
    document.getElementById("txtGenero").value = empleados[index].genero;
    document.getElementById("txtTipoSalario").value = empleados[index].salario;

    //document.getElementById("btnDelete").classList.remove("disabled");
    indexEmpleadoSeleccionado = index;
    servicioTabla();
}
export function limpiar() {
    document.getElementById("txtIdEmpleado").value = "";
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtPrimerApellido").value = "";
    document.getElementById("txtSegundoApellido").value = "";
    document.getElementById("txtRFC").value = "";
    document.getElementById("txtCURP").value = "";
    document.getElementById("txtFechaInicioTrabajo").value = "";
    document.getElementById("txtNSS").value = "";
    document.getElementById("txtPuesto").value = "";
    document.getElementById("txtDepartamento").value = "";
    document.getElementById("txtPrestaciones").value = "";
    document.getElementById("txtGenero").value = "";
    document.getElementById("txtTipoSalario").value = "";
    indexEmpleadoSeleccionado = 0;
}

export function buscar() {
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("tblEmpleado");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0]; 
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

