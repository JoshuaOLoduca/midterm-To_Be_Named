console.log('Bugle Rick');

const $mostLikedDiv = $('#most-liked');
const $mostViewedDiv = $('#most-viewed');

const mostLikedMaps = [];
const mostViewedMaps = [];
updatePage();

function loadMostLiked() {
  $.ajax({
    method: 'GET',
    url: '/api/maps/mostLiked',
  })
    .done(function(data) {
      data.forEach(element => mostLikedMaps.push(element));
      renderMaps($mostLikedDiv, mostLikedMaps, mapData => `<h2>Likes: ${mapData.likes}</h2>`);
    });
}

function loadMostViewed() {
  $.ajax({
    method: 'GET',
    url: '/api/maps/mostViewed',
  })
    .done(function(data) {
      data.forEach(element => mostViewedMaps.push(element));
      renderMaps($mostViewedDiv, mostViewedMaps, mapData => `<h2>Views: ${mapData.views}</h2>`);
    });
}

function renderMaps($element, listOfMaps, special, howManyToShow = 10) {
  for (let i = 0; i < howManyToShow; i++) {
    if (!listOfMaps.length) return;
    renderMap($element, listOfMaps.shift(), special);
  }
}


function renderMap($containerElement, mapData, special) {
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

  $element.on('click','section', e => {
    window.location.assign("/maps/" + mapData.id);
  });

  $containerElement.find('.map-container').append($element);
}

function updatePage() {
  $mostLikedDiv.find('.map-container').empty();
  $mostViewedDiv.find('.map-container').empty();

  mostLikedMaps.length = 0;
  mostViewedMaps.length = 0;
  console.log(mostLikedMaps);
  loadMostLiked();
  loadMostViewed();
}
