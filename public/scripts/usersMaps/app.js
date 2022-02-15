const allMaps = [];

const $mapContainer = $('#mapContainer');

let ajaxUrl = `/api/users/${userId}/maps`;


$.ajax({
  method: "GET",
  url: ajaxUrl
})
.done(function( msg ) {
  console.log(ajaxUrl);
  msg.forEach(element => {
    allMaps.unshift(element);
  });
  renderMaps();
})

function renderMaps(howManyToShowPerRender = 10) {
  for (let i = 0; i < howManyToShowPerRender; i++) {
    if (!allMaps.length) return;
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
      <section>
        <img alt='cover image for place collection' src='${mapData.cover_img}'/>
        <content>
          <header>
            <h2>${mapData.title}</h2>
            <h4>${mapData.city}</h4>
          </header>
          <p>${mapData.description}</p>
        </content>
        <button>Edit</button>
      </section>
      <aside>
      </aside>
    </article>
  `);

  $element.find('content').on('click', e => {
    window.location.assign("/maps/"+mapData.id);
  })

  $element.find('content').on('click', e => {
    window.location.assign("/maps/"+mapData.id);
  })

  $mapContainer.append($element);
}

$('#loadMoar').on('click', e => {
  renderMaps();
})
