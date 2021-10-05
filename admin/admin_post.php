<?php
$opening_json = '../content/opening.json';
$main_json = '../content/index.json';

function reloadPage()
{
    sleep(1);
    header("Location: ./index.php");
    exit;
}

function setOpeningTime($data)
{
    global $opening_json;
    file_put_contents($opening_json, json_encode(array('days' => $data), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
    reloadPage();
}

function setTitles($data)
{
    global $main_json;
    $json = json_decode(file_get_contents($main_json), true);
    $json['titlecard_title'] = $data['title'];
    $json['titlecard_subtitle'] = $data['subtitle'];
    file_put_contents($main_json, json_encode($json, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
    reloadPage();
}

function setPricing($data)
{
    global $main_json;
    $json = json_decode(file_get_contents($main_json), true);
    $json['pricing'] = $data;
    file_put_contents($main_json, json_encode($json, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
    reloadPage();
}

function addFileToFolder($file, $path)
{
    // only allow a file with these extensions pass
    $valid_extensions = array('jpeg', 'jpg', 'png', 'gif');
    if (isset($file)) {
        $tmp = $file['tmp_name'];
        $img = $file['name'];
        // get uploaded file's extension
        if (in_array(strtolower(pathinfo($img, PATHINFO_EXTENSION)), $valid_extensions)) {
            // randomize the name in case of files with the same name
            move_uploaded_file($tmp, $path . "/" . strtolower(rand(2, 100) . $img));
        }
    }
}

function addActivity($activityData, $folder_name)
{
    global $main_json;
    $json = json_decode(file_get_contents($main_json), true);
    array_push($json['activities'], $folder_name);
    // change the name below for the folder you want
    $dir = "../content/activities/$folder_name";
    if (is_dir($dir) === false) {
        mkdir($dir);
    }
    // add the activity.json file
    file_put_contents($main_json, json_encode($json, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
    // // add titlecard image and other attachments files to the folder
    // if (isset($attachments)) {
    //     addFileToFolder($attachments, $dir);
    // }
    // create the activity.json file for storing all the data for the activity
    $file = fopen($dir . '/' . 'activity.json', "w");
    fwrite($file, json_encode($activityData, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
    fclose($file);
    reloadPage();
}

function removeActivity($folder_name)
{
    global $main_json;
    // remove from index.json
    $json = json_decode(file_get_contents($main_json), true);
    if (($key = array_search($folder_name, $json['activities'])) !== false) {
        unset($json['activities'][$key]);
    }
    file_put_contents($main_json, json_encode($json, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
    // remove everything from the folder
    $dir = "../content/activities/$folder_name";
    $it = new RecursiveDirectoryIterator($dir, RecursiveDirectoryIterator::SKIP_DOTS);
    $files = new RecursiveIteratorIterator($it, RecursiveIteratorIterator::CHILD_FIRST);
    foreach ($files as $file) {
        if ($file->isDir()) {
            rmdir($file->getRealPath());
        } else {
            unlink($file->getRealPath());
        }
    }
    rmdir($dir);
    reloadPage();
}

$json = file_get_contents('php://input');
$data = json_decode($json, true);

// json file editing
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
        addActivity($data['add_activity'], $data['title']);
    }
    if (isset($data['remove_activity'])) {
        removeActivity($data['remove_activity']);
    }
}

// file uploading
if ($_FILES['ac_file']['error'] == 0) {
    $dir = "../content/activities/".$_POST['ac_folder'];
    if (is_dir($dir) === false) {
        mkdir($dir);
    }
    addFileToFolder($_FILES['ac_file'], $dir);
}