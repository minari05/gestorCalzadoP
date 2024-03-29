package com.xyz.cp.controlador;

import com.xyz.cp.bd.ConexionMySQL;
import com.xyz.cp.modelo.Material;
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
 * @author ximer
 */
public class ControladorMaterial {

    public Material guardar(Material a) throws SQLException {
        String sql = " {call insertarProducto(?,?,?,?,?,?,?,?)}";

        int idProducto = -1;

        ConexionMySQL connMySQL = new ConexionMySQL();

        Connection conn = connMySQL.open();

        CallableStatement cstmt = conn.prepareCall(sql);

        cstmt.setString(1, a.getNombre());
        cstmt.setDouble(2, a.getPrecioCompra());
        cstmt.setString(3, a.getTipo());
        cstmt.setInt(4, a.getCantidad());
        cstmt.setString(5, a.getDescripcion());
        cstmt.setString(6, a.getProveedor());
        cstmt.setString(7, a.getUltimaFechaCompra());

        cstmt.registerOutParameter(8, Types.INTEGER);

        cstmt.executeUpdate();

        idProducto = cstmt.getInt(8);

        Material pr = new Material();
        pr.setIdProducto(idProducto);

        cstmt.close();
        connMySQL.close();

        //Devolvemos el ID de Cliente generado:
        return pr;

    }

    public void actualizar(Material p) throws SQLException {

        String sql = "{call actualizarProducto(?,?,?,?,?,?,?,?)}";

        ConexionMySQL connMySQL = new ConexionMySQL();

        Connection conn = connMySQL.open();

        CallableStatement cstmt = conn.prepareCall(sql);

        cstmt.setString(1, p.getNombre());
        cstmt.setDouble(2, p.getPrecioCompra());
        cstmt.setString(3, p.getTipo());
        cstmt.setInt(4, p.getCantidad());
        cstmt.setString(5, p.getDescripcion());
        cstmt.setString(6, p.getProveedor());
        cstmt.setString(7, p.getUltimaFechaCompra());
        
        cstmt.setInt(8, p.getIdProducto());

        cstmt.executeUpdate();

        cstmt.close();
        connMySQL.close();

    }

    public List<Material> getAll(String filtro) throws SQLException {
        String sql = "SELECT * FROM producto";

        ConexionMySQL connMySQL = new ConexionMySQL();

        Connection conn = connMySQL.open();

        PreparedStatement pstmt = conn.prepareStatement(sql);

        ResultSet rs = pstmt.executeQuery();

        List<Material> producto = new ArrayList<>();

        while (rs.next()) {
            producto.add(fill(rs));
        }

        rs.close();
        pstmt.close();
        connMySQL.close();

        return producto;
    }

    private Material fill(ResultSet rs) throws SQLException {

        Material p = new Material();

        p.setIdProducto(rs.getInt("idProducto"));
        p.setNombre(rs.getString("nombre"));
        p.setPrecioCompra(rs.getDouble("precioCompra"));
        p.setTipo(rs.getString("tipo"));
        p.setCantidad(rs.getInt("cantidad"));
        p.setDescripcion(rs.getString("descripcion"));
        p.setProveedor(rs.getString("proveedor"));
        p.setUltimaFechaCompra(rs.getString("ultimaFechaCompra"));

        return p;

    }

    public void eliminar(int idProducto) throws SQLException {

        String sql = "DELETE  FROM producto WHERE  idProducto = ?";

        ConexionMySQL connMySQL = new ConexionMySQL();

        Connection conn = connMySQL.open();

        PreparedStatement ps = conn.prepareStatement(sql);

        ps.setInt(1, idProducto);

        ps.executeUpdate();

        ps.close();
        connMySQL.close();

    }


}
