var alphabet = 'abcdefghijklmnopqrstuvwxyz'; //alphabet
var letters = alphabet.split(''); //splits into an array
var wrongLetter = 0; //counter for how many wong letters were clicked
var clicked; //clicked item
var currentWord; //current word
var goodmove = 0; //counter for each good move
var badmove = 0; //counter for each bad move
var currentLength; //length of current word

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
	currentWord = words[r].toLowerCase();
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
		}
	});
}

//This function checks to see if the current word includes the letter that was clicked,
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
	if (goodmove >= currentLength) {
		alert('You win!');
		clear();
	}
}

//This function alerts the user if they lost.
function lost() {
	if (badmove >= currentLength || badmove == 6) {
		alert('You lost!');
		clear();
	}
}

//This function starts the game.
function start() {
	getLetters(); //generates all new letters.
	getWord(); //generates new random word.
}

//This function clears the letterbox, the dahed spaces, and image, to their initial values.
function clear() {
	badmove = 0;
	goodmove = 0;

	var letterbox = document.querySelector('#letterBox');
	letterbox.innerHTML = '';

	var letterdash = document.querySelector('#letterdash');
	letterdash.innerHTML = '';

	wrongLetter = 0;
	var hangman = $('#hangman');
	hangman.attr('src', './images/Hangman' + wrongLetter + '.png');

	start();
}
