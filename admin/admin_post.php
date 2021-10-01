<?php
$opening_json = '../content/opening.json';
$main_json = '../content/index.json';

function setOpeningTime($data) {
    global $opening_json;
    file_put_contents($opening_json, json_encode(array('days' => $data), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
}

function setTitles($data) {
    global $main_json;
    $json = json_decode(file_get_contents($main_json), true);
    $json['titlecard_title'] = $data['title'];
    $json['titlecard_subtitle'] = $data['subtitle'];
    file_put_contents($main_json, json_encode($json, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
}

function setPricing($data) {
    global $main_json;
    $json = json_decode(file_get_contents($main_json), true);
    $json['pricing'] = $data;
    file_put_contents($main_json, json_encode($json, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
}

function addActivity($data, $folder_name) {
    global $main_json;
    $json = json_decode(file_get_contents($main_json), true);

    array_push($json['activities'], $folder_name);

    // change the name below for the folder you want
    $dir = "../content/activities/$folder_name";
    if (is_dir($dir) === false) {
        mkdir($dir);
        // also add to the main json file
        file_put_contents($main_json, json_encode($json, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
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
    if (isset($data['titles'])) {
        setTitles($data['titles']);
    }
    if (isset($data['pricing'])) {
        setPricing($data['pricing']);
    }
    if (isset($data['add_activity'])) {
        addActivity($data['activity'], $data['title']);
    }
}
?>