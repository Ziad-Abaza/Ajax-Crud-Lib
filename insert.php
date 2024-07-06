<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require "config.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $table = $_POST['table'];
    $data = json_decode($_POST['data'], true);
    $columns = implode(", ", array_keys($data));
    $values = implode("', '", array_values($data));

    $sql = "INSERT INTO $table ($columns) VALUES ('$values')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(array("success" => true, "message" => "Data inserted successfully"));
    } else {
        echo json_encode(array("success" => false, "message" => "Error: " . $sql . "<br>" . $conn->error));
    }
}

$conn->close();
?>
