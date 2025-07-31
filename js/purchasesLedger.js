let section = document.getElementById("section");
let savedPurchase = JSON.parse(localStorage.getItem("savedPurchase")) || [];

let grouped = {};
savedPurchase.forEach(purchase => {
    let supplier = purchase.supplierName;
    if (!grouped[supplier]) {
        grouped[supplier] = [];
    }
    grouped[supplier].push(purchase);
});

Object.keys(grouped).forEach(supplier => {
    let purchases = grouped[supplier];
    let totalAmount = purchases.reduce((acc, curr) => acc + Number(curr.amount || 0), 0);
    let title = document.createElement("span");
    title.className = "tag is-light  is-medium";
    title.textContent = `Supplier: ${supplier}`;
    section.appendChild(title);

    let table = document.createElement("table");
    table.className = "table is-bordered is-striped is-narrow is-hoverable is-fullwidth";
    table.innerHTML = `
      <thead>
        <tr>
          <th>Date</th>
          <th>Invoice</th>
          <th>Item Name</th>
          <th>Quantity</th>
          <th>Measure</th>
          <th>Amount (KES)</th>
        </tr>
      </thead>
      <tbody>
        ${purchases
            .map(
                (purchase) => `
          <tr>
            <td>${purchase.date}</td>
            <td>${purchase.invoice}</td>
            <td>${purchase.itemName}</td>
            <td>${purchase.itemQuantity}</td>
            <td>${purchase.quantityMeasure}</td>
            <td>${purchase.amount}</td>
          </tr>
        `
            )
            .join("")}
        <tr>
          <td colspan="5"><strong>Total</strong></td>
          <td><strong>KES ${totalAmount.toFixed(2)}</strong></td>
        </tr>
      </tbody>
    `;
    section.appendChild(table);
});
