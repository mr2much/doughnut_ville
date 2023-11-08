const ratingsTable = document.querySelector('table tbody');

function getFormattedTime(time) {
  const date = new Date(`1970-01-01T${time}Z`);

  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';

  hours = hours % 12;
  hours = hours ? hours : 12; // Handled midnight (0) as 12

  const formattedTime = `${(hours % 12 || 12) + 4}:${(minutes + 30)
    .toString()
    .padStart(2, '0')} ${ampm}`;

  return formattedTime;
}

function getFormattedDate(date) {
  const now = new Date(date);

  const month = now.getUTCMonth() + 1; // Adding 1 because months are 0-indexed
  const day = now.getUTCDate().toString().padStart(2, '0');

  const formattedDate = `${month}/${day}`;

  return formattedDate;
}

async function loadEntries() {
  const res = await fetch(`${API_URL}/ratings`);

  return res.json();
}

function showRatings(ratings) {
  ratings.forEach((ratings) => {
    const newRow = document.createElement('tr');

    ratingsTable.appendChild(newRow);

    newRow.outerHTML = `
        <tr>
            <td>${ratings.location}</td>            
            <td>${getFormattedTime(ratings.time)}</td>
            <td>${getFormattedDate(ratings.date)}</td>
            <td>${ratings.type}</td>
            <td>${ratings.rating}</td>
            <td>${ratings.comments}</td>
        </tr>
        `;
  });
}

loadEntries().then(showRatings);
