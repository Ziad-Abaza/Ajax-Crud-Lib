<?php
$page = isset($_GET['page']) ? $_GET['page'] : '';

// Example: Assuming your pages are in a 'Dashboard' folder
$pagePath = "./{$page}";

if (file_exists($pagePath)) {
    include $pagePath;
} else {
    echo "Page not found";
}
?>
