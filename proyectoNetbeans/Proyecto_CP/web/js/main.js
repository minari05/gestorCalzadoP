let moduloEmpleado;
let moduloMaterial;
let moduloBoom;


function cargarModuloEmpleado(){
fetch("modulos/moduloEmpleado/vista_empleado.html")
        .then(
                function(response){
                return response.text();
                }
        )
        .then(
                function(html){
                document.getElementById("contenedorPrincipal").innerHTML = html;
                import ("../modulos/moduloEmpleado/controlador_empleado.js").then(
                        function(controller){
                        moduloEmpleado = controller;
                                moduloEmpleado.iniciar(); //Mandamos llamar la función inicializar
                        }
                );
                }
        );
        }
        
function cargarModuloMaterial(){
fetch("modulos/moduloMaterial/vista_material.html")
        .then(
                function(response){
                return response.text();
                }
        )
        .then(
                function(html){
                document.getElementById("contenedorPrincipal").innerHTML = html;
                import ("../modulos/moduloMaterial/controlador_material.js").then(
                        function(controller){
                        moduloMaterial = controller;
                               moduloMaterial.iniciar(); //Mandamos llamar la función inicializar
                        }
                );
                }
        );
        }       


function acceso(){
    
    
    let usuario = document.getElementById("username").value;
    let contra=document.getElementById("password").value;
    let objusuario= new Object();
    
    objusuario.idUsuario=0;
    objusuario.nombre=usuario;
    objusuario.contrasenia=contra;
    objusuario.rol="";
    objusuario.lastToken="";
    
    
  datos = JSON.stringify(objusuario); //conviertes un objeto java Script a una cadena JSON
  fetch('api/log/in',
    {
        method: 'POST',
                headers: { 'Accept': 'application/json',
                           'Content-Type': 'application/json'
                       },
                body: datos
    }).then(response => response.json())
      .then (data=>{
          if (data.exception != null)
        {
             alert("error del servidor");
            //Swal.fire('',"Error interno del servidor. Intente nuevamente más tarde",'error');
            return;
        }
        if (data.error != null)
        {
            alert(data.error);
           // Swal.fire('',data.error, 'warning');
            return;
        }
        
        localStorage.setItem('currentUser',JSON.stringify(data));
       
     
        
          alert("Bienvenid@");
       // Swal.fire('','bienvenidos','success');
      
         window.location.href="http://localhost:8080/Proyecto_CP/inicio.html";
       
      });
   
   
}


 
        
        
function cargarModuloBoom(){
    fetch("modulos/moduloBOOM/vista_boom.html")
    .then(
                function(response){
                return response.text();
                }
        )
        .then(
                function(html){
                document.getElementById("contenedorPrincipal").innerHTML = html;
                import ("../modulos/moduloBOOM/controlador_boom.js").then(
                        function(controller){
                        moduloMaterial = controller;
                           //    moduloMaterial.iniciar(); //Mandamos llamar la función inicializar
                        }
                );
                }
        );
}