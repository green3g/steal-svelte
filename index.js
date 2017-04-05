import Nav from './components/nav.html';

const DEFAULT_PAGE = 'home';
let current = null;

function getPageHash() {
    return window.location.hash.substring(1) || DEFAULT_PAGE;
}

/**
 * The page loader, uses steal.import (similar to systemjs.import) to
 * gather progressively loaded page files
 * @param  {string} page the page to loadPage
 */
function loadPage(page) {
    if (current) {
        current.destroy();
        current = null;
    }
    steal.import(`steal-svelte/pages/${page}.html`).then(function(Component) {
        current = new Component({
            target: document.body,
            data: {}
        });
    });
}

window.onhashchange = function() {
    loadPage(getPageHash());
}

const nav = new Nav({
    target: document.body,
    data: {
        pages: [{
            title: 'Home',
            id: 'home'
        }, {
            title: 'Clock',
            id: 'clock'
        }, {
            title: 'Data Entry',
            id: 'crud'
        }]
    }
})
loadPage(getPageHash());
