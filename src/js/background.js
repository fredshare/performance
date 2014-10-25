chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(null, {file: "src/js/performance.js", runAt: "document_end"});
<<<<<<< HEAD
});
=======
});
>>>>>>> ccbafffb8bf507e674f2d8da84f2abc4a706b58f
