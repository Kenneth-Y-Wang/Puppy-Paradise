var $breed = document.querySelector('.breed');
var $random = document.querySelector('.random');
var $form = document.querySelector('#search-entry');
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
    $onePic.setAttribute('class', 'one-pic new-pic column-two-third');
  } else if (picViewNumber === 2) {
    $onePic.setAttribute('class', 'more-pic new-pic column-half');
    $picView.setAttribute('id', 'two');
  } else if (picViewNumber === 3) {
    $onePic.setAttribute('class', 'more-pic new-pic column-one-fourth');
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
var $spinnerSearch = document.querySelector('.search-spinner');

// here starting the searching code

function randomPicSearch() {
  $spinnerSearch.className = 'lds-dual-ring search-spinner';
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
    $spinnerSearch.className = 'lds-dual-ring search-spinner hidden';
  });
  xhr.send();

}

$random.addEventListener('click', function () {
  randomPicSearch();
  $breed.className = 'breed pic-button';
})
;

function breedSearch(name) {
  $spinnerSearch.className = 'lds-dual-ring search-spinner';
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
    $spinnerSearch.className = 'lds-dual-ring search-spinner hidden';
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

var $heroImage = document.querySelector('#hero-image');

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

// var $profileImage = document.querySelector('#profile-image');
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

/* <li class="note-row column-full">
    <div class="column-half">
      <div class="note-pic-holder"><img class="picView" id="note-pic" src="images/placeholder-image-square.jpg">
      </div>
    </div>
    <div class="note-block column-half">
      <div class="category-row">
        <div class="category-group column-one-fourth">Happy Moments</div>
        <div class="category-button column-half">
          <button class="pic-button set-profile-pic" type="button">Set Profile</button>
          <button class="edit-button" type="button"><i class="fas fa-trash-alt"></i></button>
          <button class="edit-button" type="button"><i class="fas fa-edit"></i></button>
        </div>
      </div>
      <div class="note-content column-full"></div>
    </div>
   </li> */

function renderNote(data) {
  var $noteRow = document.createElement('li');
  $noteRow.setAttribute('class', 'note-row column-full');

  var $picDiv = document.createElement('div');
  $picDiv.setAttribute('class', 'column-half');

  var $notePicHolder = document.createElement('div');
  $notePicHolder.setAttribute('class', 'note-pic-holder');

  var $notePic = document.createElement('img');
  $notePic.setAttribute('class', 'picView');
  $notePic.setAttribute('id', 'note-pic');
  $notePic.setAttribute('src', data.url);

  var $noteBlock = document.createElement('div');
  $noteBlock.setAttribute('class', 'note-block column-half');

  var $categoryRow = document.createElement('div');
  $categoryRow.setAttribute('class', 'category-row');

  var $categoryGroup = document.createElement('div');
  $categoryGroup.setAttribute('class', 'category-group column-one-fourth');
  $categoryGroup.textContent = data.category;

  var $categoryButton = document.createElement('div');
  $categoryButton.setAttribute('class', 'category-button column-half');

  var $setProfile = document.createElement('button');
  $setProfile.setAttribute('class', 'pic-button set-profile-pic');
  $setProfile.setAttribute('type', 'button');
  $setProfile.textContent = 'Set Profile';

  var $deleteButton = document.createElement('button');
  $deleteButton.setAttribute('class', 'edit-button');
  $deleteButton.setAttribute('type', 'button');

  var $trashSign = document.createElement('i');
  $trashSign.setAttribute('class', 'fas fa-trash-alt');

  var $editButton = document.createElement('button');
  $editButton.setAttribute('class', 'edit-button');
  $editButton.setAttribute('type', 'button');

  var $penSign = document.createElement('i');
  $penSign.setAttribute('class', 'fas fa-edit');

  var $noteContent = document.createElement('div');
  $noteContent.setAttribute('class', 'note-content column-full');
  $noteContent.textContent = data.note;

  $noteRow.appendChild($picDiv);
  $noteRow.appendChild($noteBlock);

  $picDiv.appendChild($notePicHolder);
  $notePicHolder.appendChild($notePic);

  $noteBlock.appendChild($categoryRow);
  $noteBlock.appendChild($noteContent);

  $categoryRow.appendChild($categoryGroup);
  $categoryRow.appendChild($categoryButton);

  $categoryButton.appendChild($setProfile);
  $categoryButton.appendChild($deleteButton);
  $categoryButton.appendChild($editButton);

  $deleteButton.appendChild($trashSign);
  $editButton.appendChild($penSign);

  return $noteRow;

}

var $noteSubmit = document.querySelector('.note-entry');
var $notePic = document.querySelector('#entry');
var $noteUrl = document.querySelector('#url');
var $noteList = document.querySelector('#note-list');
var $reminderList = document.querySelectorAll('.reminder-content');

$noteUrl.addEventListener('input', function () {
  if (event.target.value !== '') {
    $notePic.setAttribute('src', event.target.value);
  }
});

$noteSubmit.addEventListener('submit', function () {
  event.preventDefault();
  var newLog = {};
  newLog.url = $noteSubmit.elements.url.value;
  newLog.category = $noteSubmit.elements.category.value;
  newLog.note = $noteSubmit.elements.notes.value;
  newLog.logId = data.nextLogId;

  var newReminder = {};
  newReminder.reminder = $noteSubmit.elements.reminder.value;
  newReminder.urgency = $noteSubmit.elements.priority.value;

  for (var a = 0; a < data.reminder.length; a++) {
    if (data.reminder[a].urgency === newReminder.urgency) {
      data.reminder[a].reminder = newReminder.reminder;
    }
  }
  data.reminder.unshift(newReminder);
  data.logs.unshift(newLog);
  data.nextLogId++;
  $noteList.prepend(renderNote(newLog));

  for (var i = 0; i < $reminderList.length; i++) {
    if ($reminderList[i].getAttribute('data-urgency') === newReminder.urgency) {
      $reminderList[i].textContent = newReminder.reminder;
    }
  }

  $notePic.setAttribute('src', 'images/dog-place-holder.png');
  $noteSubmit.reset();

});
// here start the game part

var $gameImage = document.querySelector('#game-image');
var $readyButton = document.querySelector('#ready-button');
var $timerButton = document.querySelectorAll('.timer-button');
var $gameSubmit = document.querySelector('#gameAnswer');
var $playAgain = document.querySelector('.play-again');
var $gameMessage = document.querySelectorAll('.game-message');
var $recordList = document.querySelector('#record-list');
var $showAll = document.querySelector('.record-show-all');
var $spinner = document.querySelector('.game-spinner');

var timeId = null;

function showMessage(string) {
  for (var i = 0; i < $gameMessage.length; i++) {
    if ($gameMessage[i].getAttribute('data-message') === string) {
      $gameMessage[i].className = 'game-title game-message';
    } else {
      $gameMessage[i].className = 'game-title game-message hidden';
    }
  }
}
function puppyGame() {
  $spinner.className = 'lds-dual-ring game-spinner';
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
    $spinner.className = 'lds-dual-ring game-spinner hidden';
    // console.log(breed);
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
    $playAgain.className = 'pic-button play-again';
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
  $playAgain.className = 'pic-button play-again hidden';
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
    $playAgain.className = 'pic-button play-again';
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

// <div class=" more-pic record-pic column-half" data-record="" data-breed="">
//  <div class="pic-holder"><img class="picView" id="record-pic"
//    src="https://images.dog.ceo/breeds/hound-walker/n02089867_3103.jpg">
//  </div>
//  <div class="record-holder">
//    <div class="row">
//      <h3 class="record-text">I am :</h3>
//      <button class="breed-button" type="button" data-breed="">Breed</button>
//    </div>
//    <button class="delete-button deleteRecord" type="button" data-record=""><i class="far fa-trash-alt" data-record=""></i></button>
//  </div>
// </div>

function renderGameRecord(data) {
  var $morePic = document.createElement('div');
  $morePic.setAttribute('class', 'more-pic record-pic column-half');
  $morePic.setAttribute('data-record', data.url);
  $morePic.setAttribute('data-breed', data.breed);

  var $picHolder = document.createElement('div');
  $picHolder.setAttribute('class', 'pic-holder');

  var $picView = document.createElement('img');
  $picView.setAttribute('class', 'picView');
  $picView.setAttribute('id', 'record-pic');
  $picView.setAttribute('src', data.url);

  var $recordHolder = document.createElement('div');
  $recordHolder.setAttribute('class', 'record-holder');

  var $row = document.createElement('div');
  $row.setAttribute('class', 'row');

  var $recordText = document.createElement('h3');
  $recordText.setAttribute('class', 'record-text');
  $recordText.textContent = 'I am :';

  var $breedButton = document.createElement('button');
  $breedButton.setAttribute('class', ' breed-button');
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

  var $recordPic = document.querySelectorAll('.record-pic');
  for (var j = 0; j < $recordPic.length; j++) {
    if ($recordPic[j].getAttribute('data-record') === event.target.getAttribute('data-record')) {
      $recordPic[j].remove();
    }
  }
}

function sortRecord(event) {
  if (event.target.matches('.breed-button') === false) {
    return;
  }
  var $recordPic = document.querySelectorAll('.record-pic');
  for (var i = 0; i < $recordPic.length; i++) {
    if ($recordPic[i].getAttribute('data-breed') === event.target.getAttribute('data-breed')) {
      $recordPic[i].className = 'more-pic record-pic column-half';
    } else {
      $recordPic[i].className = 'more-pic record-pic column-half hidden';
    }
  }
}
$gameSubmit.addEventListener('submit', function () {
  event.preventDefault();
  checkAnswer($gameSubmit.elements.answer.value);

});

function showAll() {
  var $recordPic = document.querySelectorAll('.record-pic');
  for (var i = 0; i < $recordPic.length; i++) {

    $recordPic[i].className = 'more-pic record-pic column-half';
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

  for (var a = 0; a < data.logs.length; a++) {

    $noteList.prepend(renderNote(data.logs[i]));

  }

  for (var b = 0; b < data.reminder.length; b++) {
    for (var c = 0; c < $reminderList.length; c++) {
      if (data.reminder[b].urgency === $reminderList[c].getAttribute('data-urgency')) {
        $reminderList[c].textContent = data.reminder[b].reminder;
      }
    }
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
