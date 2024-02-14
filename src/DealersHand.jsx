import Card from "./card";
import { v4 as uuid } from "uuid";
import "./styles.css";
export default function DealersHand({ cards, sum }) {
	return (
		<>
			<h2 className="rubik hand-amount">Dealers Hand {cards.length !== 1 && `(${sum})`}</h2>
			{cards.map((card) => (
				<Card key={uuid()} card={card} />
			))}
            {cards.length === 1 && <Card card="back" />}
		</>
	);
}
