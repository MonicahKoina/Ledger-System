let section = document.getElementById("section")


const savedSales = JSON.parse(localStorage.getItem("savedSales")) || []
if (savedSales.length === 0) {
    const emptyMessage = document.createElement("p")
    emptyMessage.textContent = "No sale recods found"
    section.appendChild(emptyMessage)
} else {
    savedSales.forEach((sale) => {
        const card = document.getElementById("card")
        card.innerHTML = `
        <p class="mb-2"><strong>Invoice : </strong>${sale.invoice}</p>
        <p class="mb-2"><strong>Date: </strong>${sale.date}</p>
        <p class="mb-2"><strong>Customer Name:</strong> ${sale.customerName}</p>
        <p class="mb-2"><strong>Item Name:</strong> ${sale.itemName} </p>
        <p class="mb-2"><strong>Item Quantity:</strong> ${sale.itemQuantity}</p>
        <p class="mb-2"><strong>Quantity Measured In:</strong> ${sale.quantityMeasure}</p>
        `
    })
}
