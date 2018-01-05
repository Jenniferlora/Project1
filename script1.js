var alphabet = 'abcdefghijklmnopqrstuvwxyz';
var letters = alphabet.split('');
// var clicks = 0;
var wrongLetter = 0;
var clicked;
var currentWord;
var goodmove = 0;
var badmove = 0;
var currentLength;

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
		$eachLetter.attr('class', 'letters el');
		$eachLetter.text(letter);
		$eachLetter.css('cursor', 'pointer');
		$eachLetter.on('click', play);
		// $eachLetter.on('click', addLimbs);
		$letterBox.append($eachLetter);
	});
}

getLetters();

//This function will change the pictures to resemble a limb added.
function addLimbs() {
	var hangman = $('#hangman');
	wrongLetter++;
	hangman.attr('src', './images/Hangman' + wrongLetter + '.png');
}

//Generates a random word.
function getWord() {
	var r = Math.floor(Math.random() * words.length);
	currentWord = words[r];
	getDashes();
}
getWord();

//This function will make placeholders with dashes based on length of word.
function getDashes() {
	currentLength = currentWord.length;
	var splitWord = currentWord.split('');
	splitWord.forEach(function(letter) {
		var $space = $('<div>');
		$space.attr('data', letter);
		$space.addClass('spaces el');
		$space.css('border-bottom', '2px solid black');
		var $dashes = $('#letterdash');
		$dashes.append($space);
	});
}

// This function will write the letter in each space where it belongs.
function writeLetter() {
	var $spaces = $('.spaces');
	$spaces.each(function(space) {
		$this = $(this);
		if ($this.attr('data') == clicked) {
			$this.text(clicked);
			goodmove++;
			console.log('g' + goodmove);
		}
	});
}

//This function checks to see if the current word includes the letter
//and fires the appropiate next step functions.

function play(event) {
	clicked = event.target.textContent;
	console.log(currentWord);
	console.log(clicked);
	event.target.remove('click', play);
	if (currentWord.includes(clicked)) {
		console.log('Hey,I wrote a letter');
		writeLetter();
		checkForWin();
	} else {
		badmove++;
		addLimbs();
		console.log('Hey,I added a Limb');
		lost();
	}
}
//This function alerts the user if they won.
function checkForWin() {
	console.log(goodmove);
	console.log(currentLength);
	if (goodmove >= currentLength) {
		alert('You win!');
		getWord();
	}
}
//This function alerts the user if they lost.
function lost() {
	if (badmove >= currentLength || badmove == 6) {
		alert('You lost!');
		clear();
		start();
	}
}
function start() {
	getLetters();
	getWord();
}

function clear() {
	var all = document.getElementsByClassName('el');
	all.remove();
}
