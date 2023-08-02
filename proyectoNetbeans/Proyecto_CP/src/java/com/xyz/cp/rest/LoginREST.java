/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.xyz.cp.rest;

/**
 *
 * @author ximer
 */

import com.google.gson.Gson;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import com.xyz.cp.controlador.ControladorLogin;
import com.xyz.cp.modelo.Usuario;



/**
 *
 * @author yazmi
 */
@Path("log")
public class LoginREST {
    
     @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Path("in")
    public Response login(Usuario usuario) throws Exception {
        Gson gson = new Gson();
       
        String out = null;
        ControladorLogin cl = new ControladorLogin();
        Usuario u = null;
       // u=gson.fromJson(usuario, Usuario.class);
        

        try {
            u = cl.login(usuario.getNombre(), usuario.getContrasenia());
            if (u != null) {

            out = new Gson().toJson(u);
            } else {
                
                
                   out = "{\"error\":\"datos incorrectos\"}" ;
            }
        } catch (Exception e) {
            // e.printStackTrace();
           
            out = "{\"exception\":\"error interno en el servidor\"}";
           

        } 
        
        
        return Response.status(Response.Status.OK).entity(out).build();
    }
    
}
