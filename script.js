const words = ["apple", "sofa", "notes", "banana", "pencil", "date", "table", "froge", "laptop"];
let currentWord = "";
let currentElementIndex = 0;
let correctCount = 0;
let wrongCount = 0;
let currentWordMistakes = 0;

function setRandomWord() {
    currentWord = words[Math.floor(Math.random() * words.length)];
    currentElementIndex = 0;
    currentWordMistakes = 0;
    showWord();
}

function showWord() {
    const wordContainer = document.querySelector('.word');
    wordContainer.innerHTML = '';
    currentWord.split('').forEach((element, index) => {
        const span = document.createElement('span');
        span.textContent = element;
        span.classList.add('element');
        wordContainer.append(span);
    });
}

function handleInput(event) {
    const inputElement = event.key;

    if (inputElement === currentWord[currentElementIndex]) {
        const wordContainer = document.querySelector('.word');
        const currentSpan = wordContainer.children[currentElementIndex];
        currentSpan.classList.add('c');
        currentElementIndex++;
        
        if (currentElementIndex === currentWord.length) {
            correctCount++;
            checkGameStatus();
            setTimeout(setRandomWord, 0);
        }
        
    } else {
        const wordContainer = document.querySelector('.word');
        const currentSpan = wordContainer.children[currentElementIndex];
        currentSpan.classList.add('w');
        wrongCount++;
        currentWordMistakes++;
        updateStatus();
        
        if (wrongCount === 5) {
            alert("К сожалению, вы проиграли!");
            resetGame();
        }
    }

    updateStatus();
}

function updateStatus() {
    document.querySelector('.correct-count').textContent = correctCount;
    document.querySelector('.wrong-count').textContent = wrongCount;
    document.querySelector('.word-mistakes').textContent = currentWordMistakes;
}

function checkGameStatus() {
    if (correctCount === 5) {
        alert("Поздравляем! Вы выиграли!");
        resetGame();
    }
}

function resetGame() {
    correctCount = 0;
    wrongCount = 0;
    currentElementIndex = 0;
    updateStatus();
    setRandomWord();
}

setRandomWord();
document.addEventListener('keypress', handleInput);