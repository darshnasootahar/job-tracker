<?php
header("Content-Type: application/json");
include "db.php";

$data     = json_decode(file_get_contents("php://input"), true);

$company  = $conn->real_escape_string($data['company']);
$role     = $conn->real_escape_string($data['role']);
$status   = $conn->real_escape_string($data['status']);
$date     = $conn->real_escape_string($data['apply_date']);
$deadline = $conn->real_escape_string($data['deadline'] ?? '');
$job_link = $conn->real_escape_string($data['job_link'] ?? '');
$notes    = $conn->real_escape_string($data['notes'] ?? '');

$sql = "INSERT INTO jobs (company, role, status, apply_date, deadline, job_link, notes)
        VALUES ('$company', '$role', '$status', '$date', '$deadline', '$job_link', '$notes')";

if ($conn->query($sql)) {
    echo json_encode(["success" => true, "id" => $conn->insert_id]);
} else {
    echo json_encode(["error" => $conn->error]);
}
?>