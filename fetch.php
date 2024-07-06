<?php
require "config.php";

$table = $_GET['table'];
$sql = "SELECT * FROM $table";
$result = $conn->query($sql);

$data = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
} else {
    $data = ["message" => "No data found"];
}

echo json_encode($data);

$conn->close();
?>
