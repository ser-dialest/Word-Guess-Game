
// Establish a list of possible words
var foods = ["Coffee", "Tea", "Hot Cocoa", "Pancakes", "Waffles"];

// Select a random word from list
var word = foods[Math.floor(Math.random()*foods.length)];
console.log(word); //Checking

//Create blanks for random word
var blanks = [];
for (l = 0; l < word.length; l ++) {
    if (word[l] === " ") {
        blanks.push(" ");
    }
    else {
        blanks.push("_");
    }
}

// Display the number of blanks for the wor to be guessed
console.log(blanks.join(" ")); //Checking
document.getElementById("answer").innerHTML = blanks.join(" ");
