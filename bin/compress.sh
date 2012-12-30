#!/bin/sh

node ../../uglifyjs/bin/uglifyjs -nc -o ../yootil.min.js ../yootil.src.js
php copyright.php