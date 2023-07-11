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
                '<td>' + producto.proveedor + '</td>' +
                '<td>' + producto.cantidad + '</td>' +
                '<td>' + producto.ultimaFechaCompra + '</td></tr>';
        cuerpo += registro;
    });
    document.getElementById("tblProductos").innerHTML = cuerpo;
}
export function guardar() {

    let datos = null;
    let params = null;
    let producto = new Object();

    if (document.getElementById("txtIdProducto").value.trim().length < 1) {
        producto.idProducto = 0;

    } else {
        producto.idProducto = parseInt(document.getElementById("txtIdProducto").value);

    }

    producto.nombre = document.getElementById("txtNombreProducto").value;
    producto.precioCompra = parseFloat(document.getElementById("txtPrecioCompra").value);
    producto.tipo = document.getElementById("txtTipo").value;
    producto.descripcion = document.getElementById("txtDescripcion").value;
    producto.ultimaFechaCompra = document.getElementById("txtUltimaFechaCompra").value;
    producto.cantidad = parseInt(document.getElementById("txtCantidad").value);
    producto.proveedor = document.getElementById("txtProvedor").value;



    datos = {
        datosProducto: JSON.stringify(producto)};

    params = new URLSearchParams(datos);

    fetch("api/producto/guardar",
            {
                method: "POST",
                headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
                body: params
            })
            .then(response => {
                return response.json();
            })
            .then(function (data)
            {
                if (data.exception != null) {
                    Swal.fire('', "Error interno del servidor. Intente nuevamente más tarde" + data.exception + data, 'error');
                    return;
                }
                if (data.error != null) {
                    Swal.fire('', data.error, 'warning')
                    return;
                }
                if (data.errorperm != null)
                {
                    Swal.fire('', "No tiene permiso para realizar esta operación.", 'warning');
                }
                document.getElementById("txtIdEmpleado").value = data.idEmpleado;
                Swal.fire('', 'Datos del empleado actualizados correctamente', 'success');
                servicioTabla();
                clean();
            });
    //setDetalleVisible(false);
}

export function eliminar() {

    let datos = null;
    let params = null;

    let producto = new Object();
    producto.idProducto = parseInt(document.getElementById("txtIdProducto").value);

    datos = {
        datosProducto: JSON.stringify(producto)};

    params = new URLSearchParams(datos);


    fetch("api/producto/eliminar",
            {
                method: "POST",
                headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
                body: params
            })
            .then(response => {
                return response.json();
            })
            .then(function (data) {

                if (data.exception != null)
                {
                    Swal.fire('', "Error interno del servidor. Intente nuevamente más tarde" + data.exception, 'error');
                    return;
                }
                if (data.error != null) {
                    Swal.fire('', "No tiene permiso para realizar esta operación.", 'warning');
                }
                Swal.fire('', 'Datos del producto se ha eliminado', 'success');
                servicioTabla();
                limpiar();
            });
}

export function selectProducto(index) {
    document.getElementById("txtIdProducto").value = productos[index].idProducto;
    document.getElementById("txtNombreProducto").value = productos[index].nombre;
    document.getElementById("txtPrecioCompra").value = productos[index].precioCompra;
    document.getElementById("txtTipo").value = productos[index].tipo;
    document.getElementById("txtCantidad").value = productos[index].cantidad;
    document.getElementById("txtDescripcion").value = productos[index].descripcion;
    document.getElementById("txtProvedor").value = productos[index].proveedor;
    document.getElementById("txtUltimaFechaCompra").value = productos[index].ultimaFechaCompra;


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
    document.getElementById("txtProvedor").value = "";
    document.getElementById("txtUltimaFechaCompra").value = "";


    indexProductoSeleccionado = 0;
}




