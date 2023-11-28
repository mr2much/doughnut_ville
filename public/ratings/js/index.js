const conditionContainer = document.querySelector('#condition-container');
const filterContainer = document.querySelector('#filter-container');
const newFilterButton = document.querySelector('#new-filter-btn');

const ratingsTable = document.querySelector('table tbody');

function removeSelf(element) {
  // Get the div element containing the parent form of the element
  const parentFormDiv = element.parentNode.parentNode;

  // Get the div containing all the filter elements
  const filterContainer = document.querySelector('#filter-container');

  // Get the div containing all the condition elements
  const conditionContainer = document.querySelector('#condition-container');

  // Get the index of the form containing the calling element from filterContainer
  const index = Array.prototype.indexOf.call(
    filterContainer.children,
    parentFormDiv
  );

  /*
  Use the index to remove the corresponding elements from both
  filter-container and condition-container
   */

  // remove the element with the corresponding index from filter-container
  filterContainer.removeChild(filterContainer.children[index]);

  // remove the element with the corresponding index from condition-container
  conditionContainer.removeChild(conditionContainer.children[index]);
}

function addConditionContainer() {
  const div = document.createElement('div');
  div.classList.add('row', 'col-12', 'element');
  // div.style.marginLeft = '50%';

  div.innerHTML = `
  <form id="condition-form">
    <select
      name="condition"
      id="condition"
      required
      class="form-select"
    >
      <option value="" selected>Operator</option>
      <option value="AND">And</option>
      <option value="OR">Or</option>
      <option value="NOT">Not</option>
  </form>
  `;

  conditionContainer.appendChild(div);
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
  <form class="d-flex" role="search">
    <button
      id="remove-self"
      type="button"
      class="btn me-2"
      onclick="removeSelf(this)"
    >
      X
    </button>
    <button
      id="btn-clear"
      type="button"
      class="btn btn-outline-dark me-2"
    >
      Clear
    </button>

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
  </form>
  `;

  // <div class="col-auto">
  //     <button class="btn btn-outline-success" type="submit">
  //       Search
  //     </button>
  //   </div>

  filterContainer.appendChild(div);
}

newFilterButton.addEventListener('click', (e) => {
  addConditionContainer();
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
