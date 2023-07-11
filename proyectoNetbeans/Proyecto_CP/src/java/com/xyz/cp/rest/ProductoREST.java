package com.xyz.cp.rest;

import com.google.gson.Gson;
import com.google.gson.JsonParseException;
import com.xyz.cp.controlador.ControladorProducto;
import com.xyz.cp.modelo.Producto;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.sql.SQLException;
import java.util.List;

/**
 *
 * @author ximer
 */
@Path("producto")
public class ProductoREST {

    @Path("guardar")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response guardar(@FormParam("datosProducto") @DefaultValue("") String datosProducto) {
        ControladorProducto cl = new ControladorProducto();
        String out = null;
        Gson gson = new Gson();
        Producto p = null;

        try {
            p = gson.fromJson(datosProducto, Producto.class);
            
            if (p.getIdProducto() == 0) {
                cl.guardar(p);
                out = gson.toJson(p);
            } else {
                cl.actualizar(p);
            }
        } catch (JsonParseException jpe) {
            jpe.printStackTrace();

            out = "{\"exception\":\"Error Interno del servidor\"}" + jpe.getMessage();

        } catch (Exception e) {
            e.printStackTrace();

            out = "{\"exception\":\"que paso\"}" + e.getMessage();
        }

        return Response.status(Response.Status.OK).entity(out).build();
    }

    @Path("getAll")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll(@QueryParam("filtro") @DefaultValue("") String filtro) {

        String out = null;
        ControladorProducto cl = new ControladorProducto();
        List<Producto> producto = null;

        try {

            producto = cl.getAll(filtro);
            out = new Gson().toJson(producto);

        } catch (Exception e) {
            System.out.println(e);
            e.printStackTrace();
            out = "{\"exception\":\"Error Interno del servidor\"}" + e.getMessage();

        }
        return Response.status(Response.Status.OK).entity(out).build();
    }

    @Path("eliminar")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response eliminar(@FormParam("datosProducto") @DefaultValue("") String datosProducto) {

        String out = null;
        Gson gson = new Gson();
        Producto p = null;
        ControladorProducto cl = new ControladorProducto();

        try {
            p = gson.fromJson(datosProducto, Producto.class);

            cl.eliminar(p.getIdProducto());
        } catch (JsonParseException jpe) {
            jpe.printStackTrace();//printStackTrace(): Se utiliza para imprimir el registro del stack donde se ha iniciado la excepción.

            //imprimimos que hay un error 
            out = "{\"exception\":\"Formato Json de Datos Incorrectos\"}";

        } catch (Exception e) {
            e.printStackTrace();

            out = "{\"exception\":\"Error Interno del servidor\"}" + e.getMessage();

        }
        return Response.status(Response.Status.OK).entity(out).build();
    }

    @Path("buscar")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response buscar(@FormParam("filtro") @DefaultValue("") String filtro) throws SQLException {

        String out = null;
        ControladorProducto cp = null;
        List<Producto> productos = null;

        try {
            cp = new ControladorProducto();
            productos = cp.getAll(filtro);
            out = new Gson().toJson(productos);

        } catch (Exception e) {
            e.printStackTrace();
            out = "{\"exception\":\"Error interno del servidor.\"}";
        }

         return Response.status(Response.Status.OK).entity(out).build();

    }

}
