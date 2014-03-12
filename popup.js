document.getElementById('search').focus();

chrome.tabs.query({ active: true }, function(tabs) {
    var tab;

    for ( var i = 0; i < tabs.length; i++ ) {
        if ( tabs[i].url ) { tab = tabs[i]; }
    }

    if ( !tab ) { return; }

    chrome.tabs.sendMessage(tab.id, { type: 'getSelection' }, function(response) {
        if ( response && response.type === 'selection' ) {  
            document.getElementById('search').value = response.message;
        }
    })
})

document.getElementById('butt').onclick = function (e) {
    e.preventDefault();
    console.log('clickd')
    search(document.getElementById('search').value);
}

window.addEventListener("keydown", function(e) {
    if ( e.keyCode === 13 ) {
        search(document.getElementById('search').value);
    }
})

function search(terms) {
    terms = terms.trim();

    if ( terms.length > 0 ) {
        var uri = 'http://muhlenberg.worldcat.org/search?qt=wc_org_muhlenberg&ai=wclocal_muhlenberg&q='
        chrome.tabs.create({ url: uri + encodeURI(terms) });
    }
}