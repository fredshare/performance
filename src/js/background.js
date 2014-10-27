chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(null, {file: "src/js/performance.js", runAt: "document_end"});
});
