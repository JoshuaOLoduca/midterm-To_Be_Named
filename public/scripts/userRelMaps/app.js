
// Initialize variables globally
  // So we have some sort of memory
    // (should use closures)
const allMaps = [];
const $mapContainer = $('#mapContainer');
let ajaxUrl = '';

// Depending on renderType set by ejs, use different URL
switch (renderType) {
case 'allMaps':
  ajaxUrl = '/api/maps';
  break;
case 'favourites':
  ajaxUrl = `/api/users/${userId}/maps/favourites`;
  break;
case 'collaborator':
  ajaxUrl = `/api/users/${userId}/maps/collaborate`;
  break;
}

// Send request to get maps
$.ajax({
  method: "GET",
  url: ajaxUrl
})
  // When server returns data render it to page
  .done(function(msg) {
    // Push data into global arr
    msg.forEach(element => {
      allMaps.unshift(element);
    });

    // Render maps to page
    renderMaps();
  });

// Render 10 pages at a time to page
function renderMaps(howManyToShowPerRender = 10) {
  // Loop through all maps
  for (let i = 0; i < howManyToShowPerRender; i++) {
    // If there are no maps left, exit function
    if (!allMaps.length) return;

    // Remove map from arr and render it to screen
    renderMapToScreen(allMaps.pop());
  }
}

// title:
// city:
// cover_img:
// description:

// id:
// owner_id:
// public:

// Prep map as dom element and render it to screen
function renderMapToScreen(mapData) {
  // Jquery dom prep
    // Insert relevent data
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

  // Register onlick of tile
    // send user to that maps page
  $element.on('click', 'section', e => {
    window.location.assign("/maps/" + mapData.id);
  });

  // Add map element to container
    // This renders it to the page
  $mapContainer.append($element);
}

// Make load more button render more maps
$('#loadMoar').on('click', e => {
  renderMaps();
});
