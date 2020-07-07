var { ipcRenderer } = require('electron')


window.addEventListener('DOMContentLoaded', () => {

    var data = {
        "title": document.title,
        "url": window.location.href,
        "color":  document.querySelector('meta[name="theme-color"]') ? document.querySelector('meta[name="theme-color"]').content : '#ffffff',
        "favicon": "https://www.google.com/s2/favicons?sz=64&domain_url=" + window.location.href
    };

    ipcRenderer.sendToHost("updatetab", data);

})
