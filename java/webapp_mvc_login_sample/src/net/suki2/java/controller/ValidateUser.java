package net.suki2.java.controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.suki2.java.dao.UserDAO;

/**
 * Servlet implementation class ValidateUser
 */
@WebServlet("/validate.do")
public class ValidateUser extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String uName = request.getParameter("username");
		String pass = request.getParameter("password");

		if (new UserDAO().validateUser(uName, pass)) {
			// success page
			request.getRequestDispatcher("success.jsp").forward(request, response);
		} else {
			// failure page
			request.getRequestDispatcher("failure.jsp").forward(request, response);
		}

	}

}
