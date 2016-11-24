var filterWords = ["Trump", "Hillary", "Clinton", "Obama", "Republican", "Democrat"];

function isFilteredWord(text) {
  for (var y = 0; y < filterWords.length; y++) {
    if (text.indexOf(filterWords[y]) >= 0) {
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