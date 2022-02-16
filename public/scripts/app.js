// Client facing scripts here



const $poppyUp = $('.poppyUp');
const $popUpForm = $('#popUpForm');

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
    </article>
  `);

  $element.on('click', e => {
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



// var marker = L.marker([45.434895, -73.683872]).addTo(map);

// var circle = L.circle([51.508, -0.11], {
//   color: 'red',
//   fillColor: '#f03',
//   fillOpacity: 0.5,
//   radius: 500
// }).addTo(map);

// var polygon = L.polygon([
//   [51.509, -0.08],
//   [51.503, -0.06],
//   [51.51, -0.047]
// ]).addTo(map);

// marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
// circle.bindPopup("I am a circle.");
// polygon.bindPopup("I am a polygon.");


// function onMapClick(e) {
//   alert("You clicked the map at " + e.latlng);
// }

// map.on('click', onMapClick);


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

