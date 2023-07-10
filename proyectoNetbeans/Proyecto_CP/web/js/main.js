let moduloEmpleado;
let moduloMaterial;


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



