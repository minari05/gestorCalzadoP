show tables;

CREATE TABLE producto(
	idProducto  		INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    nombre      		VARCHAR(129) NOT NULL,
    precioCompra 		DOUBLE NOT NULL,
    tipo				VARCHAR(20) NOT NULL,
    cantidad        	INT NOT NULL,
    descripcion			VARCHAR(255),
    provedor			VARCHAR(129),
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
    departamento   		VARCHAR(25) NOT NULL,
    prestaciones     	VARCHAR(129)  NOT NULL
	/*idUsuario           INT NOT NULL,
       CONSTRAINT fk_empleado_usuario FOREIGN KEY (idUsuario) 
                REFERENCES usuario(idUsuario)*/
);


CREATE TABLE usuario(
	idUsuario		INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    nombre			VARCHAR(129) UNIQUE NOT NULL,
    contrasenia		VARCHAR(129) NOT NULL,
    rol				VARCHAR(25) NOT NULL,
    lastToken		VARCHAR(65) NOT NULL
    
);

CREATE TABLE boom(
	idBoom      INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    descripcion VARCHAR(125) NOT NULL,
    componentes VARCHAR(45) NOT NULL,
    cantidad    DOUBLE NOT NULL,
    um          VARCHAR(15) NOT NULL,
    total       DOUBLE NOT NULL
);
