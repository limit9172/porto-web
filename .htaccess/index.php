<?php
$ua = $_SERVER['HTTP_USER_AGENT'] ?? '';

if (
    stripos($ua, 'curl') !== false ||
    empty($_SERVER['HTTP_ACCEPT_LANGUAGE']) ||
    empty($_SERVER['HTTP_ACCEPT_ENCODING'])
) {
    http_response_code(403);
    exit('Forbidden');
}
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Secure Web</title>
</head>
<body>
    <div id="app">Loading...</div>

    <noscript>Access denied</noscript>

    <script src="assets/app.js"></script>
</body>
</html>
