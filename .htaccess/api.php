<?php
header('Content-Type: application/json');

// Block CLI / bot
$ua = $_SERVER['HTTP_USER_AGENT'] ?? '';
if (stripos($ua, 'curl') !== false) {
    http_response_code(403);
    exit(json_encode(["error" => "blocked"]));
}

// Data asli (contoh)
$data = [
    "title" => "Selamat Datang",
    "content" => "Ini konten rahasia backend",
    "status" => "secure"
];

echo json_encode($data);
