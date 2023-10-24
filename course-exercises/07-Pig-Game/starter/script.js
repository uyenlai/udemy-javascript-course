'use strict';

//Selecting elements
const diceEl = document.querySelector('.dice');
const rollBtnEl = document.querySelector('.btn--roll');
const holdBtnEl = document.querySelector('.btn--hold');
const newGameBtnEl = document.querySelector('.btn--new');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');
const totalScore0El = document.getElementById('score--0');
const totalScore1El = document.getElementById('score--1');

let currentScore, activePlayer, totalScore, playing;
//Initial state
const init = function () {
  totalScore = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  totalScore0El.textContent = 0;
  totalScore1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--winner');
  player1El.classList.remove('player--active');
};
init();

//Switch Player Function
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Roll btn clicked
rollBtnEl.addEventListener('click', function () {
  if (playing) {
    //Random rolled dice
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //Rolled !== 1
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Rolled === 1
      switchPlayer();
    }
  }
});

//Hold btn clicked
holdBtnEl.addEventListener('click', function () {
  if (playing) {
    totalScore[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScore[activePlayer];
    if (totalScore[activePlayer] >= 30) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      playing = false;
    } else {
      switchPlayer();
    }
  }
});

//New Game btn clicked
newGameBtnEl.addEventListener('click', init);
