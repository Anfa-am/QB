var { ipcRenderer } = require('electron')
var game = 'mma'

window.addEventListener('DOMContentLoaded', () => {
    console.log(game)

    if(document.querySelector(`a.btn[href*="${game}"]`)){ 
        document.querySelector(`a.btn[href*="${game}"]`).click() 
        return
    }

    if(document.querySelector('iframe')){
        window.location = document.querySelector('iframe').src
        return
    }

    document.querySelector('.player-poster.clickable').click();
    document.querySelector('video').play();
})


function test(){
    console.log('ya')
}
