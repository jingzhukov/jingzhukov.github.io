// Game state
const GameState = {
    MENU: 'menu',
    ELO_SELECT: 'elo_select',
    COLOR_SELECT: 'color_select',
    PLAYING: 'playing'
};

let currentState = GameState.MENU;
let chess = null;
let stockfish = null;
let playerColor = null;
let selectedElo = null;
let moveHistory = [];
let waitingForEngine = false;

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    initializeStockfish();
    showWelcome();
    setupInputHandler();
});

function initializeStockfish() {
    // Use official Stockfish.js via web worker
    try {
        if (typeof STOCKFISH === 'function') {
            stockfish = STOCKFISH();
            stockfish.onmessage = handleStockfishMessage;
        } else {
            // Create inline worker as fallback
            stockfish = {
                postMessage: function(msg) {
                    // Simplified stockfish simulation for testing
                    if (msg.includes('go')) {
                        setTimeout(() => {
                            const moves = chess.moves();
                            if (moves.length > 0) {
                                const randomMove = moves[Math.floor(Math.random() * moves.length)];
                                const move = chess.move(randomMove);
                                const uci = move.from + move.to + (move.promotion || '');
                                chess.undo();
                                handleStockfishMessage({ data: 'bestmove ' + uci });
                            }
                        }, 500);
                    }
                }
            };
        }
    } catch (e) {
        printLine('Warning: Using fallback engine', 'warning');
    }
}

function handleStockfishMessage(event) {
    const message = event.data ? event.data : event;

    if (message.includes('bestmove')) {
        const match = message.match(/bestmove ([a-h][1-8][a-h][1-8][qrbn]?)/);
        if (match && waitingForEngine) {
            const move = match[1];
            makeEngineMove(move);
            waitingForEngine = false;
        }
    }
}

function showWelcome() {
    printLine('╔═══════════════════════════════════════════════════════════╗');
    printLine('║            CHESS CLI - BLINDFOLD TRAINER                  ║');
    printLine('╚═══════════════════════════════════════════════════════════╝');
    printLine('');
    printLine('Welcome to the chess blindfold training system.');
    printLine('Train your visualization skills by playing without a board!');
    printLine('');
    showMenu();
}

function showMenu() {
    currentState = GameState.MENU;
    printLine('─────────────────────────────────────────────────────────────');
    printLine('Commands:');
    printLine('  start  - Start a new game');
    printLine('  help   - Show available commands');
    printLine('  clear  - Clear terminal');
    printLine('─────────────────────────────────────────────────────────────');
    printLine('');
}

function showEloSelection() {
    currentState = GameState.ELO_SELECT;
    printLine('');
    printLine('Select opponent strength (ELO rating):');
    printLine('  1.  Beginner      (400)');
    printLine('  2.  Casual        (800)');
    printLine('  3.  Novice        (1000)');
    printLine('  4.  Club Player   (1200)');
    printLine('  5.  Intermediate  (1400)');
    printLine('  6.  Advanced      (1600)');
    printLine('  7.  Strong        (1800)');
    printLine('  8.  Expert        (2000)');
    printLine('  9.  Candidate     (2200)');
    printLine('  10. Master        (2400)');
    printLine('  11. Int. Master   (2600)');
    printLine('  12. Grandmaster   (2800)');
    printLine('  13. Super GM      (3000)');
    printLine('  14. World Class   (3200)');
    printLine('');
    printLine('Enter number (1-14) or type any custom ELO (400-3500):');
}

function showColorSelection() {
    currentState = GameState.COLOR_SELECT;
    printLine('');
    printLine('Choose your color:');
    printLine('  white  - Play as white');
    printLine('  black  - Play as black');
    printLine('  random - Random color assignment');
    printLine('');
}

function startGame() {
    chess = new Chess();
    moveHistory = [];
    currentState = GameState.PLAYING;

    printLine('');
    printLine('═══════════════════════════════════════════════════════════');
    printLine(`New game started! You are playing as ${playerColor}.`);
    printLine(`Opponent strength: ${selectedElo} ELO`);
    printLine('═══════════════════════════════════════════════════════════');
    printLine('');
    printLine('Game commands:');
    printLine('  <move>  - Make a move (e.g., e4, Nf3, O-O)');
    printLine('  board   - Show current board position');
    printLine('  back    - Take back last move');
    printLine('  new     - Start a new game');
    printLine('  quit    - Return to main menu');
    printLine('');

    configureStockfish();

    if (playerColor === 'black') {
        printLine('White to move (engine is thinking...)');
        waitingForEngine = true;
        requestEngineMove();
    } else {
        printLine('White to move. Enter your move:');
    }
}

function configureStockfish() {
    // UCI protocol to configure Stockfish
    stockfish.postMessage('uci');
    stockfish.postMessage('setoption name Skill Level value ' + eloToSkillLevel(selectedElo));
    stockfish.postMessage('setoption name UCI_LimitStrength value true');
    stockfish.postMessage('setoption name UCI_Elo value ' + selectedElo);
    stockfish.postMessage('isready');
}

function eloToSkillLevel(elo) {
    // Map ELO to Stockfish skill level (0-20)
    // Linear mapping for more granular control
    if (elo <= 400) return 0;
    if (elo <= 600) return 1;
    if (elo <= 800) return 3;
    if (elo <= 1000) return 5;
    if (elo <= 1200) return 7;
    if (elo <= 1400) return 9;
    if (elo <= 1600) return 11;
    if (elo <= 1800) return 13;
    if (elo <= 2000) return 14;
    if (elo <= 2200) return 16;
    if (elo <= 2400) return 17;
    if (elo <= 2600) return 18;
    if (elo <= 2800) return 19;
    if (elo <= 3000) return 20;
    return 20;
}

function requestEngineMove() {
    const fen = chess.fen();
    stockfish.postMessage('position fen ' + fen);
    stockfish.postMessage('go movetime 1000'); // 1 second think time
}

function makeEngineMove(moveStr) {
    try {
        // Convert UCI format to SAN
        const from = moveStr.substring(0, 2);
        const to = moveStr.substring(2, 4);
        const promotion = moveStr.length > 4 ? moveStr[4] : undefined;

        const move = chess.move({ from, to, promotion });

        if (move) {
            moveHistory.push(move);
            const moveNotation = move.san;
            printLine(`${chess.turn() === 'w' ? 'Black' : 'White'} plays: ${moveNotation}`, 'info');
            printLine('');

            checkGameStatus();

            if (currentState === GameState.PLAYING) {
                printLine(`${chess.turn() === 'w' ? 'White' : 'Black'} to move. Enter your move:`);
            }
        }
    } catch (e) {
        printLine('Engine error. Type "new" to restart.', 'error');
    }
}

function makePlayerMove(moveStr) {
    try {
        const move = chess.move(moveStr, { sloppy: true });

        if (move) {
            moveHistory.push(move);
            printLine(`You play: ${move.san}`, 'info');
            printLine('');

            checkGameStatus();

            if (currentState === GameState.PLAYING) {
                printLine('Engine is thinking...');
                waitingForEngine = true;
                setTimeout(() => requestEngineMove(), 100);
            }
        } else {
            printLine('Illegal move. Try again.', 'error');
        }
    } catch (e) {
        printLine('Invalid move format. Use algebraic notation (e.g., e4, Nf3, O-O)', 'error');
    }
}

function checkGameStatus() {
    if (chess.in_checkmate()) {
        printLine('');
        printLine('════════════════════════════════════════', 'info');
        printLine(`CHECKMATE! ${chess.turn() === 'w' ? 'Black' : 'White'} wins!`, 'info');
        printLine('════════════════════════════════════════', 'info');
        printLine('');
        printLine('Type "new" to play again or "quit" to return to menu.');
        currentState = GameState.MENU;
    } else if (chess.in_draw()) {
        printLine('');
        printLine('════════════════════════════════════════', 'info');
        printLine('DRAW! Game over.', 'info');
        printLine('════════════════════════════════════════', 'info');
        printLine('');
        printLine('Type "new" to play again or "quit" to return to menu.');
        currentState = GameState.MENU;
    } else if (chess.in_stalemate()) {
        printLine('');
        printLine('════════════════════════════════════════', 'info');
        printLine('STALEMATE! Game over.', 'info');
        printLine('════════════════════════════════════════', 'info');
        printLine('');
        printLine('Type "new" to play again or "quit" to return to menu.');
        currentState = GameState.MENU;
    } else if (chess.in_check()) {
        printLine(`${chess.turn() === 'w' ? 'White' : 'Black'} is in check!`, 'warning');
    }
}

function takeBackMove() {
    if (moveHistory.length < 2) {
        printLine('No moves to take back.', 'error');
        return;
    }

    // Take back both player and engine moves
    chess.undo();
    chess.undo();
    moveHistory.pop();
    moveHistory.pop();

    printLine('Took back last move.', 'info');
    printLine('');
    printLine(`${chess.turn() === 'w' ? 'White' : 'Black'} to move. Enter your move:`);
}

function showBoard() {
    printLine('');
    const board = renderBoard();
    board.split('\n').forEach(line => printLine(line, 'board'));
    printLine('');
    printLine(`${chess.turn() === 'w' ? 'White' : 'Black'} to move.`);
}

function renderBoard() {
    const board = chess.board();
    let output = '  ┌───┬───┬───┬───┬───┬───┬───┬───┐\n';

    for (let i = 0; i < 8; i++) {
        output += `${8 - i} │`;
        for (let j = 0; j < 8; j++) {
            const piece = board[i][j];
            if (piece) {
                output += ` ${getPieceSymbol(piece)} │`;
            } else {
                output += '   │';
            }
        }
        output += ` ${8 - i}\n`;
        if (i < 7) {
            output += '  ├───┼───┼───┼───┼───┼───┼───┼───┤\n';
        }
    }

    output += '  └───┴───┴───┴───┴───┴───┴───┴───┘\n';
    output += '    a   b   c   d   e   f   g   h';

    return output;
}

function getPieceSymbol(piece) {
    const symbols = {
        'p': '♙', 'n': '♘', 'b': '♗', 'r': '♖', 'q': '♕', 'k': '♔',
        'P': '♟', 'N': '♞', 'B': '♝', 'R': '♜', 'Q': '♛', 'K': '♚'
    };
    // White pieces are uppercase, black pieces are lowercase
    const key = piece.color === 'w' ? piece.type.toUpperCase() : piece.type.toLowerCase();
    return symbols[key] || '?';
}

function handleInput(input) {
    const command = input.trim().toLowerCase();

    printLine(`> ${input}`);

    if (command === '') return;

    // Global commands
    if (command === 'help') {
        showHelp();
        return;
    }

    if (command === 'clear') {
        clearTerminal();
        return;
    }

    if (command === 'quit') {
        if (currentState === GameState.PLAYING) {
            printLine('Game abandoned.', 'warning');
        }
        chess = null;
        showMenu();
        return;
    }

    // State-specific handling
    switch (currentState) {
        case GameState.MENU:
            if (command === 'start') {
                showEloSelection();
            } else {
                printLine('Unknown command. Type "help" for available commands.', 'error');
            }
            break;

        case GameState.ELO_SELECT:
            handleEloInput(input.trim());
            break;

        case GameState.COLOR_SELECT:
            handleColorInput(command);
            break;

        case GameState.PLAYING:
            handleGameInput(input.trim(), command);
            break;
    }
}

function handleEloInput(input) {
    const eloMap = {
        '1': 400,
        '2': 800,
        '3': 1000,
        '4': 1200,
        '5': 1400,
        '6': 1600,
        '7': 1800,
        '8': 2000,
        '9': 2200,
        '10': 2400,
        '11': 2600,
        '12': 2800,
        '13': 3000,
        '14': 3200
    };

    if (eloMap[input]) {
        selectedElo = eloMap[input];
        showColorSelection();
    } else {
        const customElo = parseInt(input);
        if (!isNaN(customElo) && customElo >= 400 && customElo <= 3500) {
            selectedElo = customElo;
            showColorSelection();
        } else {
            printLine('Invalid selection. Enter 1-14 or custom ELO (400-3500).', 'error');
        }
    }
}

function handleColorInput(command) {
    if (command === 'white') {
        playerColor = 'white';
        startGame();
    } else if (command === 'black') {
        playerColor = 'black';
        startGame();
    } else if (command === 'random') {
        playerColor = Math.random() < 0.5 ? 'white' : 'black';
        startGame();
    } else {
        printLine('Invalid choice. Enter "white", "black", or "random".', 'error');
    }
}

function handleGameInput(input, command) {
    if (command === 'new') {
        printLine('Starting new game...', 'info');
        showEloSelection();
    } else if (command === 'board') {
        showBoard();
    } else if (command === 'back') {
        takeBackMove();
    } else if (waitingForEngine) {
        printLine('Please wait for the engine to move.', 'warning');
    } else {
        // Treat as a move
        makePlayerMove(input);
    }
}

function showHelp() {
    printLine('');
    printLine('Available commands:');
    printLine('  help   - Show this help message');
    printLine('  clear  - Clear the terminal');
    printLine('  start  - Start a new game (from menu)');
    printLine('  quit   - Return to main menu');
    printLine('');
    printLine('In-game commands:');
    printLine('  <move> - Make a move (e.g., e4, Nf3, O-O-O)');
    printLine('  board  - Display ASCII board');
    printLine('  back   - Take back last move');
    printLine('  new    - Start a new game');
    printLine('');
}

function printLine(text, type = '') {
    const output = document.getElementById('output');
    const line = document.createElement('div');
    line.className = 'output-line' + (type ? ' ' + type : '');
    line.textContent = text;
    output.appendChild(line);

    // Auto-scroll to bottom
    const terminal = document.getElementById('terminal');
    terminal.scrollTop = terminal.scrollHeight;
}

function clearTerminal() {
    document.getElementById('output').innerHTML = '';
    printLine('Terminal cleared.');
    printLine('');
    if (currentState === GameState.MENU) {
        showMenu();
    }
}

function setupInputHandler() {
    const input = document.getElementById('input');

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const value = input.value;
            handleInput(value);
            input.value = '';
        }
    });

    // Keep input focused
    input.focus();
    document.addEventListener('click', () => input.focus());
}
