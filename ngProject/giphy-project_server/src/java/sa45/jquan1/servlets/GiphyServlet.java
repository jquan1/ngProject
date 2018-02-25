/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sa45.jquan1.servlets;
import java.io.IOException;
import java.io.BufferedReader;
import java.io.PrintWriter;
import java.io.StringReader;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.PreparedStatement;
import javax.annotation.Resource;
import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.json.JsonReader;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import javax.ws.rs.core.MediaType;

/**
 *
 * @author yxong
 */
@WebServlet(urlPatterns = "/savedgifs")
public class GiphyServlet extends HttpServlet {

    @Resource(lookup = "jdbc/giphy_storage")
    private DataSource connPool;
    
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //super.doGet(req, resp); //To change body of generated methods, choose Tools | Templates.
        
        JsonArrayBuilder gifBuilder = Json.createArrayBuilder();
        log("goGet method");
        try (Connection conn = connPool.getConnection()){
            
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("select * from gifstore");
            
            while (rs.next()) {
                JsonObject cust = Json.createObjectBuilder()
                        .add("gif_title", rs.getString("gif_title"))
                        .add("url_link", rs.getString("gifstoreurl"))
                        .build();
                gifBuilder.add(cust);
            }
            rs.close();
        } catch (SQLException ex) {
            log(ex.getMessage());
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            return;
//            throw new IOException(ex);
        }
        
        try (PrintWriter pw = resp.getWriter()) {
            resp.setStatus(HttpServletResponse.SC_OK);
            resp.setContentType(MediaType.APPLICATION_JSON);
            pw.println(gifBuilder.build().toString());
        }
    }
    
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
               
        String userid = "yx";
        StringBuilder jsonBuff = new StringBuilder();
        String line = null;
        try {
            BufferedReader reader = req.getReader();
            while ((line = reader.readLine()) != null)
                jsonBuff.append(line);
        } catch (Exception e) { }
        
        JsonReader reader = Json.createReader(new StringReader(jsonBuff.toString()));
         
        JsonObject giphyObject = reader.readObject();
         
        reader.close();
        
        String title = giphyObject.getString("title");
        String url = giphyObject.getString("imageUrl");
        PrintWriter out = resp.getWriter();
        try (Connection conn = connPool.getConnection()){
            
            out.println("userid = " + userid);
            out.println("title = " + title);
            out.println("url = " + url);
            out.println(jsonBuff.toString());
             // the mysql insert statement
            String query = " insert into gifstore (id_user, gif_title, gifstoreurl)"
              + " values (?, ?, ?)";

            // create the mysql insert preparedstatement
            PreparedStatement preparedStmt = conn.prepareStatement(query);
            preparedStmt.setString(1, userid);
            preparedStmt.setString(2, title);
            preparedStmt.setString(3, url);

            // execute the preparedstatement
            preparedStmt.execute();
            
        } catch (SQLException ex) {
            
            log(ex.getMessage());
//            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            return;
//            throw new IOException(ex);
        }
        
        try (PrintWriter pw = resp.getWriter()) {
            resp.setStatus(HttpServletResponse.SC_OK);
            resp.setContentType(MediaType.APPLICATION_JSON);
        }
    }
    
}
