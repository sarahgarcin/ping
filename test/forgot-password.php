<?php session_start();
include "connect.php"; //connects to the database
if (isset($_POST['username'])){
    $username = $_POST['username'];
    $query="select * from user where username='$username'";
    $result   = mysql_query($query);
    $count=mysql_num_rows($result);
    // If the count is equal to one, we will send message other wise display an error message.
    if($count==1)
    {
        $rows=mysql_fetch_array($result);
        $pass  =  $rows['password'];//FETCHING PASS
        //echo "your pass is ::".($pass)."";
        $to = $rows['email'];
        //echo "your email is ::".$email;
        //Details for sending E-mail
        $from = "Coding Cyber";
        $url = "http://www.codingcyber.com/";
        $body  =  "Coding Cyber password recovery Script
        -----------------------------------------------
        Url : $url;
        email Details is : $to;
        Here is your password  : $pass;
        Sincerely,
        Coding Cyber";
        $from = "codingcyber@gmail.com";
        $subject = "CodingCyber Password recovered";
        $headers1 = "From: $from\n";
        $headers1 .= "Content-type: text/html;charset=iso-8859-1\r\n";
        $headers1 .= "X-Priority: 1\r\n";
        $headers1 .= "X-MSMail-Priority: High\r\n";
        $headers1 .= "X-Mailer: Just My Server\r\n";
        $sentmail = mail ( $to, $subject, $body, $headers1 );
    } else {
    if ($_POST ['email'] != "") {
    echo "<span style='color: #ff0000;'> Not found your email in our database</span>";
        }
        }
    //If the message is sent successfully, display sucess message otherwise display an error message.
    if($sentmail==1)
    {
        echo "<span style='color: #ff0000;'> Your Password Has Been Sent To Your Email Address.</span>";
    }
        else
        {
        if($_POST['email']!="")
        echo "<span style='color: #ff0000;'> Cannot send password to your e-mail address.Problem with sending mail...</span>";
    }
}
?>
 <!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet" type="text/css" href="style.css" />
<title>CodingCyber - Simple Script to send Forgotten password</title>
</head>
<body>


<div class="register-form">
<?php
	if(isset($msg) & !empty($msg)){
		echo $msg;
	}
 ?>
<h1>Forgot Password</h1>
<form action="" method="POST">
    <p><label>User Name : </label>
	<input id="username" type="text" name="username" placeholder="username" /></p>
 
    <input class="btn register" type="submit" name="submit" value="Submit" />
    </form>
</div>

</body>
</html>