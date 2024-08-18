let cards = document.querySelectorAll('.card');
let matched = 0;
let cardOne, cardTwo;
let disabled = false;
const channelName = "Я не понимаю как вы работаете";
const link = `https://t.me/+3v2UOYdhXj4wMTYy`;
console.log(link); 
shuffleCards();
function flipCard(event) {
    const clickedCard = event.currentTarget;

    if  (cardOne !== clickedCard && !disabled) {
        clickedCard.classList.add('flip');

   
        if (!cardOne) {
            cardOne = clickedCard;
            console.log("Первая карта:", cardOne, "с изображением:", cardOne.querySelector('.back-view img').src);
            return;
        } 
        

        cardTwo = clickedCard;
        console.log("Вторая карта:", cardTwo, "с изображением:", cardTwo.querySelector('.back-view img').src);
        disabled = true; 
        matchedCards(cardOne, cardTwo);
    }
}

cards.forEach(element => {
    element.addEventListener('click', flipCard);
});

function matchedCards(cardOne, cardTwo) {
    const imgOne = cardOne.querySelector('.back-view img').id; 
    const imgTwo = cardTwo.querySelector('.back-view img').id; 

    if (imgOne === imgTwo) {
        matched++;

        cardOne.removeEventListener('click', flipCard);
        cardTwo.removeEventListener('click', flipCard);
        
        if (matched === 8) {
            setTimeout(() => {
                const message = document.createElement('div');
                message.innerHTML = `Легенда, хвастайся скорее в беседе: <a href="${link}" target="_blank">Перейти в Telegram</a>`;
                document.body.appendChild(message);
            }, 1000); // Задержка перед добавлением сообщения
        }
        
        // Закрытие модального окна
        const span = document.getElementsByClassName("close")[0];
        span.onclick = function() {
            const modal = document.getElementById("modal");
            modal.style.display = "none";
        }
        
        // Закрытие модального окна при клике вне его
        window.onclick = function(event) {
            const modal = document.getElementById("modal");
            if (event.target === modal) {
                modal.style.display = "none";
            }
        }
        resetCards();
    } else {
        setTimeout(() => {
            endAttempt();
        }, 1000); 
    }
}

function endAttempt() {
    cardOne.classList.remove('flip');
    cardTwo.classList.remove('flip');
    resetCards(); 
}

function resetCards() {
    cardOne = null; 
    cardTwo = null; 
    disabled = false; 
}

function shuffleCards() {
    cards.forEach(card => {
        const randomPos = Math.floor(Math.random() * cards.length);
        card.style.order = randomPos; 
    });
}
function resetGame() {
    matched = 0;
    cardOne = null;
    cardTwo = null;
    disabled = false;

    shuffleCards();

    cards.forEach(card => {
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);
    });
}