const inputs = document.querySelectorAll('#input-container input');
const letters = document.querySelectorAll('#alphabet-container .key');
var firstActiveIndex = 0;

inputs[0].focus();

let word = ''

async function initGame(){
    const wordData = await getRandomWord();
    if (wordData){
        word = wordData[0].toUpperCase();
        console.log("Word aquired!");
    }
}

initGame();

async function getRandomWord(){
    try {
        const randomDiff = Math.floor(Math.random() * 2) + 1;
        const wordResponse = await fetch(`https://random-word-api.herokuapp.com/word?length=5&diff=${randomDiff}`);
        const word = await wordResponse.json();
        return word;
    } catch (error){
        console.error("request failed")
    }
}

inputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
        const value = e.target.value
        if (value.length === 1 && index < inputs.length - 1 && !inputs[index + 1].readOnly && value.match(/^[a-zA-Z]$/)) {
            inputs[index + 1].focus();
        }
    });

    input.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^a-zA-Z]/g, '');
    });

    input.addEventListener('keydown', (e) => {

        if (e.key === 'Backspace' && index > 0 && !e.target.value){
            const prev = inputs[index - 1];
            prev.focus();
            prev.setSelectionRange(prev.value.length, prev.value.length);
        }

        if (e.key ==='ArrowLeft' && index > 0 && !inputs[index - 1].readOnly) {
            e.preventDefault();
            inputs[index - 1].focus();
        }

        if (e.key === 'ArrowRight' && index < inputs.length - 1 && !inputs[index + 1].readOnly) {
            inputs[index + 1].focus();
        }

        if (e.key === 'Enter') {
            const currentGuessRows = Array.from(inputs).slice(firstActiveIndex, firstActiveIndex + 5);
            var correctLetters = 0;

            var letterCounter = {};
            for (let char of word) {
                letterCounter[char] = (letterCounter[char] || 0) + 1;
            }
            
            const yellow = "#b59f3b";
            const statuses = Array(5).fill('gray');
            const guessedLetters = currentGuessRows.map(input => input.value.toUpperCase());

            guessedLetters.forEach((char, i) => {
                if (char === word[i]) {
                    statuses[i] = 'green';
                    letterCounter[char]--;
                    correctLetters++;
                }
            });

            guessedLetters.forEach((char, i) => {
                if (statuses[i] !== 'green' && letterCounter[char] > 0) {
                    statuses[i] = yellow;
                    letterCounter[char]--;
                }
            });

            currentGuessRows.forEach((input, i) => {
                const char = input.value.toUpperCase();
                const status = statuses[i];
                if (!char) return;

                input.style.backgroundColor = status;
                input.style.color = 'white';
                input.readOnly = true;

                letters.forEach(letter => {
                    if (letter.textContent === char) {
                        if (status === 'green') {
                            letter.style.backgroundColor = 'green';
                            letter.style.color = 'white';
                        } else if (status === yellow && letter.style.backgroundColor !== 'green') {
                            letter.style.backgroundColor = yellow;
                            letter.style.color = 'white';
                        } else if (status === 'gray' && letter.style.backgroundColor !== 'green' && letter.style.backgroundColor !== yellow) {
                            letter.style.backgroundColor = 'gray';
                            letter.style.color = 'white';
                        }
                    }
                });
            });
            if (correctLetters === 5) {
                setTimeout(() => {
                    alert('Congratulations! You guessed the word!');
                }, 500);
                inputs.forEach(input => input.readOnly = true);
                return;
            }

            firstActiveIndex += 5;
            if (firstActiveIndex === inputs.length) {
                setTimeout(() => {
                    alert(`Game Over! The word was ${word}`);
                }, 500);
                inputs.forEach(input => input.readOnly = true);
                return;
            }

            for (let i = firstActiveIndex; i < firstActiveIndex + 5 && i < inputs.length; i++) {
                inputs[i].readOnly = false;
            }
            inputs[firstActiveIndex].focus();
        }
    });
});

letters.forEach(letter => {
    letter.addEventListener('mousedown', (e) => {
        e.preventDefault();
    });

    letter.addEventListener('click', () => {
        var currentInput = document.activeElement;
        const index = Array.from(inputs).indexOf(currentInput);

        if (index !== -1 && !currentInput.readOnly){
            currentInput.value = letter.textContent;
            if (index < inputs.length - 1 && !inputs[index + 1].readOnly) {
                inputs[index + 1].focus();
            }
        }
    });
});