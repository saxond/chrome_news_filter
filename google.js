//var filterWords = ["Trump", "Hillary", "Clinton", "Obama", "Republican", "Democrat", "politics"];
var filterWords = [];

var filterForm = "<input id='chrome_filter_add_word' placeholder='enter new filter'><button id='chrome_filter_add_button'>add</button><button id='chrome_filter_clear_button'>clear</button>";

function addNewFilterWord() {
  var input = document.getElementById('chrome_filter_add_word'); 
  var newFilterWord = input.value;
  filterWords.push(newFilterWord)
  chrome.storage.local.set({'filters' : filterWords});
  debug(filterWords);
  parsePage();
}

function clearFilters() {
  filterWords = [];
  chrome.storage.local.set({'filters' : filterWords});
  debug(filterWords);
  parsePage();

}

function parsePage() {
debug(filterWords);
  try {
    var articles = document.getElementsByClassName("blended-wrapper");
    debug("Article count: " + articles.length);

    // iterate the list backwards because things move as we delete elements.
    for (var i = articles.length - 1; i >= 0; i--) {
      debug("Process article " + i);
      processArticle(articles[i]);
    }
  } catch (e) {
    console.log(e);
  }

}

function processArticle(article) {
  var title = article.getElementsByClassName("titletext");
  if (typeof title != 'undefined' && title.length > 0) {
    var text = title[0].innerText;
    debug("Title: " + text);
    if (isFilteredWord(text, filterWords)) {
      article.parentNode.removeChild(article);
      debug("Removed article based on title");
      return;
    }
  } else {
    debug("No title found " + title.length);
  }

  var desc = article.getElementsByClassName("esc-lead-snippet-wrapper");
  if (typeof desc != 'undefined' && desc.length == 1) {
    var text = desc[0].innerText;
    if (isFilteredWord(text, filterWords)) {
      article.parentNode.removeChild(article);
      debug("Removed article based on description");
      return;
    }
  }
}

window.onload = function() {

  //chrome.storage.local.set({'filters' : ["trump", "clinton"]});
  chrome.storage.local.get('filters', function(items){ if (typeof items != undefined) {filterWords = items.filters;} parsePage() });

  var elem =  document.createElement("DIV");
  elem.innerHTML = filterForm;
  elem.style = "position: fixed; top: 80px; right: 20px; z-index: 100;";
  document.body.appendChild(elem);
  var addButton = document.getElementById('chrome_filter_add_button');
  addButton.addEventListener("click", addNewFilterWord);
  var clearButton = document.getElementById('chrome_filter_clear_button');
  clearButton.addEventListener("click", clearFilters);
}
