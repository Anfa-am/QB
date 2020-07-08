var { ipcRenderer } = require('electron')

var av = 0

var webTemplate = '<webview transparent="true" class="tab-page" src="{{src}}" preload="./preload.js" autosize="on"></webview>'
var tabTemplate = '<div class="tab" data-color="{{color}}"> <a href="#"> hello</a><img src="{{src}}"/> <span> {{title}} <span> <i class="close"/> </div>'

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
        document.querySelectorAll('.tabs-list')[av].innerHTML = document.querySelectorAll('.tabs-list')[av].innerHTML.replace('{{src}}', e.args[0].favicon).replace('{{title}}', e.args[0].title).replace('{{color}}', e.args[0].color)
        focusTab(av)
      }
    });


    views[av].addEventListener('dom-ready', function () {
        views[av].insertCSS('*::-webkit-scrollbar { display: none; }')
    });


}



//create window create tab

createTab('http://google.com')







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
    view.loadURL('https://www.google.com/');
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
