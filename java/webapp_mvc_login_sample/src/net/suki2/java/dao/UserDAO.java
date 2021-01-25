package net.suki2.java.dao;

import java.sql.SQLException;

import net.suki2.java.connection.GetConnection;

public class UserDAO {
	public boolean validateUser(String uName, String pass) {
		String sql = "SELECT * FROM testdb.authorization WHERE login_id=? AND password=?";

		GetConnection gc = new GetConnection();

		try {
			gc.ps = GetConnection.getMySQLConnection().prepareStatement(sql);
			gc.ps.setString(1, uName);
			gc.ps.setString(2, pass);

			gc.rs = gc.ps.executeQuery();

			return gc.rs.next();

		} catch (SQLException e) {
			e.printStackTrace();
		}

		return false;
	}
}
