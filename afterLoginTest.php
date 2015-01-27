<html>
	<body>
	
		Username: <?php echo $_POST["user"]; ?><br>
		Password: <?php echo $_POST["pass"]; ?><br>
		<?php var_dump($_POST);?>
		<br>
		<p>
			This is just a test to show that information can be sent; the recipient
			could be the database or another html page if we make it so.
		</p>
	</body>
</html>