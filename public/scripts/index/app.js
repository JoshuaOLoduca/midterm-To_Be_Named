// //////////
// Fetching elements as vars
// //////////
const $mostLikedDiv = $('#most-liked')
const $mostViewedDiv = $('#most-viewed')

// //////////
// Initializing arrays
// //////////
const mostLikedMaps = [];
const mostViewedMaps = [];

// //////////
// Executing on load render
// //////////
updatePage()

/**
 * Fetchs maps that are sorted by most favourited and renders to page with @function renderMaps
 * @returns {undefined} undefined
 */
function loadMostLiked() {

  // Get maps sorted by favourites from api
  $.ajax({
    method: 'GET',
    url: '/api/maps/mostLiked',
  })
  .done(function(data) {
    // Store result in memory for later
    data.forEach(element => mostLikedMaps.push(element));

    // Render maps to mostLiked container with the header of 'Likes: <Favourite Count>'
    renderMaps($mostLikedDiv, mostLikedMaps, mapData => `<h2>Likes: ${mapData.likes}</h2>`);
  });
}

/**
 * Fetchs maps that are sorted by most views and renders to page with @function renderMaps
 * @returns {undefined} undefined
 */
function loadMostViewed() {

  // Get maps sorted by views from api
  $.ajax({
    method: 'GET',
    url: '/api/maps/mostViewed',
  })
  .done(function(data) {
    // Store result in memory for later
    data.forEach(element => mostViewedMaps.push(element));

    // Render maps to mostViewed container with the header of 'Views: <View Count>'
    renderMaps($mostViewedDiv, mostViewedMaps, mapData => `<h2>Views: ${mapData.views}</h2>`);
  });
}

/**
 * Renders list of maps to $element and sets their header section to the result of setHeaderArea()
 *
 * @param {JQuery} $element
 * @param {Array} listOfMaps
 * @param {function headerRender(mapData) {
  sets header section of map to anything
 }} setHeaderArea
 * @param {Number} howManyToShow how many maps to render. default is 10
 * @returns {undefined} undefined
 */
function renderMaps($element, listOfMaps, setHeaderArea, howManyToShow = 10) {
  for(let i = 0; i < howManyToShow; i++) {
    if(!listOfMaps.length) return;
    renderMap($element, listOfMaps.shift(), setHeaderArea);
  }
}

/**
 * Prepares map as jquery object with event listerners and renders it to $containerElement
 * @param {JQuery} $containerElement
 * @param {Object} mapData
 * @param {function} setHeaderArea
 * @returns {undefined} undefined
 */
function renderMap($containerElement, mapData, setHeaderArea) {

  // Prepares JQuery element with data
  const $element = $(`
  <article>
      ${setHeaderArea(mapData)}
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
    </article>
  `);

  // On card click, redirect user to that maps page
  $element.on('click','section', e => {
    window.location.assign("/maps/"+mapData.id);
  })

  // Render it to container
  $containerElement.find('.map-container').append($element);
}

/**
 * Empties map containers then
 * Updates page with data fetched from database
 * @returns {undefined} undefined
 */
function updatePage() {
  // Deletes map cards
  $mostLikedDiv.find('.map-container').empty();
  $mostViewedDiv.find('.map-container').empty();

  // Empties arrays
  mostLikedMaps.length = 0;
  mostViewedMaps.length = 0;

  // Fetch new map data and render it to page
  loadMostLiked()
  loadMostViewed()
}
