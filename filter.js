function isFilteredWord(text, filterWords) {
  debug("TEXT: " + text + "\nFW: " + filterWords);
  for (var y = 0; y < filterWords.length; y++) {
    //if (text.indexOf(filterWords[y]) >= 0) {
    var term = filterWords[y];
    var termRe = new RegExp(term, "i");
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
