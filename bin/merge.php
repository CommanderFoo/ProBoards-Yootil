<?php

$files = array(
    "yootil",
    "key",
    "create",
    "user",
    "ajax",
    "sound",
    "storage",
    "storage.persistent",
    "storage.session",
    "location",
    "location.check",
    "user.action",
    "form",
    "page",
    "page.category",
    "page.board",
    "page.thread"
);

$combined = file_get_contents("txt/copyright.txt");

foreach($files as $file){
    $combined .= "\n\n" . file_get_contents("../src/" . $file . ".js");
}

$handle = fopen("../yootil.src.js", "w");

fwrite($handle, $combined);