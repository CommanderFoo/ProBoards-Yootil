<?php

$yootil = @file_get_contents("../yootil.min.js");

if(!preg_match("/ \- Ver\:/", $yootil)){
    $copyright = file_get_contents("txt/copyright_min.txt");
    $handle = fopen("../yootil.min.js", "wb");
        
    fwrite($handle, $copyright . "\n" . $yootil);
    fclose($handle);
}