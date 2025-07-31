let section = document.getElementById("section")

const savedSales = JSON.parse(localStorage.getItem("savedSales")) || []
if (savedSales.length === 0) {
    const emptyMessage = document.createElement("p")
    emptyMessage.textContent = "No sale recods found"
    section.appendChild(emptyMessage)
} else {
    savedSales.forEach((sale) => {
        const card = document.createElement('div')
        card.className = "card"
        card.innerHTML = `
        <p class="mb-2"><strong>Invoice : </strong>${sale.invoice}</p>
        <p class="mb-2"><strong>Date: </strong>${sale.date}</p>
        <p class="mb-2"><strong>Customer Name:</strong> ${sale.customerName}</p>
        <p class="mb-2"><strong>Item Name:</strong> ${sale.itemName} </p>
        <p class="mb-2"><strong>Item Quantity:</strong> ${sale.itemQuantity}</p>
        <p class="mb-2"><strong>Quantity Measured In:</strong> ${sale.quantityMeasure}</p>
        <p class="mb-2"><strong>Amount in shillings :</strong> KES ${sale.amount}</p>
        `
        section.appendChild(card)
    })
}
let search = document.getElementById("search")
search.addEventListener("input", () => {
    let text = search.value.toLowerCase();
    let filtered = savedSales.filter((sale) =>
        sale.itemName.toLowerCase().includes(text) ||
        sale.customerName.toLowerCase().includes(text)
    );
    section.innerHTML = ""
    if (filtered.length === 0) {
        section.innerHTML = "<h1>CREADIT SALE NOT FOUND</h1>"
        return;
    }
    filtered.forEach((sale) => {
        let card = document.createElement("div")
        card.className = "card"
        card.style = " padding: 10px"
        card.innerHTML = `
        <p class="mb-2"><strong>Invoice : </strong>${sale.invoice}</p>
        <p class="mb-2"><strong>Date: </strong>${sale.date}</p>
        <p class="mb-2"><strong>Customer Name:</strong> ${sale.customerName}</p>
        <p class="mb-2"><strong>Item Name:</strong> ${sale.itemName} </p>
        <p class="mb-2"><strong>Item Quantity:</strong> ${sale.itemQuantity}</p>
        <p class="mb-2"><strong>Quantity Measured In:</strong> ${sale.quantityMeasure}</p>
        <p class="mb-2"><strong>Amount in shillings :</strong> KES ${sale.amount}</p>
        `
        section.appendChild(card)
    })
})
