// Client facing scripts here
const $mapDetails = $('#mapDetails');
var map = L.map('map').setView([45.434895, -73.683872], 13);


L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZ2xhdm92aWNhIiwiYSI6ImNrem9hMjFuYzBkd3EydW13OGU5bzlid3kifQ.C_IQD6mnpvTVu5GosTyrJQ'
}).addTo(map);

console.log(places)

for (const place of places) {
  L.marker([place.latitude, place.longitude]).addTo(map)
}

function createElementPlaces() {
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
  // $element.on('click', e => {
  //   window.location.assign("/maps/"+places.id);
  // })

  return $element
}
$('#mapDetails').append(createElementPlaces)





const renderPlaces =(places) => {
  for (const place of places) {
    const elementPlace = createElementPlaces(place);
    $('#mapDetails').append(elementPlace)
  }
}








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

marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
// circle.bindPopup("I am a circle.");
// polygon.bindPopup("I am a polygon.");


function onMapClick(e) {
  alert("You clicked the map at " + e.latlng);
}

map.on('click', onMapClick);

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);


