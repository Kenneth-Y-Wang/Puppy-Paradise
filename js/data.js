/* exported data */
var data = {
  view: null,
  page: null,
  cover: null,
  entries: [],
  gameRecords: [],
  deleting: null,
  nextEntryId: 1,
  heroBackground: null,
  backgroundColor: null,
  gameBreed: null,
  gameUrl: null
};

var previousDataJSON = localStorage.getItem('pic-local-storage');
if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}

window.addEventListener('beforeunload', function () {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('pic-local-storage', dataJSON);
});
