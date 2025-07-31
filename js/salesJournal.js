let form = document.getElementById("form");
let invoice = document.getElementById("invoice")
let customerName = document.getElementById("customerName")
let date = document.getElementById("date")
let itemName = document.getElementById("itemName")
let itemQuantity = document.getElementById("itemQuantity")
let quantityMeasure = document.getElementById("quantityMeasure")
let amount = document.getElementById("amount")
function generateInvoice() {
    return invoice.value = "SALE-" + crypto.randomUUID().slice(0, 8).toUpperCase()
}
generateInvoice()
form.addEventListener("submit", function (e) {
    e.preventDefault()
    let sales = {
        invoice: invoice.value,
        date: date.value,
        customerName: customerName.value,
        itemName: itemName.value,
        itemQuantity: itemQuantity.value,
        quantityMeasure: quantityMeasure.value,
        amount: amount.value
    }
    let savedSales = JSON.parse(localStorage.getItem("savedSales")) || []
    savedSales.push(sales)
    localStorage.setItem("savedSales", JSON.stringify(savedSales))
    form.reset()
    generateInvoice()
})