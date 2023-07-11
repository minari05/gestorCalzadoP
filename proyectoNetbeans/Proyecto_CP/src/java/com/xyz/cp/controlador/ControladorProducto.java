package com.xyz.cp.controlador;

import com.xyz.cp.bd.ConexionMySQL;
import com.xyz.cp.modelo.Producto;
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
public class ControladorProducto {

    public Producto guardar(Producto a) throws SQLException {
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

        Producto pr = new Producto();
        pr.setIdProducto(idProducto);

        cstmt.close();
        connMySQL.close();

        //Devolvemos el ID de Cliente generado:
        return pr;

    }

    public void actualizar(Producto p) throws SQLException {

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

    public List<Producto> getAll(String filtro) throws SQLException {
        String sql = "SELECT * FROM producto";

        ConexionMySQL connMySQL = new ConexionMySQL();

        Connection conn = connMySQL.open();

        PreparedStatement pstmt = conn.prepareStatement(sql);

        ResultSet rs = pstmt.executeQuery();

        List<Producto> producto = new ArrayList<>();

        while (rs.next()) {
            producto.add(fill(rs));
        }

        rs.close();
        pstmt.close();
        connMySQL.close();

        return producto;
    }

    private Producto fill(ResultSet rs) throws SQLException {

        Producto p = new Producto();

        p.setIdProducto(rs.getInt("idProducto"));
        p.setNombre(rs.getString("nombre"));
        p.setPrecioCompra(rs.getDouble("precioCompra"));
        p.setTipo(rs.getString("tipo"));
        p.setCantidad(rs.getInt("cantidad"));
        p.setDescripcion(rs.getString("descripcion"));
        p.setProveedor(rs.getString("provedor"));
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

    public List<Producto> buscar(String filtro) throws Exception {

        String sql;

        sql = "Select * from producto WHERE (idProducto LIKE %)" + filtro + "(nombre LIKE %)" + filtro +"(cantidad LIKE %)"+filtro+"(cantidad LIKE %)"+filtro+"(precioCompra LIKE %)"+filtro;

        ConexionMySQL connMySQL = new ConexionMySQL();

        Connection conn = connMySQL.open();

        PreparedStatement pstmt = conn.prepareStatement(sql);

        ResultSet rs = pstmt.executeQuery();

        List<Producto> productos = new ArrayList<>();

        while (rs.next()) {

            productos.add(fill(rs));

        }

        rs.close();
        pstmt.close();
        connMySQL.close();

        return productos;

    }

}
