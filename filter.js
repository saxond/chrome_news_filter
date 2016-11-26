function isFilteredWord(text, filterWords) {
  debug("TEXT: " + text + "\nFW: " + filterWords);
  if (undefined != filterWords) {
    for (var y = 0; y < filterWords.length; y++) {
      var term = filterWords[y];
      var termRe = new RegExp(term, "i");
      if (text.match(termRe)) {
        return true;
      }
    }
  }
  
  return false;
}

function debug(text) {
  if (true) {
    console.log(text);
  }
}
