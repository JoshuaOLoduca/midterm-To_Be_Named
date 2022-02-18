console.log('Bugle Rick');

// Find elements and store them in variables
const $mostLikedDiv = $('#most-liked');
const $mostViewedDiv = $('#most-viewed');

// Initialize array
// Global so we have persistant memory
// (Should be a closure)
const mostLikedMaps = [];
const mostViewedMaps = [];

// Updates page to have maps on it
updatePage();

// Gets maps sorted by favourites
// and renders them to page
function loadMostLiked() {

  // Send request for data
  $.ajax({
    method: 'GET',
    url: '/api/maps/mostLiked',
  })
    // On success, push to array and render
    .done(function(data) {
      // Push to array
      data.forEach(element => mostLikedMaps.push(element));

      // Render to page with list of likes
      renderMaps($mostLikedDiv, mostLikedMaps, mapData => `<h2>Likes: ${mapData.likes}</h2>`);
    });
}

// Get maps sorted by views
// And render them to page
function loadMostViewed() {

  // Send request for data
  $.ajax({
    method: 'GET',
    url: '/api/maps/mostViewed',
  })
    // on success, push data to array and render to page
    .done(function(data) {
      // Push to array
      data.forEach(element => mostViewedMaps.push(element));
      // Render them to page and show views count
      renderMaps($mostViewedDiv, mostViewedMaps, mapData => `<h2>Views: ${mapData.views}</h2>`);
    });
}

// Renders multiple maps to page
function renderMaps($element, listOfMaps, special, howManyToShow = 10) {

  // Render 10 maps at a time
  for (let i = 0; i < howManyToShow; i++) {
    // If no maps are left, exit function
    if (!listOfMaps.length) return;

    // Render map to element along with its special heading
    renderMap($element, listOfMaps.shift(), special);
  }
}

// renders 1 map element
function renderMap($containerElement, mapData, special) {
  // Create jquery object with populated values
  const $element = $(`
  <article>
      ${special(mapData)}
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

  // Register on click to direct user to that maps page
  $element.on('click','section', e => {
    window.location.assign("/maps/" + mapData.id);
  });

  // Render map to container
  $containerElement.find('.map-container').append($element);
}

// Preps page and renders maps to them
function updatePage() {
  // Empties containers
  $mostLikedDiv.find('.map-container').empty();
  $mostViewedDiv.find('.map-container').empty();

  // Empty Arrays
  mostLikedMaps.length = 0;
  mostViewedMaps.length = 0;

  // Fetch and render maps to page
  loadMostLiked();
  loadMostViewed();
}
