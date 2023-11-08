const errorMsg = document.querySelector('#error-msg');
errorMsg.style.display = 'none';

const btnCancel = document.querySelector('#btn-cancel');
btnCancel.addEventListener('click', (e) => {
  window.location = '/';
});

const form = document.querySelector('form');

function validateDoughnut() {
  const formData = new FormData(form);

  const doughnutName = formData.get('doughnut-name');
  const doughnutType = formData.get('doughnut-type');
  const doughnutCost = formData.get('doughnut-cost');

  const doughnut = {
    doughnutName,
    doughnutType,
    doughnutCost,
  };

  return doughnut;
}

async function createNewDoughnut(doughnut) {
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(doughnut),
  };

  const res = await fetch(`${API_URL}/`, options);

  return res.json();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const newDoughnut = validateDoughnut();

  createNewDoughnut(newDoughnut).then((result) => {
    if (result.status == 200) {
      window.location = '/';
    }
  });
});
