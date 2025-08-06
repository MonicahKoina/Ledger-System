let search = document.getElementById("search")
let section = document.getElementById("section")
let savedSales = JSON.parse(localStorage.getItem("savedSales")) || []
console.log(savedSales)
let savedReturns = JSON.parse(localStorage.getItem("savedReturns")) || []
search.addEventListener("input", () => {
    let text = search.value.toLowerCase()
    let filtered = savedSales.filter((sale) =>
        sale.customerName.toLowerCase().includes(text) ||
        sale.itemName.toLowerCase().includes(text)
    );
    section.innerHTML = ""
    if (filtered.length === 0) {
        section.innerHTML = "<p>No Results Found</p>"
        return
    }
    filtered.forEach((sale) => {
        let card = document.createElement("div")
        card.className = "card"
        card.style = "padding: 10px"
        card.innerHTML = ` 
        <p class="mb-2"><strong>Invoice : </strong>${sale.invoice}</p>
        <p class="mb-2"><strong>Date: </strong>${sale.date}</p>
        <p class="mb-2"><strong>Customer Name:</strong> ${sale.customerName}</p>
        <p class="mb-2"><strong>Item Name:</strong> ${sale.itemName} </p>
        <p class="mb-2"><strong>Item Quantity:</strong> ${sale.itemQuantity}</p>
        <p class="mb-2"><strong>Quantity Measured In:</strong> ${sale.quantityMeasure}</p>
        <p class="mb-2"><strong>Amount in shillings :</strong> KES ${sale.amount}</p>
        `
        let button = document.createElement("button")
        button.className = "button"
        button.textContent = "Return Good"
        button.addEventListener("click", () => {
            let confirmReturn = confirm("Are you sure you want to return this Item?")
            if (!confirmReturn) return

        })
        card.appendChild(button)
        section.appendChild(card)
    })


})