/* Represents card deck */
const cardDeck = document.querySelector('.deck');

/* nodelist of all cards */
let cardList = document.querySelectorAll('.card');

/* creates array initialized to cardList */
let cardArray = [...cardList];

/* initial moves count */
let moves = 0;

/* counts number of cards matched */
let matchTotal = 0;

/* accesses game timer */
let timer = document.querySelector('.gameTimer');
/* Access 'moves' class  */
let count = document.querySelector('.moves');

/* adds stars to array for rating */
const starScore = document.querySelectorAll('.fa-star');

/* array to hold open cards */
let openCards = [];

/*Timer variables */
let second = 0;
let minute = 0;
let hour = 0;
let timeElapse;

/* animations */
let isAnimating = true;

/* accesses class "rating" in html */
let endStar= document.querySelector('.rating');

/*accesses the ending time  */
let endTime = document.querySelector('.endTime');

/*accesses the total moves  for the modal display */
let endMoves = document.querySelector('.totalMoves');

/* accesses stars to set up for modal*/
let starList = document.querySelector('.stars');

/* accesses the class "modal" from html */
let modalClass = document.querySelector('.modal');

/*Starts  replay event on click */
let replayClick = document.querySelector('.replay');
replayClick.onclick = displayCards;

/* loads cards face down on game load */
document.body.onload = displayCards;
/**
* @description: changes .restart to a clickable event which triggers the
* function displayCards
*/
let replayGame= document.querySelector('.restart');
replayGame.onclick = displayCards;
/**
* @description: Shuffle function from http://stackoverflow.com/a/2450976
* @param: Name: array, type: array
* @returns: randomized array
*/
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
 /**
 * @description: calls the shuffle function and displays all cards face down
 */
function displayCards() {
    cardArray = shuffle(cardArray);

    for (let i=0; i < cardArray.length; i++) {
        cardDeck.innerHTML ='';
        [].forEach.call(cardArray, function(item){
        cardDeck.appendChild(item);
    });
    cardArray[i].classList.remove('show', 'open', 'match', 'unmatched', 'disabled');
    }
    moves =0;
    matchList =0;
    count.innerHTML = 0;
    for (let i=0; i < starScore.length; i++){
       starScore[i].style.visibility = 'visible';
    }
    /*starts/restarts timer */
    clearInterval(timeElapse);
    /* resets all variables and innerHTML */
    hour =0;
    minute=0;
    second =0;
    timer.innerHTML = hour + ' hours ' + minute + ' mins ' + second + ' secs';
    endTime.innerHTML = '';
    endMoves.innerHTML = '';
    endStar.innerHTML = '';
    openCards = [];
    isAnimating = false;
    modalClass.classList.remove('show');
    gameTime();
 }
/**
* @description: open and compare cards
* Open Card
* Compares cards and executes code or calls function whether or not they match.
*/
let openCard = function(){
    if(isAnimating) return;
    this.classList.toggle('open');
    this.classList.toggle('show');
    this.classList.toggle('disabled');
    openCards.push(this);
    let cardCount = openCards.length;
    if (cardCount === 2) {
        movesCounter();
        if (openCards[0].firstElementChild.className === openCards[1].firstElementChild.className){
            matchList++;
            for (let i=0; i < 2; i++){
                openCards[i].classList.add('match');
                openCards[i].classList.remove('show', 'open');
            }
            openCards = [];
        } else {
            noMatch();
        }
    }
    finished();
}

/*
* @description : Adds 1 move  when  2 cards are clicked moves the counter
* Star Ratings  are claculated based on Total Moves.
*/
function movesCounter(){
    moves ++;
    count.innerHTML = moves;
    if (moves < 30 && moves > 24){
        starScore[2].style.visibility = 'collapse';
    } else if (moves > 30){
        starScore[1].style.visibility = 'collapse';
    }
}
/**
* @description: game time calculation
*/
function gameTime(){
    timeElapse = setInterval(function(){
        timer.innerHTML = hour + ' hours ' + minute + ' mins ' + second + ' secs';
        second ++;
        if (second == 60){
            minute ++;
            second =0;
        }
        if (minute == 60){
            hour++;
            minute = 0;
        }
    }, 1000);
}
/**
/* @description: sets delay when cards don't match and flips over
*/
function noMatch(){
    isAnimating =true;
    for (let i=0; i < 2; i++){
    openCards[i].classList.add('nomatched');
    }
    setTimeout(function(){
        isAnimating = false;
        for (let i=0; i < openCards.length; i++){
            openCards[i].classList.remove('show', 'open', 'nomatched', 'disabled');
        }
        openCards = [];
    }, 500);
}
/**
* @description: modal for when all cards are matched
*/
function finished() {
    if (matchList === 8){
        clearInterval(timeElapse);
        endTime.innerHTML = timer.innerHTML;
        endMoves.innerHTML = count.innerHTML;
        endStar.innerHTML = starList.innerHTML;
        modalClass.classList.add('show');
    }
}
/**
* @description: loops through the cards and adds click event
*/
for (let i=0; i <cardArray.length; i++){
    cardList= cardArray[i];
    cardList.addEventListener('click', openCard);
}
