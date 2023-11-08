const form = document.querySelector('form');

function getTime() {
  const now = new Date();

  let hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';

  hours = hours % 12;
  hours = hours ? hours : 12; // Handled midnight (0) as 12

  return `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
}

function getMonthAndDay() {
  const now = new Date();

  const month = now.getMonth() + 1; // Adding 1 because months are 0-indexed
  const day = now.getDate();

  return `${month}/${day}`;
}

function validateRating() {
  const formData = new FormData(form);

  const location = formData.get('locations');
  const doughnut_type = formData.get('doughnut-type');
  const comments = formData.get('comments');

  const time = getTime();
  const monthDay = getMonthAndDay();

  const rating = { location, time, monthDay, doughnut_type, comments };

  return rating;
}

async function createNewRating(rating) {
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(rating),
  };

  const res = await fetch(`${API_URL}/ratings`, options);

  return res.json();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const newRating = validateRating();

  createNewRating(newRating).then((result) => {
    console.log(result);
  });
});
