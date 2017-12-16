var game = require('./game.js');
var inquirer = require('inquirer');
var word = require('./word.js');
var letter = require('./letter.js')
var choice;

exports.letter; 
exports.wordGuess;
exports.lives = 0; 
exports.chosenWord = game.chooseWord();

//Function to request user input to decide whether you want to guess a letter or guess the word
exports.requestInfo = function(){
	if(exports.lives >= 10){
		console.log("You don't know your Reindeer. Better luck next year. Merry Christmas!");
		exports.playAgain();
	}
	else{
		var questions = [
	{
		type: "list",
		name: "whatDo",
		message: "What would you like to guess?\n You have used "+exports.lives+" out of 10. Be careful.",
		choices:[
		"letter",
		"word"
		]
	}
	];

	inquirer.prompt(questions).then(function(answers){
//If the user wants to guess a letter, we run inquirer again to ask what letter then pass off to the checker in word.js.
		if(answers.whatDo == "letter"){
			var letterQ = [
			{
				type: "input",
				name: "letter",
				message: "You have already chosen: "+word.letterArr+"\nCurrent Guess: "
			}
			];

			inquirer.prompt(letterQ).then(function(answers){
				exports.letter = answers.letter;
				word.checker();
			})
		}
//If the user wants to guess a word, we run inquirer again to guess what word, then pass off to the wordChecker in word.js
		else if(answers.whatDo == "word"){
			var wordQ = [
			{
				type: "input",
				name: "word",
				message: "Which word do you guess?"
			}
			];
			inquirer.prompt(wordQ).then(function(answers){
				exports.wordGuess = answers.word;
				word.wordCheck();
			})
		}
//If the user puts in something other than word or letter, we ask them what they want to do again. 
		else{
			console.log("Wrong answer. Please try again.");
			exports.requestInfo();
		}
	})
	}
	
};

//Function to reset the game and allow the user to play again. 
exports.playAgain = function(){
	var questions = [
	{
		type: "list",
		name: "playAgain",
		message: "Would you like to play again?",
		choices:[
		"yes",
		"no"
		]
	}
	];

	inquirer.prompt(questions).then(function(answer){
		if(answer.playAgain == "yes"){
			exports.lives = 0; 
			exports.chosenWord = game.chooseWord();
			letter.guessArr = [];
			letter.wordArr = [];
			word.letterArr = [];
			letter.initDisplay();
			letter.displayWord();
			exports.requestInfo();
		}
		else{
			console.log("Thanks for playing!");
		}
	});
}
//These three functions kick off the game.  
letter.initDisplay();
letter.displayWord();
exports.requestInfo();