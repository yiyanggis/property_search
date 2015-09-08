<?php

$fields = array(
    'name' => 'mike',
    'pass' => 'se_ret'
);
$files = array(
    array(
        'name' => 'uimg',
        'type' => 'image/jpeg',
        'file' => './profile.jpg',
    )
);

$response = http_post_fields("https://www.airbnb.com/", $fields, $files);

print_r($response);

?>