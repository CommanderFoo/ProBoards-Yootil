#!/bin/sh


# All inside the ./src dir
# These are the file we want in yootil.src.js
File[0]='yootil.js'
File[1]='key.js'
File[2]='create.js'
File[3]='user.js'
File[4]='ajax.js'
File[5]='sound.js'
File[6]='location.js'
File[7]='location.check.js'
File[8]='user.action.js'

# Clear source
echo "" > yootil.src.js

# Iterate over files and append
for f in "${File[@]}"
do
cat "./src/$f" >> yootil.src.js
echo "\n" >> yootil.src.js
done

echo "Done!"