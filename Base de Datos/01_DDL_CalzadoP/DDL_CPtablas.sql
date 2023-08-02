drop database calzadoaduabd;

create database calzadoaduabd;

use calzadoaduabd;

CREATE TABLE producto(
	idProducto  		INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    nombre      		VARCHAR(129) NOT NULL,
    precioCompra 		DOUBLE NOT NULL,
    tipo				VARCHAR(20) NOT NULL,
    cantidad        	INT NOT NULL,
    descripcion			VARCHAR(255),
    proveedor			VARCHAR(129),
    ultimaFechaCompra	DATE NOT NULL

);

CREATE TABLE empleado(
	idEmpleado			INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	nombre				VARCHAR(129)  NOT NULL,
    primerApellido		VARCHAR(40) NOT NULL,
    segundoApellido		VARCHAR(40) NOT NULL,
    RFC					VARCHAR(25) ,
    CURP				VARCHAR(25) ,
    fechaInicioTrabajo	VARCHAR(40) ,
    NSS					VARCHAR(25) ,
    TipoSalario			VARCHAR(25) ,
    puesto				VARCHAR(25) ,
    genero				VARCHAR(2),
    departamento   		VARCHAR(45) NOT NULL,
    prestaciones     	VARCHAR(129)  NOT NULL
	/*idUsuario           INT NOT NULL,
       CONSTRAINT fk_empleado_usuario FOREIGN KEY (idUsuario) 
                REFERENCES usuario(idUsuario)*/
);



CREATE TABLE usuario(
	idUsuario		INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    nombreUsuario			VARCHAR(129) UNIQUE NOT NULL,
    contrasenia		VARCHAR(129) NOT NULL,
    rol				VARCHAR(25) NOT NULL,
    lastToken		VARCHAR(65) NOT NULL
    
);


-- Stored Procedure para insertar nuevos Empleados.
DROP PROCEDURE IF EXISTS insertarEmpleado;
DELIMITER $$
CREATE PROCEDURE insertarEmpleado(	/* Datos Personales */
                                    IN	var_nombre          	VARCHAR(64),    --  1
                                    IN	var_primerApellido  	VARCHAR(64),    --  2
                                    IN	var_segundoApellido 	VARCHAR(64),    --  3
                                    IN  var_genero          	VARCHAR(2),     --  4
                                    IN  var_RFC             	VARCHAR(25),    --  5
                                    IN  var_CURP            	VARCHAR(25),    --  6
                                    IN  var_NSS             	VARCHAR(25),    --  7
                                    IN  var_fechaInicioTrabajo  VARCHAR(40),    --  8 
                                    IN  var_tipoSalario			VARCHAR(25),    --  9
									IN	var_puesto				VARCHAR(25),    --  10
									IN	var_departamento   		VARCHAR(25),    --  11
									IN	var_prestaciones     	VARCHAR(129),   --  12
                                    
													
								    /* Valores de Retorno */
                                    OUT	var_idEmpleado      INT            -- 13
                                   
				)                                    
    BEGIN        
        -- Comenzamos insertando los datos del Empleado:
        INSERT INTO empleado (nombre,primerApellido,segundoApellido,RFC,CURP,
                               fechaInicioTrabajo,NSS,TipoSalario,puesto,
                               departamento,prestaciones,genero)
                    VALUES(var_nombre,var_primerApellido,var_segundoApellido,
                           var_RFC,var_CURP,var_fechaInicioTrabajo,var_NSS,
                           var_tipoSalario,var_puesto,var_departamento,
                           var_prestaciones,var_genero
);
        -- Obtenemos el ID del Empleado que se generó:
        SET var_idEmpleado = LAST_INSERT_ID();

    END
$$
DELIMITER ;



-- Stored Procedure para insertar nuevos Empleados.
DROP PROCEDURE IF EXISTS actualizarEmpleado;
DELIMITER $$
CREATE PROCEDURE actualizarEmpleado(	/* Datos Personales */
									            
                                    IN	var_nombre          	VARCHAR(64),    --  1
                                    IN	var_primerApellido  	VARCHAR(64),    --  2
                                    IN	var_segundoApellido 	VARCHAR(64),    --  3
                                    IN  var_genero          	VARCHAR(2),     --  4
                                    IN  var_RFC             	VARCHAR(25),    --  5
                                    IN  var_CURP            	VARCHAR(25),    --  6
                                    IN  var_NSS             	VARCHAR(25),    --  7
                                    IN  var_fechaInicioTrabajo  VARCHAR(40),    --  8
                                    IN  var_tipoSalario			VARCHAR(25),    --  9
									IN	var_puesto				VARCHAR(25),    --  10
									IN	var_departamento   		VARCHAR(25),    --  11
									IN	var_prestaciones     	VARCHAR(129),   --  12
                                    IN	var_idEmpleado     		INT				--  13																							
                                   
				)                                    
    BEGIN        
        -- Comenzamos insertando los datos del Empleado:
        UPDATE empleado SET nombre =  var_nombre,primerApellido = var_primerApellido,segundoApellido = var_segundoApellido,RFC = var_RFC,CURP = var_CURP,
                               fechaInicioTrabajo = var_fechaInicioTrabajo,NSS = var_NSS,TipoSalario = var_tipoSalario,puesto = var_puesto,
                               departamento = var_departamento,prestaciones = var_prestaciones,genero = var_genero
							 WHERE idEmpleado = var_idEmpleado;
    END
$$
DELIMITER ;



-- Stored Procedure para insertar nuevos producto.
DROP PROCEDURE IF EXISTS insertarProducto;
DELIMITER $$
CREATE PROCEDURE insertarProducto(	/* Datos Personales */
                                    IN	var_nombre          	VARCHAR(129),  	--  1
                                    IN	var_precioCompra  		DOUBLE,    		--  2
                                    IN	var_tipo			 	VARCHAR(20),    --  3
                                    IN  var_cantidad          	INT,     		--  4
                                    IN  var_descripcion         VARCHAR(255),   --  5
                                    IN  var_proveedor          	VARCHAR(129),   --  6
                                    IN  var_ultimaFechaCompra   VARCHAR(40),    --  7
                                   
                                    
													
								    /* Valores de Retorno */
                                    OUT	var_idProducto     INT            		 -- 8
                                   
				)                                    
    BEGIN        
        -- Comenzamos insertando los datos del Empleado:
        INSERT INTO producto (nombre,precioCompra,tipo,cantidad,descripcion,
                               proveedor,ultimaFechaCompra)
                    VALUES(var_nombre,var_precioCompra,var_tipo,var_cantidad,var_descripcion,var_proveedor,var_ultimaFechaCompra
);
        -- Obtenemos el ID del Empleado que se generó:
        SET var_idProducto = LAST_INSERT_ID();

    END
$$
DELIMITER ;



-- Stored Procedure para actualizar Producto .
DROP PROCEDURE IF EXISTS actualizarProducto;
DELIMITER $$
CREATE PROCEDURE actualizarProducto(	/* Datos Personales */
									            
                                    IN	var_nombre          	VARCHAR(129),  	--  1
                                    IN	var_precioCompra  		DOUBLE,    		--  2
                                    IN	var_tipo			 	VARCHAR(20),    --  3
                                    IN  var_cantidad          	INT,     		--  4
                                    IN  var_descripcion         VARCHAR(255),   --  5
                                    IN  var_proveedor          	VARCHAR(129),   --  6
                                    IN  var_ultimaFechaCompra   VARCHAR(40),    --  7					
                                    IN	var_idProducto     		INT             -- 8																						
                                   
				)                                    
    BEGIN        
        -- Comenzamos a actualizar producto:
        UPDATE producto SET nombre =  var_nombre, precioCompra = var_precioCompra,tipo = var_tipo,cantidad = var_cantidad,descripcion = var_descripcion,
                              proveedor = var_proveedor,ultimaFechaCompra = var_ultimaFechaCompra
							 WHERE idProducto = var_idProducto;
    END
$$
DELIMITER ;


