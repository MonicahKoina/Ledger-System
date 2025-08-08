let section = document.getElementById("section");
let form = document.getElementById("form");
let invoice = document.getElementById("invoice");
let date = document.getElementById("date");
let search = document.getElementById("search");
let saleInvoice = document.getElementById("saleInvoice");
let saleDate = document.getElementById("saleDate");
let customerName = document.getElementById("customerName");
let itemName = document.getElementById("itemName");
let itemQuantity = document.getElementById("itemQuantity");
let quantityMeasure = document.getElementById("quantityMeasure");
let amount = document.getElementById("amount");
let resultCard = document.getElementById("card");
let reason = document.getElementById("reason");

function generateInvoiceNumber() {
    return invoice.value = "RI - " + crypto.randomUUID().toUpperCase().slice(0, 6);
}
generateInvoiceNumber();

let savedSales = JSON.parse(localStorage.getItem("savedSales")) || [];
let returnInwards = JSON.parse(localStorage.getItem("returnInwards")) || [];

search.addEventListener("input", () => {
    let text = search.value.toLowerCase().trim();
    resultCard.innerHTML = "";

    if (text === "") {
        return;
    }
    let filtered = savedSales.filter((sale) =>
        sale.customerName.toLowerCase().includes(text) ||
        sale.invoice.toLowerCase().includes(text)
    );
    if (filtered.length === 0) {
        resultCard.innerHTML = `<p>No results found</p>`;
        return;
    }
    filtered.forEach((sale) => {
        let card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <p class="mb-2"><strong>Invoice : </strong>${sale.invoice}</p>
            <p class="mb-2"><strong>Date: </strong>${sale.date}</p>
            <p class="mb-2"><strong>Customer Name:</strong> ${sale.customerName}</p>
            <p class="mb-2"><strong>Item Name:</strong> ${sale.itemName}</p>
            <p class="mb-2"><strong>Item Quantity:</strong> ${sale.itemQuantity}</p>
            <p class="mb-2"><strong>Quantity Measured In:</strong> ${sale.quantityMeasure}</p>
            <p class="mb-2"><strong>Amount in shillings :</strong> KES ${sale.amount}</p>
        `;
        let button = document.createElement("button");
        button.className = "button";
        let isReturned = returnInwards.some(r => r.saleInvoice === sale.invoice);
        button.textContent = isReturned ? "Already Returned" : "Return Sale";
        button.disabled = isReturned;
        button.addEventListener("click", () => {
            if (returnInwards.some(r => r.saleInvoice === sale.invoice)) {
                alert("This sale has already been returned!");
                return;
            }
            saleDate.value = sale.date;
            saleInvoice.value = sale.invoice;
            customerName.value = sale.customerName;
            itemName.value = sale.itemName;
            itemQuantity.value = sale.itemQuantity;
            quantityMeasure.value = sale.quantityMeasure;
            amount.value = sale.amount;
        });

        card.appendChild(button);
        resultCard.appendChild(card);
    });
});

form.addEventListener("submit", function (e) {
    e.preventDefault();
    let savedReturnInwards = {
        inwardsInvoice: invoice.value,
        returnDate: date.value,
        saleInvoice: saleInvoice.value,
        saleDate: saleDate.value,
        customerName: customerName.value,
        itemName: itemName.value,
        itemQuantity: itemQuantity.value,
        quantityMeasure: quantityMeasure.value,
        amount: amount.value,
        reason: reason.value
    };
    if (returnInwards.some(r => r.saleInvoice === savedReturnInwards.saleInvoice)) {
        alert("This sale has already been returned!");
        return;
    }
    returnInwards.push(savedReturnInwards);
    localStorage.setItem("returnInwards", JSON.stringify(returnInwards));
    alert("Return recorded successfully!");
    form.reset();
    generateInvoiceNumber();
});
