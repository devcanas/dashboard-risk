<?php
// Stay at home ("sah") percentage
// looks through data-nos.js file and returns the %Ficaremcasa field
header("Access-Control-Allow-Origin: *");

function filter($item) {
    return $item["Data"] === $_GET["date"];
}

function map($item) {
    $newArray = array();
    $newArray["sah"] = $item["%FicaEmCasa"];
    $newArray["concelho"] = $item["Nome Concelho"];
    return $newArray;
}

$strJsonFileContents = file_get_contents("data/nos.js");
$strJsonFileContents = stripslashes($strJsonFileContents);
$strJsonFileContents = preg_replace("/u([0-9a-fA-F]{4})/", "&#x\\1;", $strJsonFileContents);
$strJsonFileContents = mb_convert_encoding($strJsonFileContents, 'UTF-8', 'HTML-ENTITIES');

$array = json_decode($strJsonFileContents, true);
$array = $array["#FicaEmCasa NOS 2020"];

$filtered = array_filter($array, "filter");
$filtered = array_values($filtered);

$accum = array();
$map = array_map("map", $filtered);

echo json_encode($map);