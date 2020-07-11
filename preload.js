var { ipcRenderer } = require('electron')
var Mousetrap = require('mousetrap');


window.addEventListener('DOMContentLoaded', () => {
    var data = {
        "title": document.title,
        "url": window.location.href,
        "favicon": "https://www.google.com/s2/favicons?sz=64&domain_url=" + window.location.href
    };

    ipcRenderer.sendToHost("updateTab", data);

    Mousetrap.bind('ctrl+tab', function() { ipcRenderer.sendToHost("cycleTab") });
    Mousetrap.bind('ctrl+shift+tab', function() { ipcRenderer.sendToHost("cycleTabBack") });
    Mousetrap.bind('ctrl+n', function() { ipcRenderer.sendToHost("newWindow") });
    Mousetrap.bind('ctrl+t', function() { ipcRenderer.sendToHost("newTab") });
    Mousetrap.bind('ctrl+w', function() { ipcRenderer.sendToHost("closeTab") });
    Mousetrap.bind('ctrl+r', function() { ipcRenderer.sendToHost("refreshTab") });
    Mousetrap.bind('ctrl+l', function() { ipcRenderer.sendToHost("toggleBarre") });
})

ipcRenderer.on("test", function (e) {
    console.log('ho')
    test()
})

function test(){
    console.log('ya')
}
