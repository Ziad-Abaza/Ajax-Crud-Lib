<?php
require "config.php";

$table = $_GET['table'];
$id = $_GET['id'];
$sql = "SELECT * FROM $table WHERE id = $id";
$result = $conn->query($sql);

$data = [];
if ($result->num_rows > 0) {
    $data = $result->fetch_assoc();
} else {
    $data = ["message" => "No data found"];
}

echo json_encode($data);

$conn->close();
?>
