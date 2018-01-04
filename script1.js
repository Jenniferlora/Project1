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
		// $eachLetter.on('click', addLimbs);
		$letterBox.append($eachLetter);
		console.log($eachLetter[0]);
	});
}

getLetters();

//This function will change the pictures to resemble a limb added.
function addLimbs() {
	console.log('yeahhhhh');
	var hangman = $('#hangman');
	wrongLetter++;
	hangman.attr('src', './images/Hangman' + wrongLetter + '.png');
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
		$space.attr('data', letter);
		$space.addClass('spaces');
		$space.css('border-bottom', '2px solid black');
		var $dashes = $('#letterdash');
		$dashes.append($space);
	});
}

getDashes();

//This function will check clicked letter vs word and input in relevant spaces.
// function writeLetter(event) {
// 	var $spaces = $('.spaces');
// 	var clicked = event.target.textContent;
// 	var $currentWord = $('currentWord');

// 	if ('$currentWord:contains(clicked)') {
// 		$spaces.each(function(space) {
// 			$this = $(this);
// 			if ($this.attr('data') == clicked) {
// 				$this.text(clicked);
// 			}
// 		});
// 	}

// 	else if (!'$currentWord:contains(clicked)') {
// 		console.log('no');
// 		addLimbs();
// 	}
// }

function writeLetter(event) {
	var $spaces = $('.spaces');
	var clicked = event.target.textContent;
	var $currentWord = $('currentWord');

	if ('$currentWord:not(:contains(clicked))') {
		addLimbs();
	} else {
		$spaces.each(function(space) {
			$this = $(this);
			if ($this.attr('data') == clicked) {
				$this.text(clicked);
			}
		});
	}
}

function play() {}
