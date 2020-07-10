var { ipcRenderer, globalShortcut } = require('electron')

var av = 0

var webTemplate = '<webview transparent="true" class="tab-page" src="{{src}}" preload="./preload.js" autosize="on"></webview>'
var tabTemplate = '<div class="tab"> <img src="{{src}}"/> <span> {{title}} <span> <i class="close"/> </div>'

ipcRenderer.on('newTab', function (event, store) { createTab('https://duckduckgo.com') });
ipcRenderer.on('refreshTab', function (event, store) {
    var views = document.querySelectorAll('.tab-page');
    views[av].reload(); 
});

function focusTab(tab){
    //hide  other views
    //remove other tabs class
    //add back active classes
}

function createTab(url){
    document.querySelector('.webviews').insertAdjacentHTML('beforeend', webTemplate.replace('{{src}}', url));
    document.querySelector('.tabs-list').insertAdjacentHTML('beforeend', tabTemplate)
    
    var views = document.querySelectorAll('.tab-page');

    av = ( views.length - 1 )

    views[av].addEventListener("ipc-message", function (e) {
      if (e.channel === "updatetab") {
        document.querySelectorAll('.tab')[av].innerHTML = tabTemplate.replace('{{src}}', e.args[0].favicon).replace('{{title}}', e.args[0].title).replace('</div>', '').replace('<div class="tab">', '')
        focusTab(av)
      }
    });

    views[av].addEventListener('dom-ready', function () {
        views[av].insertCSS('*::-webkit-scrollbar { display: none; }')
        //views[av].openDevTools();
    });
}


//create window create tab

createTab('https://duckduckgo.com')


function reloadView () {
    view.reload();
}

function backView () {
    view.goBack();
}

function forwardView () {
    view.goForward();
}

function homeView () {
    view.loadURL('https://duckduckgo.com');
}

//Load DevTools
function handleDevtools () {
    if (view.isDevToolsOpened()) {
        view.closeDevTools();
    } else {
        view.openDevTools();
    }
}

//view.addEventListener('did-start-loading', )
//view.addEventListener('did-finish-load', );
