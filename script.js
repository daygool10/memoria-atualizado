const cards = [
    { id: 1, image: 'dama.jpg' },
    { id: 2, image: 'dama.jpg' },
    { id: 3, image: 'a.jpg' },
    { id: 4, image: 'a.jpg' },
    { id: 5, image: '2.jpg' },
    { id: 6, image: '2.jpg' },
    { id: 7, image: '3.jpg' },
    { id: 8, image: '3.jpg' },
    { id: 9, image: '4.jpg' },
    { id: 10, image: '4.jpg' },
    { id: 11, image: '5.jpg' },
    { id: 12, image: '5.jpg' },
    { id: 13, image: '6.jpg' },
    { id: 14, image: '6.jpg' },
    { id: 15, image: '7.jpg'},
    { id: 16, image: '7.jpg'},
    { id: 17, image: '8.jpg' },
    { id: 18, image: '8.jpg' },
    { id: 19, image: '9.jpg' },
    { id: 20, image: '9.jpg' },
    { id: 21, image: '10.jpg' },
    { id: 22, image: '10.jpg' },
    { id: 23, image: 'rei.jpg' },
    { id: 24, image: 'rei.jpg' },
    { id: 25, image: 'valete.jpg' },
    { id: 26, image: 'valete.jpg' },
    { id: 26, image: 'coringa.jpg' },
    { id: 26, image: 'coringa.jpg' },

];

let flippedCard = null;
let lockBoard = false;

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function createCard(card) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.image = card.image;

    const cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');

    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');
    cardFront.style.backgroundImage = `url(${card.image})`;

    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    cardElement.appendChild(cardInner);

    cardElement.addEventListener('click', flipCard);
    return cardElement;
}

function flipCard() {
    if (lockBoard) return;
    if (this === flippedCard) return;

    this.classList.add('is-flipped');

    if (!flippedCard) {
        flippedCard = this;
        return;
    }

    checkForMatch(this);
}

function checkForMatch(currentCard) {
    let isMatch = currentCard.dataset.image === flippedCard.dataset.image;

    if (isMatch) {
        disableCards(currentCard, flippedCard);
    } else {
        unflipCards(currentCard, flippedCard);
    }
}

function disableCards(card1, card2) {
    card1.removeEventListener('click', flipCard);
    card2.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards(card1, card2) {
    lockBoard = true;

    setTimeout(() => {
        card1.classList.remove('is-flipped');
        card2.classList.remove('is-flipped');

        resetBoard();
    }, 1000);
}

function resetBoard() {
    [flippedCard, lockBoard] = [null, false];
}

function startGame() {
    shuffle(cards);
    const gameBoard = document.getElementById('game-board');
    cards.forEach(card => {
        const cardElement = createCard(card);
        gameBoard.appendChild(cardElement);
    });
}

startGame();
