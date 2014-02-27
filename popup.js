var butt   = document.getElementById('butt')
  , uri    = "http://muhlenberg.worldcat.org/search?qt=wc_org_muhlenberg&ai=wclocal_muhlenberg&q="
    ;

window.addEventListener("keydown", function(e) {
    if ( e.keyCode === 13 ) {
        search();
    }
})

butt.onclick = function (e) {
    e.preventDefault();
    search();
}

function search() {

    search = document.getElementById('search').value;
    search = search.trim();

    if ( search.length != 0 ) {
        chrome.tabs.create({url: uri + encodeURI(search)});
    } else {
        return;
    }

};