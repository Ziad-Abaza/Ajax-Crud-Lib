# AJAX CRUD Library

This library provides an easy way to perform CRUD (Create, Read, Update, Delete) operations using AJAX in a single-page application. It includes PHP scripts to handle database interactions and JavaScript functions to make AJAX requests.

## Features

- **Insert**: Add new records to the database.
- **Fetch**: Retrieve records from the database.
- **Update**: Update existing records in the database.
- **Delete**: Remove records from the database.

## Requirements

- PHP 7.0 or higher
- MySQL database
- Web server (e.g., Apache, Nginx)

## Installation

1. **Clone the repository or download the files**:
   git clone https://github.com/your-username/ajax-crud-library.git

2. **Configure the database connection**:
   Update the `config.php` file with your database credentials:
   ```php
   <?php
   $host = "";
   $user = "";
   $password = "";
   $database = "";

   $conn = mysqli_connect($host, $user, $password, $database);
   if (!$conn) {
       die("Connection failed: " . mysqli_connect_error());
   }
   ?>
   ```

## File Structure

- `config.php`: Database connection configuration.
- `insert.php`: Handles data insertion.
- `fetch.php`: Retrieves all records.
- `fetch-specific.php`: Retrieves a specific record by ID.
- `update.php`: Updates a record by ID.
- `delete.php`: Deletes a record by ID.
- `example.php`: Example HTML file to demonstrate the usage of the library.
- `ajaxFunctions.js`: JavaScript file containing AJAX functions.

## Usage

### 1. Insert Data

```php
// insert.php
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
```

### 2. Fetch Data

```php
// fetch.php
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
```

### 3. Fetch Specific Data

```php
// fetch-specific.php
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
```

### 4. Update Data

```php
// update.php
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
```

### 5. Delete Data

```php
// delete.php
<?php
require "config.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $table = $_POST['table'];
    $id = $_POST['id'];

    $sql = "DELETE FROM $table WHERE id = $id";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(array("success" => true, "message" => "Data deleted successfully"));
    } else {
        echo json_encode(array("success" => false, "message" => "Error: " . $sql . "<br>" . $conn->error));
    }
}

$conn->close();
?>
```

## Example Usage

Create an `example.php` file to demonstrate the library usage:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AJAX Operations</title>
</head>
<body>
    <h1>Add Data</h1>
    <input type="text" id="name" placeholder="Name">
    <input type="number" id="age" placeholder="Age">
    <input type="text" id="city" placeholder="City">
    <button onclick="addUser()">Add User</button>

    <h1>Users List</h1>
    <table id="userTable">
        <!-- Data will be populated here -->
    </table>

    <script src="ajaxFunctions.js"></script>
    <script>
        function addUser() {
            const data = {
                name: document.getElementById('name').value,
                age: document.getElementById('age').value,
                city: document.getElementById('city').value
            };
            addData('users', data, function(response) {
                console.log(response);
                fetchUsers();
            });
        }

        function fetchUsers() {
            fetchData('users', function(response) {
                const table = document.getElementById('userTable');
                table.innerHTML = '';
                response.forEach(user => {
                    table.innerHTML += `<tr>
                        <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>${user.age}</td>
                        <td>${user.city}</td>
                        <td><button onclick="deleteUser(${user.id})">Delete</button></td>
                    </tr>`;
                });
            });
        }

        function deleteUser(id) {
            deleteData('users', id, function(response) {
                console.log(response);
                fetchUsers();
            });
        }

        window.onload = fetchUsers;
    </script>
</body>
</html>
```

In `ajaxFunctions.js`, define the AJAX functions for CRUD operations:

```javascript
function addData(table, data, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "insert.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload = function() {
        if (xhr.status === 200) {
            callback(JSON.parse(xhr.responseText));
        }
    };
    xhr.send(`table=${table}&data=${JSON.stringify(data)}`);
}

function fetchData(table, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `fetch.php?table=${table}`, true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            callback(JSON.parse(xhr.responseText));
        }
    };
    xhr.send();
}

function deleteData(table, id, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "delete.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload = function() {
        if (xhr.status === 200) {
            callback(JSON.parse(xhr.responseText));
        }
    };
    xhr.send(`table=${table}&id=${id}`);
}

function updateData(table, id, data, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "update.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload = function() {
        if (xhr.status === 200) {
            callback(JSON.parse(xhr.responseText));
        }
    };
    xhr.send(`table=${table}&id=${id}&data=${JSON



.stringify(data)}`);
}
```

### Adding Data
To add a user, enter the name, age, and city in the input fields and click "Add User". The data will be inserted into the database, and the table will be updated automatically.

### Fetching Data
To retrieve all users, the `fetchUsers()` function is called on page load. It populates the `userTable` with the current list of users fetched from the database.

### Deleting Data
Each row in the `userTable` has a "Delete" button that triggers the `deleteUser(id)` function. It removes the corresponding user from the database and updates the table.

### Updating Data
For updating data, you can modify the `updateData` function in `ajaxFunctions.js` similarly to how insert and delete operations are handled. This function would send a request to `update.php` with the necessary data.

## Additional Examples

### Fetching Specific User

```html
<!-- example-fetch-specific.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fetch Specific User</title>
</head>
<body>
    <h1>Fetch Specific User</h1>
    <label for="userId">User ID:</label>
    <input type="number" id="userId" placeholder="Enter User ID">
    <button onclick="fetchUser()">Fetch User</button>

    <div id="userData">
        <!-- Data will be populated here -->
    </div>

    <script src="ajaxFunctions.js"></script>
    <script>
        function fetchUser() {
            const userId = document.getElementById('userId').value;
            fetchDataById('users', userId, function(response) {
                const userDataDiv = document.getElementById('userData');
                if (response.message) {
                    userDataDiv.textContent = response.message;
                } else {
                    userDataDiv.innerHTML = `<p><strong>Name:</strong> ${response.name}</p>
                                             <p><strong>Age:</strong> ${response.age}</p>
                                             <p><strong>City:</strong> ${response.city}</p>`;
                }
            });
        }

        function fetchDataById(table, id, callback) {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", `fetch-specific.php?table=${table}&id=${id}`, true);
            xhr.onload = function() {
                if (xhr.status === 200) {
                    callback(JSON.parse(xhr.responseText));
                }
            };
            xhr.send();
        }
    </script>
</body>
</html>
```

### Updating User

```html
<!-- example-update.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Update User</title>
</head>
<body>
    <h1>Update User</h1>
    <label for="userId">User ID:</label>
    <input type="number" id="userId" placeholder="Enter User ID">
    <br><br>
    <label for="name">Name:</label>
    <input type="text" id="name" placeholder="Enter New Name">
    <br><br>
    <label for="age">Age:</label>
    <input type="number" id="age" placeholder="Enter New Age">
    <br><br>
    <label for="city">City:</label>
    <input type="text" id="city" placeholder="Enter New City">
    <br><br>
    <button onclick="updateUser()">Update User</button>

    <div id="updateMessage">
        <!-- Update message will be shown here -->
    </div>

    <script src="ajaxFunctions.js"></script>
    <script>
        function updateUser() {
            const userId = document.getElementById('userId').value;
            const newName = document.getElementById('name').value;
            const newAge = document.getElementById('age').value;
            const newCity = document.getElementById('city').value;

            const newData = {
                name: newName,
                age: newAge,
                city: newCity
            };

            updateData('users', userId, newData, function(response) {
                const updateMessageDiv = document.getElementById('updateMessage');
                if (response.success) {
                    updateMessageDiv.textContent = "User updated successfully";
                } else {
                    updateMessageDiv.textContent = "Error updating user: " + response.message;
                }
            });
        }
    </script>
</body>
</html>
```

These additional examples demonstrate fetching a specific user by ID and updating a user's information using the AJAX CRUD library.

This completes the comprehensive documentation for the AJAX CRUD library, including installation instructions, file structure, usage examples, and additional scenarios.
