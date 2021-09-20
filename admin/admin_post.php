<?php
$opening_json = '../content/opening.json';
$pricing_json = '../content/index.json';
$activity_json = '../content/index.json';

function setOpeningTime($data) {
    global $opening_json;
    file_put_contents($opening_json, json_encode(array('days' => $data), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
}

function setPricing($data) {
    global $pricing_json;
    $json = json_decode(file_get_contents($pricing_json), true);
    $json['pricing'] = $data;
    file_put_contents($pricing_json, json_encode($json, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
}

function setActivity($data, $folder_name) {
    global $activity_json;
    $json = json_decode(file_get_contents($activity_json), true);

    array_push($json['activities'], $folder_name);

    // change the name below for the folder you want
    $dir = "../content/activities/$folder_name";
    if (is_dir($dir) === false) {
        mkdir($dir);
        // also add to the main json file
        file_put_contents($activity_json, json_encode($json, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
    }
    $file = fopen($dir . '/' . 'activity.json', "w");
    fwrite($file, json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
    fclose($file);
}

$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (isset($data)) {
    if (isset($data['days'])) {
        setOpeningTime($data['days']);
    }
    if (isset($data['pricing'])) {
        setPricing($data['pricing']);
    }
    if (isset($data['activity'])) {
        setActivity($data['activity'], $data['title']);
    }
}
?>