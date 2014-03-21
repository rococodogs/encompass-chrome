// focus the input of the popup
document.getElementById('search').focus();

// find the opened tab and send a message to get selected text
chrome.tabs.query({ active: true, lastFocusedWindow: true }, function(tabs) {
    var tab = tabs[0];

    if ( !tab ) { return; }

    chrome.tabs.sendMessage(tab.id, { type: 'getSelection' }, function(response) {
        if ( response && response.type === 'selection' ) {  
            document.getElementById('search').value = response.message;
        }
    })
})

// submit our popup form by clicking the button...
document.getElementById('butt').onclick = function (e) {
    e.preventDefault();
    search(document.getElementById('search').value);
}

// ...or hitting enter
window.addEventListener("keydown", function(e) {
    if ( e.keyCode === 13 ) {
        search(document.getElementById('search').value);
    }
})

// our 'sendMessage' function
function search(terms) {
    chrome.runtime.sendMessage({
        type: "search",
        message: terms
    });
}