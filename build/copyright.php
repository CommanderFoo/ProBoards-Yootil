<?php

$yootil = @file_get_contents("../yootil.min.js");

$copyright = file_get_contents("txt/copyright_min.txt");
$handle = fopen("../yootil.min.js", "wb");
$combined = $copyright . "\n" . $yootil;

$readme = file_get_contents("../README.md");
$version = "??";

if(preg_match("/Yootil Library ([\d\.]+)/", $readme, $matches)){
	if(isset($matches[1])){
		$version = $matches[1];
	}
}

$combined = str_replace("{VER}", $version, $combined);

fwrite($handle, $combined);
fclose($handle);

?>