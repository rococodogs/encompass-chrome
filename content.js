// content script to find selected text
chrome.runtime.onMessage.addListener(function(req, sender, sendResponse) {
    if ( req.type === "getSelection" ) {        
        var sel = document.getSelection().toString();
        if ( sel.trim().length > 0 ) {
            sendResponse({
                type: "selection", 
                message: sel.trim()
            });
        } else {
            sendResponse({})
        }
    }
})
