var filterWords = [];

function addNewFilterWord() {
  var input = document.getElementById('chrome_filter_add_word'); 
  var newFilterWord = input.value;
  filterWords.push(newFilterWord)
  chrome.storage.local.set({'filterWords' : filterWords});
  debug(filterWords);
  parsePage();
}

function clearFilters() {
  filterWords = [];
  chrome.storage.local.set({'filterWords' : filterWords});
  debug(filterWords);
  parsePage();

}

function parsePage() {
debug("PPFW: " + filterWords);
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

function createFilterFormDiv(responsetext)
{
  var elem =  document.createElement("div");
  elem.setAttribute("class", "filterFrame");
  elem.innerHTML = responsetext;
  document.body.appendChild(elem);

  var addButton = document.getElementById('chrome_filter_add_button');
  addButton.addEventListener("click", addNewFilterWord);
  var clearButton = document.getElementById('chrome_filter_clear_button');
  clearButton.addEventListener("click", clearFilters);
}

window.onload = function() {
  chrome.storage.local.get('filterWords',
    function(items) {
      if (typeof items != 'undefined' && typeof items.filterWords != 'undefined') {
        filterWords = items.filterWords;
debug(items);
      } else {
        filterWords = ["Trump", "Hillary", "Clinton", "Obama", "Republican", "Democrat", "politics"];
        chrome.storage.local.set({'filterWords' : filterWords});
      }
      parsePage();
    });

  fetch(chrome.extension.getURL("html/filter_form.html")).then(  
    function(response) {
      if (response.status == 200) {  
        // Examine the text in the response  
        response.text().then(function(data) {  
          createFilterFormDiv(data);
        });  
      }
    })  
  .catch(function(err) {  
    console.log('Fetch Error :-S', err);  
  });
}
