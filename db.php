<?php
$host = "localhost";
$user = "root";
$pass = "";
$db   = "job_tracker_db";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}
?>