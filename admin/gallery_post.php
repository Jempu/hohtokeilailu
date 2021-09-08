<?php
function postGallery() {
    $directory = "../content/gallery/";
    $jsonFile = "../content/index.json";
    $file_size_limit = 20;
    $message = "";
    $gallery_images = $_FILES['gallery-images'];
    for ($i = 0; $i < sizeof($gallery_images['name']); $i++)
    {
        $valid_file = true;
        // if there is an error...
        if ($gallery_images['error'][$i])
        {
            $message += 'Ooops!  Your upload triggered the following error:  ' . $gallery_images['error'][$i];
            continue;
        }
        $name = $gallery_images['name'][$i];
        // now is the time to modify the future file name and validate the file
        // can't be larger than 20 MB
        if ($gallery_images['size'][$i] > $file_size_limit * 1000000)
        {
            $valid_file = false;
            $message += "Oops!  $name\'s size is too large.";
        }
        // rename file
        $new_file_name = strtolower($gallery_images['name'][$i]);
        if ($valid_file)
        {
            move_uploaded_file($gallery_images['tmp_name'][$i], $directory.$name);
            $message .= "$new_file_name was uploaded successfully.";
            // save the new media to .json so that the system knows how much media there exists
            $data = json_decode(file_get_contents($jsonFile), true);
            // the .json file needs an array called 'gallery' to save the new string to
            array_push($data['gallery'], $name);
            file_put_contents($jsonFile, json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
        }
    }
    echo $message;
    sleep(1);
    header("Location: ./index.php");
    exit;
}
if (!empty($_FILES['gallery-images'])) postGallery();
?>