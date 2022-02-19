// Tracking vars for selected place to edit and its element on the page
let currentPlaceEditId = null;
let currentPlaceEditElement = null;

// //////////
// Fetching elements as vars
// //////////
const $addPopUp = $('.addPopUp');
const $poppyUp = $('.poppyUp');
const $popUpForm = $('#popUpForm');
const $addPlacesBtn = $('#addPlacesBtn');
const $bookmarkBtn = $('#bookmarkBtn');
const $editPopUp = $('.editPopUp');
const $editPoppyUp = $('.editPoppyUp');
const $editForm = $('#editForm');
const $deletePlaceBtn = $('#deletePlaceBtn');

// //////////
// Initializing map settings and marker tracker
// //////////
const mapClickZoomLevel = 15;
const mapPageLoadZoomLevel = 13;
const mapMarkers = {};
let map;
// popup for where we clicka
let popup = L.popup();

// location for the map in the html
const $mapDetails = $('#mapDetails');


// //////////
// Initializing Page
// //////////
renderPlaces(places);
updateBtnStates();



// //////////
// Initializing map
// //////////
// default setview
if (places.length) {
  map = L.map('map').setView([places[0].latitude, places[0].longitude], 13);
} else {
  map = L.map('map').setView([ 0 ,0 ], mapPageLoadZoomLevel);
}

function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(map);
}

map.on('click', onMapClick);


// Loads map image
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: 'pk.eyJ1IjoiZ2xhdm92aWNhIiwiYSI6ImNrem9hMjFuYzBkd3EydW13OGU5bzlid3kifQ.C_IQD6mnpvTVu5GosTyrJQ'
}).addTo(map);

// Goes through places (passed by EJS) adds them to map
// AND adds them to mapMarkers for tracking. (so we can update/delete them if needed)
for (const place of places) {
  mapMarkers[place.id] = L.marker([place.latitude, place.longitude]).addTo(map);
}

// //////////
// Registering event listerners
// //////////
// Deletes place from database/map/page
$deletePlaceBtn.on('click', e => {

  // sends delete request to server
  $.ajax({
    method: 'DELETE',
    url: `/api/places/${currentPlaceEditId}`
  })
    .done(result => {
      // removes from page
      currentPlaceEditElement.remove();

      // removes marker from map
      mapMarkers[currentPlaceEditId].remove();

      // updates tracking vars
      currentPlaceEditElement = null;

      // Hide edit popup
      $editPopUp.toggleClass('displayFlex');
    });
});

// Shows addPlace popup when + button is clicked
$addPlacesBtn.on('click', e => $addPopUp.toggleClass('displayFlex'));

// Hides addPlace popup if you click on the background
$addPopUp.on('click', e => {
  if (e.target !== $addPopUp[0]) return;
  $addPopUp.toggleClass('displayFlex');
});

// Hides editPlace popup if you click on the background
$editPopUp.on('click', e => {
  if (e.target !== $editPopUp[0]) return;
  $editPopUp.toggleClass('displayFlex');
});

// Toggles favourite status of map on click of bookmark button
$bookmarkBtn.on('click', e => {
  // If button is green, remove as favourite
  if ($bookmarkBtn.hasClass('green')) {
    $.ajax({
      method: "DELETE",
      url: `/api/user/favourites`,
      data: {id: myMap.id},
    })
      .done(function(data) {
        // Update face btn colour
        updateFaveBtn();
      });
  } else {
    // Add map as favourite
    $.ajax({
      method: "POST",
      url:  `/api/user/favourites`,
      data: {id: myMap.id},
    })
      .done(function(data) {
        // Update face btn colour
        updateFaveBtn();
      });
  }
});

// add places to map
$popUpForm.submit(function(e) {
  // Prevent page reload/submission of default form behavour
  e.preventDefault();

  // Gets list of inputs
  const inputs = $(this).serializeArray();
  // Initialize body to be sent to api url
  let values = {};

  // Construct body.
  // input name = db col name
  for (const i in inputs) {
    const key = inputs[i].name;
    const value = inputs[i].value;
    // If a value is null, or empty, dont submit anything;
    if (value == '') return;
    values[key] = value;
  }

  // Send body to api to add it to map
  $.ajax({
    method: "POST",
    url: `/api/maps/${myMap.id}/place`,
    data: values
  })
    .done(function(content) {
      // get place from first element in list of content
      const place = content[0]

      // add place to tracker and add it to map
      mapMarkers[place.id] = L.marker([place.latitude, place.longitude]).addTo(map);

      // Render place to screen
      renderPlaces(content);

      // hide add place popup
      $addPopUp.toggleClass('displayFlex');
    });
});

// edit place
$editForm.submit(function(e) {
  const inputs = $(this).serializeArray();
  let values = {};
  values.place = currentPlaceEditId;
  for (const i in inputs) {
    const key = inputs[i].name;
    const value = inputs[i].value;
    if (value == '') return;
    values[key] = value;
  }
  $.ajax({
    method: "PATCH",
    url: `/api/maps/${myMap.id}/place`,
    data: values
  })
    .done(function(content) {
      renderPlaces(content);
    });
});


// //////////
// Define Functions
// //////////

/**
 * Creates place card with event listerners
 * @param {Object} place An object of a place
 * @returns {Jquery} Jquery Element
 */
function createElementPlaces(place) {

  // Create Jquery object with place data
  const $element = $(`
  <article>
    <img alt='cover image for place collection' src='${place.img_url}'/>

    <content>
      <header>
        <h2>${place.title}</h2>
      </header>

      <p>${place.description}</p>
    </content>

    <button type="submit" class="btn editBtn"><i class="fa-solid fa-pen-to-square"></i></button>
  </article>
  `);

  // Set event listener for edit button
  $element.on('click','button', e => {
    // Update tracking vars the id of the place this element was made for
    currentPlaceEditId = place.id;
    // Track that places element
    currentPlaceEditElement = $element;

    // Update edit popup so it shows the current values of the place
    updateEditPopup(place);
    // Show edit pop up
    $editPopUp.toggleClass('displayFlex');
  });

  // Set event listener for click on card
  $element.on('click' , e => {
    // If the event was fired from clicking on the edit button
    // Do Nothing
    if ($(e.target).hasClass('editBtn')) return;

    // Pan map view to this place's marker
    map.flyTo([place.latitude, place.longitude], mapClickZoomLevel);

    // Scroll window down to map
    $([document.documentElement, document.body]).animate({
      scrollTop: $("#map").offset().top
    }, 500);
  });

  return $element;
}

/**
 *  Renders list of places to page
 * @param {Array} places An array of place's
 */
function renderPlaces(places) {
  for (const place of places) {
    const elementPlace = createElementPlaces(place);
    $('#mapDetails').append(elementPlace);
  }
}

/**
 * Queries database and updates favourite button based on results
 */
function updateFaveBtn() {
  $.ajax({
    method: "POST",
    url: `/api/user/isFavourites`,
    data: {id: myMap.id},
  })
    .done(function(data) {
    // data.length is truethy if user has map in their favourites
      if (data.length) {
      // Change button to green to show its in users favourites
        $bookmarkBtn.addClass('green');
      } else {
      // remove colouring if not favourited by user
        $bookmarkBtn.removeClass('green');
      }
    });
}

/**
 * removes edit buttons if user doesnt have permissions
 */
function updateEditBtns() {
  $.ajax({
    method: 'POST',
    url: '/api/user/isCollaborator',
    data: {id: myMap.id}
  })
    .done(function(data) {
    // If there is no data, user doesnt have permissions
      if (!data.length) {
        $addPlacesBtn.remove();
        $('.editBtn').remove();
      }
    });
}

/**
 * Updates buttons on pages based on user status/permissions/attributes
 */
function updateBtnStates() {
  updateFaveBtn();
  updateEditBtns();

  // If there is no user, remove favourites button from page
  if (!userId) {
    $bookmarkBtn.remove();
  }
}

/**
 * Updates edit popup to show the user the places values
 * @param {Object} placeData key/value pair object of place
 */
function updateEditPopup(placeData) {
  // Get list of inputs
  const formInputs = $editForm.find('input');

  // Loops through all inputs from the form
  formInputs.each(function() {
    // Updates the inputs with the proper placeData entry based on the inputs name attribute value
    switch (this.name) {
    case 'longitude':
      $(this).val(placeData.longitude);
      break;
    case 'latitude':
      $(this).val(placeData.latitude);
      break;
    case 'title':
      $(this).val(placeData.title);
      break;
    case 'description':
      $(this).val(placeData.description);
      break;
    case 'img_url':
      $(this).val(placeData.img_url);
      break;
    }
  });
}
