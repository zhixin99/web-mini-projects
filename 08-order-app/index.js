import {menuArray} from "./data.js"
let orderArray = []
const paymentContainer = document.getElementById("payment-container")
const paymentForm = document.getElementById("payment-form")

function renderOrderSection() {
    const orderEl = menuArray.map(menu => `
        <div class="each-container">
            <span class="food-img">${menu.emoji}</span>
            <div class="menu-details">
                <h2>${menu.name}</h2>
                <p>${menu.ingredients.join(", ")}</p>
                <p>$${menu.price}</p>
            </div>
            <button data-order-id="${menu.id}">+</button>
        </div>
        `).join("")
    
    document.getElementById("order-container").innerHTML = orderEl
}

renderOrderSection()

function renderSummarySection() {
    const totalPrice = orderArray.reduce((total, currentValue) => total + currentValue.price * currentValue.orders, 0)
    const summaryEl = orderArray.map(menu => `
        <div class="single-ordered-product-container">
            <div class="summary-name">${menu.name} x ${menu.orders}</div>
            <button data-remove-id=${menu.id}>remove</button>
            <div class="summary-price">$${menu.price * menu.orders}</div>
        </div>
        `).join("") + `
        <hr>
        <div class="total-price-container">
            <div>Total price: </div>
            <div class="total-price" id="total-price">$${totalPrice}</div>
        </div>
        `
    document.getElementById("summary-container").innerHTML = summaryEl
}

renderSummarySection() 

function renderCompleteButton() {
    const completeButton = document.getElementById("complete-button")
    completeButton.textContent = "Complete order"
    if (orderArray.length > 0) {
        completeButton.classList.remove("invisible")
    } else {
        completeButton.classList.add("invisible")
    }
}

document.addEventListener("click", (e) => {
    if (e.target.dataset.orderId) {
        addProduct(e.target.dataset.orderId)
    } else if (e.target.dataset.removeId) {
        removeProduct(e.target.dataset.removeId)
    } else if (e.target.id === "complete-button") {
        renderPayment()
    } 
})

paymentForm.addEventListener("submit", (e) => {
    e.preventDefault()
    closePayment()
    renderThankyou()
})

function addProduct(id) {
    const orderedProduct = menuArray.filter(menu => menu.id === Number(id))[0]
    if (orderArray.includes(orderedProduct)) {
        orderedProduct.orders ++
    } else {
        orderedProduct.orders ++ 
        orderArray.push(orderedProduct)
    }
    renderSummarySection()
    renderCompleteButton()
}

function removeProduct(id) {
    const removedProduct = menuArray.filter(menu => menu.id === Number(id))[0]
    orderArray = orderArray.filter(order => order !== removedProduct)
    removedProduct.orders = 0
    renderSummarySection()
    renderCompleteButton()
}

function renderPayment() {
    paymentContainer.classList.remove("invisible")
}

function closePayment() {
    paymentContainer.classList.add("invisible")
}

function renderThankyou() {
    const container = document.getElementById("summary-thankyou-container")
    container.innerHTML = `
        <h2 class="green-bg">Thanks! Your order is on its way!</h2>
    `
}
