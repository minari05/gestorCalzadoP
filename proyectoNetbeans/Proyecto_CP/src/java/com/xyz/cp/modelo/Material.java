
package com.xyz.cp.modelo;

/**
 *
 * @author ximer
 */
public class Material {

    int idProducto;
    String nombre;
    double precioCompra;
    String tipo;
    int cantidad;
    String descripcion;
    String proveedor;
    String ultimaFechaCompra;

    public Material() {
    }

    public Material(String nombre, double precioCompra, String tipo, int cantidad, String descripcion, String proveedor, String ultimaFechaCompra) {
        this.nombre = nombre;
        this.precioCompra = precioCompra;
        this.tipo = tipo;
        this.cantidad = cantidad;
        this.descripcion = descripcion;
        this.proveedor = proveedor;
        this.ultimaFechaCompra = ultimaFechaCompra;
    }

    public Material(int idProducto, String nombre, double precioCompra, String tipo, int cantidad, String descripcion, String proveedor, String ultimaFechaCompra) {
        this.idProducto = idProducto;
        this.nombre = nombre;
        this.precioCompra = precioCompra;
        this.tipo = tipo;
        this.cantidad = cantidad;
        this.descripcion = descripcion;
        this.proveedor = proveedor;
        this.ultimaFechaCompra = ultimaFechaCompra;
    }

    public int getIdProducto() {
        return idProducto;
    }

    public void setIdProducto(int idProducto) {
        this.idProducto = idProducto;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public double getPrecioCompra() {
        return precioCompra;
    }

    public void setPrecioCompra(double precioCompra) {
        this.precioCompra = precioCompra;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getProveedor() {
        return proveedor;
    }

    public void setProveedor(String proveedor) {
        this.proveedor = proveedor;
    }

    public String getUltimaFechaCompra() {
        return ultimaFechaCompra;
    }

    public void setUltimaFechaCompra(String ultimaFechaCompra) {
        this.ultimaFechaCompra = ultimaFechaCompra;
    }
    
    
    
}
