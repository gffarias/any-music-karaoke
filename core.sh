#!/bin/bash
FILENAME=$(echo $1 | python audio-dl.py)
spleeter separate -o "cache/" -f {instrument}/{filename}.{codec} -c mp3 "cache/download/$FILENAME"
