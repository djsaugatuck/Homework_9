//The array of words that can be guessed. 
var words = ["dasher", "dancer", "prancer", "vixen", "comet", "cupid", "donner", "blitzen", "rudolph"];
//The function that chooses the word and returns it back. 
exports.chooseWord = function(){
	var randNum = Math.floor((Math.random()*words.length)+1);
	return words[randNum];
}