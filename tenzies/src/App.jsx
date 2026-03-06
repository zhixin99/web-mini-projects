import { useState } from 'react'
import { nanoid } from "nanoid"
import Dice from "./Dice"

export default function App() {
    const [dices, setDices] = useState(() => generateNewDices())

	function generateNewDices() {
		return (
			new Array(10).fill(0).map(() => ({
				id: nanoid(),
				value: Math.ceil(Math.random() * 6),
				isHeld: false
			}))
		)
	}

	const dicesEl = dices.map(dice => 
		<Dice 
			value={dice.value}
			key={dice.id}
			id={dice.id}
			isHeld={dice.isHeld}
		/>
	)
    
    return (
		<main>
			<div className="game-container">
				<div className="title-container">
					<h1 className="title">Tenzies</h1>
           			<p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
				</div>
				<div className="count-container">
					<div className="count-info">
						<div>Rolls</div>
						<div id="rolls">1</div>
					</div>
					<div className="count-info">
						<div>Best Time</div>
						<div id="best-time">1</div>
					</div>
					<div className="count-info">
						<div>Time</div>
						<div id="current-time">1</div>
					</div>
				</div>
				<div className="dices-container">
					{dicesEl}
				</div>
				<button className="roll-button">Roll</button>
			</div>
		</main>
    )
}

