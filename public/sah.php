<?php
// Stay at home ("sah") percentage
// looks through data-nos.js file and returns the %Ficaremcasa field
header("Access-Control-Allow-Origin: *");

if (!(isset($_GET["concelho_name"]) || isset($_GET["date"]))) {
    http_response_code(400);
    exit();
}

$filterFn = isset($_GET["concelho_name"]) ? "filterByConcelho" : "filterDate";
$mapFn = isset($_GET["concelho_name"]) ? "mapForConcelho" : "mapDate";

function filterDate($item) {
    return $item["Data"] === $_GET["date"];
}

function mapDate($item) {
    $newArray = array();
    $newArray["sah"] = $item["%FicaEmCasa"];
    $newArray["concelho"] = $item["Nome Concelho"];
    return $newArray;
}

function filterByConcelho($item) {
    return $item["Nome Concelho"] === $_GET["concelho_name"];
}

function mapForConcelho($item) {
    $newArray = array();
    $newArray["sah"] = $item["%FicaEmCasa"];
    $newArray["date"] = $item["Data"];
    return $newArray;
}

$strJsonFileContents = file_get_contents("data/nos.js");
$strJsonFileContents = stripslashes($strJsonFileContents);
$strJsonFileContents = preg_replace("/u([0-9a-fA-F]{4})/", "&#x\\1;", $strJsonFileContents);
$strJsonFileContents = mb_convert_encoding($strJsonFileContents, 'UTF-8', 'HTML-ENTITIES');

$array = json_decode($strJsonFileContents, true);
$array = $array["#FicaEmCasa NOS 2020"];

$filtered = array_filter($array, $filterFn);
$filtered = array_values($filtered);

$accum = array();
$map = array_map($mapFn, $filtered);

echo json_encode($map);