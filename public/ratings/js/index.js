async function loadEntries() {
  const res = await fetch(`${API_URL}/ratings`);

  return res.json();
}

function showRatings(ratings) {
  console.log(ratings);
}

loadEntries().then(showRatings);
