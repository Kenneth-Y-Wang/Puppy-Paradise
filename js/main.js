var $breed = document.querySelector('.breed');
var $random = document.querySelector('.random');
var $form = document.querySelector('form');
var $opButton = document.querySelectorAll('.opButton');
var $buttonLeft = document.querySelector('.buttonLeft');
var $wholePage = document.querySelector('.wholePage');
var $startButton = document.querySelector('.startButton');
var $appCover = document.querySelector('.appCover');
var picViewNumber = 1;
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

function renderPic(data) {

  var $onePic = document.createElement('div');
  $onePic.setAttribute('class', 'onePic column-two-third');
  $onePic.setAttribute('data-pic', data.message);

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
  $saveButton.setAttribute('data-pic', data.message);

  // $allEntries.appendChild($onePic);
  $onePic.appendChild($picHolder);
  $onePic.appendChild($buttonHolder);
  $picHolder.appendChild($picView);
  $buttonHolder.appendChild($saveButton);

  return $onePic;

}

// for  2 pic showing
/*
    <div class=" morePic column-half" data-pic="">
      <div class="picHolder"><img class="picView-two" src="https://images.dog.ceo/breeds/hound-walker/n02089867_3103.jpg"></div>
      <div class="saveButtonHolder">
       <button class="picButton" type="button" data-pic="">SAVE</button>
      </div>
    </div>
   */

function renderMorePic(data) {

  var $onePic = document.createElement('div');
  $onePic.setAttribute('class', 'morePic column-half');
  $onePic.setAttribute('data-pic', data);

  var $picHolder = document.createElement('div');
  $picHolder.setAttribute('class', 'picHolder');

  var $picView = document.createElement('img');
  $picView.setAttribute('class', 'picView-two');
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
// for  3 pic showing
/*
    <div class=" morePic column-one-forth" data-pic="">
      <div class="picHolder"><img class="picView-three" src="https://images.dog.ceo/breeds/hound-walker/n02089867_3103.jpg"></div>
      <div class="saveButtonHolder">
       <button class="picButton" type="button" data-pic="">SAVE</button>
      </div>
    </div>
   */

function renderThreePic(data) {

  var $onePic = document.createElement('div');
  $onePic.setAttribute('class', 'morePic column-one-forth');
  $onePic.setAttribute('data-pic', data);

  var $picHolder = document.createElement('div');
  $picHolder.setAttribute('class', 'picHolder');

  var $picView = document.createElement('img');
  $picView.setAttribute('class', 'picView-three');
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

  if (picViewNumber === 1) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://dog.ceo/api/breeds/image/random');
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {

      var newPic = renderPic(xhr.response);
      $pictureList.appendChild(newPic);

    });
    xhr.send();
  } else if (picViewNumber === 2) {
    var xhrtwo = new XMLHttpRequest();
    xhrtwo.open('GET', 'https://dog.ceo/api/breeds/image/random/2');
    xhrtwo.responseType = 'json';
    xhrtwo.addEventListener('load', function () {

      for (var a = 0; a < xhrtwo.response.message.length; a++) {
        var newPicTwo = renderMorePic(xhrtwo.response.message[a]);
        $pictureList.appendChild(newPicTwo);
      }
    });
    xhrtwo.send();
  } else if (picViewNumber === 3) {
    var xhrthree = new XMLHttpRequest();
    xhrthree.open('GET', 'https://dog.ceo/api/breeds/image/random/3');
    xhrthree.responseType = 'json';
    xhrthree.addEventListener('load', function () {

      for (var b = 0; b < xhrthree.response.message.length; b++) {
        var newPicThree = renderThreePic(xhrthree.response.message[b]);
        $pictureList.appendChild(newPicThree);
      }
    });
    xhrthree.send();
  }
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

  if (picViewNumber === 1) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://dog.ceo/api/breed/' + breed + '/images/random');
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {

      var newPic = renderPic(xhr.response);
      $pictureList.appendChild(newPic);

    });
    xhr.send();
  } else if (picViewNumber === 2) {
    var xhrtwo = new XMLHttpRequest();
    xhrtwo.open('GET', 'https://dog.ceo/api/breed/' + breed + '/images/random/2');
    xhrtwo.responseType = 'json';
    xhrtwo.addEventListener('load', function () {
      for (var a = 0; a < xhrtwo.response.message.length; a++) {
        var newPicTwo = renderMorePic(xhrtwo.response.message[a]);
        $pictureList.appendChild(newPicTwo);
      }

    });
    xhrtwo.send();
  } else if (picViewNumber === 3) {
    var xhrthree = new XMLHttpRequest();
    xhrthree.open('GET', 'https://dog.ceo/api/breed/' + breed + '/images/random/3');
    xhrthree.responseType = 'json';
    xhrthree.addEventListener('load', function () {
      for (var b = 0; b < xhrthree.response.message.length; b++) {
        var newPicThree = renderThreePic(xhrthree.response.message[b]);
        $pictureList.appendChild(newPicThree);
      }

    });
    xhrthree.send();
  }
}

$form.addEventListener('submit', function () {
  event.preventDefault();
  var breedName = $form.elements.keyWord.value;
  breedSearch(breedName);
  $form.reset();
})
;
