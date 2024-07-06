// Function to perform AJAX request
function ajaxRequest(method, url, data, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
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
    ajaxRequest('POST', 'insert.php', postData, callback);
}

// Function to fetch all data
function fetchData(table, callback) {
    ajaxRequest('GET', `fetch.php?table=${table}`, null, callback);
}

// Function to fetch specific data by ID
function fetchSpecificData(table, id, callback) {
    ajaxRequest('GET', `fetch-specific.php?table=${table}&id=${id}`, null, callback);
}

// Function to update data
function updateData(table, id, data, callback) {
    const postData = `table=${table}&id=${id}&data=${JSON.stringify(data)}`;
    ajaxRequest('POST', 'update.php', postData, callback);
}

// Function to delete data
function deleteData(table, id, callback) {
    const postData = `table=${table}&id=${id}`;
    ajaxRequest('POST', 'delete.php', postData, callback);
}

// Function to load content from another page
function loadContent(url, elementId) {
    ajaxRequest('GET', url, null, function (response) {
        document.getElementById(elementId).innerHTML = response;
    });
}

// Function to add page content into current page
function addPageContent(url, elementId) {
    ajaxRequest('GET', url, null, function (response) {
        document.getElementById(elementId).innerHTML += response;
    });
}
