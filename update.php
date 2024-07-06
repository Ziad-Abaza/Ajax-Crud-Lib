<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require "config.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $table = $_POST['table'];
    $id = $_POST['id'];
    $data = json_decode($_POST['data'], true);
    $updateData = [];
    foreach ($data as $column => $value) {
        $updateData[] = "$column = '$value'";
    }
    $updateStr = implode(", ", $updateData);

    $sql = "UPDATE $table SET $updateStr WHERE id = $id";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(array("success" => true, "message" => "Data updated successfully"));
    } else {
        echo json_encode(array("success" => false, "message" => "Error: " . $sql . "<br>" . $conn->error));
    }
}

$conn->close();
?>
