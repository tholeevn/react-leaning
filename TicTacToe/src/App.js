import {useState} from 'react';

function PlayColor(player) {
    return player ? player.toLowerCase() + '-player' : 'empty-player';
}

function Square({value, onSquareClick}) {
    const className = 'square ' + PlayColor(value);
    return (<button className={className} onClick={onSquareClick}>{value}</button>);
}

function calculateWinner(squares) {
    const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6],];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}


// Render the board with improved row rendering
function Board({ currentMove, squares, onPlay }) {
    const BOARD_SIZE = 3;

    const winner = calculateWinner(squares);
    let status;
    let process;

    if (winner) {
        status = 'Winner: ' + winner;
    } else {
        const nextPlayer = currentMove % 2 ? 'X' : 'O';
        status = 'Next player: ' + nextPlayer;
    }

    function handleClick(i) {
        const nextSquare = squares.slice();
        if (squares[i] || calculateWinner(squares)) {
            return;
        }
        nextSquare[i] = currentMove % 2 ? 'X' : 'O';
        onPlay(nextSquare);

        calculateWinner(squares);
    }

    function renderCell(row, col) {
        const index = row * BOARD_SIZE + col;
        return (
            <Square
                key={`${row}-${col}`}
                value={squares[index]}
                onSquareClick={() => handleClick(index)}
            />
        );
    }

    // Renamed from renderRow; now uses an array instead of string concatenation
    function renderBoardRow(rowIndex) {
        const cells = Array.from({ length: BOARD_SIZE }, (_, col) =>
            renderCell(rowIndex, col)
        );
        return <div className="board-row" key={rowIndex}>{cells}</div>;
    }

    // Extracted: render full board, replacing manual row calls and fixing off-by-one
    function renderBoard() {
        return Array.from({ length: BOARD_SIZE }, (_, row) => renderBoardRow(row));
    }

    return (
        <>
            <div className="current-player">{process}</div>
            <div className="status">{status}</div>
            {renderBoard()}
        </>
    );
}


export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const currentSquare = history[currentMove];

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
        setHistory(history.slice(0, nextMove + 1));
    }

    const moves = history.map((squares, move) => {
        let description;
        if (move > 0) {
            description = 'Go to move #' + move;
        } else {
            description = 'Go to game start';
        }
        return (<li>
            <button onClick={() => jumpTo(move)}>{description}</button>
        </li>)
    })

    return (<div className="game">
        <div className="game-board">
            <Board currentMove={currentMove} squares={currentSquare} onPlay={handlePlay}/>
        </div>
        <div className="game-info">
            <ol>{moves}</ol>
        </div>
    </div>);
}