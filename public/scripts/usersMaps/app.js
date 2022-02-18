const allMaps = [];
let currentMapEditId = null;
let currentMapElement = null;

const $mapContainer = $('#mapContainer');
const $editMapPopUpContainer = $('#pop-up-background-edit-map');
const $addMapPopUpContainer = $('#pop-up-background-add-map');
const $updateMapForm = $('#updateMapForm');
const $addMapForm = $('#addMapForm');
const $addMapBtn = $('#addMapBtn');
const $collaboratorsTable = $('#collaborators');
const $addCollaboratorForm = $('#addCollaboratorForm');

// Execute Functions
registerOnEvents();
registerFormHandling();
updatePage();

function registerOnEvents() {
// ///////////////
// On Button Clicks
// ///////////////
  // Make load more button render more maps
  $('#loadMoar').on('click', e => {
    renderMaps();
  });

  // On add map button click, show popup to add map
  $addMapBtn.on('click', e => $addMapPopUpContainer.toggleClass('displayFlex'));

  // ADD MAP POPUP:
  // When you click off popup, close it
  // and set tracking vars to null
  $addMapPopUpContainer.on('click', e => {
    // If click event was on the popup, do nothing
    if (e.target !== $addMapPopUpContainer[0]) return;
    // tracking vars
    currentMapEditId = null;
    currentMapElement = null;

    // Hide Popup
    $addMapPopUpContainer.toggleClass('displayFlex');
  });

  // EDIT POPUP:
  // When you click off popup, close it
  // and set tracking vars to null
  $editMapPopUpContainer.on('click', e => {
    // If click event was on the popup, do nothing
    if (e.target !== $editMapPopUpContainer[0]) return;
    // tracking vars
    currentMapEditId = null;
    currentMapElement = null;

    // Hide Popup
    $editMapPopUpContainer.toggleClass('displayFlex');
  });
}

function registerFormHandling() {
  // ///////////////
  // Form Submits
  // ///////////////

  // Add collaborator to map
  $addCollaboratorForm.submit(function(e) {
    e.preventDefault();

    // Get inputs as array of objects
    const inputs = $(this).serializeArray();

    $.ajax({
      method: "POST",
      url: `/api/maps/${currentMapEditId}/collaborators`,
      data: {
        // Gets value of first input
          // (There is only 1)
        id: inputs[0].value,
        map_id: currentMapEditId
      }
    })
      // Update collaborator table to show newly added collaborator
      .done(function(collaborator) {
        collaboratorsTable().update(collaborator);
      });
  });

  // Add map form
  $addMapForm.submit(function(e) {
    e.preventDefault();

    // Get inputs as array of objects
    const inputs = $(this).serializeArray();
    let values = {};

    // Turn array of objects into key/value pair
    for (const i in inputs) {
      // Key is column name
      const key = inputs[i].name;
      const value = inputs[i].value;
      // If value is empty, exit function and do nothing
      if (value == '') return;

      // Insert vars as key/value object entry
      values[key] = value;
    }

    // Send data to server
    $.ajax({
      method: "POST",
      url: `/api/maps`,
      data: values
    })
      // When server adds map, render it to screen
      // and close pop up
      .done(function(content) {
        allMaps.push(content);
        renderMaps();
        $addMapPopUpContainer.toggleClass('displayFlex');
      });
  });

  // Map Edit Form Submit
  $updateMapForm.submit(function(e) {
    e.preventDefault();

    // Array of objects of inputs
    const inputs = $(this).serializeArray();
    let values = {};

    // Turn array of objects into key/value pair
    for (const i in inputs) {
      const key = inputs[i].name;
      const value = inputs[i].value;

      // Insert key value pair as object entry
      values[key] = value;
    }

    // Send update to database
    $.ajax({
      method: "PATCH",
      url: `/api/maps/${currentMapEditId}`,
      data: values
    })
      // When server patches it, update map on page
      .done(function(content) {
        currentMapElement.html(makeElement(values));
      });
  });
}

// get and render maps to page
function updatePage() {
  // URL to get json from
  let ajaxUrl = `/api/users/${userId}/maps`;

  $.ajax({
    method: "GET",
    url: ajaxUrl
  })
  .done(function(content) {
      // Push maps to array
      content.forEach(element => {
        allMaps.push(element);
      });
      // Render 10 maps to screen
      renderMaps();
    });
}

// Renders 10 maps to screen
function renderMaps(howManyToShowPerRender = 10) {
  for (let i = 0; i < howManyToShowPerRender; i++) {
    // If there are no maps, exit function
    if (!allMaps.length) return;
    // Remove map from array and render it
    renderMapToScreen(allMaps.shift());
  }
}

// title:
// city:
// cover_img:
// description:

// id:
// owner_id:
// public:

// Make 1 map element
function makeElement(mapData) {
  return `
  <section>
    <img alt='cover image for place collection' src='${mapData.cover_img}'/>
    <content>
      <header>
        <h2>${mapData.title}</h2>
        <h4>${mapData.city}</h4>
      </header>
      <p>${mapData.description}</p>
    </content>
  </section>
  <button>Edit</button>

  <aside>
    <button class="editBtn">Edit</button>
    <button class="deleteBtn">Delete</button>
  </aside>
`;
}

// Preps map as element with on clicks
// And renders it to screen
function renderMapToScreen(mapData) {
  // Wrap it in an article
  const $element = $(`<article>${makeElement(mapData)}</article>`);

  // Navigated to map page
  $element.on('click','section', e => {
    window.location.assign("/maps/" + mapData.id);
  });

  // Show Edit Buttons
  $element.on('click','> button', e => {
    $element.find('aside').toggle('fast');
  });

  // Edit Map Button
  $element.on('click','aside .editBtn', e => {
    // Update edit popup to contain map data
    updateEditPopup(mapData);
    // Track element to update later
    currentMapElement = $element;
    // show edit popup
    $editMapPopUpContainer.toggleClass('displayFlex');
  });

  // Delete map from db and update page
  // On click
  $element.on('click','aside .deleteBtn', e => {
    // Send delete request
    $.ajax({
      method: "DELETE",
      url: `/api/maps/${mapData.id}`,
      data: {owner_id: userId}
    })
      // When server deletes it, remove from page
      .done(function() {
        $element.remove();
      });
  });

  // Render element with its on click events to page
  $mapContainer.append($element);
}

// Updates popup input fields to be that of the map
  // We are editing
function updateEditPopup(mapData) {

  // Get for inputs
  const formInputs = $editMapPopUpContainer.find('form input');
  // Track current map id that we are editing
  currentMapEditId = mapData.id;

  // Reset the list of collaborators
  collaboratorsTable().reset();

  // send request to get list of collaborators
  $.ajax({
    method: "get",
    url: `/api/maps/${mapData.id}/collaborators`
  })
    // Render collaborators to table
    .done(function(result) {
      collaboratorsTable().update(result);
    });

  // For every input, update their values based on their ID
  formInputs.each(function() {
    switch (this.id) {
    case 'title':
      $(this).val(mapData.title);
      break;
    case 'city':
      $(this).val(mapData.city);
      break;
    case 'description':
      $(this).val(mapData.description);
      break;
    case 'cover_img':
      $(this).val(mapData.cover_img);
      break;
    }
  });
}


// ///////////////
// Table 'Object' manager
// ///////////////
function collaboratorsTable() {

  // Takes in arr of collaborators
  // and adds them to the table
  function update(collaborators) {

    for (const collaborator of collaborators) {
      // Preps the element
      let names = $(`
      <tr>
        <td>${collaborator.name}</td>
        <td>
        <button class='deleteBtn'>Remove</button>
        </td>
      </tr>
      `);

      // Adds function remove button
      names.on('click', 'button', function() {
        $.ajax({
          method: "DELETE",
          url: `/api/maps/${collaborator.map_id}/collaborators`,
          data: {toRemoveId: collaborator.user_id}
        })
          // When deleted, delete myself from table
          .done(function() {
            names.remove();
          });
      });

      // Add collaborator to table
      appendElement(names);
    }
  }

  // Resets table to default state
  function reset() {
    $collaboratorsTable.empty();
    $collaboratorsTable.append($(`
    <tr>
      <th>Name</th>
      <th>Edit</th>
    </tr>`));
  }

  // Append element to end of table
  function appendElement($elm) {
    $collaboratorsTable.append($elm);
  }

  return {reset, update};
}
