<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Login Successful</title>
</head>
<body>
	<h2>Login Successful</h2>
	<p>Welcome, <%= request.getParameter("username") %>!</p>
</body>
</html>