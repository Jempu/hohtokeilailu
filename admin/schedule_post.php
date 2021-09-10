<?php
$json = file_get_contents('php://input');
$data = json_decode($json, true);

function setOpeningTimes($data) {
    $jsonFile = "../content/opening.json";
    file_put_contents($jsonFile, json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
    
    header('Cache-Control: no-store, no-cache, must-revalidate');
    header('Cache-Control: post-check=0, pre-check=0', false);
    header('Pragma: no-cache');
}
if (isset($_POST['gallery_remove_media'])) setOpeningTimes($_POST['opening_times']);
?>