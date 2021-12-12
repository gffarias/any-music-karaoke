import re
import datetime
def splitTimeStamps(timeStamps):
    for k in range (3):
        for i in timeStamps:
            if ("BREATH" in i):
                timeStamps.remove(i)
    if (timeStamps[len (timeStamps)-1] == ''):
        timeStamps.pop()
    return timeStamps

def splitVerses(verses):
    foo = []
    for i in verses:
        stripped = re.sub("[\[@*&?].*[\]@*&?]", "", i)
        foo.append(stripped)
    verses = foo
    return verses

def compareString(verseWord, timeWord):
    if (timeWord.lower() in verseWord.lower()):
        return 1
    else:
        return 0
    
textTime = open("lyricsTime.txt", "r")
textVerse = open("lyricsVerse.txt", "r")
textTimeString = textTime.read()
textVerseString = textVerse.read()

timeStamps = textTimeString.split("\n")
verses = textVerseString.split("\n\n")

timeStamps = splitTimeStamps(timeStamps)
verses = splitVerses(verses)

counter = 0
parsedVerses = []
for i in verses:
    verseWord = i.split(" ")
    newVerseWord = []
    for j in range (len(verseWord)):
        
        timeStampWord = timeStamps[counter+j].split(" ")
        while (compareString(verseWord[j], timeStampWord[2]) == 0):
                counter = counter + 1
                timeStampWord = timeStamps[counter+j].split(" ")
        time1 = str(datetime.timedelta(seconds=float(timeStampWord[0])))
        time2 = str(datetime.timedelta(seconds=float(timeStampWord[1])))
        newVerseWord.append("[" + time1 + "]" + " " + verseWord[j] + " "+ "["+time2+"]")        
        #print(verseWord[j])
        #print(timeStampWord)
    parsedVerses.append(newVerseWord)
    
out = ""
for i in parsedVerses:
    for j in i:
        out+= j + " "
f= open("parsedLyrics.txt","w+")
f.write(out)
