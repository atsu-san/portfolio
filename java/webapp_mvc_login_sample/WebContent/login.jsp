<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>
<meta charset="UTF-8">
<title>Login</title>
<style>
.container {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
</head>

<body>
	<div class="container">
		<form action="validate.do" method="POST">
			<table>
				<tr>
					<td>User Name</td>
					<td><input type="text" name="username"></td>
				</tr>
				<tr>
					<td>Password</td>
					<td><input type="password" name="password"></td>
				</tr>
				<tr>
					<td><input type="submit" value="Login"></td>
					<td><input type="reset" value="Reset"></td>
				</tr>
			</table>
		</form>
	</div>
</body>

</html>