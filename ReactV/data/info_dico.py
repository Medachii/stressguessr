import requests
import time
import json

def getAudio(phonetics):
    res = ''
    for obj in phonetics:
        if obj['audio'] != None:
            res = obj['audio']
    return res

with open("correct_phonemes.txt") as file:
    info = file.readlines()
    couples = [(inf.replace(' ', '').split(',')[0], inf.replace(' ', '').replace('\n', '').split(',')[1]) for inf in info]
    print(info)
    print("====================")
    print(couples)
    print("====================")

    data = {
        'mots' : []
    }

    for couple in couples:
        time.sleep(0.3)
        r = requests.get(f'https://api.dictionaryapi.dev/api/v2/entries/en/{couple[1].lower()}')
        r = json.loads(r.text)
        if 'phonetic' in r[0] and r[0]['phonetic'] != None:
            print("----------------------")
            print(f"On rentre dans le création d'objet : {couple[1]}")
            print(getAudio(r[0]['phonetics']))
            print("----------------------")
            data['mots'].append({
                'mot' : couple[1],
                'phoneme' : couple[0],
                'phonetic' : r[0]['phonetic'],
                'audio' : getAudio(r[0]['phonetics'])
            })

with open("data.json", "w") as file:
    json.dump(data, file, indent=4)

