const allMaps = [];
let currentMapEditId = null;
let currentMapElement = null;

const $mapContainer = $('#mapContainer');
const $popUpContainer = $('#pop-up-background');
const $updateMapForm = $('#updateMapForm');

$updateMapForm.submit(function(e) {
  e.preventDefault();
  const inputs = $(this).serializeArray();
  let values = {}

  for (const i in inputs) {
    const key = inputs[i].name;
    const value = inputs[i].value;
    values[key] = value;
  }

  $.ajax({
    method: "PATCH",
    url: `/api/maps/${currentMapEditId}`,
    data: values
  })
  .done(function( content ) {
    console.log(currentMapElement);
    currentMapElement.html(`
      <section>
        <img alt='cover image for place collection' src='${values.cover_img}'/>
        <content>
          <header>
            <h2>${values.title}</h2>
            <h4>${values.city}</h4>
          </header>
          <p>${values.description}</p>
        </content>
        <button>Edit</button>
      </section>

      <aside>
        <button class="editBtn">Edit</button>
        <button class="deleteBtn">Delete</button>
      </aside>
  `);
  })


})

$popUpContainer.on('click', e => {
  if(e.target !== $popUpContainer[0]) return;
  currentMapEditId = null;
  currentMapElement = null;
  $popUpContainer.toggleClass('displayFlex');
})

let ajaxUrl = `/api/users/${userId}/maps`;

$.ajax({
  method: "GET",
  url: ajaxUrl
})
.done(function( content ) {
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


  // Navigated to map page
  $element.find('content').on('click', e => {
    window.location.assign("/maps/"+mapData.id);
  })

  // Show Edit Buttons
  $element.find('section button').on('click', e => {
    $element.find('aside').toggle('fast');
  })

  // Edit Map Button
  $element.find('aside .editBtn').on('click', e => {
    updateEditPopup(mapData);
    currentMapElement = $element;
    $popUpContainer.toggleClass('displayFlex');
  })

  // Delete Button
  $element.find('aside .deleteBtn').on('click', e => {
    $.ajax({
      method: "DELETE",
      url: `/api/maps/${mapData.id}`,
      data: {owner_id: userId}
    })
    .done(function() {
      $element.remove();
    })
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
