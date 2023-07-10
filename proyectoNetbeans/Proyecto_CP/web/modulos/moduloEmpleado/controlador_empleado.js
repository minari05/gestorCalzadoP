let indexEmpleadoSeleccionado;
let empleados = [];

export function iniciar(){
    //setDetalleVisible(false);
    servicioTabla();
}

export function setDetalleVisible(valor){
    
    if(valor){
        document.getElementById("divDetalle").style.display="";
        document.getElementById("divCatalogo").style.display="none";
    }else{
        document.getElementById("divDetalle").style.display="none";
        document.getElementById("divCatalogo").style.display="";
    }
}


 
export function servicioTabla(){
    
    let url="api/empleado/getAll";
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

export function cargarTabla(datos){
    let cuerpo="";
    empleados=datos;
    empleados.forEach(function (empleado) {
        let registro =
                '<tr onclick="moduloEmpleado.selectEmpleado('+empleados.indexOf(empleado)+');">'+
                '<td>' + empleado.nombre + '</td>'+
                '<td>' + empleado.primerApellido + '</td>'+
                '<td>' + empleado.segundoApellido + '</td>'+
                '<td>' + empleado.puesto + '</td>'+
                '<td>' + empleado.departamento + '</td>'+
                '<td>' + empleado.prestaciones + '</td></tr>';
        cuerpo += registro;
    });
    document.getElementById("tblEmpleados").innerHTML = cuerpo;
}
export function guardar(){
    
    let datos= null;
    let params= null;
    let empleado= new Object();
    
    if(document.getElementById("txtIdEmpleado").value.trim().length <1){
        empleado.idEmpleado=0;
       
    }else{
        empleado.idEmpleado=parseInt(document.getElementById("txtIdEmpleado").value);
        
    }
    
    empleado.nombre= document.getElementById("txtNombre").value;
    empleado.primerApellido= document.getElementById("txtPrimerApellido").value;
     empleado.segundoApellido= document.getElementById("txtSegundoApellido").value;
      empleado.rfc= document.getElementById("txtRFC").value;
     empleado.curp= document.getElementById("txtCURP").value;
     empleado.fechaInicioTrabajo= document.getElementById("txtFechaInicioTrabajo").value;
    empleado.nss= document.getElementById("txtNSS").value;
     empleado.puesto= document.getElementById("txtPuesto").value;
     empleado.departamento= document.getElementById("txtDepartamento").value;
     empleado.prestaciones= document.getElementById("txtPrestaciones").value;  
     empleado.genero= document.getElementById("txtGenero").value;
     empleado.salario= document.getElementById("txtTipoSalario").value;
    
    
    datos={
        datosEmpleado: JSON.stringify(empleado)};
    
    params= new URLSearchParams(datos);
    
    fetch("api/empleado/guardar",
            {
                method: "POST",
                headers:{ 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
                body:  params  
            })
             .then(response => {
                 return response.json();
             })
              .then(function (data)
              {
                  if(data.exception != null){
                       Swal.fire('', "Error interno del servidor. Intente nuevamente más tarde" + data.exception + data, 'error');
                    return;
                  }
                  if(data.error != null){
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

export function eliminar(){
   
    let datos = null;
    let params = null;
    
    let empleado = new Object();
    empleado.idEmpleado= parseInt(document.getElementById("txtIdEmpleado").value);
    
    datos ={
         datosEmpleado: JSON.stringify(empleado)};
     
      params = new  URLSearchParams(datos);
      
      
   fetch("api/empleado/eliminar",
           {
               method:"POST",
               headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
               body: params               
            })
             .then(response => {
                 return response.json();
             })
              .then(function (data){
                  
                if (data.exception != null)
                {
                    Swal.fire('', "Error interno del servidor. Intente nuevamente más tarde" + data.exception, 'error');
                    return;
                }
                if (data.error != null){
                    Swal.fire('', "No tiene permiso para realizar esta operación.", 'warning');
                }
                 Swal.fire('', 'Datos del armazon se ha eliminado', 'success');
                servicioTabla();
                limpiar();
              });  
}

export function selectEmpleado(index){
   document.getElementById("txtIdEmpleado").value=  empleados[index].idEmpleado;
    document.getElementById("txtNombre").value=empleados[index].nombre;
    document.getElementById("txtPrimerApellido").value=empleados[index].primerApellido ;
     document.getElementById("txtSegundoApellido").value= empleados[index].segundoApellido;
      document.getElementById("txtRFC").value=empleados[index].rfc;
     document.getElementById("txtCURP").value=empleados[index].curp;
      document.getElementById("txtFechaInicioTrabajo").value =empleados[index].fechaInicioTrabajo;
    document.getElementById("txtNSS").value= empleados[index].nss;
      document.getElementById("txtPuesto").value=empleados[index].puesto;
      document.getElementById("txtDepartamento").value =empleados[index].departamento;
    document.getElementById("txtPrestaciones").value= empleados[index].prestaciones;  
      document.getElementById("txtGenero").value =empleados[index].genero;
    document.getElementById("txtTipoSalario").value= empleados[index].salario;
    
    //document.getElementById("btnDelete").classList.remove("disabled");
    indexEmpleadoSeleccionado= index;
    servicioTabla();
}
export function limpiar(){
    document.getElementById("txtIdEmpleado").value="";
    document.getElementById("txtNombre").value="";
    document.getElementById("txtPrimerApellido").value="";
     document.getElementById("txtSegundoApellido").value= "";
      document.getElementById("txtRFC").value="";
     document.getElementById("txtCURP").value="";
      document.getElementById("txtFechaInicioTrabajo").value ="";
    document.getElementById("txtNSS").value= "";
      document.getElementById("txtPuesto").value="";
      document.getElementById("txtDepartamento").value ="";
    document.getElementById("txtPrestaciones").value= "";  
      document.getElementById("txtGenero").value ="";
    document.getElementById("txtTipoSalario").value= "";
    indexEmpleadoSeleccionado=0;
}

