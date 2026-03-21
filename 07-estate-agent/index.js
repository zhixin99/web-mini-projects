import {propertyForSaleArr} from "./properties/propertyForSaleArr.js"
import {placeholderPropertyObj} from "./properties/placeholderPropertyObj.js"

function getPropertyHtml(data=[placeholderPropertyObj]) {
        
    return data.map( property => {
        const {image, propertyLocation, priceGBP, comment, roomsM2} = property
        
        return `
        <section class="card">
            <img src="./images/${image}">
            <div class="card-right">
                <h2>${propertyLocation}</h2>
                <h3>${priceGBP}</h3>
                <p>${comment}</p>
                <h3>${roomsM2.reduce( (total, currentValue) => total + currentValue)} m&sup2;</h3>
            </div>
        </section> 
        `
    }).join("")
}

document.getElementById('container').innerHTML = getPropertyHtml(propertyForSaleArr)