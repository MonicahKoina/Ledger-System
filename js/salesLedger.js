let section = document.getElementById("section");
let savedSales = JSON.parse(localStorage.getItem("savedSales")) || [];

let grouped = {};
savedSales.forEach(sale => {
    let customer = sale.customerName;
    if (!grouped[customer]) {
        grouped[customer] = [];
    }
    grouped[customer].push(sale); // Push the full sale, not just the name
});

Object.keys(grouped).forEach(customer => {
    let sales = grouped[customer];
    let totalAmount = sales.reduce((acc, curr) => acc + Number(curr.amount || 0), 0);

    let title = document.createElement("span");
    title.className = "tag is-light is-medium";
    title.textContent = `Customer: ${customer}`;
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
      ${sales.map(sale => `
        <tr>
          <td>${sale.date}</td>
          <td>${sale.invoice}</td>
          <td>${sale.itemName}</td>
          <td>${sale.itemQuantity}</td>
          <td>${sale.quantityMeasure}</td>
          <td>${sale.amount}</td>
        </tr>
      `).join("")}
      <tr>
        <td colspan="5"><strong>Total</strong></td>
        <td><strong>KES ${totalAmount.toFixed(2)}</strong></td>
      </tr>
    </tbody>
  `;
    section.appendChild(table);
});
