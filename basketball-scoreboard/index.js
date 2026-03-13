const homeScore = document.getElementById("home-score")
const guestScore = document.getElementById("guest-score")
const startPauseBtn = document.getElementById("start-pause-btn")
const newGameBtn = document.getElementById("new-game")

let homeNumber = 0
let guestNumber = 0
let totalSeconds = 48 * 60
let isRunning = false
let timerInterval = null

document.getElementById("home-guest-container").addEventListener("click", (e) => {
    const id = e.target.id

    if (!id || id === "home-guest-container") return

    if (id === "home-one") {
        homeNumber ++ 
    } else if (id === "home-two") {
        homeNumber += 2
    } else if (id === "home-three") {
        homeNumber +=3
    } else if (id === "guest-one") {
        guestNumber ++
    } else if (id === "guest-two") {
        guestNumber += 2
    } else if (id === "guest-three") {
        guestNumber += 3
    }
    
    homeScore.textContent = homeNumber
    guestScore.textContent = guestNumber
})


function updateTimer() {
    totalSeconds --
    document.getElementById("timer-display").textContent = `${(Math.floor(totalSeconds / 60)).toString().padStart(2, '0')}:${(totalSeconds % 60).toString().padStart(2, '0')}`
}


function startPauseTimer() {
    newGameBtn.disabled = false
    if (isRunning) {
        clearInterval(timerInterval)
        startPauseBtn.textContent = "Start"
    } else {
        timerInterval = setInterval(() => {
            if (totalSeconds > 0) {
                updateTimer()
            } else {
                clearInterval(timerInterval)
                alert("Game over!")
                startPauseBtn.disabled = true; 
            }
        }, 1000)
        startPauseBtn.textContent = "Pause"
    }

    isRunning = !isRunning
}

startPauseBtn.addEventListener("click", startPauseTimer)

newGameBtn.addEventListener("click", () => {
    homeNumber = 0
    guestNumber = 0
    homeScore.textContent = homeNumber
    guestScore.textContent = guestNumber
    isRunning = false
    totalSeconds = 48 * 60
    clearInterval(timerInterval)
    startPauseBtn.disabled = false; 
    startPauseTimer()
})
