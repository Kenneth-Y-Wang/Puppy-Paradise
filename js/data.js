/* exported data */

var data = {
  view: 'pic-gallery',
  // page: 'mainPage',
  cover: 'app-cover',
  entries: [],
  logs: [],
  reminder: [],
  nextLogId: 1,
  gameRecords: [],
  deleting: null,
  nextEntryId: 1,
  heroBackground: 'images/dog-place-holder.png',
  backgroundColor: '#eaf7ff',
  backgroundColorProfile: 'images/dog-place-holder.png',
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
