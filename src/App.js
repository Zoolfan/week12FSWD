import * as React from "react";

function Board() {
	const [squares, setSquares] = React.useState(Array(9).fill(null));
	const nextValue = calculateNextValue(squares);
	const winner = calculateWinner(squares);
	const status = calculateStatus(winner, squares, nextValue);

	function selectSquare(square) {
		if (winner || squares[square]) {
			return;
		}
		const squaresCopy = [...squares];
		squaresCopy[square] = nextValue;
		setSquares(squaresCopy);
	}

	function restart() {
		setSquares(Array(9).fill(null));
	}

	function renderSquare(i) {
		return (
			<button
				type="button"
				class="btn btn-danger border border-dark p-3 m-2"
				onClick={() => selectSquare(i)}
			>
				{squares[i]}
			</button>
		);
	}

	return (
		<div class="container p-2">
			<div class="row justify-content-md-center">{status}</div>
			<div class="row justify-content-md-center">
				<div class="col col-lg-1">{renderSquare(0)} </div>
				<div class="col col-lg-1">{renderSquare(1)} </div>
				<div class="col col-lg-1">{renderSquare(2)} </div>
			</div>
			<div class="row justify-content-md-center">
				<div class="col col-lg-1">{renderSquare(3)} </div>
				<div class="col col-lg-1">{renderSquare(4)} </div>
				<div class="col col-lg-1">{renderSquare(5)} </div>
			</div>
			<div class="row justify-content-md-center">
				<div class="col col-lg-1">{renderSquare(6)} </div>
				<div class="col col-lg-1">{renderSquare(7)} </div>
				<div class="col col-lg-1">{renderSquare(8)} </div>
			</div>
			<div class="row justify-content-md-center">
				<button
					type="button"
					class="btn btn-warning btn-outline-dark col-lg-1"
					onClick={restart}
				>
					RESTART
				</button>
			</div>
		</div>
	);
}

function Game() {
	return (
		<div>
			<div>
				<Board />
			</div>
		</div>
	);
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
	return winner
		? `Winner: ${winner}`
		: squares.every(Boolean)
		? `Scratch: Cat's game`
		: `Next player: ${nextValue}`;
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
	return squares.filter(Boolean).length % 2 === 0 ? "X" : "O";
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}
	return null;
}

function App() {
	return <Game />;
}

export default App;
