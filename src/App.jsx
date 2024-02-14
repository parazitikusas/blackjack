import "./App.css";
import { useEffect, useState } from "react";
import UsersHand from "./UsersHand";
import DealersHand from "./DealersHand";

import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

function createDeck() {
	let deck = [];
	let suits = ["S", "H", "D", "C"];
	let values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

	for (let suit in suits) {
		for (let value in values) {
			deck.push(suits[suit] + values[value]);
			deck.push(suits[suit] + values[value]);
			deck.push(suits[suit] + values[value]);
			deck.push(suits[suit] + values[value]);
		}
	}
	return deck;
}

function getRandCard() {
	if (deck.length === 0) {
		deck = createDeck();
		alert("Shuffling the deck");
	}
	let randomIdx = Math.floor(Math.random() * deck.length);
	var card = deck[randomIdx];
	deck.splice(randomIdx, 1);
	return card;
}

function getSum(hand) {
	let sum = 0;
	let aces = 0;
	for (let card in hand) {
		let value = hand[card].substring(1);
		if (value === "J" || value === "Q" || value === "K") {
			sum += 10;
		} else if (value === "A") {
			aces++;
			sum += 11;
		} else {
			sum += parseInt(value);
		}
	}
	while (sum > 21 && aces > 0) {
		sum -= 10;
		aces--;
	}
	return sum;
}

function stylePage(status) {
	let message = document.getElementById("status");
	let bal = document.querySelector(".bet");
	if (status === "win") {
		message.style.backgroundColor = "green";
	} else if (status === "lost") {
		message.style.backgroundColor = "red";
		bal.classList.add("lostBal");
	} else if (status === "draw") {
		message.style.backgroundColor = "grey";
		bal.classList.add("drawBal");
	}
}

let deck = createDeck();

function App() {
	const [usersHand, setUsersHand] = useState([]);
	const [usersSum, setUsersSum] = useState(0);
	const [dealersHand, setDealersHand] = useState([]);
	const [dealersSum, setDealersSum] = useState(0);
	const [status, setStatus] = useState("");
	const [balance, setBalance] = useState(100);
	const [bet, setBet] = useState(0);
	const [betPlaced, setBetPlaced] = useState(false);

	function drawCard() {
		let card = getRandCard();
		console.log(deck.length);
		setUsersHand([...usersHand, card]);
		setUsersSum(getSum([...usersHand, card]));
		checkStatus(card);
	}

	function resetBet(status) {
		if (status === "win") {
			setBalance(balance + bet);
		} else if (status === "lost") {
			setBalance(balance - bet);
		}
	}

	function checkStatus(card) {
		if (getSum([...usersHand, card]) > 21) {
			// Checking if user busts, not calling endDealer at all
			setStatus("lost");
			document.getElementById("status").innerHTML = "You lost!";
			console.log("User busts");
			let lastCard = getRandCard();
			setDealersHand([...dealersHand, lastCard]);
			setDealersSum(getSum([...dealersHand, lastCard]));
		} else if (getSum([...usersHand, card]) === 21) {
			checkWinner([...usersHand, card]);
		}
	}

	function checkWinner(usersHand) {
		let dealersHand = dealerEnd();
		let usersSum = getSum(usersHand);
		console.log("user", usersSum, "dealer", getSum(dealersHand));

		if (usersSum === getSum(dealersHand)) {
			setStatus("draw");
			document.getElementById("status").innerHTML = "Draw!";
		} else if (usersSum > getSum(dealersHand) || getSum(dealersHand) > 21) {
			console.log(usersHand, dealersHand);
			console.log("Higher amount than dealer");
			setStatus("win");
			document.getElementById("status").innerHTML = "You won!";
		} else {
			setStatus("lost");
			document.getElementById("status").innerHTML = "You lost!";
		}
	}

	function stand() {
		checkWinner(usersHand);
	}

	function initGame() {
		let initCard1 = getRandCard();
		let initCard2 = getRandCard();
		let initCard3 = getRandCard();
		setUsersHand([initCard2, initCard3]);
		setUsersSum(getSum([initCard2, initCard3]));
		setDealersHand([initCard1]);
		setDealersSum(getSum([initCard1]));
		setStatus("");
		setBet(0);
		setBetPlaced(false);
		document.getElementById("status").innerHTML = "";
	}

	useEffect(() => {
		initGame();
	}, []);

	useEffect(() => {
		resetBet(status);
		stylePage(status);
	}, [status]);

	function dealerEnd() {
		let newHand = dealersHand;
		while (getSum(newHand) <= 16) {
			let card = getRandCard();
			newHand = [...newHand, card];
			setDealersHand(newHand);
			setDealersSum(getSum(newHand));
		}
		return newHand;
	}

	return (
		<>
			{balance === 0 ? (
				<div className="rubik">
					<h2 className="rubik balance">Balance: ${balance}</h2>
					<h1 className="text-danger">You are in bankruptcy</h1>
					<h2 className="mx-5">Would you like to sell your house to continue gambling?</h2>
					<button onClick={() => {setBalance(100000); initGame()}} className="controls hit house" >
						Sell your house
					</button>
				</div>
			) : (
				<>
					<>
						<h1 className="honk">Blackjack</h1>
						<h2 id="status" className="rubik"></h2>
						{!betPlaced && (
							<div className="setbet mx-auto rubik">
								<h2 className="rubik balance">Balance: ${balance}</h2>
								<button onClick={() => setBet(Math.max(0, bet - 1))} className="sub">
									-1
								</button>
								<button onClick={() => setBet(Math.max(0, bet - 10))} className="sub">
									-10
								</button>
								<h2 className="d-inline">
									<span className="badge mt-3">${bet}</span>
								</h2>
								<button onClick={() => setBet(Math.min(bet + 1, balance))} className="add">
									+1
								</button>
								<button onClick={() => setBet(Math.min(bet + 10, balance))} className="add">
									+10
								</button>
								{bet > 0 && (
									<button
										onClick={() => bet > 0 && setBetPlaced(true)}
										className="d-block mx-auto mt-3"
									>
										Place bet
									</button>
								)}
							</div>
						)}
						{betPlaced && <h2 className="bet rubik">Bet: ${bet}</h2>}
						{status === "" && betPlaced && (
							<button onClick={drawCard} className="controls hit">
								Hit
							</button>
						)}
						{status === "" && betPlaced && (
							<button onClick={stand} className="controls stand">
								Stand
							</button>
						)}
						{status !== "" && (
							<button onClick={initGame} className="controls">
								Reset
							</button>
						)}
						<br />
						{betPlaced && (
							<div>
								<UsersHand cards={usersHand} sum={usersSum} />
								<DealersHand cards={dealersHand} sum={dealersSum} />
							</div>
						)}
					</>
				</>
			)}
		</>
	);
}

export default App;
