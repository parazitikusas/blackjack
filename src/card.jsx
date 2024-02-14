

export default function Card({card}) {

    const cardImage = `card_img/${card}.png`

    return (
			<>
				<img src={cardImage} alt=""/>
			</>
		);
}