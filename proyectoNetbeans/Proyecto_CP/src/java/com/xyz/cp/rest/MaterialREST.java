package com.xyz.cp.rest;

import com.google.gson.Gson;
import com.google.gson.JsonParseException;
import com.xyz.cp.controlador.ControladorMaterial;
import com.xyz.cp.modelo.Material;
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
public class MaterialREST {

    @Path("guardar")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response guardar(@FormParam("datosProducto") @DefaultValue("") String datosProducto) {
        ControladorMaterial cl = new ControladorMaterial();
        String out = null;
        Gson gson = new Gson();
        Material p = null;

        try {
            p = gson.fromJson(datosProducto, Material.class);

            if (p.getIdProducto() == 0) {
                cl.guardar(p);

            } else {
                cl.actualizar(p);
            }

            // Después de guardar o actualizar el material exitosamente
            return Response.status(Response.Status.OK).entity("{\"message\":\"Operación exitosa\"}").build();
        } catch (JsonParseException jpe) {
            jpe.printStackTrace();
            out = "{\"exception\":\"Error Interno del servidor\"}" + jpe.getMessage();
        } catch (Exception e) {
            e.printStackTrace();
            out = "{\"exception\":\"que paso\"}" + e.getMessage();
        }

        return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(out).build();
    }

    @Path("getAll")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll(@QueryParam("filtro") @DefaultValue("") String filtro) {

        String out = null;
        ControladorMaterial cl = new ControladorMaterial();
        List<Material> producto = null;

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
        Material p = null;
        ControladorMaterial cm = new ControladorMaterial();

        try {
            p = gson.fromJson(datosProducto, Material.class);

            cm.eliminar(p.getIdProducto());
        } catch (JsonParseException jpe) {
            jpe.printStackTrace();
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("{\"exception\":\"Formato Json de Datos Incorrectos\"}")
                    .build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("{\"exception\":\"Error Interno del servidor\"}")
                    .build();
        }

        return Response.status(Response.Status.OK)
                .entity("{\"message\":\"Material eliminado correctamente\"}")
                .build();
    }
    
    @POST
    @Path("buscar")
    @Produces(MediaType.APPLICATION_JSON)
    public Response buscar(@FormParam("filtro") @DefaultValue("") String filtro){
    
        String out = null;
        ControladorMaterial cm = null;
        List<Material> material = null;
        
        
        try {
            cm = new ControladorMaterial();
            material = cm.getAll(filtro);
            out = new Gson().toJson(material);
            
        } catch (Exception e) {
            
            e.printStackTrace();
            out = "{\"exception\":\"Error interno del servidor.\"}";
        }
        return Response.status(Response.Status.OK).entity(out).build();
    
    }
    
}


