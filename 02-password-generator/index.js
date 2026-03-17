const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"]
const charactersNoNumber = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"]
const charactersNoSymbols = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
const charactersLetterOnly = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]

const range = document.getElementById("password-length")
const lengthValue = document.getElementById("length-value")
const numberToggle = document.getElementById("number-toggle")
const symbolsToggle = document.getElementById("symbols-toggle")
const passwordOne= document.getElementById("password-one")
const passwordTwo= document.getElementById("password-two")

range.addEventListener("input", () => {
    lengthValue.textContent = range.value
})

function generatePasswordString() {
    let password = ""

    for (let i = 1; i <= range.value; i ++) {
        if (numberToggle.checked && symbolsToggle.checked) {
            password += characters[Math.floor(Math.random() * characters.length)]
        } else if (!numberToggle.checked && symbolsToggle.checked) {
            password += charactersNoNumber[Math.floor(Math.random() * charactersNoNumber.length)]
        } else if (numberToggle.checked && !symbolsToggle.checked) {
            password += charactersNoSymbols[Math.floor(Math.random() * charactersNoSymbols.length)]
        } else {
            password += charactersLetterOnly[Math.floor(Math.random() * charactersLetterOnly.length)]
        }
        
    }
    return password
}

document.getElementById("generate-btn").addEventListener("click", () => {
    passwordOne.textContent = generatePasswordString()
    passwordTwo.textContent = generatePasswordString()
})

function copyOnClick(button) {
    let text = button.textContent
    navigator.clipboard.writeText(button.textContent)
    button.textContent = "Copied!"
    setTimeout(() => {
        button.textContent = text
    }, 1000)
}

passwordOne.addEventListener("click", () => {
    copyOnClick(passwordOne)
})

passwordTwo.addEventListener("click", () => {
    copyOnClick(passwordTwo)
})