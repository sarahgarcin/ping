<?php  //Start the Session
session_start();
 require('connect.php');
//3. If the form is submitted or not.
//3.1 If the form is submitted
if (isset($_POST['email']) and isset($_POST['password'])){
//3.1.1 Assigning posted values to variables.
$email = $_POST['email'];
$password = $_POST['password'];
//3.1.2 Checking the values are existing in the database or not
$query = "SELECT * FROM `users` WHERE email='$email' and password='$password'";
 
$result = mysql_query($query) or die(mysql_error());
$count = mysql_num_rows($result);
//3.1.2 If the posted values are equal to the database values, then session will be created for the user.
if ($count == 1){
$_SESSION['email'] = $email;
}else{
//3.1.3 If the login credentials doesn't match, he will be shown with an error message.
echo "Invalid Login Credentials.";
}
}
//3.1.4 if the user is logged in Greets the user with message
if (isset($_SESSION['email'])){
$email = $_SESSION['email'];
echo "Hai " . $email . "
";
echo "This is the Members Area
";
echo "<a href='logout.php'>Logout</a>";
 
}else{
//3.2 When the user visits the page first time, simple login form will be displayed.

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

    <form action="register.php" method="POST" class="forms">
        <fieldset>
            <legend>LOG IN</legend>
            <label>
                Email
                <input type="email" name="user-email" class="width-50"  />
            </label>
            <label>
                Mot de passe
                <input type="password" name="user-password" class="width-50"  />
            </label>
            <p>
        <a href="home.html" class="btn btn-outline">Log in</a>
        </p>
        </fieldset>
    </form>

<?php } ?>
</body>