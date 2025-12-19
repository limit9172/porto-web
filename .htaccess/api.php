<?php
header('Content-Type: application/json');

$ua = $_SERVER['HTTP_USER_AGENT'] ?? '';

if (stripos($ua, 'curl') !== false) {
    http_response_code(403);
    exit(json_encode(["error" => "blocked"]));
}

$data = [
    "title" => "Welcome",
    "content" => "Ini konten asli dari backend",
    "status" => "secure"
];

echo json_encode($data);
