// hangman-svg.js
console.log("hangman-svg.js loaded");

// Array of SVG parts to be added sequentially as wrong guesses increase
const hangmanParts = [
    // Base (always shown - part 0)
    '<line x1="20" y1="100" x2="80" y2="100" stroke="#3304e4" stroke-width="3" stroke-linecap="round"></line>',

    // Vertical line (part 1)
    '<line x1="30" y1="20" x2="30" y2="100" stroke="#3304e4" stroke-width="3" stroke-linecap="round"></line>',

    // Top horizontal line (part 2)
    '<line x1="30" y1="20" x2="70" y2="20" stroke="#3304e4" stroke-width="3" stroke-linecap="round"></line>',

    // Rope (part 3)
    '<line x1="70" y1="20" x2="70" y2="30" stroke="#3304e4" stroke-width="3" stroke-linecap="round"></line>',

    // Head (part 4)
    '<circle cx="70" cy="40" r="10" stroke="#FF5C00" stroke-width="3" fill="none"></circle>',

    // Body (part 5)
    '<line x1="70" y1="50" x2="70" y2="80" stroke="#FF5C00" stroke-width="3" stroke-linecap="round"></line>',

    // Left arm (part 6)
    '<line x1="70" y1="60" x2="50" y2="50" stroke="#FF5C00" stroke-width="3" stroke-linecap="round"></line>',

    // Right arm (part 7)
    '<line x1="70" y1="60" x2="90" y2="50" stroke="#FF5C00" stroke-width="3" stroke-linecap="round"></line>',

    // Left leg (part 8)
    '<line x1="70" y1="80" x2="50" y2="100" stroke="#FF5C00" stroke-width="3" stroke-linecap="round"></line>',

    // Right leg (part 9 - game over)
    '<line x1="70" y1="80" x2="90" y2="100" stroke="#FF5C00" stroke-width="3" stroke-linecap="round"></line>'
];