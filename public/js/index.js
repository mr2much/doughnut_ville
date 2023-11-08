const doughnutTable = document.querySelector('table tbody');

async function loadEntries() {
  const res = await fetch(API_URL);

  return res.json();
}

function showDoughnutData(doughnuts) {
  doughnuts.forEach((doughnut) => {
    const newRow = document.createElement('tr');

    doughnutTable.appendChild(newRow);

    newRow.outerHTML = `
    <tr>
        <td>${doughnut.doughnut_name}</td>
        <td>${doughnut.doughnut_type}</td>
        <td>${doughnut.doughnut_cost}</td>
    </tr>
    `;
  });
}

loadEntries().then(showDoughnutData);
