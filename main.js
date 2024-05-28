// letters
const letters = "abcdefghijklmnopqrstuvwxyz";

// get array from letters
let lettersArray = Array.from(letters);

//select letters container
let lettersContainer = document.querySelector(".letters");

//generate letters
lettersArray.forEach(letter => {
    //create span
    let span = document.createElement("span");
    //create letter text node
    let theletter = document.createTextNode(letter);
    //append the letter to span 
    span.appendChild(theletter);
    //add class on span
    span.className ='letter-box';
    //append span to the letter container
    lettersContainer.appendChild(span)
});

//object of words + category
const words = {
    programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
    movies: ["prestige", "inception", "parasite", "intersteller", "whiplash", "memento", "coCo", "up"],
    people:  ["albert einstein", "hitchcock", "alexander", "cleopatra", "mahamta Ghandi"],
    countries:  ["syria", "palestine", "yeman", "egypt", "bahrian", "qatar"]
}

// get random property
let allKeys = Object.keys(words);

//random numbers depends on keys lengh
let randomPropNumber = Math.floor(Math.random() * allKeys.length);
//category
let randomPropName = allKeys[randomPropNumber];
//category words
let randomPropValue = words [randomPropName];

//random number depends on words
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
let randomValueValue = randomPropValue[randomValueNumber];

//set category info 
document.querySelector(".game-info .category span").innerHTML = randomPropName;

//select letters geuss element
let letterGuesssContainer = document.querySelector(".letters-guess");

//convert chosen word into array
lettersAndSpace = Array.from(randomValueValue);

//create spans depend on word
lettersAndSpace.forEach(letter => {
    //create empty span
    let emptySpan = document.createElement("span");
    //if letter is space 
    if (letter === " "){
        //add clss to span
        emptySpan.className = 'with-space';
    }
    //append span to the letters guess container
    letterGuesssContainer.appendChild(emptySpan);
});

//select guess span
let guessSpans = document.querySelectorAll(".letters-guess span");

//set wrong attempts
let wrongAttempts = 0;

//select the draw elemnts
let theDraw = document.querySelector(".hangman-draw");

//handle clicking on letters
document.addEventListener("click", (e) => {
    //set status

    let theStatus = false;

    if (e.target.className === 'letter-box') {

        e.target.classList.add("clicked");

        //clicked letter 
        let theClickedLetter = e.target.innerHTML.toLowerCase();
        //console.log(lettersAndSpace); //the chosen word
        lettersAndSpace.forEach((wordLetter, Wordindex) => {
            
            //if the clicked letter equal to one of the chosen word letter
            if (theClickedLetter == wordLetter) {

                //set status to correct 
                theStatus = true;

                //loop on all guess spans
                guessSpans.forEach((span, spanIndex) => {
                    if (Wordindex === spanIndex) {
                        span.innerHTML = theClickedLetter
                    }
                });
            }
        });
        //out side the loop
        
        //if letter is worng 
        if (theStatus !== true) {
            //increase the wrong attempts
            wrongAttempts++;
            //add class wrong on the draw 
            theDraw.classList.add(`wrong-${wrongAttempts}`);
            
            //paly fail sound
            document.getElementById("fail").play();

            if (wrongAttempts === 8){
                endGame();
                lettersContainer.classList.add("finished");
            }
        } else {
            //play success sound 
            document.getElementById("success").play();
        }
    }
});

//endgame function

function endGame() {
    //create popup div
    let div = document.createElement("div");
    //create text
    let divText = document.createTextNode (`Game Over, The Word Is ${randomValueValue}`);
    //append text to div
    div.appendChild(divText);
    //add class on div
    div.className ='popup';
    //append to the body 
    document.body.appendChild(div);
}