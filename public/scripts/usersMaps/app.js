// //////////
// Fetching elements as vars
// //////////
const $mapContainer = $('#mapContainer');
const $editMapPopUpContainer = $('#pop-up-background-edit-map');
const $addMapPopUpContainer = $('#pop-up-background-add-map');
const $updateMapForm = $('#updateMapForm');
const $addMapForm = $('#addMapForm');
const $addMapBtn = $('#addMapBtn');
const $collaboratorsTable = $('#collaborators');
const $addCollaboratorForm = $('#addCollaboratorForm');

// //////////
// Initializing Global tracking vars
// //////////
const allMaps = [];
let currentMapEditId = null;
let currentMapElement = null;

// Execute Functions
registerOnEvents();
registerFormHandling();
updatePage();

/**
 * Registers listerners to elements
 */
function registerOnEvents() {
  // ///////////////
  // On Button Clicks
  // ///////////////

  // Load more maps on "load moar" button click
  $('#loadMoar').on('click', e => {
    renderMaps();
  });

  // Show add map popup on "ADD MAP" button click
  $addMapBtn.on('click', e => $addMapPopUpContainer.toggleClass('displayFlex'));

  $addMapPopUpContainer.on('click', e => {
    hidePopupOnBackgroundClick($addMapPopUpContainer, e);
  });

  $editMapPopUpContainer.on('click', e => {
    hidePopupOnBackgroundClick($editMapPopUpContainer, e);
  });
}

function hidePopupOnBackgroundClick($element, event) {
  if (event.target !== $element[0]) return;
  currentMapEditId = null;
  currentMapElement = null;
  $element.toggleClass('displayFlex');
}

function registerFormHandling() {
  // ///////////////
  // Form Submits
  // ///////////////
  // On submit of adding collaborator
  $addCollaboratorForm.submit(function(e) {
    e.preventDefault();
    // Get inputs as array (event though there is only 1 input field)
    const inputs = $(this).serializeArray();

    $.ajax({
      method: "POST",
      url: `/api/maps/${currentMapEditId}/collaborators`,
      data: {
        // Send ID of collaborator
        id: inputs[0].value,
        // Send ID of map to add collaborator to
        map_id: currentMapEditId
      }
    })
      .done(function(collaborator) {
      // Adds newly created collaborator to editMap popup table
        collaboratorsTable().update(collaborator);
      });
  });

  // On submission of Add Map Form
  $addMapForm.submit(function(e) {
    e.preventDefault();
    // get inputs as array
    const inputs = $(this).serializeArray();
    // Initialize object to be used as body
    let values = {};

    // Construct values object to have they key be the input name
    // The input name HAS TO BE THE NAME OF THE COLUMN IN DB
    for (const i in inputs) {
      const key = inputs[i].name;
      const value = inputs[i].value;
      // If an input is empty, dont add anything
      if (value == '') return;
      // Add key and value to object
      values[key] = value;
    }

    // send values as body to api
    $.ajax({
      method: "POST",
      url: `/api/maps`,
      data: values
    })
      .done(function(content) {
      // When map is added to db, render it to screen
        renderMapToScreen(content);
        // Hide add map popup
        $addMapPopUpContainer.toggleClass('displayFlex');
      });
  });

  // Update map form submit event
  $updateMapForm.submit(function(e) {
    e.preventDefault();
    // get inputs as array
    const inputs = $(this).serializeArray();
    // Initialize object to be used as body
    let values = {};

    // Construct values object to have they key be the input name
    // The input name HAS TO BE THE NAME OF THE COLUMN IN DB
    for (const i in inputs) {
      const key = inputs[i].name;
      const value = inputs[i].value;
      values[key] = value;
    }

    // send values as body to api
    $.ajax({
      method: "PATCH",
      url: `/api/maps/${currentMapEditId}`,
      data: values
    })
      .done(function(content) {
      // Update map element to new values
        currentMapElement.html(makeElement(values));
      });
  });
}

/**
 * fetches users maps and updates page to show fetched maps
 */
function updatePage() {

  // Fetch maps
  $.ajax({
    method: "GET",
    url: `/api/users/${userId}/maps`
  })
    .done(function(content) {
    // Save response to memory
      content.forEach(element => {
        allMaps.push(element);
      });
      // Render maps to screen
      renderMaps();
    });
}

/**
 *
 * @param {Number} howManyToShowPerRender how big of a batch of maps to render to screen
 * @returns
 */
function renderMaps(howManyToShowPerRender = 10) {
  for (let i = 0; i < howManyToShowPerRender; i++) {
    // If there are no maps, exit function
    if (!allMaps.length) return;
    // Remove element from array and render it to screen
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

/**
 *
 * @param {Object} mapData Key/val pair of map data
 * @param {Number} mapData.id unique id of map
 * @param {Number} mapData.owner_id unique id of user who created it
 * @param {String} mapData.city Name of city map is of (global map if null)
 * @param {String} mapData.title Title of Map
 * @param {String} mapData.description description of Map
 * @param {String} mapData.cover_img url to image for map
 * @param {number} mapData.views Total view count for map
 * @param {boolean} mapData.public If map is viewable by anyone
 * @returns {String} A string of the inside of a map html element
 */
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

/**
 * Takes in mapData, turns it into a jquery element with
 * Listeners and renders it to the page
 * @param {Object} mapData Key/val pair of map data
 * @param {Number} mapData.id unique id of map
 * @param {Number} mapData.owner_id unique id of user who created it
 * @param {String} mapData.city Name of city map is of (global map if null)
 * @param {String} mapData.title Title of Map
 * @param {String} mapData.description description of Map
 * @param {String} mapData.cover_img url to image for map
 * @param {number} mapData.views Total view count for map
 * @param {boolean} mapData.public If map is viewable by anyone
 */
function renderMapToScreen(mapData) {
  // Wrap the inside part of a map element with article tags
  const $element = $(`<article>${makeElement(mapData)}</article>`);

  // Navigated to map page on click of card
  $element.on('click','section', e => {
    window.location.assign("/maps/" + mapData.id);
  });

  // Show distinct edit buttons when you click "Edit" Button
  $element.on('click','> button', e => {
    $element.find('aside').toggle('fast');
  });

  // Update Map Button
  $element.on('click','aside .editBtn', e => {
    // Updated edit popup with this map cards data
    updateEditPopup(mapData);

    // Tracks this maps element
    currentMapElement = $element;

    // Show edit map form popup
    $editMapPopUpContainer.toggleClass('displayFlex');
  });

  // Delete Button; Deletes map on click
  $element.on('click','aside .deleteBtn', e => {
    // Send delete request to server
    $.ajax({
      method: "DELETE",
      url: `/api/maps/${mapData.id}`
    })
    // If delete was successful, remove map from page
      .done(function() {
        $element.remove();
      });
  });

  // Render map to page
  $mapContainer.append($element);
}

/**
 *
 * @param {Object} mapData Key/val pair of map data
 * @param {Number} mapData.id unique id of map
 * @param {Number} mapData.owner_id unique id of user who created it
 * @param {String} mapData.city Name of city map is of (global map if null)
 * @param {String} mapData.title Title of Map
 * @param {String} mapData.description description of Map
 * @param {String} mapData.cover_img url to image for map
 * @param {number} mapData.views Total view count for map
 * @param {boolean} mapData.public If map is viewable by anyone
 */
function updateEditPopup(mapData) {
  // Get all inputs of edit form popup
  const formInputs = $editMapPopUpContainer.find('form input');
  // Set global tracking for map ID
  currentMapEditId = mapData.id;

  // Clear collaborators table
  collaboratorsTable().reset();

  // Send request to get collaborators for map
  $.ajax({
    method: "get",
    url: `/api/maps/${mapData.id}/collaborators`
  })
  // On success, update the table with collaborators
    .done(function(result) {
      collaboratorsTable().update(result);
    });

  // Loop through each input and assign their values to the
  // current maps data
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

  /**
   * Renders a list of collaborators to the collaborators table
   * @param {Array.<{name: String, map_id: Number, user_id: Number}>} collaborators
   */
  function update(collaborators) {

    // For each entry in collaborators, make jquery element and add it to the table
    for (const collaborator of collaborators) {

      // Make jquery element with populated data and remove button
      let names = $(`
      <tr>
        <td>${collaborator.name}</td>
        <td>
        <button class='deleteBtn'>Remove</button>
        </td>
      </tr>
      `);

      // On clicking delete button, send request to delete user as collaborator
      names.on('click', 'button', function() {
        $.ajax({
          method: "DELETE",
          url: `/api/maps/${collaborator.map_id}/collaborators`,
          data: {toRemoveId: collaborator.user_id}
        })
        // If successful, remove entry from table
          .done(function() {
            names.remove();
          });
      });

      // Append element to table with listeners
      appendElement(names);
    }
  }

  /**
   * Reset table to have no users in it
   */
  function reset() {
    $collaboratorsTable.empty();
    $collaboratorsTable.append($(`
    <tr>
      <th>Name</th>
      <th>Edit</th>
    </tr>`));
  }

  // Internal function for collaboratorsTable, adds user to bottom of table
  function appendElement($elm) {
    $collaboratorsTable.append($elm);
  }

  return {reset, update};
}
