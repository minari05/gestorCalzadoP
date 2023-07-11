
package com.xyz.cp.controlador;

import com.xyz.cp.bd.ConexionMySQL;
import com.xyz.cp.modelo.Empleado;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author yazmi
 */
public class ControladorEmpleado {

    public Empleado guardar(Empleado e) throws SQLException {
        String sql = " {call insertarEmpleado(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        int idEmpleado = -1;

        ConexionMySQL connMySQL = new ConexionMySQL();

        Connection conn = connMySQL.open();

        CallableStatement cstmt = conn.prepareCall(sql);

        cstmt.setString(1,e.getNombre());
        cstmt.setString(2,e.getPrimerApellido());
        cstmt.setString(3,e.getSegundoApellido());
        cstmt.setString(4,e.getGenero());
        cstmt.setString(5,e.getRfc());
        cstmt.setString(6,e.getCurp());
        cstmt.setString(7,e.getNss());
        cstmt.setString(8,e.getFechaInicioTrabajo());
        cstmt.setString(9,e.getSalario());
        cstmt.setString(10,e.getPuesto());
        cstmt.setString(11,e.getDepartamento());
        cstmt.setString(12,e.getPrestaciones());

        cstmt.registerOutParameter(13, Types.INTEGER);

        cstmt.executeUpdate();

        idEmpleado = cstmt.getInt(13);

        Empleado em = new Empleado();
        em.setIdEmpleado(idEmpleado);

        cstmt.close();
        connMySQL.close();

        //Devolvemos el ID de Cliente generado:
        return em;

    }

    public void actualizar(Empleado e) throws SQLException {

        String sql = "{call actualizarEmpleado(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        ConexionMySQL connMySQL = new ConexionMySQL();

        Connection conn = connMySQL.open();

        CallableStatement cstmt = conn.prepareCall(sql);

        cstmt.setString(1, e.getNombre());
        cstmt.setString(2, e.getPrimerApellido());
        cstmt.setString(3, e.getSegundoApellido());
        cstmt.setString(4, e.getGenero());
        cstmt.setString(5, e.getRfc());
        cstmt.setString(6, e.getCurp());
        cstmt.setString(7, e.getNss());
        cstmt.setString(8, e.getFechaInicioTrabajo());
        cstmt.setString(9, e.getSalario());
        cstmt.setString(10, e.getPuesto());
        cstmt.setString(11, e.getDepartamento());
        cstmt.setString(12, e.getPrestaciones());
        cstmt.setInt(13, e.getIdEmpleado());
        
        cstmt.executeUpdate();
        
         cstmt.close();
         connMySQL.close();

    }
    
    public List<Empleado> getAll(String filtro) throws SQLException{
        String sql = "SELECT * FROM empleado";
        
        ConexionMySQL connMySQL = new ConexionMySQL();
        
        Connection conn= connMySQL.open();
        
        PreparedStatement pstmt = conn.prepareStatement(sql);
        
        ResultSet rs= pstmt.executeQuery();
        
        List<Empleado> empleados = new ArrayList<>();
        
        while (rs.next())
            empleados.add(fill(rs));
        
        rs.close();
        pstmt.close();
        connMySQL.close();
        
        
        
        return empleados;
    }
    
    private Empleado fill(ResultSet rs) throws SQLException{
        
        Empleado e=new Empleado();
        
        e.setIdEmpleado(rs.getInt("idEmpleado"));
        e.setNombre(rs.getString("nombre"));
        e.setPrimerApellido(rs.getString("primerApellido"));
        e.setSegundoApellido(rs.getString("segundoApellido"));
        e.setRfc(rs.getString("RFC"));
        e.setCurp(rs.getString("CURP"));
        e.setFechaInicioTrabajo(rs.getString("fechaInicioTrabajo"));
        e.setNss(rs.getString("NSS"));
        e.setSalario(rs.getString("TipoSalario"));
        e.setPuesto(rs.getString("puesto"));
        e.setDepartamento(rs.getString("departamento"));
        e.setPrestaciones(rs.getString("prestaciones"));
        e.setGenero(rs.getString("genero"));
        
        return e;
        
    }
    
    public void eliminar(int idEmpleado) throws SQLException{
        
        String sql ="DELETE  FROM empleado WHERE  idEmpleado = ?";
        
        ConexionMySQL connMySQL = new ConexionMySQL();
        
        Connection conn = connMySQL.open();
        
        PreparedStatement ps= conn.prepareStatement(sql);
        
        ps.setInt(1, idEmpleado);
        
        ps.executeUpdate();
        
        ps.close();
        connMySQL.close();
    
    }
}
