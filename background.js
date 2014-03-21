// central query assembler
chrome.runtime.onMessage.addListener(function(req, sender, sendResponse) {
    if ( req.type === "search" ) {
        terms = req.message.trim();

        if ( terms.length > 0 ) {
            var uri = 'http://muhlenberg.worldcat.org/search?qt=wc_org_muhlenberg&ai=wclocal_muhlenberg&q='
            chrome.tabs.create({ url: uri + encodeURI(terms) });
        }

    }
})

// create yr context menu
chrome.contextMenus.create({
    'id' : 'encompass',
    'title' : 'Search Encompass for "%s"',
    'contexts' : [ 'selection' ]
});

chrome.contextMenus.onClicked.addListener( function (s) {
    chrome.runtime.sendMessage( { type: "search", message: s.selectionText })
})
    
