
package com.xyz.cp.modelo;

/**
 *
 * @author ximer
 */
public class Empleado {
    
    int idEmpleado;
    String nombre;
    String primerApellido;
    String segundoApellido;
    String rfc;
    String curp;
    String fechaInicioTrabajo;
    String nss;
    String salario;
    String puesto;
    String departamento;
    String prestaciones;

    public Empleado() {
    }

    public Empleado(String nombre, String primerApellido, String segundoApellido, String rfc, String curp, String fechaInicioTrabajo, String nss, String salario, String puesto, String departamento, String prestaciones) {
        this.nombre = nombre;
        this.primerApellido = primerApellido;
        this.segundoApellido = segundoApellido;
        this.rfc = rfc;
        this.curp = curp;
        this.fechaInicioTrabajo = fechaInicioTrabajo;
        this.nss = nss;
        this.salario = salario;
        this.puesto = puesto;
        this.departamento = departamento;
        this.prestaciones = prestaciones;
    }

    public Empleado(int idEmpleado, String nombre, String primerApellido, String segundoApellido, String rfc, String curp, String fechaInicioTrabajo, String nss, String salario, String puesto, String departamento, String prestaciones) {
        this.idEmpleado = idEmpleado;
        this.nombre = nombre;
        this.primerApellido = primerApellido;
        this.segundoApellido = segundoApellido;
        this.rfc = rfc;
        this.curp = curp;
        this.fechaInicioTrabajo = fechaInicioTrabajo;
        this.nss = nss;
        this.salario = salario;
        this.puesto = puesto;
        this.departamento = departamento;
        this.prestaciones = prestaciones;
    }

    public int getIdEmpleado() {
        return idEmpleado;
    }

    public void setIdEmpleado(int idEmpleado) {
        this.idEmpleado = idEmpleado;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getPrimerApellido() {
        return primerApellido;
    }

    public void setPrimerApellido(String primerApellido) {
        this.primerApellido = primerApellido;
    }

    public String getSegundoApellido() {
        return segundoApellido;
    }

    public void setSegundoApellido(String segundoApellido) {
        this.segundoApellido = segundoApellido;
    }

    public String getRfc() {
        return rfc;
    }

    public void setRfc(String rfc) {
        this.rfc = rfc;
    }

    public String getCurp() {
        return curp;
    }

    public void setCurp(String curp) {
        this.curp = curp;
    }

    public String getFechaInicioTrabajo() {
        return fechaInicioTrabajo;
    }

    public void setFechaInicioTrabajo(String fechaInicioTrabajo) {
        this.fechaInicioTrabajo = fechaInicioTrabajo;
    }

    public String getNss() {
        return nss;
    }

    public void setNss(String nss) {
        this.nss = nss;
    }

    public String getSalario() {
        return salario;
    }

    public void setSalario(String salario) {
        this.salario = salario;
    }

    public String getPuesto() {
        return puesto;
    }

    public void setPuesto(String puesto) {
        this.puesto = puesto;
    }

    public String getDepartamento() {
        return departamento;
    }

    public void setDepartamento(String departamento) {
        this.departamento = departamento;
    }

    public String getPrestaciones() {
        return prestaciones;
    }

    public void setPrestaciones(String prestaciones) {
        this.prestaciones = prestaciones;
    }
    
    
    
    
}
