document.addEventListener('DOMContentLoaded', function() {
    // opens a communication between scripts
    //var port = chrome.runtime.connect();
    // listens to the click of the button into the popup content
    document.getElementById('download-button').addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {greeting: "CatchImages"}, function(response) {
          //console.log(response.farewell);
        });
      });
    })
});

