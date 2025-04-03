document.addEventListener('DOMContentLoaded', () => {
    // Cricket player images from web
    const players = [
      'pp/har.png', 'pp/pon.png', 'pp/pug.png', 'pp/sri.png',
      'pp/sym.png', 'pp/pradeep.png', 'pp/vijay.png', 'pp/Sunil_sri.jpg'
    ];
  
    const gameBoard = document.getElementById('cards-grid');
    let flippedCards = [];
    let matchedPairs = 0;
    let moves = 0;
    let timer = 0;
    let timerInterval;
    let canFlip = true;
  
    // Duplicate and shuffle cards
    let gameCards = [];
  
    function initGame() {
      gameBoard.innerHTML = '';
      flippedCards = [];
      matchedPairs = 0;
      moves = 0;
      timer = 0;
      canFlip = true;
      updateStats();
      clearInterval(timerInterval);
      startTimer();
  
      // Create pairs and shuffle
      gameCards = [...players, ...players];
      gameCards = shuffleArray(gameCards);
  
      // Create cards
      gameCards.forEach((player, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.index = index;
  
        const cardFront = document.createElement('div');
        cardFront.classList.add('card-face', 'card-front');
  
        const playerImg = document.createElement('img');
        playerImg.src = player;
        playerImg.alt = player; // Using URL as alt for matching
        cardFront.appendChild(playerImg);
  
        const cardBack = document.createElement('div');
        cardBack.classList.add('card-face', 'card-back');
        cardBack.textContent = '🏏'; // Bat icon only on back
  
        card.appendChild(cardFront);
        card.appendChild(cardBack);
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
      });
    }
  
    function flipCard() {
      if (!canFlip || this.classList.contains('flipped') || flippedCards.includes(this)) return;
      this.classList.add('flipped');
      flippedCards.push(this);
  
      if (flippedCards.length === 2) {
        moves++;
        updateStats();
        checkMatch();
      }
    }
  
    function checkMatch() {
      canFlip = false;
      const [card1, card2] = flippedCards;
      const player1 = card1.querySelector('img').src;
      const player2 = card2.querySelector('img').src;
  
      if (player1 === player2) {
        matchedPairs++;
        card1.classList.add('matched');
        card2.classList.add('matched');
        flippedCards = [];
  
        setTimeout(() => {
          canFlip = true;
          if (matchedPairs === players.length) {
            clearInterval(timerInterval);
            setTimeout(function() {
              document.querySelector(".cards-grid").innerHTML = `
                <div class="summary">
                    <p><strong>Number of Moves:</strong> <span id="moves">${moves}</span></p>
                    <p><strong>Time Taken:</strong> <span id="time">${timer} seconds!</span></p>
                </div>
                `;
            }, 800);
          }
        }, 800);
      } else {
        setTimeout(() => {
          card1.classList.remove('flipped');
          card2.classList.remove('flipped');
          flippedCards = [];
          canFlip = true;
        }, 1000);
      }
    }
  
    function updateStats() {
      document.getElementById('moves').textContent = moves;
      document.getElementById('timer').textContent = `${timer}s`;
    }
  
    function startTimer() {
      timerInterval = setInterval(() => {
        timer++;
        updateStats();
      }, 1000);
    }
  
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
  
    document.getElementById('reset-btn').addEventListener('click', initGame);
    initGame();
  });
