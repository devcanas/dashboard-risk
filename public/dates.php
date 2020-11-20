<?php
// Returns metadata for the data we have currently available
header("Access-Control-Allow-Origin: *");

$jsonDir = "data/";
$dates = array();

$filePattern = "/[0-9]+_[0-9]+_[0-9]+/";
$dh = opendir($jsonDir);

function cmp($a, $b) {
    return $a > $b;
}

if (is_dir($jsonDir)) 
    if ($dh) 
        while (($fileName = readdir($dh)) !== false)
            if (preg_match($filePattern, $fileName)) {
                $tokens = explode("_", $fileName);
                $dateStr = implode('-', array_slice($tokens, 0, 3));
                $dates[] = $dateStr;
            }
        
closedir($dh);
usort($dates, "cmp");
echo json_encode($dates);
