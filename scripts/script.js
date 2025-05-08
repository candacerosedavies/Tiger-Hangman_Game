console.log("script.js loaded");

//using the className instead of ID to access the keyboard HTML element
const keyboardDiv = document.querySelector(".keyboard");
const guessesText = document.querySelector(".guesses-text b");
const wordDisplay = document.querySelector(".word-display");
let guessedLetters = document.querySelector(".guessed-letters b")
// const hangmanImage = document.querySelector(".hangman-box img");
const tigerAnimation = document.querySelector(".tiger-animation")
const gameModal = document.querySelector(".game-modal")
const playAgainBtn = document.querySelector(".play-again")



//Also valid: let currentWord, correctLetters, wrongGuessCount
let currentWord, correctLetters, wrongGuessCount, displayWord;
//set the max num guesses in .guesses-text b
const maxGuesses = 9; //updated to 10 for flexibility of answers

let allGuessedLetters = [];



const updateHangmanSVG = (wrongGuesses) => {
    const svg = document.getElementById("hangman-svg")
    //clear existing content
    svg.innerHTML = "";

    //add parts based on wrong guesses (0 up to...)
    for (let i = 0; i <= wrongGuesses; i++) {
        if (i < hangmanParts.length) {

            svg.innerHTML += hangmanParts[i];
        }
    }
}


const resetGame = () => {
    //reset all game variables and UI elements
    correctLetters = [];
    wrongGuessCount = 0;
    allGuessedLetters = []; // Reset guessed letters
    guessedLetters.innerText = ""; // Clear guessed letters display
    // Reset SVG to just show the base
    updateHangmanSVG(wrongGuessCount);

    // hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    //update the 0 in 0/10 with the current total of wrongGuessCount
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    //word.split("") takes the randomly generated string from 'word'/ wordDisplay array
    //splits the string into an array of characters
    //.map(() => <li class="letter"></li>) transforms each character in the array into a list item!
    //empty arrow function parameters: it's creating an empty <li> for each letter in the word.

    // also valid:
    // using spread operator instead of split [...currentWord]
    wordDisplay.innerHTML = currentWord.split("").map(letter => {
        if (letter === " ") {
            // For spaces, create a special list item that's already "guessed" with visible space
            return `<li class="letter guessed space">&nbsp;</li>`;
        } else {
            // For normal letters, create regular list items
            return `<li class="letter"></li>`;
        }
    }).join("");

    gameModal.classList.remove("show");


}



// 1. Math.random() - Give me a random decimal between 0-1
// 2. * wordList.length - Scale it to the size of the array - no need for -1 as upper num is exclusie ;-)
// 3. Math.floor() - Round decimal down to get a valid array index
// 4. Use this index to get the {word, hint} pair from wordList (using destructuring to assign array properties to variables)
// --- ensure get the same word and index by using { prop, prop } = to create 2 variables accessing the same random index
const getRandomWord = () => {

    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    currentWord = word.toLowerCase();
    displayWord = word.toUpperCase();
    //access the HTML hint para, assign it the value of the randomly generated hint variable. 
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
}


const gameOver = (isVictory) => {
    //after 600ms of game complete... show modal with relevant details
    setTimeout(() => {
        const modalText = isVictory ? `You Found the word:` : `The correct word was:`; //returns false every time
        // gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`; //correct gif works
        // gameModal.querySelector(".tiger-animation").src = tigerAnimation
        gameModal.querySelector("h2").innerText = `${isVictory ? 'Congratulations!' : 'Game Over :-('}`; //
        //'you found the word:' OR 'the correct word was:' + the currentWord
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${displayWord}</b>`;
        //trigger the modal to pop up by adding extra class
        gameModal.classList.add("show");
    }, 300);
}

//---initGame function - define it here before the loop below---
//button param gets its value from e.target - the DOM element that was clicked
//clickedLetter param gets its value from String.fromCharCode(i) 
const initGame = (button, clickedLetter) => {
    // Check if the clickedLetter is already in the allGuessedLetters array
    if (!allGuessedLetters.includes(clickedLetter)) {
        //if it is not, push it on to the end!
        allGuessedLetters.push(clickedLetter);

        // Update the display of guessed letters (join with spaces for readability)
        guessedLetters.innerText = allGuessedLetters.join(' ');



        //check if clickedLetter exists on the currentWord
        if (currentWord.includes(clickedLetter)) {

            //[...currentWord] converts the string currentWord into array of individual characters (like split(""))
            //Array.forEach(): method executes the provided function ONE FOR EACH element in the array
            //in forEach, certain params are provided to callback function:
            //the first receives the current element being process inthe array
            //the second receives the index position of the curren element
            [...currentWord].forEach((letter, index) => {
                //also valid: currentWord.split("").forEach((letter, index) => {

                // If this letter matches the clicked letter
                if (letter === clickedLetter) {
                    //---Add this letter to the corresponding position in the display---
                    //use innerText to update not append because the li element already exists in the DOM
                    //[index] ensures letter ends up in the correct <li> / right order 
                    wordDisplay.querySelectorAll("li")[index].innerText = letter;
                    //---add this class so that when letter is added, the styling applies (eg. bottom border disappears)
                    wordDisplay.querySelectorAll("li")[index].classList.add("guessed");

                    correctLetters.push(letter)

                }
            })
        } else {
            //---if clicked letter doesn't exist then update wrongGuessCount and hangmanImage---
            wrongGuessCount++;
            updateHangmanSVG(wrongGuessCount);
            guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
        }


        //disable the keyboard button after use
        button.disabled = true;

        //call the gameOver function if any of these conditions meets
        if (wrongGuessCount === maxGuesses) return gameOver(false);
        if (correctLetters.length === currentWord.length) return gameOver(true);


    }

    // if (maxGuesses === 6) {
    //     //stop the game and trigger game over
    // }
}


//---keyboard buttons and event listeners---

//---loop that creates the buttons---
//Using using ASCII character codes. 97 = a 122 = z
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");

    //convert the ASCII character codes to letters
    button.innerText = String.fromCharCode(i);
    keyboardDiv?.appendChild(button);

    //---event listener: listens for a click, accesses the button element and the letter
    //e: event object automatically created when an event happens
    //e.target refer back to the HTML element that was clicked (the button)
    //String.fromCharCode(i) convert the current ASCII code to a letter
    // When event happens calls the initGame function with two arguments:
    //The first argument e.target: the actual button element that was clicked
    //The second argument String.fromCharCode(i): the letter corresponding to that button
    button.addEventListener('click', e => initGame(e.target, String.fromCharCode(i)));

}

getRandomWord();
//when the play-again button is pressed: call the getRandomWord function
playAgainBtn.addEventListener("click", getRandomWord);