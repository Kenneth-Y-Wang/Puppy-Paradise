var $breed = document.querySelector('.breed');
var $random = document.querySelector('.random');
var $form = document.querySelector('form');
// var $picView = document.querySelector('.picView');

$breed.addEventListener('click', function () {
  $form.className = 'column-half';
  $breed.className = 'breed picButton clicked';
});

/* <div class="row allEntries" >
    <div class=" onePic column-two-third">
      <div class="picHolder"><img class="picView" src="https://images.dog.ceo/breeds/hound-walker/n02089867_3103.jpg"></div>
      <div class="saveButtonHolder">
       <button class="picButton" type="button">SAVE</button>
      </div>
    </div>
  </div> */

function randerPic(data) {
  var $allEntries = document.createElement('div');
  $allEntries.setAttribute('class', 'row allEntries');

  var $onePic = document.createElement('div');
  $onePic.setAttribute('class', 'onePic column-two-third');

  var $picHolder = document.createElement('div');
  $picHolder.setAttribute('class', 'picHolder');

  var $picView = document.createElement('img');
  $picView.setAttribute('class', 'picView');
  $picView.setAttribute('src', data.message);

  var $buttonHolder = document.createElement('div');
  $buttonHolder.setAttribute('class', 'saveButtonHolder');

  var $saveButton = document.createElement('button');
  $saveButton.setAttribute('class', 'picButton');
  $saveButton.setAttribute('type', 'button');
  $saveButton.textContent = 'SAVE';

  $allEntries.appendChild($onePic);
  $onePic.appendChild($picHolder);
  $onePic.appendChild($buttonHolder);
  $picHolder.appendChild($picView);
  $buttonHolder.appendChild($saveButton);

  return $allEntries;

}

var $pictureList = document.querySelector('#picture-list');

function randomPicSearch() {

  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://dog.ceo/api/breeds/image/random');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {

    var newPic = randerPic(xhr.response);
    $pictureList.appendChild(newPic);

  });
  xhr.send();

}

$random.addEventListener('click', function () {
  randomPicSearch();
  $breed.className = 'breed picButton';
})
;

function breedSearch(name) {
  var breed = '';
  for (var i = 0; i < name.length; i++) {
    breed += name.charAt(i).toLowerCase();
  }
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://dog.ceo/api/breed/' + breed + '/images/random');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {

    var newPic = randerPic(xhr.response);
    $pictureList.appendChild(newPic);

  });
  xhr.send();

}

$form.addEventListener('submit', function () {
  event.preventDefault();
  var breedName = $form.elements.keyWord.value;
  breedSearch(breedName);
  $form.reset();
})
;
