import { useState, useEffect } from 'react'
import { nanoid } from "nanoid"
import Dice from "./Dice"
import Confetti from "react-confetti"

export default function App() {
    const [dices, setDices] = useState(() => generateNewDices())
	const [roll, setRoll] = useState(0)
	const [time, setTime] = useState(0)
	const [bestTime, setBestTime] = useState()

	const winGame = dices.every(dice => dice.isHeld && dice.value === dices[0].value)

	function generateNewDices() {
		return (
			new Array(10).fill(0).map(() => ({
				id: nanoid(),
				value: Math.ceil(Math.random() * 6),
				isHeld: false
			}))
		)
	}

	function clickDice(id) {
		setDices(oldDices => oldDices.map(dice => (
			dice.id === id ? {...dice, isHeld: !dice.isHeld} : dice
		)))
	}

	function rollDices() {
		setDices(oldDices => oldDices.map(dice => (
			dice.isHeld ? dice : {...dice, value: Math.ceil(Math.random() * 6)}
		)))
		setRoll(oldCount => oldCount + 1)
	}

	function newGame() {
		setDices(generateNewDices())
		setRoll(0)
		setTime(0)
	}
	
	useEffect(() => {
		if (!winGame) {
			const timer = setInterval(() => {
				setTime(prev => prev + 1)
			}, 1000)

			return () => clearInterval(timer)
		} else {
			setBestTime(oldBestTime => !oldBestTime ? time : oldBestTime < time ? oldBestTime : time)
		}
	}, [winGame])

	const dicesEl = dices.map(dice => 
		<Dice 
			value={dice.value}
			key={dice.id}
			id={dice.id}
			isHeld={dice.isHeld}
			click={clickDice}
		/>
	)
    
    return (
		<main>
			{winGame ? <Confetti /> : ""}
			<div aria-live="polite" className="sr-only">
                {winGame && <p>Congratulations! You won! Press "New Game" to start again.</p>}
            </div>
			<div className="game-container">
				<div className="title-container">
					<h1 className="title">Tenzi</h1>
           			<p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
				</div>
				<div className="count-container">
					<div className="count-info">
						<div>Rolls</div>
						<div id="rolls">{roll}</div>
					</div>
					<div className="count-info">
						<div>Best Time</div>
						<div id="best-time">{bestTime ? bestTime : 0}</div>
					</div>
					<div className="count-info">
						<div>Time</div>
						<div id="current-time">{time}</div>
					</div>
				</div>
				<div className="dices-container">
					{dicesEl}
				</div>
				<button 
					className="roll-button"
					onClick={winGame ? newGame : rollDices}
				>
					{winGame ? "New Game" : "Roll"}
				</button>
			</div>
		</main>
    )
}

