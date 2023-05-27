
package com.xyz.cp.modelo;

/**
 *
 * @author ximer
 */
public class Boom {
    
    int idBoom;
    String descripcion;
    String componentes;
    double cantidad;
    String um;
    double total;

    public Boom() {
    }

    public Boom(String descripcion, String componentes, double cantidad, String um, double total) {
        this.descripcion = descripcion;
        this.componentes = componentes;
        this.cantidad = cantidad;
        this.um = um;
        this.total = total;
    }
    
    public Boom(int idBoom, String descripcion, String componentes, double cantidad, String um, double total) {
        this.idBoom = idBoom;
        this.descripcion = descripcion;
        this.componentes = componentes;
        this.cantidad = cantidad;
        this.um = um;
        this.total = total;
    }

    public int getIdBoom() {
        return idBoom;
    }

    public void setIdBoom(int idBoom) {
        this.idBoom = idBoom;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getComponentes() {
        return componentes;
    }

    public void setComponentes(String componentes) {
        this.componentes = componentes;
    }

    public double getCantidad() {
        return cantidad;
    }

    public void setCantidad(double cantidad) {
        this.cantidad = cantidad;
    }

    public String getUm() {
        return um;
    }

    public void setUm(String um) {
        this.um = um;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }
    
    
    
    
}
