var filterWords = ["Trump", "Hillary", "Clinton", "Obama", "Republican", "Democrat"];

function debug(text) {
	if (true) {
		console.log(text);
	}
}

function processArticle(article) {
	var title = article.getElementsByClassName("titletext");
	if (title.length > 0) {
		var text = title[0].innerText;
		debug("Title: " + text);
		if (containsFilterWord(text)) {
			article.parentNode.removeChild(article);
			debug("Removed article based on title");
			return;
		}
	} else {
		debug("No title found " + title.length);
	}

	var desc = article.getElementsByClassName("esc-lead-snippet-wrapper");
	if (desc.length == 1) {
		var text = desc[0].innerText;
		if (containsFilterWord(text)) {
			article.parentNode.removeChild(article);
			debug("Removed article based on description");
			return;
		}
	}
}

function containsFilterWord(text) {
	for (var y = 0; y < filterWords.length; y++) {
		if (text.indexOf(filterWords[y]) >= 0) {
			return true;
		}
	}
	return false;
}

window.onload = function() {

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
