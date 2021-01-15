<%@page import="webapp_post_form_sample.Welcome"%>
<%@page import="java.util.Date"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>月の和名</title>
</head>
<body>
	<!-- http://localhost:8080/webapp_post_form_sample/index.jsp -->
	<%= new Welcome() %>
	<br>
	<%= new Date() %>
	<form method="post" action="MonthServlet">
		<h3>月の和名を出力します。数字（1～12）を入力してください：</h3>
		<input type="text" name="month" autofocus>
		<button type="submit">送信</button>
	</form>
	<div></div>
	<script src="main.js"></script>
</body>
</html>