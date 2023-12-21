const filterContainer = document.querySelector('#filter-container');
const newFilterButton = document.querySelector('#new-filter-btn');
const filterForm = document.querySelector('#dropdown-form');
const btnClear = document.querySelector('#btn-clear');

const ratingsTable = document.querySelector('table tbody');

function removeSelf(element) {
  // Get the div element containing the parent form of the element
  const parentFormDiv = element.parentNode;

  // Get the index of the form containing the calling element from filterContainer
  const index = Array.prototype.indexOf.call(
    filterContainer.children,
    parentFormDiv
  );

  // remove the element with the corresponding index from filter-container
  filterContainer.removeChild(filterContainer.children[index]);
}

function addFilterContainer() {
  const div = document.createElement('div');
  div.classList.add(
    'col-12',
    'd-flex',
    'align-items-stretch',
    'justify-content-end',
    'element'
  );

  div.innerHTML = `  
    <button
      id="remove-self"
      type="button"
      class="btn me-2"
      onclick="removeSelf(this)"
    >
      X
    </button>    

    <div class="col-auto me-2">
      <select
        class="form-select"
        id="logic-op"
        name="logic-op"        
        aria-label="logical operators dropdown"
        required                
      >
        <option value="" selected>Select operator</option>
        <option value="AND">And</option>
        <option value="OR">Or</option>
        <option value="NOT">Not</option>
      </select>
    </div>

    <div class="col-auto me-2">
      <select
        class="form-select"
        id="column-names"
        name="column-names"
        aria-label="column names dropdown"
        required
      >
        <option value="" selected>Select a column</option>
        <option value="location">Location</option>
        <option value="time">Time</option>
        <option value="date">Date</option>
        <option value="type">Type</option>
        <option value="rating">Rating</option>
        <option value="comments">Comments</option>
      </select>
    </div>

    <div class="col-auto me-2">
      <select
        class="form-select"
        name="comp-op"
        id="comp-op"
        aria-label="Comparisson operator dropdown"
        required
      >
        <option value="" selected>Select Comparisson</option>
        <option value=">">Greater than</option>
        <option value="<">Less than</option>
        <option value="=">Equal</option>
      </select>
    </div>

    <div class="col-auto me-2">
      <input
        type="search"
        class="form-control"
        id="search-term"
        name="search-term"
        placeholder="Search..."
        aria-label="search"
      />
    </div>          
  `;

  filterContainer.appendChild(div);
}

newFilterButton.addEventListener('click', (e) => {
  addFilterContainer();
});

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

async function searchDonuts(params) {
  const res = await fetch(
    `${API_URL}/filter?searchTerms=${encodeURIComponent(
      JSON.stringify(params)
    )}`
  );

  return res.json();
}

function clearTable() {
  while (ratingsTable.firstChild) {
    ratingsTable.firstChild.remove();
  }
}

filterForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Extract filter values from controls
  const elementContainers = filterForm.querySelectorAll('div .element');

  const formValues = [];

  elementContainers.forEach((element) => {
    let formData = {};

    for (let i = 0; i < filterForm.elements.length; i++) {
      let child = filterForm.elements[i];

      if (
        element.contains(child) &&
        child.name &&
        child.type !== 'button' &&
        child.type !== 'submit' &&
        child.type !== 'reset'
      ) {
        formData[child.name] = child.value;
      }
    }

    if (Object.keys(formData).length > 0) {
      formValues.push(formData);
    }
  });

  searchDonuts(formValues).then((result) => {
    clearTable();
    showRatings(result);
  });
});

function removeAllFilters() {
  elementsToRemove = filterContainer.querySelectorAll('.element');

  for (let i = 1; i < elementsToRemove.length; i++) {
    filterContainer.removeChild(elementsToRemove[i]);
  }
}

btnClear.addEventListener('click', (e) => {
  filterForm.reset();
  removeAllFilters();
  clearTable();
  loadEntries().then(showRatings);
});
