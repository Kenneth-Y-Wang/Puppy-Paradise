/* exported data */
var data = {
  view: 'dashboard',
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
  profileBackground: 'images/dog-place-holder.png',
  backgroundColor: '#eaf7ff',
  backgroundColorProfile: '#eaf7ff',
  gameBreed: null,
  gameUrl: null,
  noteDeleting: null,
  noteEditing: null,
  reminderDeleting: null

};
var previousDataJSON = localStorage.getItem('pic-local-storage');
if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}

window.addEventListener('beforeunload', function () {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('pic-local-storage', dataJSON);
});
