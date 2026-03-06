export default function Dice(props) {
    function handleClick() {
        props.click(props.id)
    }

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
            className={`dice ${props.isHeld ? "is-held" : ""}`}
            onClick={handleClick}
            aria-label={`A dice with value ${props.value}`}
            aria-pressed={props.held}
        >
            {dotsEl}
        </button>
    )
}