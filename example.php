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
