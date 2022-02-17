// Client facing scripts here


const $addPopUp = $('.addPopUp');
const $poppyUp = $('.poppyUp');
const $popUpForm = $('#popUpForm');
const $addPlacesBtn = $('#addPlacesBtn');
const $bookmarkBtn = $('#bookmarkBtn');
const $editBtn = $('#editBtn');
const $editPopUp = $('.editPopUp');
const $editPoppyUp = $('.editPoppyUp');
const $editForm = $('#editForm')


// location for the map in the html
const $mapDetails = $('#mapDetails');
// default setview
var map = L.map('map').setView([places[0].latitude, places[0].longitude], 13);


L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZ2xhdm92aWNhIiwiYSI6ImNrem9hMjFuYzBkd3EydW13OGU5bzlid3kifQ.C_IQD6mnpvTVu5GosTyrJQ'
}).addTo(map);


for (const place of places) {
  L.marker([place.latitude, place.longitude]).addTo(map)
}

function createElementPlaces(places) {
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

  $element.on('click','button', e => $editPopUp.toggleClass('displayFlex'));

  $element.on('click', "img" , e => {
    map.flyTo([places.latitude, places.longitude], 12);
  })

  return $element
}


const renderPlaces =(places) => {
  for (const place of places) {
    const elementPlace = createElementPlaces(place);
    $('#mapDetails').append(elementPlace)
  }
}

renderPlaces(places)


// popup for where we clicka
var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);


// add places to map
console.log(myMap);
$popUpForm.submit(function(e) {
  e.preventDefault();
  const inputs = $(this).serializeArray();
  let values = {}

  for (const i in inputs) {
    const key = inputs[i].name;
    const value = inputs[i].value;
    if (value == '') return;
    values[key] = value;
  }

  $.ajax({
    method: "POST",
    url: `/api/maps/${myMap.id}/place`,
    data: values
  })
  .done(function( content ) {
    renderPlaces(content);

  });
})

$editForm.submit(function(e) {
  e.preventDefault();
  const inputs = $(this).serializeArray();
  let values = {}

  for (const i in inputs) {
    const key = inputs[i].name;
    const value = inputs[i].value;
    if (value == '') returnl;
    values[key] = value;
  }

  $.ajax({
    method: "PATCH",
    url: `/api/maps/${myMap.id}/place`,
    data: values
  })
  .done(function( content ) {
    renderPlaces(content)
  })
})


// add places button
$addPlacesBtn.on('click', e => $addPopUp.toggleClass('displayFlex'));

$addPopUp.on('click', e => {
  if(e.target !== $addPopUp[0]) return;
  $addPopUp.toggleClass('displayFlex')
})

// edit button for places

$editPopUp.on('click', e => {
  if(e.target !== $editPopUp[0]) return;
  $editPopUp.toggleClass('displayFlex')
})



function updateFaveBtn(){
$.ajax({
  method: "POST",
  url: `/api/user/isFavourites`,
  data: {id: myMap.id},
})
.done(function(data) {
  if(data.length) {
    $bookmarkBtn.addClass('green');
  } else {
    $bookmarkBtn.removeClass('green');
  }
})
}

// execute function
updateFaveBtn();

$bookmarkBtn.on('click', e => {
  if($bookmarkBtn.hasClass('green')) {
    $.ajax({
      method: "DELETE",
      url: `/api/user/favourites`,
      data: {id: myMap.id},
    })
    .done(function(data) {
      updateFaveBtn();
    })
  } else {
    $.ajax({
      method: "POST",
      url:  `/api/user/favourites`,
      data: {id: myMap.id},
    })
    .done(function(data) {
      updateFaveBtn();
    })
  }
})
