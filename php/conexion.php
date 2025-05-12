<?php 

$username  = "admin";
$password = "12346578";
$hostname = "localhost";
$db = "sistematickets";
$port = "3306";

$conn = new mysqli($hostname, $username, $password, $db, $port);

if($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}






