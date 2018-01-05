var alphabet = 'abcdefghijklmnopqrstuvwxyz';
var letters = alphabet.split('');
var wrongLetter = 0;

//wordbank
var words = [
	'snag',
	'mime',
	'jungle',
	'peasant',
	'password',
	'newsletter',
	'bookend',
];
//container for letters
var letterBox = document.getElementById('letterBox'); //holds letters

//This function will make a new div for each letter,display the letter and appended to letterBox
function getLetters() {
	for (var i = 0; i < letters.length; i++) {
		var eachLetter = document.createElement('div');
		eachLetter.addEventListener('click', writeLetter);
		eachLetter.setAttribute('class', 'letters');
		eachLetter.textContent = letters[i];
		letterBox.appendChild(eachLetter);
	}
}

getLetters();

//This function will change the pictures to resemble a limb added.
function addLimbs() {
	var hangman = $('hangman');
	hangman.attr('src', './images/Hangman1');
}
//Generates a random word.
function getWord() {
	var r = Math.floor(Math.random() * words.length);
	currentWord = words[r];
}
getWord();

//This function will make spaces based on length of word.
function getDashes() {
	currentLength = currentWord.length;
	splitWord = currentWord.split('');
	for (i = 0; i < splitWord.length; i++) {
		var space = document.createElement('div');
		space.setAttribute('class', 'spaces');
		space.style.borderBottom = '2px solid black';
		// space.textContent = splitWord[i];

		var dashes = document.getElementById('letterdash');
		dashes.appendChild(space);
	}
}
getDashes();

function writeLetter(event) {
	var clicked = event.target.textContent;
	var spaces = document.querySelectorAll('.spaces');
	spaces.forEach();
}

function play() {}
