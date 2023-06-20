import React, { useState } from "react";

function Board() {
	const [squares, setSquares] = useState(Array(9).fill(null));
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
		const squareValue = squares[i];
		const isX = squareValue === "X";
		const winnerSquare = (squares) => {
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
				if (
					squares[a] &&
					squares[a] === squares[b] &&
					squares[a] === squares[c]
				) {
					return [a, b, c];
				}
			}
		};
		// function functionWinnerSquare(squares) {
		// 	const lines = [
		// 		[0, 1, 2],
		// 		[3, 4, 5],
		// 		[6, 7, 8],
		// 		[0, 3, 6],
		// 		[1, 4, 7],
		// 		[2, 5, 8],
		// 		[0, 4, 8],
		// 		[2, 4, 6],
		// 	];
		// 	for (let i = 0; i < lines.length; i++) {
		// 		const [a, b, c] = lines[i];
		// 		if (
		// 			squares[a] &&
		// 			squares[a] === squares[b] &&
		// 			squares[a] === squares[c]
		// 		) {
		// 			return [a, b, c];
		// 		}
		// 	}
		// }
		// const winnerSquare = functionWinnerSquare(squares);
		const highlight = winner && winnerSquare(squares).includes(i);

		return (
			<button
				type="button"
				className={`square-large btn border  p-3 m-2 ${
					isX ? "x-color" : "o-color"
				} ${highlight ? "winner-square border-info" : "border-dark"} `}
				onClick={() => selectSquare(i)}
			>
				{squares[i]}
			</button>
		);
	}

	return (
		<div className="container p-3">
			<div className="row justify-content-center">{status}</div>
			<div className="row">
				<div className="col">{renderSquare(0)}</div>
				<div className="col">{renderSquare(1)}</div>
				<div className="col">{renderSquare(2)}</div>
			</div>
			<div className="row">
				<div className="col">{renderSquare(3)}</div>
				<div className="col">{renderSquare(4)}</div>
				<div className="col">{renderSquare(5)}</div>
			</div>
			<div className="row">
				<div className="col">{renderSquare(6)}</div>
				<div className="col">{renderSquare(7)}</div>
				<div className="col">{renderSquare(8)}</div>
			</div>
			<div className="row mt-3 justify-content-center">
				<button
					type="button"
					className="btn btn-warning btn-outline-dark col-5"
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

function calculateStatus(winner, squares, nextValue) {
	return winner
		? `Winner: ${winner}`
		: squares.every(Boolean)
		? `Scratch: Cat's game`
		: `Next player: ${nextValue}`;
}

function calculateNextValue(squares) {
	return squares.filter(Boolean).length % 2 === 0 ? "X" : "O";
}

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
