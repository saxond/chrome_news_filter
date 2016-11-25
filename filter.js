var filterWords = ["Trump", "Hillary", "Clinton", "Obama", "Republican", "Democrat", "politics"];

function isFilteredWord(text) {
  for (var y = 0; y < filterWords.length; y++) {
    //if (text.indexOf(filterWords[y]) >= 0) {
    var term = filterWords[y];
    var termRe = new RegExp("/"+term+"/", "i");
    if (text.match(termRe)) {
      return true;
    }
  }
  return false;
}

function debug(text) {
  if (true) {
    console.log(text);
  }
}
