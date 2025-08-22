let form = document.getElementById("form");
let invoice = document.getElementById("invoice");
let date = document.getElementById("date");
let search = document.getElementById("search");
let purchaseInvoice = document.getElementById("purchaseInvoice");
let purchaseDate = document.getElementById("purchaseDate");
let supplierName = document.getElementById("supplierName");
let itemName = document.getElementById("itemName");
let itemQuantity = document.getElementById("itemQuantity");
let quantityMeasure = document.getElementById("quantityMeasure");
// let amount = document.getElementById("returnAmount");
let reason = document.getElementById("reason");
let card = document.getElementById("card");
let section = document.getElementById("section");

let savedPurchase = JSON.parse(localStorage.getItem("savedPurchase")) || [];
let returnsOutwards = JSON.parse(localStorage.getItem("returnsOutwards")) || [];

console.log(savedPurchase);

function generateInvoice() {
    invoice.value =
        "RET - " + crypto.randomUUID().toUpperCase().slice(2, 8);
}
generateInvoice();

search.addEventListener("input", function () {
    let text = search.value.toLowerCase().trim();
    card.innerHTML = "";
    if (text === "") {
        return;
    }
    let filtered = savedPurchase.filter(
        (purchase) =>
            purchase.supplierName.toLowerCase().includes(text) ||
            purchase.invoice.toLowerCase().includes(text)
    );

    if (filtered.length === 0) {
        card.innerHTML = "No results Found";
    }

    filtered.forEach((purchase) => {
        let resultCard = document.createElement("div");
        resultCard.className = "card";
        resultCard.innerHTML = `
        <p class="mb-2"><strong>Invoice : </strong>${purchase.invoice}</p>
        <p class="mb-2"><strong>Date: </strong>${purchase.date}</p>
        <p class="mb-2"><strong>Supplier Name:</strong> ${purchase.supplierName}</p>
        <p class="mb-2"><strong>Item Name:</strong> ${purchase.itemName}</p>
        <p class="mb-2"><strong>Item Quantity:</strong> ${purchase.itemQuantity}</p>
        <p class="mb-2"><strong>Quantity Measured In:</strong> ${purchase.quantityMeasure}</p>
        // <p class="mb-2"><strong>Amount in shillings :</strong> KES ${purchase.amount}</p>
    `;

        let isReturned = returnsOutwards.some(
            (r) => r.purchaseInvoice === purchase.invoice
        );

        let button = document.createElement("button");
        button.className = "button";
        button.textContent = isReturned
            ? "Purchase Returned"
            : "Return Purchase";
        button.disabled = isReturned;

        button.addEventListener("click", () => {
            if (returnsOutwards.some((r) => r.purchaseInvoice === purchase.invoice)) {
                alert("Purchase has been already returned");
                return;
            }

            purchaseInvoice.value = purchase.invoice;
            purchaseDate.value = purchase.date;
            supplierName.value = purchase.supplierName;
            itemName.value = purchase.itemName;
            itemQuantity.value = purchase.itemQuantity;
            quantityMeasure.value = purchase.quantityMeasure;
            // amount.value = purchase.amount;
        });

        resultCard.appendChild(button);
        card.appendChild(resultCard);
    });
});

form.addEventListener("submit", function (e) {
    e.preventDefault();
    let savedReturnsOutwards = {
        invoice: invoice.value,
        date: date.value,
        supplierName: supplierName.value,
        purchaseInvoice: purchaseInvoice.value,
        purchaseDate: purchaseDate.value,
        itemName: itemName.value,
        itemQuantity: itemQuantity.value,
        quantityMeasure: quantityMeasure.value,
        // amount: amount.value,
        reason: reason.value,
    };

    if (
        returnsOutwards.some(
            (r) => r.purchaseInvoice === savedReturnsOutwards.purchaseInvoice
        )
    ) {
        alert("Good already returned");
        return;
    }
    returnsOutwards.push(savedReturnsOutwards);
    localStorage.setItem(
        "returnsOutwards",
        JSON.stringify(returnsOutwards)
    );
    form.reset();
    generateInvoice();
});
