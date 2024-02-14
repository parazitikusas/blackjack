import Card from "./card";
import {v4 as uuid} from 'uuid';
import "./App.css";


export default function UsersHand({cards, sum}) {
    return (
			<>
				<h2 className="rubik hand-amount">Your Hand ({sum})</h2>
				{cards.map((card) => (
					<Card key={uuid()} card={card} />
				))}
			</>
		);
}