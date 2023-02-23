import requests
import time
import json
import random

with open("data.txt") as file:
    word_list = file.readlines()
    nb_mots = len(word_list)
    mots_exemples = {'æ': 'matter', 'ɪ': 'knife', 'ə': 'opponent', 'b': 'billion', 'n': 'opponent', 'd': 'jacket', 'l': 'nuclear', 't': 'later', 'i': 'extremely', 'e': 'five', '̩': 'able', 'ɛ': 'else', 'ʊ': 'discuss', 'ʌ': 'encourage', 'v': 'above', 'ɹ': 'instruction', 'ɔ': 'abroad', 'ː': 'harmful', 's': 'less', 'ˌ': 'absolute', 'j': 'opinion', 'u': 'absolute', 'k': 'expectation', 'm': 'music', 'p': 'opportunity', 'ɒ': 'accommodation', 'ʃ': 'initiative', 'a': 'highlight', 'z': 'accuse', 'ʒ': 'acknowledge', 'w': 'acquire', 'ɑ': 'guitar', '͡': 'adventure', 'ɚɚ': 'adventure', 'ɜ': 'advertisement', 'ŋ': 'hungry', 'f': 'fund', 'ɾ': 'afternoon', 'ʉ': 'due', 'ɡ': 'govern', 'h': 'himself', 'ð': 'although', 'θ': 'anything', '[': 'app', 'ʔ': 'app', '̚': 'app', ']': 'app', '̯': 'area', 'ɐ': 'bath', 'o': 'borrow', 'ɫ': 'bowl', 'ɘ': 'brother', 'ʰ': 'camp', 'ɝ': 'certain', 'ɨ': 'distribute', 'ʍ': 'elsewhere', 'r': 'first', 'ʷ' : 'football', 'ɵ': 'girl', '̠': 'grass', 'ä': 'grass', 'ŏ': 'how', '̈': 'orange'}

    for word in word_list:
        word = word.strip()
        time.sleep(0.3)
        r = requests.get(f'https://api.dictionaryapi.dev/api/v2/entries/en/{word.lower()}')
        r =json.loads(r.text)
        if 'phonetic' in r[0] and r[0]['phonetic'] != None:
            phonetic = r[0]['phonetic'].replace('.', '').replace('/', '').replace('ˈ', '').replace('-', '').replace(':', '').replace('(','').replace(')', '')
            #appending to out only if it doesn't exist
            for char in phonetic:
                if char not in mots_exemples.keys():
                    mots_exemples[char] = word
                    print(f"Good pour le mot {word}: {char} => {len(mots_exemples)}")
                    print(mots_exemples)
                else:
                    chance = random.random()
                    if chance < 0.01:
                        print(f"Ne possède pas de phonetic mais on garde quand même le mot {word} (chance = {chance})")
                        mots_exemples[char] = word
                    else:
                        print(f"Phoneme existe déjà dans la liste => {len(mots_exemples)}. Mot : {word}")
        else:
            
            print("Ne possède pas de phonetic (devrait jamais arriver)")

    out = open("phonemes.txt", "w")
    for key in mots_exemples.keys():
        out.write(f"{key}, {mots_exemples[key]}\n")
    out.close()