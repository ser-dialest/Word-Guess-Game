
// Establish a list of possible words
var foods = ["Coffee", "Tea", "Hot Cocoa", "Pancakes", "Waffles"];
console.log(foods.join(", ")) //checking

// Select a random word from list
var word = foods[Math.floor(Math.random()*foods.length)];
console.log(word); //Checking
// Get a lowercase version of the word for checking values
var lowerWord = word.toLowerCase();
console.log(lowerWord); //Checking

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

// Set number of misses so far
var miss = 0;

// Display the number of blanks for the wor to be guessed
console.log(blanks.join(" ")); //Checking
function answerSoFar() {
    document.getElementById("answer").innerHTML = blanks.join(" ");
}

answerSoFar();

// List of all letters
var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
console.log(alphabet.join(""));

// List of all letters that have been used
var used = [];

function win() {
    if (blanks.indexOf("_") === -1) {
        document.getElementById("results").innerHTML = "YOU WIN!";
    }
}

function lose() {
    if (miss > 9) {
        document.getElementById("results").innerHTML = "YOU LOSE!";
    }
}

// On keyup, the following will happen
document.onkeyup = function(event) {
    var letter = event.key.toLowerCase();
    console.log(letter); //checking
    // Is it a letter? If not, do nothing. If yes, proceed.
    if (alphabet.indexOf(letter) !== -1) {
        console.log("This is a letter."); //checking
        // Has it been used before? If yes, do nothing. If no, proceed.
        if (used.indexOf(letter) === -1) {
            // Add it to the list of letters that have been used
            used.push(letter);
            used.sort();
            document.getElementById("used").innerHTML = used.join(", ");
            // Is it in the answer?
            if (lowerWord.indexOf(letter) === -1) {
                //No? Add to the miss count and stop.
                miss++;
                document.getElementById("misses").innerHTML = miss;
            }
            else {
                console.log("That's part of the answer."); //Checking
                for (i = 0; i < word.length -1; i++){
                    // What elements does it match in the answer
                    i = lowerWord.indexOf(letter, i);
                    if (i === -1) {
                        //This is the end of the word. We need to stop.
                        i = word.length;
                    }
                    else {
                        // replace blanks with correctly guessed letters.
                        blanks[i] = word[i];
                    }
                }
                answerSoFar();
                win();
            }
        }
    }
    lose();
}

//                     What elements in the answer does it match with?
                        // until i = length
                        // indexOf lowerWord


//                     Display Blanks with the new answer present
//                     Are there still blanks in blanks?
//                         Yes? stop
//                         No? 
//                             You win! Eat food
//                             Get new word
