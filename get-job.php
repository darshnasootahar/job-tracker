<?php
header("Content-Type: application/json");
include "db.php";

$result = $conn->query("SELECT * FROM jobs ORDER BY created_at DESC");

$jobs = [];
while ($row = $result->fetch_assoc()) {
    $jobs[] = $row;
}

echo json_encode($jobs);
?>