const allMaps = [];

const $mapContainer = $('#mapContainer');

let ajaxUrl = '';

switch(renderType) {
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

$.ajax({
  method: "GET",
  url: ajaxUrl
})
.done(function( msg ) {
  msg.forEach(element => {
    allMaps.unshift(element);
  });

  renderMaps();
});

function renderMaps(howManyToShowPerRender = 10) {
  if (!allMaps.length) return;

  for (let i = 0; i < howManyToShowPerRender; i++) {
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

function renderMapToScreen(mapData) {
  const $element = $(`
    <article>
    <img alt='cover image for place collection' src='${mapData.cover_img}'/>
    <content>
      <header>
        <h2>${mapData.title}</h2>
        <h4>${mapData.city}</h4>
      </header>
      <p>${mapData.description}</p>
    </content>
    </article>
  `);

  $element.on('click', e => {
    window.location.assign("/maps/"+mapData.id);
  })

  $mapContainer.append($element);
}

$('#loadMoar').on('click', e => {
  renderMaps();
})
