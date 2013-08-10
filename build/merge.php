<?php

include_once("file_list.inc.php");

$combined = file_get_contents("txt/copyright.txt");

foreach($files as $file){
    $combined .= "\n\n" . file_get_contents("../src/" . $file . ".js");
}

$readme = file_get_contents("../README.md");
$version = "??";

if(preg_match("/Yootil Library ([\d\.]+)/", $readme, $matches)){
	if(isset($matches[1])){
		$version = $matches[1];
	}
}

$combined = str_replace("{VER}", $version, $combined);

$handle = fopen("../yootil.dev.js", "w");

fwrite($handle, $combined);

?>