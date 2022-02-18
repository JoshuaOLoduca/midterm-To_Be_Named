// Client facing scripts here

let currentPlaceEditId = null;

const $addPopUp = $('.addPopUp');
const $poppyUp = $('.poppyUp');
const $popUpForm = $('#popUpForm');
const $addPlacesBtn = $('#addPlacesBtn');
const $bookmarkBtn = $('#bookmarkBtn');
const $editBtn = $('#editBtn');
const $editPopUp = $('.editPopUp');
const $editPoppyUp = $('.editPoppyUp');
const $editForm = $('#editForm');
let map;


// ////////////////
//  Leaflet Map Stuff
//      START
// ////////////////

// location for the map in the html
const $mapDetails = $('#mapDetails');
// default setview to first place in map
if (places.length) {
  map = L.map('map').setView([places[0].latitude, places[0].longitude], 13);
// If no places, set map to 0, 0
} else {
  map = L.map('map').setView([ 0 ,0 ], 13);
}

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: 'pk.eyJ1IjoiZ2xhdm92aWNhIiwiYSI6ImNrem9hMjFuYzBkd3EydW13OGU5bzlid3kifQ.C_IQD6mnpvTVu5GosTyrJQ'
}).addTo(map);


for (const place of places) {
  L.marker([place.latitude, place.longitude]).addTo(map);
}

// ////////////////
//      END
//  Leaflet Map Stuff
// ////////////////


// Render 1 place to page
function createElementPlaces(places) {

  // Make jquery object populated with place data
  const $element = $(`
  <article>
  <img alt='cover image for place collection' src='${places.img_url}'/>
  <content>
  <header>
  <h2>${places.title}</h2>
  </header>
  <p>${places.description}</p>
  </content>

  <button type="submit" class="btn"><i class="fa-solid fa-pen-to-square"></i></button>

  </article>
  `);

  // Register on clicks
  // edit Button opens edit popup
  $element.on('click','button', e => {
    currentPlaceEditId = places.id;
    console.log("places:", currentPlaceEditId);
    $editPopUp.toggleClass('displayFlex');
  });

  // clicking on img flies map to pin point
  $element.on('click', "img" , e => {
    map.flyTo([places.latitude, places.longitude], 12);

  });

  return $element;
}

// Render all places to page
const renderPlaces = (places) => {
  // Loops though all [places]
  for (const place of places) {
    // Creates element
    const elementPlace = createElementPlaces(place);
    // Renders it to container
    $('#mapDetails').append(elementPlace);
  }
};

// Executes renderPlaces
renderPlaces(places);

// ////////////////
//  Leaflet Map Stuff
//      START
// ////////////////

// popup for where we clicka
let popup = L.popup();

function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(map);
}

map.on('click', onMapClick);

// ////////////////
//      END
//  Leaflet Map Stuff
// ////////////////


// add places to map
$popUpForm.submit(function(e) {
  // Prevents form from submitting
  e.preventDefault();

  // gets inputs as an array of objects
  const inputs = $(this).serializeArray();
  let values = {};

  // loop though array and add them to values
    // as key/pair object entries
  for (const i in inputs) {
    const key = inputs[i].name;
    const value = inputs[i].value;

    // If value is empty, exit function and dont send update request
    if (value == '') return;

    // Insert key/value pair into object
    values[key] = value;
  }

  // Add marker to map of new place
  L.marker([values.latitude, values.longitude]).addTo(map);

  // Add place to database
  $.ajax({
    method: "POST",
    url: `/api/maps/${myMap.id}/place`,
    data: values
  })
    .done(function(content) {
      // and render returned inserted place to page
      renderPlaces(content);
    });
});


// Register show popup action to addPlaces button (the plus icon)
$addPlacesBtn.on('click', e => $addPopUp.toggleClass('displayFlex'));

// Register click on blurred background of popup
// to close on click
$addPopUp.on('click', e => {
  if (e.target !== $addPopUp[0]) return;
  $addPopUp.toggleClass('displayFlex');
});


// Handle form submit via ajax
$editForm.submit(function(e) {
  // Get inputs as array of objects
  const inputs = $(this).serializeArray();
  let values = {};

  // Updates currentPlaceId to the one we are about to edit
  values.place = currentPlaceEditId;

  // Loop through inputs and construct object
  for (const i in inputs) {
    const key = inputs[i].name;
    const value = inputs[i].value;
    // if value is empty, exit function and dont update place
    if (value == '') return;

    // Insert key/value pair into values object
    values[key] = value;
  }
  // Send data
  $.ajax({
    method: "PATCH",
    url: `/api/maps/${myMap.id}/place`,
    data: values
  })
    // Render place to map ?
      // I sure hopes it removed the old one
    .done(function(content) {
      renderPlaces(content);
    });
});


// add places button


// edit button for places
// Register click on blurred background of popup
// to close on click
$editPopUp.on('click', e => {
  if (e.target !== $editPopUp[0]) return;
  $editPopUp.toggleClass('displayFlex');
});


// Updates colour of Fave btn if user has favourited it or not
function updateFaveBtn() {
  // Send request
  $.ajax({
    method: "POST",
    url: `/api/user/isFavourites`,
    data: {id: myMap.id},
  })
    .done(function(data) {
      // If user has favourited it, set it to green
      if (data.length) {
        $bookmarkBtn.addClass('green');
      // If not, remove green (set it black ?)
      } else {
        $bookmarkBtn.removeClass('green');
      }
    });
}

// execute function
updateFaveBtn();

// on bookmark button click
// add or remove from favourites
$bookmarkBtn.on('click', e => {
  // If button has green
  // remove map from favourites
  if ($bookmarkBtn.hasClass('green')) {
    // Send request to remove favourite
    $.ajax({
      method: "DELETE",
      url: `/api/user/favourites`,
      data: {id: myMap.id},
    })
      // When server is done, update fave btn
      .done(function(data) {
        updateFaveBtn();
      });
  // If btn isnt green
  // Add map to favourite on click
  } else {
    $.ajax({
      method: "POST",
      url:  `/api/user/favourites`,
      data: {id: myMap.id},
    })
      // When server is done, update fave btn
      .done(function(data) {
        updateFaveBtn();
      });
  }
});
