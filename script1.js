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
var $letterBox = $('#letterBox');

//This function will make a new div for each letter,display the letter, and appended to letterBox

function getLetters() {
	letters.forEach(function(letter) {
		var $eachLetter = $('<div>');
		$eachLetter.attr('class', 'letters');
		$eachLetter.text(letter);
		$eachLetter.css('cursor', 'pointer');
		$eachLetter.on('click', writeLetter);
		$letterBox.append($eachLetter);
		console.log($eachLetter[0]);
	});
}

getLetters();

//This function will change the pictures to resemble a limb added.
function addLimbs() {
	var hangman = $('#hangman');
	hangman.attr('src', './images/Hangman1');
}

//Generates a random word.
function getWord() {
	var r = Math.floor(Math.random() * words.length);
	currentWord = words[r];
}
getWord();

//This function will make placeholders with dashes based on length of word.
function getDashes() {
	var currentLength = currentWord.length;
	var splitWord = currentWord.split('');
	splitWord.forEach(function(letter) {
		var $space = $('<div>');
		$space.addClass('spaces');
		$space.css('border-bottom', '2px solid black');
		$space.text(letter);
		var $dashes = $('#letterdash');
		$dashes.append($space);
	});
}

getDashes();

function writeLetter(event) {
	var clicked = event.target.textContent;
	var $spaces = $('.spaces');
	$spaces.each(function(space) {
		if ($spaces:contains(clicked)) {
			$spaces.show();
		}
	});
	var splitWord = currentWord.split('');
}

function play() {}
