# read each line of the file dictionnary.csv in the data folder 

# import the csv module
import csv
import requests
import time
import json

isAt='Abbot'        #TODO : change the value of isAt to the word you want to start from
flag = 0
# open the file dictionnary.csv in the data folder
with open('dictionary.csv', 'r') as f:
    # create a reader object
    reader = csv.reader(f)
    f=open("data.txt","a")
    for line in reader:
        print(line[0])
        if line[0] == isAt:
            flag = 1
        if flag==0:
            continue 

        #get the json file from https://api.dictionaryapi.dev/api/v2/entries/en/{word} 
        r = requests.get(f'https://api.dictionaryapi.dev/api/v2/entries/en/{line[0].lower()}')
        
        r =json.loads(r.text)
        #if line[0] contains special characters or numbers, continue
        
        
        if not line[0].isalpha():
            continue
        else:
            #if the word is not found in the dictionary, continue
            if not 'title' in r and r[0]['word'] == line[0].lower():
                #if the audio exists 
                if r[0]['phonetics'] != [] and r[0]['phonetics'][0]['audio'] != '':
                    #write the word, the phonetic and the audio in the file data.txt
                    print("YOUPI")
                    f.write(f"{line[0]}\n")
                

                
               
            else:
                continue




