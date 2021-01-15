<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>月の和名</title>
</head>
<body>
	<%
	Object output = request.getAttribute("output");
	%>
	<h3><%= output %></h3>
	<a href="./">トップに戻る</a>
</body>
</html>