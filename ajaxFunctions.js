// Function to perform AJAX request
function ajaxRequest(method, url, data, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open(method, url, true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      callback(JSON.parse(xhr.responseText));
    }
  };
  xhr.send(data);
}

// Function to add data
function addData(table, data, callback) {
  const postData = `table=${table}&data=${JSON.stringify(data)}`;
  ajaxRequest("POST", "insert.php", postData, callback);
}

// Function to fetch all data
function fetchData(table, callback) {
  ajaxRequest("GET", `fetch.php?table=${table}`, null, callback);
}

// Function to fetch specific data by ID
function fetchSpecificData(table, id, callback) {
  ajaxRequest(
    "GET",
    `fetch-specific.php?table=${table}&id=${id}`,
    null,
    callback
  );
}

// Function to update data
function updateData(table, id, data, callback) {
  const postData = `table=${table}&id=${id}&data=${JSON.stringify(data)}`;
  ajaxRequest("POST", "update.php", postData, callback);
}

// Function to delete data
function deleteData(table, id, callback) {
  const postData = `table=${table}&id=${id}`;
  ajaxRequest("POST", "delete.php", postData, callback);
}

// Function to load content from another page
function loadContent(url, elementId) {
  ajaxRequest("GET", url, null, function (response) {
    document.getElementById(elementId).innerHTML = response;
  });
}

// Function to add page content into current page
function addPageContent(url, elementId) {
  ajaxRequest("GET", url, null, function (response) {
    document.getElementById(elementId).innerHTML += response;
  });
}

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
       * This section detects the current page being loaded and
       * dynamically fetches data accordingly.
       ******************************************************/
      // Example: Load user data if the current page is 'Dashboard/users.php'
      // Uncomment and customize as needed.
      // if (page.includes('Dashboard/users.php')) {
      //     fetchItems('users', updateUsersUI);
      // }

      // Example: Load company data if the current page is 'Controller/companies.php'
      // Uncomment and customize as needed.
      // if (page.includes('Controller/companies.php')) {
      //     fetchItems('companies', updateCompaniesUI);
      // }

      // Example: Load job postings if the current page is 'job-list.php'
      // Uncomment and customize as needed.
      // if (page.includes('job-list.php')) {
      //     fetchItems('job_postings', updateJobsUI);
      // }
    })
    .catch((error) => console.error("Error loading content:", error));
}
