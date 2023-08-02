let indexProductoSeleccionado;
let productos = [];

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

    let url = "api/producto/getAll";
    fetch(url)
            .then(response => {
                return response.json();
            })
            .then(function (data) {
                if (data.exception != null) {
                    Swal.fire('', 'error interno del servidor.Intete nuevamente mas tarde.', 'error');
                    return;
                }
                if (data.error != null) {
                    Swal.fire('', data.error, 'Warning');
                    return;
                }
                console.log(data);
                cargarTabla(data);
            });
}

export function cargarTabla(datos) {
    let cuerpo = "";
    productos = datos;
    productos.forEach(function (producto) {
        let registro =
                '<tr onclick="moduloMaterial.selectProducto(' + productos.indexOf(producto) + ');">' +
                '<td>' + producto.nombre + '</td>' +
                '<td>' + producto.precioCompra + '</td>' +
                '<td>' + producto.tipo + '</td>' +
                '<td>' + producto.cantidad + '</td>' +
                '<td>' + producto.descripcion + '</td>' +
                '<td>' + producto.proveedor + '</td>' +
                '<td>' + producto.ultimaFechaCompra + '</td></tr>';
        cuerpo += registro;
    });
    document.getElementById("tblProductos").innerHTML = cuerpo;
}
export function guardarMat() {
    let producto = new Object();

    if (document.getElementById("txtIdProducto").value.trim().length < 1) {
        producto.idProducto = 0;
    } else {
        producto.idProducto = parseInt(document.getElementById("txtIdProducto").value);
    }

    producto.nombre = document.getElementById("txtNombreProducto").value;
    producto.precioCompra = parseFloat(document.getElementById("txtPrecioCompra").value);
    producto.tipo = document.getElementById("txtTipo").value;
    producto.cantidad = parseInt(document.getElementById("txtCantidad").value);
    producto.descripcion = document.getElementById("txtDescripcion").value;
    producto.proveedor = document.getElementById("txtProveedor").value;
    producto.ultimaFechaCompra = document.getElementById("txtUltimaFecha").value;

    let datos = {
        datosProducto: JSON.stringify(producto)
    };

    let params = new URLSearchParams({datosProducto: JSON.stringify(producto)});

    fetch("api/producto/guardar", {
        method: "POST",
        headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
        body: params
    })
            .then(response => {
                if (response.ok) {
                    // Si la respuesta está vacía o no es un JSON válido, considera que la operación fue exitosa.
                    return Promise.resolve();
                } else {
                    // Si la respuesta no fue exitosa, devuelve el JSON parseado.
                    return response.json();
                }
            })
            .then(function (data) {
                if (data && data.exception != null) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error en el servidor',
                        text: 'Ha ocurrido un error interno en el servidor. Por favor, inténtelo nuevamente más tarde.'
                    });
                    return;
                }
                if (data && data.error != null) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al guardar material',
                        text: 'Ha ocurrido un error al guardar el material. Por favor, verifique los datos e inténtelo nuevamente.'
                    });
                    return;
                }
                if (data && data.errorperm != null) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Permiso denegado',
                        text: 'No tiene los permisos necesarios para realizar esta acción.'
                    });
                    return;
                }

                // Mensaje de éxito al guardar el material
                Swal.fire({
                    icon: 'success',
                    title: 'Material guardado',
                    text: 'El Material se ha guardado correctamente.',
                    timer: 2000,
                    showConfirmButton: false
                }).then(() => {
                    servicioTabla();
                    limpiar();
                });
            });
}



export function eliminar() {
    let datos = null;
    let params = null;

    let material = new Object();
    material.idProducto = parseInt(document.getElementById("txtIdProducto").value);

    datos = {
        datosProducto: JSON.stringify(material)
    };

    params = new URLSearchParams(datos);

    fetch("api/producto/eliminar", {
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
                    title: 'Material eliminado',
                    text: 'El Material se ha eliminado correctamente.',
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
export function selectProducto(index) {
    document.getElementById("txtIdProducto").value = productos[index].idProducto;
    document.getElementById("txtNombreProducto").value = productos[index].nombre;
    document.getElementById("txtPrecioCompra").value = productos[index].precioCompra;
    document.getElementById("txtTipo").value = productos[index].tipo;
    document.getElementById("txtCantidad").value = productos[index].cantidad;
    document.getElementById("txtDescripcion").value = productos[index].descripcion;
    document.getElementById("txtProveedor").value = productos[index].proveedor;
    document.getElementById("txtUltimaFecha").value = productos[index].ultimaFechaCompra;


    //document.getElementById("btnDelete").classList.remove("disabled");
    indexProductoSeleccionado = index;
    servicioTabla();
}
export function limpiar() {

    document.getElementById("txtIdProducto").value = "";
    document.getElementById("txtNombreProducto").value = "";
    document.getElementById("txtPrecioCompra").value = "";
    document.getElementById("txtTipo").value = "";
    document.getElementById("txtCantidad").value = "";
    document.getElementById("txtDescripcion").value = ""
    document.getElementById("txtProveedor").value = "";
    document.getElementById("txtUltimaFecha").value = "";


    indexProductoSeleccionado = 0;
}
