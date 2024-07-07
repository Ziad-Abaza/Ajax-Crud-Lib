# AJAX CRUD Library Documentation

This library provides an easy way to perform CRUD (Create, Read, Update, Delete) operations using AJAX in a single-page application. It includes PHP scripts to handle database interactions and JavaScript functions to make AJAX requests.

## Features

- **Insert**: Add new records to the database.
- **Fetch**: Retrieve records from the database.
- **Fetch Specific**: Retrieve a specific record by ID.
- **Update**: Update existing records in the database.
- **Delete**: Remove records from the database.
- **Dynamic Content Loading**: Load content dynamically based on the current page.

## Requirements

- PHP 7.0 or higher
- MySQL database
- Web server (e.g., Apache, Nginx)

## Installation

1. **Clone the repository or download the files**:
   ```bash
   git clone https://github.com/Ziad-Abaza/Ajax-Crud-Lib.git
   ```

2. **Configure the database connection**:
   Update the `config.php` file with your database credentials:
   ```php
   <?php
   $host = "localhost";
   $user = "root";
   $password = "";
   $database = "your_database_name";

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
- `load-content.php`: Loads content dynamically based on the requested page.
- `ajaxFunctions.js`: JavaScript file containing AJAX functions.

## Usage

### Insert Data

#### Example

This section shows how to use the `addData` function to insert data into a database.

**HTML**:
```html
<!-- Button to add data -->
<button onclick="addNewRecord()">Add Record</button>
```

**JavaScript**:
```javascript
// Function to add a new record
function addNewRecord() {
    // Data to be inserted
    const data = {
        name: "John Doe",
        email: "john@example.com"
    };

    // Call addData function
    addData("users", data, function(response) {
        // Handle the response
        if (response.success) {
            alert("Record added successfully!");
        } else {
            alert("Failed to add record: " + response.message);
        }
    });
}
```

**Explanation**:
- We define a function `addNewRecord` which creates a data object with `name` and `email`.
- The `addData` function is called with the table name `users`, the data object, and a callback function to handle the response.
- The callback function alerts the user based on the success of the operation.

### Fetch Data

#### Example

This section shows how to use the `fetchData` function to retrieve all records from a database.

**HTML**:
```html
<!-- Button to fetch data -->
<button onclick="getAllRecords()">Fetch Records</button>

<!-- Container to display fetched data -->
<div id="records"></div>
```

**JavaScript**:
```javascript
// Function to fetch all records
function getAllRecords() {
    // Call fetchData function
    fetchData("users", function(response) {
        // Handle the response
        const recordsDiv = document.getElementById("records");
        recordsDiv.innerHTML = ""; // Clear existing content
        response.forEach(record => {
            // Create a new div for each record
            const recordDiv = document.createElement("div");
            recordDiv.innerHTML = `ID: ${record.id}, Name: ${record.name}, Email: ${record.email}`;
            recordsDiv.appendChild(recordDiv);
        });
    });
}
```

**Explanation**:
- We define a function `getAllRecords` which calls the `fetchData` function with the table name `users` and a callback function to handle the response.
- The callback function iterates over the response and creates a new `div` for each record, displaying the ID, name, and email.
- The new `div`s are appended to the `records` container.

### Fetch Specific Data

#### Example

This section shows how to use the `fetchSpecificData` function to retrieve a specific record by ID from a database.

**HTML**:
```html
<!-- Button to fetch a specific record -->
<button onclick="getSpecificRecord(1)">Fetch Record with ID 1</button>

<!-- Container to display the fetched record -->
<div id="specific-record"></div>
```

**JavaScript**:
```javascript
// Function to fetch a specific record by ID
function getSpecificRecord(id) {
    // Call fetchSpecificData function
    fetchSpecificData("users", id, function(response) {
        // Handle the response
        const recordDiv = document.getElementById("specific-record");
        recordDiv.innerHTML = `ID: ${response.id}, Name: ${response.name}, Email: ${response.email}`;
    });
}
```

**Explanation**:
- We define a function `getSpecificRecord` which takes an `id` as an argument.
- The `fetchSpecificData` function is called with the table name `users`, the `id`, and a callback function to handle the response.
- The callback function updates the `specific-record` container with the fetched record's ID, name, and email.

### Update Data

#### Example

This section shows how to use the `updateData` function to update a record by ID in a database.

**HTML**:
```html
<!-- Button to update a record -->
<button onclick="updateRecord(1)">Update Record with ID 1</button>
```

**JavaScript**:
```javascript
// Function to update a record
function updateRecord(id) {
    // Data to be updated
    const data = {
        name: "Jane Doe",
        email: "jane@example.com"
    };

    // Call updateData function
    updateData("users", id, data, function(response) {
        // Handle the response
        if (response.success) {
            alert("Record updated successfully!");
        } else {
            alert("Failed to update record: " + response.message);
        }
    });
}
```

**Explanation**:
- We define a function `updateRecord` which takes an `id` as an argument.
- A data object is created with the updated `name` and `email`.
- The `updateData` function is called with the table name `users`, the `id`, the data object, and a callback function to handle the response.
- The callback function alerts the user based on the success of the operation.

### Delete Data

#### Example

This section shows how to use the `deleteData` function to delete a record by ID from a database.

**HTML**:
```html
<!-- Button to delete a record -->
<button onclick="deleteRecord(1)">Delete Record with ID 1</button>
```

**JavaScript**:
```javascript
// Function to delete a record
function deleteRecord(id) {
    // Call deleteData function
    deleteData("users", id, function(response) {
        // Handle the response
        if (response.success) {
            alert("Record deleted successfully!");
        } else {
            alert("Failed to delete record: " + response.message);
        }
    });
}
```

**Explanation**:
- We define a function `deleteRecord` which takes an `id` as an argument.
- The `deleteData` function is called with the table name `users`, the `id`, and a callback function to handle the response.
- The callback function alerts the user based on the success of the operation.

### Dynamic Content Loading

#### Example

This section shows how to use the `loadContent` function to load content dynamically based on the requested page.

**HTML**:
```html
<!-- Links to load different pages -->
<a href="#" onclick="loadPage('page1.html')">Load Page 1</a>
<a href="#" onclick="loadPage('page2.html')">Load Page 2</a>

<!-- Container to display the loaded content -->
<div id="content"></div>
```

**JavaScript**:
```javascript
// Function to load a page dynamically
function loadPage(page) {
    // Call loadContent function
    loadContent(page, function(response) {
        // Handle the response
        const contentDiv = document.getElementById("content");
        contentDiv.innerHTML = response;
    });
}
```

**Explanation**:
- We define a function `loadPage` which takes a `page` as an argument.
- The `loadContent` function is called with the `page` and a callback function to handle the response.
- The callback function updates the `content` container with the loaded content.

### `loadContent` Function

The `loadContent` function is designed to dynamically load content into a specific HTML element based on a requested page. Here's how it works and its HTML requirements:

#### Function Definition

```javascript
function loadContent(page, element) {
  fetch(`load-content.php?page=${page}`)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("main-content").innerHTML = data;
      document
        .querySelectorAll(".nav-link")
        .forEach((navLink) => navLink.classList.remove("active"));
      element.classList.add("active");

      /*****************************************************
       * Add additional logic here for specific pages if needed
       * Example: Dynamically load data based on the current page
       ******************************************************/
      // Example: Load user data if the current page is 'Dashboard/users.php'
      // if (page.includes('Dashboard/users.php')) {
      //     fetchItems('users', updateUsersUI);
      // }
    })
    .catch((error) => console.error("Error loading content:", error));
}
```

#### HTML Requirements

To use the `loadContent` function effectively, ensure the following HTML structure:

```html
<!-- HTML Structure -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dynamic Content Loading</title>
  <!-- Include necessary CSS files -->
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <!-- Navigation Bar -->
  <nav>
    <ul>
      <li><a href="#" onclick="loadContent('home.php', this)">Home</a></li>
      <li><a href="#" onclick="loadContent('about.php', this)">About</a></li>
      <li><a href="#" onclick="loadContent('contact.php', this)">Contact</a></li>
    </ul>
  </nav>

  <!-- Main Content Area -->
  <div id="main-content">
    <!-- Content will be dynamically loaded here -->
  </div>

  <!-- Include necessary JavaScript files -->
  <script src="scripts.js"></script>
</body>
</html>
```

#### Explanation

- **Navigation Links**: Each `<a>` tag in the navigation menu should call the `loadContent` function with the appropriate page name and `this` as the second argument (which represents the clicked element).
  
- **Main Content Area**: This is where the content fetched by `loadContent` will be displayed. Ensure an empty `<div>` with an id of `main-content` exists to receive the loaded content.

- **JavaScript**: The `loadContent` function uses `fetch` to asynchronously load content from `load-content.php` based on the `page` parameter. Upon successful loading, it updates the `innerHTML` of `main-content` with the fetched data. It also manages navigation link styles by removing the `active` class from all links and adding it to the currently active link (`element`).

### Additional Comments

- **Custom Logic**: Uncomment and customize the additional logic section to perform specific actions based on the loaded page. For example, fetch additional data or update UI elements dynamically.

- **Error Handling**: The function includes basic error handling to catch and log any loading errors to the console.

This setup allows for efficient dynamic content loading in a single-page application, enhancing user experience by minimizing page reloads and improving overall responsiveness. Adjust the PHP script (`load-content.php`) accordingly to fetch and format data as needed for each page request.

This library aims to simplify the process of performing AJAX-based CRUD operations in a single-page application. The provided examples show how to use the JavaScript functions to interact with the server-side PHP scripts.
