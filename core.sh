#!/bin/bash
FILENAME=$(echo $1 | python audio-dl.py)
spleeter separate -o "public/cache/" -f {instrument}/{filename}.{codec} -c mp3 "public/cache/download/$FILENAME" > /dev/null
echo "cache/accompaniment/${FILENAME%%.*}.mp3"
