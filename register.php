<?php
require('connect.php');

// If the values are posted, insert them into the database.
    if (isset($_POST['nom']) && isset($_POST['password'])){
        $nom = $_POST['nom'];
        $prenom = $_POST['prenom'];
        $email = $_POST['email'];
        $password = $_POST['password'];

        $query = "INSERT INTO `users` (nom, prenom, password, email) VALUES ('$nom', '$prenom', '$password', '$email')";
        $result = mysql_query($query);
        if($result){
            $msg = "User Created Successfully.";
        }
    }

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>

	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title>PING</title>	
	
	<link rel="stylesheet" href="kube.css" type="text/css"/>
	<link rel="stylesheet" href="style.css" type="text/css"/>

</head>

<body>
        
    <form action="" method="POST" class="forms">
    	<fieldset>
         <legend>CRÉER UN COMPTE</legend>
        <label>
            Nom
            <input type="text" name="nom" class="width-50"  />
        </label>
        <label>
            Prénom
            <input type="text" name="prenom" class="width-50"  />
        </label>
        <label>
            Email
            <input type="email" name="email" class="width-50"  />
        </label>
        <label>
            Mot de passe
            <input type="password" name="password" class="width-50"  />
        </label>
     <a href="home.html" class="btn btn-outline">Créer</a>
    </fieldset>
</form>


</body>