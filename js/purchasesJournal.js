let form = document.getElementById("form")
let invoice = document.getElementById("invoice")
let date = document.getElementById("date")
let supplierName = document.getElementById("supplierName")
let itemName = document.getElementById("itemName")
let itemQuantity = document.getElementById("itemQuantity")
let quantityMeasure = document.getElementById("quantityMeasure")
let amount = document.getElementById("amount")
function generateInvoice() {
    return invoice.value = "PUR-" + crypto.randomUUID().slice(0, 8).toUpperCase();
}
generateInvoice()
form.addEventListener("submit", function (e) {
    e.preventDefault();
    let purchase = {
        invoice: invoice.value,
        date: date.value,
        supplierName: supplierName.value,
        itemName: itemName.value,
        itemQuantity: itemQuantity.value,
        quantityMeasure: quantityMeasure.value,
        amount: amount.value
    }
    let savedPurchase = JSON.parse(localStorage.getItem("savedPurchase")) || []
    savedPurchase.push(purchase)
    localStorage.setItem("savedPurchase", JSON.stringify(savedPurchase))
    form.reset()
    generateInvoice()
})