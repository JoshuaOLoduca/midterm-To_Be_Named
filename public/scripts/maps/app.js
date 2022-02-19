// Client facing scripts here

let currentPlaceEditId = null;
let currentPlaceEditElement = null;

const $addPopUp = $('.addPopUp');
const $poppyUp = $('.poppyUp');
const $popUpForm = $('#popUpForm');
const $addPlacesBtn = $('#addPlacesBtn');
const $bookmarkBtn = $('#bookmarkBtn');
const $editPopUp = $('.editPopUp');
const $editPoppyUp = $('.editPoppyUp');
const $editForm = $('#editForm')
const $deletePlaceBtn = $('#deletePlaceBtn')

const mapClickZoomLevel = 15;
const mapPageLoadZoomLevel = 13;
let map;

// location for the map in the html
const $mapDetails = $('#mapDetails');
// default setview
if (places.length) {
  map = L.map('map').setView([places[0].latitude, places[0].longitude], 13);
} else {
  map = L.map('map').setView([ 0 ,0 ], mapPageLoadZoomLevel);
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
  L.marker([place.latitude, place.longitude]).addTo(map)
}


$deletePlaceBtn.on('click', e => {
  $.ajax({
    method: 'DELETE',
    url: `/api/places/${currentPlaceEditId}`
  })
  .done(result => {
    currentPlaceEditElement.remove();
    currentPlaceEditElement = null;
    $editPopUp.toggleClass('displayFlex')
  })
})


function createElementPlaces(places) {

    const editButtonElement = `<button type="submit" class="btn editBtn"><i class="fa-solid fa-pen-to-square"></i></button>`

    const $element = $(`

    <article>
    <img alt='cover image for place collection' src='${places.img_url}'/>
    <content>
    <header>
    <h2>${places.title}</h2>
    </header>
    <p>${places.description}</p>
    </content>

    ${editButtonElement}

    </article>
    `);
    $element.on('click','button', e => {
      currentPlaceEditId = places.id
      currentPlaceEditElement = $element;
      $editPopUp.toggleClass('displayFlex')
    });

    $element.on('click' , e => {
      if($(e.target).hasClass('editBtn')) return;
      map.flyTo([places.latitude, places.longitude], mapClickZoomLevel);

      $([document.documentElement, document.body]).animate({
        scrollTop: $("#map").offset().top
    }, 500);
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
  L.marker([values.latitude, values.longitude]).addTo(map)
  $.ajax({
    method: "POST",
    url: `/api/maps/${myMap.id}/place`,
    data: values
  })
  .done(function( content ) {
    renderPlaces(content);

  });
})


$addPlacesBtn.on('click', e => $addPopUp.toggleClass('displayFlex'));

$addPopUp.on('click', e => {
  if(e.target !== $addPopUp[0]) return;
  $addPopUp.toggleClass('displayFlex')
})



$editForm.submit(function(e) {
  const inputs = $(this).serializeArray();
  let values = {}
  values.place = currentPlaceEditId
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
  .done(function( content ) {
    renderPlaces(content)
  })
})


// add places button


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


$.ajax({
  method: 'POST',
  url: '/api/user/isCollaborator',
  data: {id: myMap.id}
})
.done(function(data) {
  console.log(data)
  if(!data.length) {
    $addPlacesBtn.remove()
    $('.editBtn').remove()
  }
})

if (!userId) {
  $bookmarkBtn.remove()
}
