// Get mapContainer Element
const $mapContainer = $('#mapContainer');

// Initialize array to store maps in
const allMaps = [];

// Gets and renders maps to page
getAndLoadMaps();

// On button click, render 10 more maps (from memory) to page
$('#loadMoar').on('click', () => {
  renderMaps();
});

/**
 * fetchs maps from api based on a var passed by the ejs templateVars
 * and renders a batch of them to the page
 */
function getAndLoadMaps() {

  // define api url for ajax within scope of switch case and $.ajax
  let ajaxUrl = '';

  // renderType is passed to and defined by userRelMaps.ejs
  switch (renderType) {
  case 'allMaps':
    // Get all public maps
    ajaxUrl = '/api/maps';
    break;
  case 'favourites':
    // Get all favourites of a particular user
    ajaxUrl = `/api/users/${userId}/maps/favourites`;
    break;
  case 'collaborator':
    // get all maps user can edit
    ajaxUrl = `/api/users/${userId}/maps/collaborate`;
    break;
  }

  // Jquery ajax to get all maps from url
  $.ajax({
    method: "GET",
    url: ajaxUrl
  })
    .done(function(msg) {
    // Push each map into memory
      msg.forEach(element => {
        allMaps.unshift(element);
      });

      // Render a batch of maps
      renderMaps();
    });
}

/**
 * Renders
 * @param {Nummber} howManyToShowPerRender how big of a batch to render
 * @returns {undefined} undefined
 */
function renderMaps(howManyToShowPerRender = 10) {
  for (let i = 0; i < howManyToShowPerRender; i++) {
    // If there are no maps, exit function
    if (!allMaps.length) return;
    // Remove map from array and render it to screen
    renderMapToScreen(allMaps.pop());
  }
}

/**
 * Creates, adds listeners and renders a jquery element map to screen
 * @param {Object} mapData Key/val pair of map data
 * @param {Number} mapData.id unique id of map
 * @param {Number} mapData.owner_id unique id of user who created it
 * @param {String} mapData.city Name of city map is of (global map if null)
 * @param {String} mapData.title Title of Map
 * @param {String} mapData.description description of Map
 * @param {String} mapData.cover_img url to image for map
 * @param {number} mapData.views Total view count for map
 * @param {boolean} mapData.public If map is viewable by
 */
function renderMapToScreen(mapData) {

  // Create JQeury element with relevent data
  const $element = $(`
    <article>
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

  // Register click listerner on card
  // Redirect user to that maps page
  $element.on('click', 'section', () => {
    window.location.assign("/maps/" + mapData.id);
  });

  // Render it to page
  $mapContainer.append($element);
}
