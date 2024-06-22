let letters = Array.from("abcdefghijklmnopqrstuvwxyz");
let lettersContainer = document.querySelector(".letters");
let category = document.querySelector(".game-info .category span");
let lettersGuessContainer = document.querySelector(".letters-guess");
let wrong = 0;
let count = 0;
let hangManCase = generateHangmanCases();
let nextCase;

let words = {
  programming: [
    "php",
    "javascript",
    "go",
    "scala",
    "fortran",
    "r",
    "mysql",
    "python",
  ],
  movies: [
    "Prestige",
    "Inception",
    "Parasite",
    "Interstellar",
    "Whiplash",
    "Memento",
    "Coco",
    "Up",
  ],
  people: [
    "Albert Einstein",
    "Hitchcock",
    "Alexander",
    "Cleopatra",
    "Mahatma Ghandi",
  ],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
};

// add letters in page
letters.forEach((letter) => {
  let span = document.createElement("span");
  span.classList.add("letter-box");
  span.appendChild(document.createTextNode(letter));
  lettersContainer.appendChild(span);
});

// pick random word from random category
let allKeys = Object.keys(words);
let randomPropNumber = Math.floor(Math.random() * allKeys.length);
let randomPropName = allKeys[randomPropNumber];
let randomPropValue = words[randomPropName];
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
let randomValueValue = randomPropValue[randomValueNumber];

// add category name in the page
category.innerHTML = randomPropName;

// create array of letters from teh random name
let lettersAndSpaces = Array.from(randomValueValue.toLowerCase());
let WordLength = lettersAndSpaces.length;

//add guessing letter box in the page
lettersAndSpaces.forEach((letter) => {
  let emptySpan = document.createElement("span");
  if (letter === " ") {
    emptySpan.classList.add("with-space");
  }
  lettersGuessContainer.appendChild(emptySpan);
});
// get all boxs
let lettersBoxs = Array.from(document.querySelectorAll(".letters-guess span"));

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("letter-box")) {
    e.target.classList.add("clicked");
    let theChosenLetter = e.target.innerHTML.toLowerCase();
    if (lettersAndSpaces.includes(theChosenLetter)) {
      lettersAndSpaces.forEach((letter, index) => {
        if (letter === theChosenLetter) {
          lettersBoxs[index].innerHTML = theChosenLetter;
          count++;
        }
      });
    } else {
      wrong++;
      nextCase = hangManCase.next().value;
      document.querySelector(nextCase).classList.add("show");
    }
    check();
  }
});

function check() {
  if (wrong === 7) {
    endGame("Game Over");
  } else {
    if (lettersAndSpaces.includes(" ")) {
      if (count === WordLength - 1) {
        endGame("You Win");
      }
    } else {
      if (count === WordLength) {
        endGame("You Win");
      }
    }
  }
}

function endGame(string) {
  let popup = document.createElement("div");
  popup.classList.add("popup");
  popup.appendChild(document.createTextNode(string));
  document.body.appendChild(popup);
}

function* generateHangmanCases() {
  yield ".the-stand";
  yield ".the-hang";
  yield ".the-rope";
  yield ".the-head";
  yield ".the-body";
  yield ".the-hands";
  yield ".the-legs";
}
