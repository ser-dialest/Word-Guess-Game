



//Function for loading and initializing the game
var x = 3;

// Create arrays list of possible letters
var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var used = [];
var wins = 0;
var losses = 0;

function start() {
    //Check intial screen size - set screen size variables, width and x
    //Set background
    // document.getElementById("gameArea").style.backgroundImage = "url('/Users/Kunio/Code/GitHubRepos/Word-Guess-Game/assets/images/EmptyRestaurant1.png')";
    // Set sizes for all elements with specified pixel sizes
    var p = document.getElementsByTagName("p");
    for (i=0; i < p.length; i++) {
        p[i].style.fontSize = 14*x + "px";
    }

    var pre = document.getElementsByTagName("pre");
    for (i=0; i < pre.length; i++) {
        pre[i].style.fontSize = 14*x + "px";
    }

    // document.getElementById("interior").src = "assets/images/RiseandShine3.png";

    var central = document.getElementById("central");
    central.style.width = 256*x + "px";

    var restArea = document.getElementById("restArea");
    restArea.style.width = 256*x + "px";
    restArea.style.height = 224*x + "px";

    var restScene = document.getElementById("restScene");
    restScene.style.left = 16*x + "px";
    restScene.style.top = 56*x + "px";
    restScene.style.width = 64*x + "px";
    restScene.style.height = 64*x + "px";

    // var interior = document.getElementById("interior");
    // interior.style.width = 64*x + "px";
    // interior.style.height = 64*x + "px";

    var nameDiv = document.getElementById("nameDiv");
    nameDiv.style.left = 16*x + "px";
    nameDiv.style.top = 136*x + "px";
    nameDiv.style.width = 64*x + "px";

    var gameText = document.getElementById("gameText");
    gameText.style.top = 56*x + "px";
    gameText.style.left = 96*x + "px";
    gameText.style.width = 144*x + "px";
    gameText.style.height = 96*x + "px";

    var server = document.getElementById("server");
    server.style.width = 16*x + "px";
    server.style.height = 34*x + "px";

    var patron= document.getElementById("patron");
    patron.style.position = "absolute";
    patron.style.width = 16*x + "px";
    patron.style.height = 36*x + "px";
    patron.style.backgroundImage = "url('assets/images/AlexPatron.png')";
    patron.style.visibility = "hidden";
    patron.style.bottom = 4*x + "px";

    var music = document.getElementById("bgm"); 
    music.volume = 0.3;

};

// Define restaurant prototype
function Restaurant(name, interior, server, menu) {
    this.name = name;
    this.interior = interior;
    this.server = server;
    this.menu = menu;
};

// Set global variables for the word to guess, misses, etc.
var word;
var lowerWord;
var miss;
var blanks = [];

Restaurant.prototype.answerSoFar = function () {
    document.getElementById("answer").innerHTML = blanks.join(" ");
}

Restaurant.prototype.newWord = function () {
    miss = 0;
    used = [];
    document.getElementById("missArea").innerHTML = "Misses: " + miss;
    document.getElementById("usedArea").innerHTML = "Used: " + used.join(", ");
    word = this.menu[Math.floor(Math.random()*this.menu.length)];
    lowerWord = word.toLowerCase();
    blanks = [];
    for (l = 0; l < word.length; l ++) {
        if (word[l] === " ") {
            blanks.push(" ");
        }
        else {
            blanks.push("_");
        }
    }
    this.answerSoFar();
}

// Method to load a restaurant
Restaurant.prototype.load = function () {
    document.getElementById("restScene").style.backgroundImage = "url(" + this.interior + ")";
    document.getElementById("restName").innerHTML = this.name;
    var server = document.getElementById("server");
    server.style.backgroundImage = "url(" + this.server + ")";
    server.style.bottom = 4*x + "px";
    serverX = -6;
    serverFrame = 0;
    var open = 32*x;
    server.style.left = serverX*x + "px";
    var patronX = -5;
    patron.style.right = patronX*x + "px";
    var patronFrame = 0;
    t = 1;
    function entrance(timestamp) {
        if (t < 65) {
            if (t === 1) {}
            else if (t < 14) {
                serverX++;
                server.style.left =  serverX*x + "px";
                if (t === 6) {
                    patron.style.visibility = "visible";
                }
                else if (t > 6) {
                    patronX++;
                    patron.style.right = patronX*x + "px";
                    if (t === 9) {
                        // Step up
                        serverFrame -= 16;
                        server.style.backgroundPositionX = serverFrame*x + "px";
                        patronFrame -= 20;
                        patron.style.backgroundPositionX = patronFrame*x + "px";
                    }
                }
                
            }
            else if (t === 14) {
                // Step down / clo0se mouth
                serverFrame -= 16
                server.style.backgroundPositionX = serverFrame*x + "px";
                patronX++;
                patron.style.right = patronX*x + "px";
            }
            else if (t < 18) {
                patronX++;
                patron.style.right = patronX*x + "px";
            }
            else if (t === 18) {
                patronX++;
                patron.style.right = patronX*x + "px";
                patronFrame += 20;
                        patron.style.backgroundPositionX = patronFrame*x + "px";
            }
            else if (t === 19) {
                patronFrame -= 60;
                        patron.style.backgroundPositionX = patronFrame*x + "px";
            }
            else if (((t-14)%7) === 0) {
                serverFrame = serverFrame + open;
                server.style.backgroundPositionX = serverFrame*x + "px";
                open = open * -1;
            }
            t++;
            requestAnimationFrame(entrance);
        }
        else {
            document.getElementById("instruction").innerHTML = "Guess letters to order.";
            document.getElementById("missArea").innerHTML = "Misses: " + miss;
            document.getElementById("usedArea").innerHTML = "Used Letters: ";
            document.getElementById("results").innerHTML = "Wins: " + wins + " Losses: " + losses;
        }
    }
    entrance();
    this.newWord();
};



// First restaurant - Rise & Shine
var riseAndShine = new Restaurant("Rise & Shine Cafe", "assets/images/RiseAndShine3.png", "assets/images/RnSWaitress3.png", ["Coffee", "Tea", "Pancakes", "Waffles", "Donut", "Muffin", "Bagel", "Croissant", "Milk", "Lasagna", "Chili", "Burger", "Pizza", "Pie"]);

// Define server prototype
// function Server(image)
    //notes for unfinished methods
    // Method to load restaurant - place image in interior, load menu move server div to correct spot, select image for server, move patron to correct place
        //call server enter
        //call patron enetr
        // call server greet
        // call newword
        // call server.takeorder

    //onkey event listener
        // game logic

    //windowresize event listener
        //when certai n conditions are met, reload objects and change size properties

    // Restaurant objects 
        //interior server menu

function result() {
    if (blanks.indexOf("_") === -1) {
        wins++;
        riseAndShine.newWord();
    }
    else if (miss > 9 ) {
        losses++;
        riseAndShine.newWord();
    }
        document.getElementById("results").innerHTML = "Wins: " + wins + " Losses: " + losses;
}


// On keyup, the following will happen
document.onkeyup = function(event) {
    var letter = event.key.toLowerCase();
    // Is it a letter? If not, do nothing. If yes, proceed.
    if (alphabet.indexOf(letter) !== -1) {
        // Has it been used before? If yes, do nothing. If no, proceed.
        if (used.indexOf(letter) === -1) {
            // Add it to the list of letters that have been used
            used.push(letter);
            used.sort();
            document.getElementById("usedArea").innerHTML = "Used: " + used.join(", ");
            // Is it in the answer?
            if (lowerWord.indexOf(letter) === -1) {
                //No? Add to the miss count and stop.
                miss++;
                document.getElementById("missArea").innerHTML = "Misses: " + miss;
            }
            else {
                for (i = 0; i < word.length; i++){
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
                riseAndShine.answerSoFar();
            }
        }
    }
    result();
}


start();
riseAndShine.load();