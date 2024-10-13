let score = JSON.parse(localStorage.getItem
    ('score')) || {
        wins: 0,
        loses: 0,
        ties: 0
    };

    updateScoreElement();

    // if(!score) {
    //     score = {
    //         wins: 0,
    //         loses: 0,
    //         ties: 0
    //     };
    // }

    const autoPlayButton = document.querySelector('.auto-play-button');
    let isAutoPlaying = false;
    let intervalId;

    function autoPlay() {
        if (!isAutoPlaying) {
            intervalId = setInterval(() => {
                const playerMove  = functionName();
                playGame(playerMove);
            }, 1000);
            isAutoPlaying = true;
            autoPlayButton.innerHTML = 'Stop Play';

        } else {
            clearInterval(intervalId);
            isAutoPlaying = false;
            autoPlayButton.innerHTML = 'Auto Play';
        }
    };

    autoPlayButton.addEventListener('click', () => {
        autoPlay();
    });

    document.querySelector('.js-rock-button')
        .addEventListener('click', () => {
            playGame('rock');
        });
    
    document.querySelector('.js-paper-button')
        .addEventListener('click', () => {
            playGame('paper')
        });

    document.querySelector('.js-scissors-button')
        .addEventListener('click', () => {
            playGame('scissors');
        });

    document.body.addEventListener('keydown', (event) => {
        if (event.key === 'r') {
            playGame('rock');
        } else if (event.key === 'p') {
            playGame('paper');
        } else if (event.key === 's') {
            playGame('scissors')
        } else if (event.key === 'a') {
            autoPlay();
        } else if (event.key === 'Backspace') {
            //resetButton();
            showResetConfirmation();
        }
    });

    function playGame(playerMove) {
        const computerMove = functionName();

        let result = '';

        if (playerMove === 'scissors') {

            if(computerMove === 'rock') {
                result = 'You lose.';
            } else if (computerMove === 'paper') {
                result = 'You win.'
            } else if (computerMove === 'scissors') {
                result = 'Tie.'
            }

        } else if (playerMove === 'paper') {

            if (computerMove === 'rock') {
                result = 'You win.';
            } else if (computerMove === 'paper') {
                result = 'Tie.'
            } else if (computerMove === 'scissors') {
                result = 'You lose.'
            }

        } else {

            if (computerMove === 'rock') {
                result = 'Tie.';
            } else if (computerMove === 'paper') {
                result = 'You lose.';
            } else {
                result = 'You win.';
            }
        }

        if (result === 'You win.') {
            score.wins += 1;
        } else if (result === 'You lose.') {
            score.loses += 1;
        } else if (result === 'Tie.') {
            score.ties +=1;
        }

        document.querySelector('.js-result').innerHTML = `${result}`;

        document.querySelector('.js-moves').innerHTML = `<span>You</span>
    <img src="${playerMove}-emoji.png" class="move-icon">
    <img src="${computerMove}-emoji.png" class="move-icon">
    <span>Computer</span>`;

        updateScoreElement();

        
//             alert(`You picked ${playerMove}. Computer picked ${computerMove}, ${result},
// Wins: ${score.wins}, Loses: ${score.loses}, Ties: ${score.ties}`);
    }

    function  functionName() {
        const randomNumber = Math.random();

        let computerMove = '';

        if(randomNumber >= 0 && randomNumber < 1 / 3) {
            computerMove = 'rock';
        } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
            computerMove = 'paper';
        } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
            computerMove = 'scissors'
        }
        return computerMove;
    }

    
    function updateScoreElement() {
        document.querySelector('.js-score')
        .innerHTML = `Wins: ${score.wins}, 
        Loses: ${score.loses}, Ties: ${score.ties}`;
    };

    function resetButton() {
        score.wins = 0;
        score.loses = 0;
        score.ties = 0;
        localStorage.removeItem('score');
        updateScoreElement();
    };

    document.querySelector('.reset-score-btn')
        .addEventListener('click', () => {
            //resetButton();
            showResetConfirmation();
        });

    function showResetConfirmation () {
        document.querySelector('.js-reset-confirmation')
            .innerHTML = `
                Are you sure you want to reset the score ?
                <button class="js-confirmation-yes js-confirmation-btn">Yes</button>
                <button class="js-confirmation-no js-confirmation-btn">No</button>
            `;

        document.querySelector('.js-confirmation-yes')
            .addEventListener('click', () => {
                resetButton();
                hideResetConfirmation();
            });
            
        document.querySelector('.js-confirmation-no')
            .addEventListener('click', () => {
                hideResetConfirmation();
            });
    }

    function hideResetConfirmation() {
        document.querySelector('.js-reset-confirmation')
            .innerHTML = '';        
    }
