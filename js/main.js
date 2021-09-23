var $breed = document.querySelector('.breed');
var $random = document.querySelector('.random');
var $form = document.querySelector('form');
var $opButton = document.querySelectorAll('.opButton');
var $buttonLeft = document.querySelector('.buttonLeft');
var $wholePage = document.querySelector('.wholePage');
var $startButton = document.querySelector('.startButton');
var $appCover = document.querySelector('.appCover');
var picViewNumber = 1;
var $tabView = document.querySelector('.tabLeft');
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

// here start the save pic process

/* <div class=" morePic savePic column-half" data-pic="">
      <div class="picHolder"><img class="picView" id="two"
        src="https://images.dog.ceo/breeds/hound-walker/n02089867_3103.jpg">
      </div>
      <div class="saveButtonHolder column-full">
        <button class="picButton setBackground" data-view="pic-search" type="button" data-pic=""><button>
        <button class="deleteButton" type="button" data-pic=""><i class="far fa-trash-alt" data-pic=""></i></button>
      </div>
    </div> */
function renderSavePic(data) {

  var $onePic = document.createElement('div');
  $onePic.setAttribute('class', 'morePic savePic column-half');
  $onePic.setAttribute('data-pic', data);

  var $picHolder = document.createElement('div');
  $picHolder.setAttribute('class', 'picHolder');

  var $picView = document.createElement('img');
  $picView.setAttribute('class', 'picView');
  $picView.setAttribute('id', 'two');
  $picView.setAttribute('src', data);

  var $buttonHolder = document.createElement('div');
  $buttonHolder.setAttribute('class', 'saveButtonHolder');

  var $backgroundButton = document.createElement('button');
  $backgroundButton.setAttribute('class', 'picButton setBackground');
  $backgroundButton.setAttribute('data-view', 'pic-search');
  $backgroundButton.setAttribute('data-pic', data);
  $backgroundButton.setAttribute('type', 'button');
  $backgroundButton.textContent = 'Set Background';

  var $deleteButton = document.createElement('button');
  $deleteButton.setAttribute('class', 'deleteButton');
  $deleteButton.setAttribute('type', 'button');
  $deleteButton.setAttribute('data-pic', data);

  var $trashCan = document.createElement('i');
  $trashCan.setAttribute('class', 'far fa-trash-alt');
  $trashCan.setAttribute('data-pic', data);

  $onePic.appendChild($picHolder);
  $onePic.appendChild($buttonHolder);
  $picHolder.appendChild($picView);
  $buttonHolder.appendChild($backgroundButton);
  $buttonHolder.appendChild($deleteButton);
  $deleteButton.appendChild($trashCan);

  return $onePic;

}

var $galleryList = document.querySelector('#gallery-list');

$pictureList.addEventListener('click', function () {
  if (event.target.matches('.picButton') === false) {
    return;
  }
  var newSave = {};

  newSave.url = event.target.getAttribute('data-pic');
  newSave.entryId = data.nextEntryId;
  data.entries.unshift(newSave);
  data.nextEntryId++;
  var $newSavedPic = renderSavePic(newSave.url);
  $galleryList.appendChild($newSavedPic);

});
// here start the delete process

var $modalHolder = document.querySelector('.modalHolder');
var $cancel = document.querySelector('.cancel');
var $confirm = document.querySelector('.confirm');

$galleryList.addEventListener('click', function () {

  setBackground(event);

  if (event.target.matches('.deleteButton') === false && event.target.matches('.far') === false) {
    return;
  }
  data.deleting = event.target.getAttribute('data-pic');
  $modalHolder.className = 'modalHolder';
});

$cancel.addEventListener('click', function () {
  $modalHolder.className = 'modalHolder hidden';
});

$confirm.addEventListener('click', function () {
  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i].url === data.deleting) {
      data.entries.splice(i, 1);
    }
  }
  var $savePic = document.querySelectorAll('.savePic');
  for (var j = 0; j < $savePic.length; j++) {
    if ($savePic[j].getAttribute('data-pic') === data.deleting) {
      $savePic[j].remove();
    }
  }
  $modalHolder.className = ' modalHolder hidden';
  data.deleting = null;
});

// here start the seting up background process

var $heroImage = document.querySelector('#heroImage');

function setBackground(event) {
  if (event.target.matches('.setBackground') === false) {
    return;
  }
  $heroImage.setAttribute('src', event.target.getAttribute('data-pic'));
  data.heroBackground = event.target.getAttribute('data-pic');
  viewChange(event.target.getAttribute('data-view'));
  tagHide();
}

var $heroBlock = document.querySelector('.heroBlock');
var $colorHolder = document.querySelector('.colorButtonHolder');

function colorChange(event) {
  if (event.target.matches('.colorButton') === false) {
    return;
  }
  $heroBlock.style.backgroundColor = event.target.getAttribute('data-color');
  data.backgroundColor = event.target.getAttribute('data-color');
}
$colorHolder.addEventListener('click', colorChange);

// here start the reload process

function entryDisplay(event) {
  for (var i = 0; i < data.entries.length; i++) {
    var $newEntry = renderSavePic(data.entries[i].url);
    $galleryList.appendChild($newEntry);
  }
  $heroImage.setAttribute('src', data.heroBackground);
  $heroBlock.style.backgroundColor = data.backgroundColor;
  viewChange(data.view);
  tagHide();

}

document.addEventListener('DOMContentLoaded', entryDisplay);

// here start the view swapping process

var $viewScreen = document.querySelectorAll('.viewScreen');
var $subTag = document.querySelectorAll('.subTag');
var $exitApp = document.querySelector('.exitApp');
function viewChange(string) {
  for (var i = 0; i < $viewScreen.length; i++) {
    if ($viewScreen[i].getAttribute('data-view') === string) {
      $viewScreen[i].className = 'viewScreen';
    } else {
      $viewScreen[i].className = 'viewScreen  hidden';
    }
  }
  data.view = string;
}

function tagHide() {
  for (var i = 0; i < $subTag.length; i++) {
    if ($subTag[i].getAttribute('data-view') === data.view) {
      $subTag[i].className = ' viewTag subTag hidden';
    } else {
      $subTag[i].className = ' viewTag subTag';
    }
  }
}

function clickViewChange(event) {
  if (event.target.matches('.viewTag') === false) {
    return;
  }

  viewChange(event.target.getAttribute('data-view'));

}

$tabView.addEventListener('click', function () {
  clickViewChange(event);
  tagHide();

});

$exitApp.addEventListener('click', function () {
  $wholePage.className = 'wholePage hidden';
  $appCover.className = 'appCover';
});
