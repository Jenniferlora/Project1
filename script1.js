var alphabet = 'abcdefghijklmnopqrstuvwxyz'; //alphabet
var letters = alphabet.split(''); //splits into an array
var wrongLetter = 0; //counter for how many wong letters were clicked
var clicked; //clicked item
var currentWord; //current word
var goodmove = 0; //counter for each good move
var badmove = 0; //counter for each bad move
var currentLength; //length of current word
var applause = new Audio('./sound/lightapplause.mp3');
var right = new Audio('./sound/right.wav');
var wrong = new Audio('./sound/wrong.wav');
var points = new Audio('./sound/points.wav');
var won = 0;
var loss = 0;
var turn = 0;
//wordbank
var words = [
	'snag',
	'mime',
	'jungle',
	'peasant',
	'password',
	'newsletter',
	'bookend',
	'fly',
	'fang',
	'bicycle',
	'bear',
	'cape',
	'puppet',
	'piano',
	'lipstick',
	'salute',
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
			right.play();
			goodmove++; //needs to be here so it can capture any instance of multiple letters
			setTimeout(checkForScore(), 2000); //check for win conditions
		}
	});
}

//This function checks to see if the current word includes the letter that was clicked,
//and fires the appropiate next step functions.
function play(event) {
	clicked = event.target.textContent;

	console.log(currentWord);
	console.log(clicked);

	event.target.remove(); //removes letter from dashboard after it's been clicked.

	if (currentWord.includes(clicked)) {
		console.log('Hey,I wrote a letter');
		writeLetter(); //writes letter
	} else {
		wrong.play();
		badmove++; //increment bad move count
		addLimbs(); //change hangman picture
		console.log('Hey,I added a Limb');
		lost(); //alerts user they lost
	}
}

//This function alerts the user if they won.
function checkForScore() {
	if (goodmove >= currentLength) {
		won++;
		scoreBoard();
		points.play();

		setTimeout(function() {
			alert(`"That's correct, Good Job!"`);
		}, 100);

		setTimeout(function() {
			clear();
		}, 200);
		turn++;
		setTimeout(function() {
			checkforWin();
		}, 300);
	}
}

//This function alerts the user if they lost.
function lost() {
	if (badmove == 6) {
		loss++;
		scoreBoard();
		setTimeout(function() {
			alert(`That's wrong! The answer was ` + currentWord + '.');
		}, 100);

		setTimeout(function() {
			clear();
		}, 200);
		turn++;
		setTimeout(function() {
			checkforWin();
		}, 300);
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
var $won = $('#won');
var $loss = $('#loss');

function scoreBoard() {
	var winning = 'won:' + won;
	var losing = 'lost:' + loss;
	$won.text(winning);
	$loss.text(losing);
}

function checkforWin() {
	if (turn == 3) {
		if (won >= 2) {
			applause.play();
			alert('You won the game!');
		} else {
			alert('You lost the game');
		}
	}
}
