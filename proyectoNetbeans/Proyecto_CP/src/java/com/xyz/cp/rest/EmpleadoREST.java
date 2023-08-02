package com.xyz.cp.rest;

import com.google.gson.Gson;
import com.google.gson.JsonParseException;
import com.xyz.cp.controlador.ControladorEmpleado;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import com.xyz.cp.modelo.Empleado;
import java.sql.SQLException;
import java.util.List;

/**
 *
 * @author yazmi
 */
@Path("empleado")
public class EmpleadoREST {

    @Path("guardar")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response guardar(@FormParam("datosEmpleado") @DefaultValue("") String datosEmpleado) {
        ControladorEmpleado cl = new ControladorEmpleado();
        String out = null;
        Gson gson = new Gson();
        Empleado em = null;

        try {
            em = gson.fromJson(datosEmpleado, Empleado.class);
            if (em.getIdEmpleado() == 0) {
                cl.guardar(em);
                out = gson.toJson(em);
            } else {
                cl.actualizar(em);
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
        ControladorEmpleado cl = new ControladorEmpleado();
        List<Empleado> empleados = null;

        try {

            empleados = cl.getAll(filtro);
            out = new Gson().toJson(empleados);

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
    public Response eliminar(@FormParam("datosEmpleado") @DefaultValue("") String datosEmpleado) {
       
        Gson gson = new Gson();
        Empleado em = null;
        ControladorEmpleado cl = new ControladorEmpleado();

        try {
            em = gson.fromJson(datosEmpleado, Empleado.class);
            cl.eliminar(em.getIdEmpleado());
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
                .entity("{\"message\":\"Empleado eliminado correctamente\"}")
                .build();
    }
}
