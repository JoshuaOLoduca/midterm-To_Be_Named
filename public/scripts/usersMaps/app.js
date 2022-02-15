const allMaps = [];
let currentMapEditId = null;

const $mapContainer = $('#mapContainer');
const $popUpContainer = $('#pop-up-background');

$popUpContainer.on('click', e => {
  if(e.target !== $popUpContainer[0]) return;
  currentMapEditId = null;
  $popUpContainer.toggleClass('displayFlex');
})

let ajaxUrl = `/api/users/${userId}/maps`;

$.ajax({
  method: "GET",
  url: ajaxUrl
})
.done(function( content ) {
  console.log(ajaxUrl);
  content.forEach(element => {
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
        <button class="editBtn">Edit</button>
        <button class="deleteBtn">Delete</button>
      </aside>

    </article>
  `);

  $element.find('content').on('click', e => {
    window.location.assign("/maps/"+mapData.id);
  })

  $element.find('section button').on('click', e => {
    $element.find('aside').toggle('fast');
  })

  $element.find('aside .editBtn').on('click', e => {
    updateEditPopup(mapData);
    $popUpContainer.toggleClass('displayFlex');
  })

  $mapContainer.append($element);
}

function updateEditPopup(mapData) {
  const formInputs = $popUpContainer.find('form input')
  currentMapEditId = mapData.id;

  formInputs.each(function() {
    switch(this.id) {
      case 'title':
        $(this).val(mapData.title)
        break;
      case 'city':
        $(this).val(mapData.city)
        break;
      case 'description':
        $(this).val(mapData.description)
        break;
      case 'cover_img':
        $(this).val(mapData.cover_img)
        break;
    }
  })
}

$('#loadMoar').on('click', e => {
  renderMaps();
})
