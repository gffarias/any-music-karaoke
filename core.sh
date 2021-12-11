#!/bin/bash
FILENAME=$(echo $1 | python audio-dl.py)
spleeter separate -o "public/assets/" -f {instrument}/{filename}.{codec} -c mp3 "public/assets/download/$FILENAME" > /dev/null
echo "assets/accompaniment/${FILENAME%%.*}.mp3"
