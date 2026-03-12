# Tenzi
<img src="./images/screenshoot-of-tenzi.png" alt="tenzi game" width="300">

## Install
```
npm install nanoid
npm install react-confetti
```

## Steps
### 1. Basic structure
* Decide the design and create the basic html and css.
* Create App and Dice Component.
* Decide the main state called **dices** in the App component, which should store all the information of all the dices (as a shared state), and pass the information to each Dice component. 
* Create a *generateNewDices* function to create an array of 10 objects because we have 10 dices, and trigger it on the first render. For each dice, it has 3 keys: 
    * value: generate a random number
    * id: use nanoid 
    * isHeld: default to be false
*  to generate random value.
* Map over the state dices, pass the props(value, id, isHeld) and render the Dice component.
```jsx
// App.jsx
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
			isHeld={dice.isHeld}
		/>
	)
    
    return (
		<main>
			<div className="game-container">
				<div className="title-container">
					<h1 className="title">Tenzi</h1>
           			<p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
				</div>
				<div className="dices-container">
					{dicesEl}
				</div>
			</div>
		</main>
    )
}
```
```jsx
// Dice.jsx
export default function Dice(props) {
    return (
        <button>
            {props.value}
        </button>
    )
}
```

### 2. Enable the hold feature
* Generate a *clickDice* function in App, and pass it as props to Dice.
* When a dice is clicked, the *clickDice* function is triggered (dice id is the parameter), and the Dice component passes the dice id back to the App component. App will toggle the isHeld property in the state **dices** based on the id.
* Visualize the isHeld status by add a different color to the held dice.
```jsx
// App.jsx
function clickDice(id) {
    setDices(oldDices => oldDices.map(dice => (
        dice.id === id ? {...dice, isHeld: !dice.isHeld} : dice
    )))
}

const dicesEl = dices.map(dice => 
    <Dice 
        value={dice.value}
        key={dice.id}
        isHeld={dice.isHeld}
        click={clickDice}
    />
)
```
```jsx
// Dice.jsx
    function handleClick() {
        props.click(props.id)
    }

    return (
        <button 
            className={`dice ${props.isHeld ? "is-held" : ""}`}
            onClick={handleClick}
        >
            {props.value}
        </button>
    )
```

### 3. Enable the roll and new Game feature
* Generate a *rollDices* function in App.
    *  When the roll button is clicked, trigger the *rollDices* function, update the value property in the state **dices** if isHeld property is false. 
* Create a *newGame* function, which triggers the *generateNewDices* function.
    * Create a variable called **winGame**. When all the dices have the same value, and all the dices are held, winGame is true.
    * Trigger the *newGame* function when clicking the new game button.
* Update the button text and function based on if **winGame** is true. 

```jsx
// App.jsx
function rollDices() {
    setDices(oldDices => oldDices.map(dice => (
        dice.isHeld ? dice : {...dice, value: Math.ceil(Math.random() * 6)}
    )))
}

const winGame = dices.every(dice => dice.isHeld && dice.value === dices[0].value)

function newGame() {
    setDices(generateNewDices())
}
    
return (
    <main>
            ...
            <button 
                className="roll-button"
                onClick={winGame ? newGame : rollDices}
            >
                {winGame ? "New Game" : "Roll"}
            </button>
        </div>
    </main>
)
```

### 4. Add the counter
* Count the roll
    * Create a state called **count**.
    * Increase the state **count** everytime when the roll button is clicked, and reset it to 0 when new game button is clicked.
* Count the time
    * Create a state called **time**.
    * If **winGame** is false, use useEffect and setInterval to rerender the **time** state every second.
    * When new game is clicked, reset it to 0;
* Best time
    * When **winGame** is true, compare the current time with the old bestTime to decide the new bestTime.
```jsx
// App.jsx
import { useEffect } from "react"

const [roll, setRoll] = useState(0)
const [time, setTime] = useState(0)
const [bestTime, setBestTime] = useState()

function rollDices() {
    ...
    setRoll(oldCount => oldCount + 1)
}

function newGame() {
    ...
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

return (
    <main>
        ...
        <div className="count-container">
            <div className="count-info">
                <div>Rolls</div>
                <div id="rolls">{roll}</div>
            </div>
            <div className="count-info">
                <div>Best Time</div>
                <div id="best-time">{`${bestTime ? bestTime : 0} s`}</div>
            </div>
            <div className="count-info">
                <div>Time</div>
                <div id="current-time">{`${time} s`}</div>
            </div>
        ...
    </main>
)
```

### 5. Styling 
* Style the dice with pips:
    * Create a **pipMap** object: key is the pip value, value is an array of the positions for the dots. 
    * In css, put each dot into the correct position on the dice, from 1st dot to 9th dot
    * Create the dotsEl: Find the position array based on the passed **value** property, map over the array and create a new array of the jsx element.
* Add the confetti from react-confetti library when winning the game.
```jsx
// Dice.jsx
const pipMap = {
    1: [5],
    2: [1, 9],
    3: [1, 5, 9],
    4: [1, 3, 7, 9],
    5: [1, 3, 5, 7, 9],
    6: [1, 3, 4, 6, 7, 9]
}

const dotsEl = pipMap[props.value].map(dotPos => 
    <span 
        className={`dot pos-${dotPos}`}
        key={dotPos}
    >
    </span>
)

return (
    <button 
        ...
    >
        {dotsEl}
    </button>
)
```
```css
.dice {
    ...
	display: grid; 
	grid-template: repeat(3, 1fr) / repeat(3, 1fr);
}

.pos-1 {
	grid-area: 1 / 1
}

.pos-2 {
	grid-area: 1 / 2
}

.pos-3 {
	grid-area: 1 / 3
}

.pos-4 {
	grid-area: 2 / 1
}

.pos-5 {
	grid-area: 2 / 2
}

.pos-6 {
	grid-area: 2 / 3
}

.pos-7 {
	grid-area: 3 / 1
}

.pos-8 {
	grid-area: 3 / 2
}

.pos-9 {
	grid-area: 3 / 3
}
```

### 6. Accessibility
* Add the aria-label, aria-pressed and aria-live.
```jsx
// App.jsx
return (
    <main>
        <div aria-live="polite" className="sr-only">
            {winGame && <p>Congratulations! You won! Press "New Game" to start again.</p>}
        </div>
    </main>
)
```
```jsx
// Dice.jsx
return (
    <button 
        ...
        aria-label={`A dice with value ${props.value}`}
        aria-pressed={props.held}
    >
        {dotsEl}
    </button>
)
```