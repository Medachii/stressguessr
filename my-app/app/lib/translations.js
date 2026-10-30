import React from "react";
import Link from "next/link";

// Every text of the site, in English and French.
// Plain texts are strings; texts with links, bold words or values are small functions.

const en = {
  // Navigation
  "nav.home": "Home",
  "nav.game": "Game",
  "nav.search": "Search",
  "nav.sentence": "Sentence",
  "nav.dictionary": "Dictionary",
  "nav.language": "Language",

  // Home
  "home.title": () => <>Master the <span className="gradient-text">stress</span> of English words</>,
  "home.lead": "stressguessr is a game that is made to teach you how to pronounce the words of the English language! Guess which syllable carries the stress, and train your ear along the way.",
  "home.play": "Play now →",
  "home.dictionary": "Phoneme dictionary",
  "home.oxford.title": "Oxford 3000",
  "home.oxford.text": () => <>We use words from the <Link href="https://www.oxfordlearnersdictionaries.com/wordlist/american_english/oxford3000/" target="_blank">Oxford 3000</Link> dictionary, which contains 3000 of the most used words in the English language.</>,
  "home.audio.title": "Real pronunciations",
  "home.audio.text": () => <>We use the <Link href="https://freedictionaryapi.com/" target="_blank">Free Dictionary API</Link> for phonetics and definitions, and <Link href="https://commons.wikimedia.org/" target="_blank">Wikimedia Commons</Link> recordings to hear our words.</>,
  "home.algo.title": "Our own algorithm",
  "home.algo.text": () => <>The <Link href="/game">game</Link> is powered by our own phonetics-to-written-language translation algorithm, and the <Link href="/dictionary">dictionary</Link> explains how to read phonetic writing.</>,
  "home.credits": () => <>Created by <Link href="https://github.com/Medachii" target="_blank">Noé-Laurent Laurent</Link> and <Link href="https://github.com/numieow" target="_blank">Maxime Wirth</Link></>,

  // Game
  "game.round": "Round",
  "game.points": "Points",
  "game.hint": "Click on the letter that carries the stress",
  "game.noStressButton": "No stress",
  "game.next": "Next word →",
  "game.newGame": "New game",
  "game.noStress": "There is no stress in this word.",
  "game.over": "Game over! You got",
  "game.outOf": "points out of 100",
  "game.playAgain": "Play again",

  // Shared
  "listen": "Listen",
  "listenTo": (word) => "Listen to " + word,
  "close": "Close",
  "def.loading": "Translating…",
  "def.wiktionary": "Source: Wiktionnaire",
  "def.machine": "Machine translation",

  // Search
  "search.title": () => <>Word <span className="gradient-text">lookup</span></>,
  "search.intro": "Type an English word to see where its stress falls, what it means and how it sounds.",
  "search.placeholder": "e.g. photography",
  "search.inputLabel": "Word to look up",
  "search.button": "Search",
  "search.back": "← Back to your sentence",
  "search.loading": (word) => <>Looking up &ldquo;{word}&rdquo;…</>,
  "search.notFound": (word) => <>We couldn&apos;t find &ldquo;{word}&rdquo; in the dictionary.</>,
  "search.notFoundHint": () => <>Check the spelling, or try the base form of the word (e.g. &ldquo;run&rdquo; instead of &ldquo;ran&rdquo;).</>,
  "search.error": "The dictionary service is not responding right now. Please try again in a moment.",
  "search.ambiguous": "This word is stressed differently depending on its meaning.",
  "search.as": (label) => (/^[aeiou]/i.test(label) ? "As an " : "As a ") + label,
  "search.stressed": (letter) => <>The stress falls on the syllable starting with <strong>{letter}</strong>.</>,
  "search.none": "No stress mark: this word has a single syllable.",
  "search.unknown": () => <>We could not match the stress to the spelling. In the phonetic writing, the stressed syllable comes right after the <strong>ˈ</strong> mark.</>,

  // Sentence
  "sentence.title": () => <>Sentence <span className="gradient-text">stress</span></>,
  "sentence.intro": "Type or paste a sentence: the stressed letter of each word is highlighted as you type. Click a word to see it in detail.",
  "sentence.yourText": "Your text",
  "sentence.placeholder": "Type an English sentence…",
  "sentence.words": (count, max) => count + " / " + max + " words",
  "sentence.clear": "Clear",
  "sentence.stress": "Stress",
  "sentence.tooLong": (max) => "Only the first " + max + " words are analyzed.",
  "sentence.hint": "Click a word underlined with dots to choose its meaning.",
  "sentence.legend.stressed": "stressed letter",
  "sentence.legend.ambiguous": "stress depends on the meaning",
  "sentence.legend.chosen": "meaning chosen",
  "sentence.legend.unknown": "not found",
  "sentence.notice": () => <>
    StressGuessr can make mistakes. Some words are written the same way but stressed differently depending on their meaning,
    like <strong>present</strong> (a <em>PRE</em>sent / to pre<em>SENT</em>) or <strong>record</strong>: they are marked with a dotted
    line and you can pick the right meaning, as we cannot guess which one your sentence uses. Names, rare words and some
    conjugated forms may also be missing from the dictionary.
  </>,
  "sentence.which": (word) => <>Which meaning of <strong>{word}</strong>?</>,
  "sentence.details": "See definitions and audio →",
  "sentence.otherMeaning": "Other meaning",
  "sentence.looking": "Looking up…",
  "sentence.notFound": "Not found in the dictionary",
  "sentence.unavailable": "Dictionary unavailable",

  // Phoneme dictionary
  "dictionary.title": () => <>Phoneme <span className="gradient-text">dictionary</span></>,
  "dictionary.general": "General",
  "dictionary.general1": "Phonemes are the basic blocks for the phonetic writing of a word. Here is a list of the most important ones, with a word that is pronounced using them, and the pronunciation of that word. You can hear the word by pressing the button on the right.",
  "dictionary.general2": () => <>Phonemes have different transcriptions in &quot;normal writing&quot;. Those different ways of writing them are called graphemes.</>,
  "dictionary.inaudible": "Inaudible phonemes",
  "dictionary.inaudibleIntro": () => <>Some phonemes don&apos;t actually make sounds, but modify the sound that comes after them. Here are the most important:</>,
  "dictionary.stressMark": "signifies the presence of a stress in the word, on the letter that follows it.",
  "dictionary.longMark": "makes the sound that comes before longer.",
  "dictionary.noun": "(noun)",
  "dictionary.verb": "(verb)",
  "dictionary.phonemes": "Phonemes",
  "dictionary.loading": "Loading dictionary...",
  "dictionary.phoneme": "Phoneme",
  "dictionary.word": "Word",
  "dictionary.transcription": "Transcription",
  "dictionary.listen": "Listen",
};

const fr = {
  // Navigation
  "nav.home": "Accueil",
  "nav.game": "Jeu",
  "nav.search": "Recherche",
  "nav.sentence": "Phrase",
  "nav.dictionary": "Dictionnaire",
  "nav.language": "Langue",

  // Home
  "home.title": () => <>Maîtrisez l&apos;<span className="gradient-text">accent tonique</span> des mots anglais</>,
  "home.lead": "stressguessr est un jeu conçu pour vous apprendre à prononcer les mots de la langue anglaise ! Devinez quelle syllabe porte l'accent tonique, et entraînez votre oreille au passage.",
  "home.play": "Jouer →",
  "home.dictionary": "Dictionnaire des phonèmes",
  "home.oxford.title": "Oxford 3000",
  "home.oxford.text": () => <>Nous utilisons les mots de l&apos;<Link href="https://www.oxfordlearnersdictionaries.com/wordlist/american_english/oxford3000/" target="_blank">Oxford 3000</Link>, qui regroupe les 3000 mots les plus utilisés de la langue anglaise.</>,
  "home.audio.title": "De vraies prononciations",
  "home.audio.text": () => <>Nous utilisons la <Link href="https://freedictionaryapi.com/" target="_blank">Free Dictionary API</Link> pour la phonétique et les définitions, le <Link href="https://fr.wiktionary.org/" target="_blank">Wiktionnaire</Link> pour les traductions, et les enregistrements de <Link href="https://commons.wikimedia.org/" target="_blank">Wikimedia Commons</Link> pour écouter nos mots.</>,
  "home.algo.title": "Notre propre algorithme",
  "home.algo.text": () => <>Le <Link href="/game">jeu</Link> repose sur notre propre algorithme qui relie l&apos;écriture phonétique à l&apos;orthographe, et le <Link href="/dictionary">dictionnaire</Link> explique comment lire l&apos;écriture phonétique.</>,
  "home.credits": () => <>Créé par <Link href="https://github.com/Medachii" target="_blank">Noé-Laurent Laurent</Link> et <Link href="https://github.com/numieow" target="_blank">Maxime Wirth</Link></>,

  // Game
  "game.round": "Manche",
  "game.points": "Points",
  "game.hint": "Cliquez sur la lettre qui porte l'accent tonique",
  "game.noStressButton": "Pas d'accent",
  "game.next": "Mot suivant →",
  "game.newGame": "Nouvelle partie",
  "game.noStress": "Ce mot n'a pas d'accent tonique.",
  "game.over": "Partie terminée ! Vous avez obtenu",
  "game.outOf": "points sur 100",
  "game.playAgain": "Rejouer",

  // Shared
  "listen": "Écouter",
  "listenTo": (word) => "Écouter " + word,
  "close": "Fermer",
  "def.loading": "Traduction…",
  "def.wiktionary": "Source : Wiktionnaire",
  "def.machine": "Traduction automatique",

  // Search
  "search.title": () => <>Recherche de <span className="gradient-text">mot</span></>,
  "search.intro": "Tapez un mot anglais pour voir où tombe son accent tonique, ce qu'il signifie et comment il se prononce.",
  "search.placeholder": "ex. : photography",
  "search.inputLabel": "Mot à rechercher",
  "search.button": "Rechercher",
  "search.back": "← Revenir à votre phrase",
  "search.loading": (word) => <>Recherche de « {word} »…</>,
  "search.notFound": (word) => <>Nous n&apos;avons pas trouvé « {word} » dans le dictionnaire.</>,
  "search.notFoundHint": () => <>Vérifiez l&apos;orthographe, ou essayez la forme de base du mot (par exemple « run » au lieu de « ran »).</>,
  "search.error": "Le dictionnaire ne répond pas pour le moment. Réessayez dans un instant.",
  "search.ambiguous": "L'accent tonique de ce mot change selon son sens.",
  "search.as": (label) => (/^[aeiouyéèh]/i.test(label) ? "En tant qu'" : "En tant que ") + label,
  "search.stressed": (letter) => <>L&apos;accent tonique tombe sur la syllabe qui commence par <strong>{letter}</strong>.</>,
  "search.none": "Pas de marque d'accent : ce mot n'a qu'une syllabe.",
  "search.unknown": () => <>Nous n&apos;avons pas réussi à relier l&apos;accent à l&apos;orthographe. Dans l&apos;écriture phonétique, la syllabe accentuée suit la marque <strong>ˈ</strong>.</>,

  // Sentence
  "sentence.title": () => <>Accent dans la <span className="gradient-text">phrase</span></>,
  "sentence.intro": "Tapez ou collez une phrase en anglais : la lettre accentuée de chaque mot est mise en évidence pendant que vous écrivez. Cliquez sur un mot pour le voir en détail.",
  "sentence.yourText": "Votre texte",
  "sentence.placeholder": "Tapez une phrase en anglais…",
  "sentence.words": (count, max) => count + " / " + max + " mots",
  "sentence.clear": "Effacer",
  "sentence.stress": "Accent tonique",
  "sentence.tooLong": (max) => "Seuls les " + max + " premiers mots sont analysés.",
  "sentence.hint": "Cliquez sur un mot souligné en pointillés pour choisir son sens.",
  "sentence.legend.stressed": "lettre accentuée",
  "sentence.legend.ambiguous": "l'accent dépend du sens",
  "sentence.legend.chosen": "sens choisi",
  "sentence.legend.unknown": "introuvable",
  "sentence.notice": () => <>
    StressGuessr peut se tromper. Certains mots s&apos;écrivent de la même façon mais ne sont pas accentués pareil selon leur sens,
    comme <strong>present</strong> (un <em>PRE</em>sent, un cadeau / to pre<em>SENT</em>, présenter) ou <strong>record</strong> : ils sont
    soulignés en pointillés et vous pouvez choisir le bon sens, car nous ne pouvons pas deviner celui de votre phrase. Les noms propres,
    les mots rares et certaines formes conjuguées peuvent aussi manquer dans le dictionnaire.
  </>,
  "sentence.which": (word) => <>Quel sens pour <strong>{word}</strong> ?</>,
  "sentence.details": "Voir les définitions et l'audio →",
  "sentence.otherMeaning": "Autre sens",
  "sentence.looking": "Recherche…",
  "sentence.notFound": "Introuvable dans le dictionnaire",
  "sentence.unavailable": "Dictionnaire indisponible",

  // Phoneme dictionary
  "dictionary.title": () => <>Dictionnaire des <span className="gradient-text">phonèmes</span></>,
  "dictionary.general": "Généralités",
  "dictionary.general1": "Les phonèmes sont les briques de base de l'écriture phonétique d'un mot. Voici une liste des plus importants, avec un mot qui les contient et la prononciation de ce mot. Vous pouvez écouter le mot avec le bouton de droite.",
  "dictionary.general2": "Un même phonème peut s'écrire de plusieurs façons en « écriture normale ». Ces différentes façons de l'écrire s'appellent des graphèmes.",
  "dictionary.inaudible": "Phonèmes muets",
  "dictionary.inaudibleIntro": "Certains phonèmes ne produisent pas de son, mais modifient le son qui les suit. Voici les plus importants :",
  "dictionary.stressMark": "indique la présence d'un accent tonique dans le mot, sur la lettre qui le suit.",
  "dictionary.longMark": "allonge le son qui le précède.",
  "dictionary.noun": "(nom)",
  "dictionary.verb": "(verbe)",
  "dictionary.phonemes": "Phonèmes",
  "dictionary.loading": "Chargement du dictionnaire...",
  "dictionary.phoneme": "Phonème",
  "dictionary.word": "Mot",
  "dictionary.transcription": "Transcription",
  "dictionary.listen": "Écouter",
};

// Parts of speech given by the dictionary API
export const partsOfSpeech = {
  fr: {
    noun: "nom",
    verb: "verbe",
    adjective: "adjectif",
    adverb: "adverbe",
    pronoun: "pronom",
    preposition: "préposition",
    conjunction: "conjonction",
    interjection: "interjection",
    article: "article",
    determiner: "déterminant",
    numeral: "numéral",
    particle: "particule",
    character: "caractère",
    contraction: "contraction",
    prefix: "préfixe",
    suffix: "suffixe",
    phrase: "locution",
    "proper noun": "nom propre",
  },
};

const translations = { en, fr };
export default translations;
