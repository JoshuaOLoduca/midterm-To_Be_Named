const allMaps = [];
let currentMapEditId = null;
let currentMapElement = null;

const $mapContainer = $('#mapContainer');
const $editMapPopUpContainer = $('#pop-up-background-edit-map');
const $addMapPopUpContainer = $('#pop-up-background-add-map');
const $updateMapForm = $('#updateMapForm');
const $addMapForm = $('#addMapForm');
const $addMapBtn = $('#addMapBtn');
const $collaboratorsTable = $('#collaborators');
const $addCollaboratorForm = $('#addCollaboratorForm');


$addMapBtn.on('click', e => $addMapPopUpContainer.toggleClass('displayFlex'));

$addMapPopUpContainer.on('click', e => {
  if(e.target !== $addMapPopUpContainer[0]) return;
  currentMapEditId = null;
  currentMapElement = null;
  $addMapPopUpContainer.toggleClass('displayFlex');
})

$editMapPopUpContainer.on('click', e => {
  if(e.target !== $editMapPopUpContainer[0]) return;
  currentMapEditId = null;
  currentMapElement = null;
  $editMapPopUpContainer.toggleClass('displayFlex');
})

$addCollaboratorForm.submit(function(e) {
  e.preventDefault();
  const inputs = $(this).serializeArray();

  $.ajax({
    method: "POST",
    url: `/api/maps/${currentMapEditId}/collaborators`,
    data: {
      id: inputs[0].value,
      map_id: currentMapEditId
    }
  })
  .done(function( collaborator ) {
    collaboratorsTable().update(collaborator);
  });
})

$addMapForm.submit(function(e) {
  e.preventDefault();
  const inputs = $(this).serializeArray();
  let values = {}

  for (const i in inputs) {
    const key = inputs[i].name;
    const value = inputs[i].value;
    if (value == '') return;
    values[key] = value;
  }

  $.ajax({
    method: "POST",
    url: `/api/maps`,
    data: values
  })
  .done(function( content ) {
    allMaps.push(content);
    renderMaps();
    $addMapPopUpContainer.toggleClass('displayFlex');
  });
})

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

let ajaxUrl = `/api/users/${userId}/maps`;

$.ajax({
  method: "GET",
  url: ajaxUrl
})
.done(function( content ) {
  content.forEach(element => {
    allMaps.push(element);
  });
  renderMaps();
})

function renderMaps(howManyToShowPerRender = 10) {
  for (let i = 0; i < howManyToShowPerRender; i++) {
    if (!allMaps.length) return;
    renderMapToScreen(allMaps.shift());
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
  $element.on('click','content', e => {
    window.location.assign("/maps/"+mapData.id);
  })

  // Show Edit Buttons
  $element.on('click','section button', e => {
    $element.find('aside').toggle('fast');
  })

  // Edit Map Button
  $element.on('click','aside .editBtn', e => {
    updateEditPopup(mapData);
    currentMapElement = $element;
    $editMapPopUpContainer.toggleClass('displayFlex');
  })

  // Delete Button
  $element.on('click','aside .deleteBtn', e => {
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
  const formInputs = $editMapPopUpContainer.find('form input')
  currentMapEditId = mapData.id;
  collaboratorsTable().reset();

  $.ajax({
    method: "get",
    url: `/api/maps/${mapData.id}/collaborators`
  })
  .done(function(result) {
    collaboratorsTable().update(result);
  });

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

function collaboratorsTable() {

  function update(collaborators) {

    for (const collaborator of collaborators) {
      let names = $(`
      <tr>
        <td>${collaborator.name}</td>
        <td>
        <button class='deleteBtn'>Remove</button>
        </td>
      </tr>
      `);

      names.on('click', 'button', function() {
        $.ajax({
          method: "DELETE",
          url: `/api/maps/${collaborator.map_id}/collaborators`,
          data: {toRemoveId: collaborator.user_id}
        })
        .done(function() {
          names.remove();
        })
      })

      appendElement(names)
    }
  }

  function reset() {
    $collaboratorsTable.empty();
    $collaboratorsTable.append($(`
    <tr>
      <th>Name</th>
      <th>Edit</th>
    </tr>`))
  }

  function appendElement($elm ) {
    $collaboratorsTable.append($elm )
  }

  return{reset, update};

}




$('#loadMoar').on('click', e => {
  renderMaps();
})
