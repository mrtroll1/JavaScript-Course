let userChoice = '';
let randomNumber = 0;
let computerChoice ='';
let score = {
  wins: 0, 
  losses: 0, 
  ties: 0
}

function randToChoice(randomNumber) {
  if (randomNumber >= 0 && randomNumber < 1/3) {
    computerChoice = 'rock';
  } else if (randomNumber > 1/3 && randomNumber <= 2/3) {
    computerChoice = 'paper';
  } else {
    computerChoice = 'scissors';
  } 
  
  return computerChoice;
}

function printScore(score) {
  const scoreElement = document.querySelector('.score');
  scoreElement.innerHTML = `Wins: ${score.wins}. Losses: ${score.losses}. Ties: ${score.ties}.`
}

function resetScore() {
  const scoreElement = document.querySelector('.score');
  scoreElement.innerHTML = `Wins: 0. Losses: 0. Ties: 0.`;
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
}

function confirmResetScore() {
  const html = `
  <p>Are you sure you want to reset the score?</p>
  <button class="yes-reset-button js-yes-reset-button">
    Yes
  </button>
  <button class="no-reset-button js-no-reset-button">
    No
  </button>
  `
  document.querySelector('.js-confirm-reset-wrap').innerHTML = html;

  document.querySelector('.js-yes-reset-button')
  .addEventListener('click', () => {
    resetScore();
    document.querySelector('.js-confirm-reset-wrap').innerHTML = '';
  })

  document.querySelector('.js-no-reset-button')
    .addEventListener('click', () => {
      document.querySelector('.js-confirm-reset-wrap').innerHTML = '';
  })
}

let isAutoPlaying = false;
let intervalId;
function autoPlay() {
  if (!isAutoPlaying) {
    randomNumber = Math.random();
    intervalId = setInterval(() => {
      userChoice = randToChoice(randomNumber);
      playGame(userChoice);
    }, 1000);
    document.querySelector('.js-autoplay-button').innerHTML = 'Stop playing';
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    document.querySelector('.js-autoplay-button').innerHTML = 'Auto play';
    isAutoPlaying = false;
  }  
}

document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('rock');
  });

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
});

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('scissors');
});

document.querySelector('.js-reset-button')
  .addEventListener('click', () => {
    confirmResetScore();
  })

document.querySelector('.js-autoplay-button')
  .addEventListener('click', () => {
    autoPlay();
})

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  } else if (event.key === 'a') {
    autoPlay();
  } else if (event.key === 'Backspace') {
    confirmResetScore();
  } else {
    return;
  }
})

function playGame(userChoice) {
  randomNumber = Math.random();
  computerChoice = randToChoice(randomNumber);
  let result = '';
  score = JSON.parse(localStorage.getItem('score')) 
  || {
    wins: 0,
    losses: 0,
    ties: 0
  };

  if (userChoice === 'rock') {
    if (computerChoice === 'rock') {
      result = 'Tie';
    } else if (computerChoice === 'paper') {
      result = 'You lost';
    } else {
      result = 'You won';
    }
  } else if (userChoice === 'paper') {
    if (computerChoice === 'rock') {
      result = 'You won';
    } else if (computerChoice === 'paper') {
      result = 'Tie';
    } else {
      result = 'You lost';
    } 
  } else {
    if (computerChoice === 'rock') {
    result = 'You lost';
  } else if (computerChoice === 'paper') {
    result = 'You won';
    
  } else {
    result = 'Tie';
  }
  }

  if (result === 'You won') {
    score.wins += 1;
  } else if (result === 'You lost') {
    score.losses += 1;
  } else {
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score)); 

  document.querySelector('.result').innerHTML = `${result}`;
  document.querySelector('.js-moves').innerHTML = `You
<img class="result-icon" src="../icons/${userChoice}-emoji.png">
<img class="result-icon" src="../icons/${computerChoice}-emoji.png">
Computer`;
  printScore(score);
}


