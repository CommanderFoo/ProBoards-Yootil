<?php

include_once("file_list.inc.php");

$combined = file_get_contents("txt/copyright.txt");

foreach($files as $file){
    $combined .= "\n\n" . file_get_contents("../src/" . $file . ".js");
}

$handle = fopen("../yootil.src.js", "w");

fwrite($handle, $combined);