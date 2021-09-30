var $breed = document.querySelector('.breed');
var $random = document.querySelector('.random');
var $form = document.querySelector('form');
var $opButton = document.querySelectorAll('.opButton');
var $buttonLeft = document.querySelector('.button-left');
var picViewNumber = 1;
var $tabView = document.querySelector('.tabLeft');

// var $picView = document.querySelector('.picView');

$buttonLeft.addEventListener('click', function () {
  if (event.target.matches('.opButton') === false) {
    return;
  }
  for (var i = 0; i < $opButton.length; i++) {
    if ($opButton[i] === event.target) {
      $opButton[i].className = 'opButton op-clicked';
      picViewNumber = parseInt($opButton[i].getAttribute('data-number'));

    } else {
      $opButton[i].className = 'opButton';
    }
  }
});

$breed.addEventListener('click', function () {
  $form.className = 'column-half';
  $breed.className = 'breed pic-button clicked';
});

/*
    <div class=" one-pic column-two-third" data-pic="">
      <div class="pic-holder"><img class="picView" src="https://images.dog.ceo/breeds/hound-walker/n02089867_3103.jpg"></div>
      <div class="save-button-holder">
       <button class="pic-button" type="button" data-pic="">SAVE</button>
      </div>
    </div>
   */

// for  2 pic showing
/*
    <div class=" more-pic column-half" data-pic="">
      <div class="pic-holder"><img class="picView-two" src="https://images.dog.ceo/breeds/hound-walker/n02089867_3103.jpg"></div>
      <div class="save-button-holder">
       <button class="pic-button" type="button" data-pic="">SAVE</button>
      </div>
    </div>
   */

// for  3 pic showing
/*
    <div class=" more-pic column-one-fourth" data-pic="">
      <div class="pic-holder"><img class="picView-three" src="https://images.dog.ceo/breeds/hound-walker/n02089867_3103.jpg"></div>
      <div class="save-button-holder">
       <button class="pic-button" type="button" data-pic="">SAVE</button>
      </div>
    </div>
   */

function renderPic(data) {

  var $onePic = document.createElement('div');
  var $picView = document.createElement('img');

  if (picViewNumber === 1) {
    $onePic.setAttribute('class', 'one-pic newPic column-two-third');
  } else if (picViewNumber === 2) {
    $onePic.setAttribute('class', 'more-pic newPic column-half');
    $picView.setAttribute('id', 'two');
  } else if (picViewNumber === 3) {
    $onePic.setAttribute('class', 'more-pic newPic column-one-fourth');
    $picView.setAttribute('id', 'three');
  }

  $onePic.setAttribute('data-pic', data);

  var $picHolder = document.createElement('div');
  $picHolder.setAttribute('class', 'pic-holder');

  $picView.setAttribute('class', 'picView');
  $picView.setAttribute('src', data);

  var $buttonHolder = document.createElement('div');
  $buttonHolder.setAttribute('class', 'save-button-holder');

  var $saveButton = document.createElement('button');
  $saveButton.setAttribute('class', 'pic-button');
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
  $breed.className = 'breed pic-button';
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

/* <div class=" more-pic savePic column-half" data-pic="">
      <div class="pic-holder"><img class="picView" id="two"
        src="https://images.dog.ceo/breeds/hound-walker/n02089867_3103.jpg">
      </div>
      <div class="save-button-holder column-full">
        <button class="pic-button set-background" data-view="pic-search" type="button" data-pic=""><button>
        <button class="delete-button" type="button" data-pic=""><i class="far fa-trash-alt" data-pic=""></i></button>
      </div>
    </div> */
function renderSavePic(data) {

  var $onePic = document.createElement('div');
  $onePic.setAttribute('class', 'more-pic savePic column-half');
  $onePic.setAttribute('data-pic', data);

  var $picHolder = document.createElement('div');
  $picHolder.setAttribute('class', 'pic-holder');

  var $picView = document.createElement('img');
  $picView.setAttribute('class', 'picView');
  $picView.setAttribute('id', 'two');
  $picView.setAttribute('src', data);

  var $buttonHolder = document.createElement('div');
  $buttonHolder.setAttribute('class', 'save-button-holder');

  var $backgroundButton = document.createElement('button');
  $backgroundButton.setAttribute('class', 'pic-button set-background');
  $backgroundButton.setAttribute('data-page', 'mainPage');
  $backgroundButton.setAttribute('data-pic', data);
  $backgroundButton.setAttribute('type', 'button');
  $backgroundButton.textContent = 'Set Background';

  var $deleteButton = document.createElement('button');
  $deleteButton.setAttribute('class', 'delete-button');
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
  if (event.target.matches('.pic-button') === false) {
    return;
  }
  var newSave = {};

  newSave.url = event.target.getAttribute('data-pic');
  newSave.entryId = data.nextEntryId;
  data.entries.unshift(newSave);
  data.nextEntryId++;
  var $newSavedPic = renderSavePic(newSave.url);
  $galleryList.prepend($newSavedPic);

});
// here start the delete process

var $modalHolder = document.querySelector('.modal-holder');
var $cancel = document.querySelector('.cancel');
var $confirm = document.querySelector('.confirm');

$galleryList.addEventListener('click', function () {

  setBackground(event);

  if (event.target.matches('.delete-button') === false && event.target.matches('.far') === false) {
    return;
  }
  data.deleting = event.target.getAttribute('data-pic');
  $modalHolder.className = 'modal-holder';
});

$cancel.addEventListener('click', function () {
  $modalHolder.className = 'modal-holder hidden';
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
  $modalHolder.className = ' modal-holder hidden';
  data.deleting = null;
});

// here start the seting up background process

var $heroImage = document.querySelector('#heroImage');

function setBackground(event) {
  if (event.target.matches('.set-background') === false) {
    return;
  }
  $heroImage.setAttribute('src', event.target.getAttribute('data-pic'));
  data.heroBackground = event.target.getAttribute('data-pic');
  pageChange(event.target.getAttribute('data-page'));
  tagHide();
}

var $heroBlock = document.querySelector('.hero-block');
var $colorHolder = document.querySelector('.color-button-holder');

function colorChange(event) {
  if (event.target.matches('.color-button') === false) {
    return;
  }
  $heroBlock.style.backgroundColor = event.target.getAttribute('data-color');
  data.backgroundColor = event.target.getAttribute('data-color');
}
$colorHolder.addEventListener('click', colorChange);

// here start the profile and note section

// var $profileImage = document.querySelector('#profileImage');
var $profileBlock = document.querySelector('.profile-block');
var $colorHolderNote = document.querySelector('.color-button-holder-note');

function profileColorChange(event) {
  if (event.target.matches('.color-button') === false) {
    return;
  }
  $profileBlock.style.backgroundColor = event.target.getAttribute('data-color');
  data.backgroundColorNote = event.target.getAttribute('data-color');
}
$colorHolderNote.addEventListener('click', profileColorChange);

/* <li class="noteRow column-full">
    <div class="column-half">
      <div class="notePic-holder"><img class="picView" id="notePic" src="images/placeholder-image-square.jpg">
      </div>
    </div>
    <div class="noteBlock column-half">
      <div class="categoryRow">
        <div class="categoryGroup column-one-fourth">Happy Moments</div>
        <div class="categoryButton column-half">
          <button class="pic-button setProfilePic">Set Profile</button>
          <button class="editButton"><i class="fas fa-trash-alt"></i></button>
          <button class="editButton"><i class="fas fa-edit"></i></button>
        </div>
      </div>
      <div class="noteContent column-full"></div>
    </div>
  </li> */

// here start the game part

var $gameImage = document.querySelector('#gameImage');
var $readyButton = document.querySelector('#readyButton');
var $timerButton = document.querySelectorAll('.timerButton');
var $gameSubmit = document.querySelector('#gameAnswer');
var $playAgain = document.querySelector('.playAgain');
var $gameMessage = document.querySelectorAll('.gameMessage');
var $recordList = document.querySelector('#record-list');
var $showAll = document.querySelector('.recordShowAll');

var timeId = null;

function showMessage(string) {
  for (var i = 0; i < $gameMessage.length; i++) {
    if ($gameMessage[i].getAttribute('data-message') === string) {
      $gameMessage[i].className = 'gameTitle gameMessage';
    } else {
      $gameMessage[i].className = 'gameTitle gameMessage hidden';
    }
  }
}
function puppyGame() {

  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://dog.ceo/api/breeds/image/random');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {

    var string = '';
    var array = [];

    for (var i = 0; i < xhr.response.message.length; i++) {
      if (xhr.response.message[i] === '/') {
        array.push(string);
        string = '';
      } else {
        string += xhr.response.message[i];
      }

    }

    array.push(string);
    var breed = array.slice(4, 5);
    data.gameBreed = breed;
    data.gameUrl = xhr.response.message;
    $gameImage.setAttribute('src', xhr.response.message);
    timerStart();
    console.log(breed);
  });
  xhr.send();

}

var count = 0;
function timer() {
  count++;
  for (var i = 0; i < $timerButton.length; i++) {
    if ($timerButton[i].getAttribute('data-time') === String(count)) {
      $timerButton[i].style.color = '#ef6351';
    }
  }
  if (count === 11) {
    showMessage('time-out');
    $playAgain.className = 'pic-button playAgain';
    clearInterval(timeId);
  }

}

function timerStart() {
  timeId = setInterval(timer, 1000);
}

function playAgain() {
  clearInterval(timeId);
  count = 0;
  showMessage('hidden');
  $playAgain.className = 'pic-button playAgain hidden';
  for (var i = 0; i < $timerButton.length; i++) {
    $timerButton[i].style.color = '#274c77';
  }
  puppyGame();
}

function checkAnswer(string) {
  var answer = '';
  for (var i = 0; i < string.length; i++) {
    answer += string.charAt(i).toLowerCase();
  }
  if (data.gameBreed[0].indexOf(answer) !== -1) {
    clearInterval(timeId);
    count = 0;
    for (var j = 0; j < $timerButton.length; j++) {
      $timerButton[j].style.color = '#274c77';
    }
    showMessage('correct');
    $playAgain.className = 'pic-button playAgain';
    var newRecord = {};
    var breedName = data.gameBreed[0][0].toUpperCase();
    for (var a = 1; a < data.gameBreed[0].length; a++) {
      breedName += data.gameBreed[0][a];
    }
    newRecord.url = data.gameUrl;
    newRecord.breed = breedName;
    data.gameRecords.unshift(newRecord);
    $recordList.prepend(renderGameRecord(newRecord));

  }

  if (data.gameBreed[0].indexOf(answer) === -1) {
    showMessage('wrong');
  }

}

// <div class=" more-pic recordPic column-half" data-record="" data-breed="">
//  <div class="pic-holder"><img class="picView" id="recordPic"
//    src="https://images.dog.ceo/breeds/hound-walker/n02089867_3103.jpg">
//  </div>
//  <div class="recordHolder">
//    <div class="row">
//      <h3 class="recordText">I am :</h3>
//      <button class="breedButton" type="button" data-breed="">Breed</button>
//    </div>
//    <button class="delete-button deleteRecord" type="button" data-record=""><i class="far fa-trash-alt" data-record=""></i></button>
//  </div>
// </div>

function renderGameRecord(data) {
  var $morePic = document.createElement('div');
  $morePic.setAttribute('class', 'more-pic recordPic column-half');
  $morePic.setAttribute('data-record', data.url);
  $morePic.setAttribute('data-breed', data.breed);

  var $picHolder = document.createElement('div');
  $picHolder.setAttribute('class', 'pic-holder');

  var $picView = document.createElement('img');
  $picView.setAttribute('class', 'picView');
  $picView.setAttribute('id', 'recordPic');
  $picView.setAttribute('src', data.url);

  var $recordHolder = document.createElement('div');
  $recordHolder.setAttribute('class', 'recordHolder');

  var $row = document.createElement('div');
  $row.setAttribute('class', 'row');

  var $recordText = document.createElement('h3');
  $recordText.setAttribute('class', 'recordText');
  $recordText.textContent = 'I am :';

  var $breedButton = document.createElement('button');
  $breedButton.setAttribute('class', ' breedButton');
  $breedButton.setAttribute('type', 'button');
  $breedButton.setAttribute('data-breed', data.breed);
  $breedButton.textContent = data.breed;

  var $deleteButton = document.createElement('button');
  $deleteButton.setAttribute('class', 'delete-button deleteRecord');
  $deleteButton.setAttribute('type', 'button');
  $deleteButton.setAttribute('data-record', data.url);

  var $trashCan = document.createElement('i');
  $trashCan.setAttribute('class', 'fas fa-trash-alt');
  $trashCan.setAttribute('data-record', data.url);

  $morePic.appendChild($picHolder);
  $morePic.appendChild($recordHolder);
  $picHolder.appendChild($picView);
  $recordHolder.appendChild($row);
  $recordHolder.appendChild($deleteButton);
  $deleteButton.appendChild($trashCan);
  $row.appendChild($recordText);
  $row.appendChild($breedButton);

  return $morePic;
}

function deleteRecord(event) {
  if (event.target.matches('.deleteRecord') === false && event.target.matches('.fas') === false) {
    return;
  }
  for (var i = 0; i < data.gameRecords.length; i++) {
    if (data.gameRecords[i].url === event.target.getAttribute('data-record')) {
      data.gameRecords.splice(i, 1);
    }
  }

  var $recordPic = document.querySelectorAll('.recordPic');
  for (var j = 0; j < $recordPic.length; j++) {
    if ($recordPic[j].getAttribute('data-record') === event.target.getAttribute('data-record')) {
      $recordPic[j].remove();
    }
  }
}

function sortRecord(event) {
  if (event.target.matches('.breedButton') === false) {
    return;
  }
  var $recordPic = document.querySelectorAll('.recordPic');
  for (var i = 0; i < $recordPic.length; i++) {
    if ($recordPic[i].getAttribute('data-breed') === event.target.getAttribute('data-breed')) {
      $recordPic[i].className = 'more-pic recordPic column-half';
    } else {
      $recordPic[i].className = 'more-pic recordPic column-half hidden';
    }
  }
}
$gameSubmit.addEventListener('submit', function () {
  event.preventDefault();
  checkAnswer($gameSubmit.elements.answer.value);

});

function showAll() {
  var $recordPic = document.querySelectorAll('.recordPic');
  for (var i = 0; i < $recordPic.length; i++) {

    $recordPic[i].className = 'more-pic recordPic column-half';
  }
}
$readyButton.addEventListener('click', puppyGame);
$playAgain.addEventListener('click', playAgain);

$recordList.addEventListener('click', deleteRecord);
$recordList.addEventListener('click', sortRecord);
$showAll.addEventListener('click', showAll);

// here start the reload process

function entryDisplay(event) {
  for (var i = 0; i < data.entries.length; i++) {
    var $newEntry = renderSavePic(data.entries[i].url);
    $galleryList.appendChild($newEntry);
  }
  for (var j = 0; j < data.gameRecords.length; j++) {
    $recordList.appendChild(renderGameRecord(data.gameRecords[j]));
  }
  $heroImage.setAttribute('src', data.heroBackground);
  $heroBlock.style.backgroundColor = data.backgroundColor;
  viewChange(data.view);
  pageChange(data.page);
  coverChange(data.cover);
  tagHide();

}

document.addEventListener('DOMContentLoaded', entryDisplay);

// here start the view swapping process

var $viewScreen = document.querySelectorAll('.view-screen');
var $subTag = document.querySelectorAll('.sub-tag');
var $exitApp = document.querySelector('.exit-app');
var $startButton = document.querySelector('.start-button');
var $viewPage = document.querySelectorAll('.view-page');
var $viewCover = document.querySelectorAll('.viewCover');
function viewChange(string) {
  for (var i = 0; i < $viewScreen.length; i++) {
    if ($viewScreen[i].getAttribute('data-view') === string) {
      $viewScreen[i].className = 'view-screen';
    } else {
      $viewScreen[i].className = 'view-screen  hidden';
    }
  }
  data.view = string;
}

function pageChange(string) {
  for (var i = 0; i < $viewPage.length; i++) {
    if ($viewPage[i].getAttribute('data-page') === string) {
      $viewPage[i].className = 'view-page ';
    } else {
      $viewPage[i].className = 'view-page hidden';
    }
  }
  data.page = string;
}

function coverChange(string) {
  for (var i = 0; i < $viewCover.length; i++) {
    if ($viewCover[i].getAttribute('data-cover') === string) {
      $viewCover[i].className = 'viewCover';
    } else {
      $viewCover[i].className = 'viewCover hidden';
    }
  }
  data.cover = string;
}
function pageChangeClick(event) {
  pageChange(event.target.getAttribute('data-page'));
}

function tagHide() {
  for (var i = 0; i < $subTag.length; i++) {
    if ($subTag[i].getAttribute('data-view') === data.view) {
      $subTag[i].className = ' view-tag sub-tag hidden';
    } else {
      $subTag[i].className = ' view-tag sub-tag';
    }
  }
}

function clickViewChange(event) {
  if (event.target.matches('.view-tag') === false) {
    return;
  }

  viewChange(event.target.getAttribute('data-view'));

}

$tabView.addEventListener('click', function () {
  clickViewChange(event);
  tagHide();

});

$startButton.addEventListener('click', function () {
  coverChange(event.target.getAttribute('data-cover'));

});
$exitApp.addEventListener('click', function () {
  coverChange(event.target.getAttribute('data-cover'));
});

var $galleryButton = document.querySelector('#galleryButton');
var $backToMain = document.querySelector('.backToMain');
var $backToMainGame = document.querySelector('.backToMainGame');
var $games = document.querySelector('#gameButton');
var $note = document.querySelector('#noteButton');
var $backtoMainNote = document.querySelector('.backToMainNotes');

$galleryButton.addEventListener('click', pageChangeClick);
$backToMain.addEventListener('click', pageChangeClick);
$games.addEventListener('click', pageChangeClick);
$backToMainGame.addEventListener('click', pageChangeClick);
$note.addEventListener('click', pageChangeClick);
$backtoMainNote.addEventListener('click', pageChangeClick);
