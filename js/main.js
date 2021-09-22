var $breed = document.querySelector('.breed');
var $random = document.querySelector('.random');
var $form = document.querySelector('form');
var $opButton = document.querySelectorAll('.opButton');
var $buttonLeft = document.querySelector('.buttonLeft');
var $wholePage = document.querySelector('.wholePage');
var $startButton = document.querySelector('.startButton');
var $appCover = document.querySelector('.appCover');
var picViewNumber = 1;
// var $tabView = document.querySelector('.tabLeft');
// var $picView = document.querySelector('.picView');

$startButton.addEventListener('click', function () {
  $wholePage.className = 'wholePage';
  $appCover.className = 'appCover hidden';

});

$buttonLeft.addEventListener('click', function () {
  if (event.target.matches('.opButton') === false) {
    return;
  }
  for (var i = 0; i < $opButton.length; i++) {
    if ($opButton[i] === event.target) {
      $opButton[i].className = 'opButton opClicked';
      picViewNumber = parseInt($opButton[i].getAttribute('data-number'));

    } else {
      $opButton[i].className = 'opButton';
    }
  }
});

$breed.addEventListener('click', function () {
  $form.className = 'column-half';
  $breed.className = 'breed picButton clicked';
});

/*
    <div class=" onePic column-two-third" data-pic="">
      <div class="picHolder"><img class="picView" src="https://images.dog.ceo/breeds/hound-walker/n02089867_3103.jpg"></div>
      <div class="saveButtonHolder">
       <button class="picButton" type="button" data-pic="">SAVE</button>
      </div>
    </div>
   */

// for  2 pic showing
/*
    <div class=" morePic column-half" data-pic="">
      <div class="picHolder"><img class="picView-two" src="https://images.dog.ceo/breeds/hound-walker/n02089867_3103.jpg"></div>
      <div class="saveButtonHolder">
       <button class="picButton" type="button" data-pic="">SAVE</button>
      </div>
    </div>
   */

// for  3 pic showing
/*
    <div class=" morePic column-one-fourth" data-pic="">
      <div class="picHolder"><img class="picView-three" src="https://images.dog.ceo/breeds/hound-walker/n02089867_3103.jpg"></div>
      <div class="saveButtonHolder">
       <button class="picButton" type="button" data-pic="">SAVE</button>
      </div>
    </div>
   */

function renderPic(data) {

  var $onePic = document.createElement('div');
  var $picView = document.createElement('img');

  if (picViewNumber === 1) {
    $onePic.setAttribute('class', 'onePic newPic column-two-third');
  } else if (picViewNumber === 2) {
    $onePic.setAttribute('class', 'morePic newPic column-half');
    $picView.setAttribute('id', 'two');
  } else if (picViewNumber === 3) {
    $onePic.setAttribute('class', 'morePic newPic column-one-fourth');
    $picView.setAttribute('id', 'three');
  }

  $onePic.setAttribute('data-pic', data);

  var $picHolder = document.createElement('div');
  $picHolder.setAttribute('class', 'picHolder');

  $picView.setAttribute('class', 'picView');
  $picView.setAttribute('src', data);

  var $buttonHolder = document.createElement('div');
  $buttonHolder.setAttribute('class', 'saveButtonHolder');

  var $saveButton = document.createElement('button');
  $saveButton.setAttribute('class', 'picButton');
  $saveButton.setAttribute('type', 'button');
  $saveButton.textContent = 'SAVE';
  $saveButton.setAttribute('data-pic', data);

  $onePic.appendChild($picHolder);
  $onePic.appendChild($buttonHolder);
  $picHolder.appendChild($picView);
  $buttonHolder.appendChild($saveButton);

  return $onePic;

}

var $pictureList = document.querySelector('#picture-list');

// here starting the searching code

function randomPicSearch() {

  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://dog.ceo/api/breeds/image/random/' + picViewNumber);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var data = [];

    if (picViewNumber === 1) {
      data.push(xhr.response.message);
    } else if (picViewNumber > 1) {
      for (var i = 0; i < xhr.response.message.length; i++) {
        data.push(xhr.response.message[i]);
      }
    }

    for (var a = 0; a < data.length; a++) {
      var newPic = renderPic(data[a]);
      $pictureList.appendChild(newPic);
    }

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
  xhr.open('GET', 'https://dog.ceo/api/breed/' + breed + '/images/random/' + picViewNumber);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {

    var data = [];

    if (picViewNumber === 1) {
      data.push(xhr.response.message);
    } else if (picViewNumber > 1) {
      for (var i = 0; i < xhr.response.message.length; i++) {
        data.push(xhr.response.message[i]);
      }
    }

    for (var a = 0; a < data.length; a++) {
      var newPic = renderPic(data[a]);
      $pictureList.appendChild(newPic);
    }
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

$pictureList.addEventListener('click', function () {
  if (event.target.matches('.picButton') === false) {
    return;
  }
  var newSave = {};
  newSave.url = event.target.getAttribute('data-pic');
  newSave.entryId = data.nextEntryId;
  data.entries.unshift(newSave);
  data.nextEntryId++;

});
