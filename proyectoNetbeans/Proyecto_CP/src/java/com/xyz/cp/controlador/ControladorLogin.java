/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.xyz.cp.controlador;

import com.xyz.cp.bd.ConexionMySQL;
import com.xyz.cp.modelo.Usuario;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.ResultSet;
/**
 *
 * @author yazmi
 */
public class ControladorLogin {
    
    public Usuario login(String usuario,String contrasenia) throws SQLException
    {   
        String sql ="SELECT * FROM usuario WHERE nombreUsuario=? AND contrasenia=?";
        
        ConexionMySQL connMySQL = new ConexionMySQL();
        
        Connection conn= connMySQL.open();
        
        PreparedStatement pstmt= conn.prepareStatement(sql);
        
        ResultSet rs = null;
        
        pstmt.setString(1, usuario);
        pstmt.setString(2, contrasenia);
        
        Usuario u=null;
        
        rs= pstmt.executeQuery();
        
        if(rs.next())
            u=(fill(rs));
        
        rs.close();
        pstmt.close();
        connMySQL.close();
        
        
        
        
        
    
        return u;
    
    }
    
    private Usuario fill(ResultSet rs) throws SQLException{
        
        Usuario u=new Usuario();
        
        u.setNombre(rs.getString("nombreUsuario"));
        u.setContrasenia(rs.getString("contrasenia"));
        u.setRol(rs.getString("rol"));
        u.setLastToken(rs.getString("lastToken"));
        
        return u;
    }
       
}