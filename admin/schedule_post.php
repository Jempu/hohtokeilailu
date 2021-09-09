<?php
$json = file_get_contents('php://input');
$data = json_decode($json, true);
if (isset($data)) {
    $jsonFile = "../content/opening.json";
    file_put_contents($jsonFile, json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
}
?>