'use strict';

//these two method work in same way, getElementById but is supposed to be a little bit faster than query selector
//Selecting Elements
const player0El = document.querySelector(".player--0")
const player1El = document.querySelector(".player--1")
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//let's now declare these four variables(they are in init function) here outside
let scores, currentScore, activePlayer, playing;
//we put them in the function:
// const scores = [0, 0];
//   let currentScore = 0;
//   let activePlayer = 0;
//   let playing = true

//Starting condition
const init = function() {
  //we will really get deep into something called scoping, okay?
  // But let me just explain to you right now that these variables that I defined here,
  // they're only available inside of this init function, okay?
  // So again, these scores, this current score, this active play, and this playing,
  // all of these variables, I declared them in here, inside of this function.
  //So we say that they are scoped to this init function,because this is where I declared them.
  // And so the solution is to declare these variables outside of any function but without any value.
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0
  current1El.textContent = 0

  diceEl.classList.add('hidden');
  player0El.classList.remove("player--winner")
  player1El.classList.remove("player--winner")
  player0El.classList.add("player--active")
  player1El.classList.remove("player--active")
}
init();

const switchPlayer = function() {
  document.getElementById(`current--${activePlayer}`).textContent = 0
  currentScore = 0
  activePlayer = activePlayer === 0 ? 1 : 0
  //toggle : it will add the class if it is not there and if it is there it will remove it
  player0El.classList.toggle("player--active")
  player1El.classList.toggle("player--active")
}


// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generating a random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;

  //2. Display dice
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;

  //3. check for rolled 1: if true , switch
  if (dice !== 1) {
    //add dice to current score
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
  } else {
    //switch to next player
    switchPlayer()
  }
  }
});

btnHold.addEventListener("click", function() {
  if (playing) {
    //1. add current score to active player's score
    scores[activePlayer] += currentScore
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer]
    //2. check if player's score is >= 100...finish the game
    if (scores[activePlayer] >= 20) {
      playing = false
      diceEl.classList.add('hidden');
      document.querySelector(`.player--${activePlayer}`).classList.add("player--winner")
      document.querySelector(`.player--${activePlayer}`).classList.add("player--active")
    }else {
    //3. switch to the next player
      switchPlayer()
    }
  }
})

btnNew.addEventListener("click", init)
