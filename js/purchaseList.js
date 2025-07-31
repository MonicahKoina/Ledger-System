let section = document.getElementById("section")
let savedPurchase = JSON.parse(localStorage.getItem("savedPurchase")) || [];
if (savedPurchase.length === 0) {
    let emptyMessage = document.createElement("h1")
    emptyMessage.innerHTML = "NO PURCHASE RECORDS"
    section.appendChild(emptyMessage)
} else {

    savedPurchase.forEach((purchase) => {
        let card = document.createElement("div")
        card.className = "card"
        card.style = "padding: 10px "
        card.innerHTML = `
        <p class="mb-2"><strong>Invoice Number : </strong>${purchase.invoice}</p>
        <p class="mb-2"><strong>Date : </strong>${purchase.date}</p>
        <p class="mb-2"><strong>Supplier's Name : </strong>${purchase.supplierName}</p>
        <p class="mb-2"><strong>Item Name : </strong> ${purchase.itemName}</p>
        <p class="mb-2"><strong>Item Quantity : </strong>${purchase.quantityMeasure}</p>
        <p class="mb-2"><strong>Amount in shillings : </strong> KES ${purchase.amount} </p>

        `
        section.appendChild(card)
    })

}
search.addEventListener("input", () => {
    const searchText = search.value.toLowerCase();
    const filtered = savedPurchase.filter((purchase) =>
        purchase.itemName.toLowerCase().includes(searchText) ||
        purchase.supplierName.toLowerCase().includes(searchText)
    );

    // Clear the current cards
    section.innerHTML = "";

    // If nothing matches
    if (filtered.length === 0) {
        section.innerHTML = "<p>No results found.</p>";
        return;
    }

    // Re-render filtered results
    filtered.forEach((purchase) => {
        let card = document.createElement("div");
        card.className = "card";
        card.style = "padding: 10px";
        card.innerHTML = `
      <p class="mb-2"><strong>Invoice Number : </strong>${purchase.invoice}</p>
      <p class="mb-2"><strong>Date : </strong>${purchase.date}</p>
      <p class="mb-2"><strong>Supplier's Name : </strong>${purchase.supplierName}</p>
      <p class="mb-2"><strong>Item Name : </strong> ${purchase.itemName}</p>
      <p class="mb-2"><strong>Item Quantity : </strong>${purchase.quantityMeasure}</p>
      <p class="mb-2"><strong>Amount in shillings : </strong> KES ${purchase.amount} </p>
    `;
        section.appendChild(card);
    });
});

