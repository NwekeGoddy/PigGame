'use strict';

//Selecting elements

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const player1Score = document.querySelector('#score--0');
const player2Score = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const currentScoreP1El = document.querySelector('#current--0');
const currentScoreP2El = document.querySelector('#current--1');

//prompt for collection of information
function startGame(){
let user1 = prompt("Please enter the first player team:");
let user2 = prompt("Please enter the second player team:");


const player1Name = document.querySelector('#name--0');
const player2Name = document.querySelector('#name--1');

player1Name.innerHTML =  user1;
player2Name.innerHTML =  user2;
}

let highScore = Number(prompt("Enter Game Limit"));


//Starting conditions
player1Score.textContent = 0;
player2Score.textContent = 0;
diceEl.classList.add('hidden');

let score, currentScore, activePlayer, playingState;

const init = function () {

  startGame();

  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playingState = true;
  player1Score.textContent = 0;
  player2Score.textContent = 0;

  diceEl.classList.add('hidden');

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  document.querySelector(`#current--0`).textContent = currentScore;
  document.querySelector(`#current--1`).textContent = currentScore;
};
init();

const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling Dice functionality.
btnRoll.addEventListener('click', function () {
  if (playingState) {
    //1. Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. Display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //Check if it rolled a one:if true,switch to next player.
    if (dice !== 1) {
      //Add dice to the current score
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switch to the next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playingState) {
    //add score to the active player score
    score[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      score[activePlayer];

    //check if player score is >= 100
    if (score[activePlayer] >= highScore) {
      //Finish the game
      playingState = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
