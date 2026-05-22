# Wordle

A browser-based Wordle clone built with vanilla HTML, CSS, and JavaScript.

## Demo

Play it live on [GitHub Pages](https://your-username.github.io/your-repo)

## How to Play

- Guess the hidden **5-letter word** in **6 tries**
- After each guess, the color of the tiles changes to show how close you are:
  - 🟩 **Green** — correct letter, correct position
  - 🟨 **Yellow** — correct letter, wrong position
  - ⬛ **Gray** — letter not in the word
- The on-screen keyboard tracks which letters you've used

## Features

- Word picked randomly from a local list of 5,757 common English words on each game load
- Full keyboard support — type, use Backspace, Arrow keys, and Enter
- On-screen clickable keyboard for mouse/touch input
- Color-coded tile and keyboard feedback after each guess
- Win/lose alerts with the correct word revealed on game over

## Project Structure

```
/
├── index.html   # Game layout — grid, on-screen keyboard
├── styles.css   # Responsive styling using vmin units
├── scripts.js   # Game logic — word loading, input handling, guess evaluation
└── words.txt    # Word list of 5,757 five-letter words
```

## Getting Started

No build tools or dependencies required.

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo.git
   ```
2. Serve the files with a local server (required for `words.txt` to load):
   ```bash
   npx serve .
   ```
   Then open `http://localhost:3000` in your browser.

> **Note:** Opening `index.html` directly as a `file://` URL will not work because browsers block local file fetches. Use a local server as shown above.

## Tech Stack

- **HTML5** — semantic structure
- **CSS3** — flexbox/grid layout, responsive `vmin` sizing, CSS transitions
- **JavaScript (ES6+)** — async/await, DOM manipulation, game logic
