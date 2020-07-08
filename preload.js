var { ipcRenderer } = require('electron')


window.addEventListener('DOMContentLoaded', () => {
    var data = {
        "title": document.title,
        "url": window.location.href,
        "color":  document.querySelector('meta[name="theme-color"]') ? document.querySelector('meta[name="theme-color"]').content : '#ffffff',
        "favicon": "https://www.google.com/s2/favicons?sz=64&domain_url=" + window.location.href
    };

    ipcRenderer.sendToHost("updatetab", data);


    document.addEventListener("DOMNodeInserted", function (get_id_and_class) {
        var element_id = get_id_and_class.target.id;
        var element_class = get_id_and_class.target.className;

        if(element_class !='' && class_hashmap[element_class] !=undefined){
            hide_elements_class(element_class);
        }

        if(element_id !='' && id_hashmap[element_id] !=undefined){
            hide_elements_id(element_id);
        }
    });


    document.addEventListener("DOMSubtreeModified", function (get_id_and_class) {
        var element_id = get_id_and_class.target.id;
        var element_class = get_id_and_class.target.className;

        if(element_class !='' && class_hashmap[element_class] !=undefined){
            hide_elements_class(element_class);
        }

        if(element_id !='' && id_hashmap[element_id] !=undefined){
            hide_elements_id(element_id);
        }

    });


    function hide_elements_class(element_class) {
        if (element_class) {
            var appBanners = document.getElementsByClassName(element_class);
            [].forEach.call(appBanners, function (appBanner) {
                appBanner.style.display = 'none';
                console.log('hided the class' +element_class )
            });
        }
    }



    function hide_elements_id(element_id){
        document.getElementById(element_id).style.display = 'none';
        console.log('hided the id'  +element_id)
    }

    document.addEventListener("DOMContentLoaded", function () {
        var allElements = document.getElementsByTagName('*');
        for(var i = 0; i < allElements.length; i++) {

            if (allElements[i].id !='' && id_hashmap[allElements[i].id] != undefined) {
                hide_elements_id(allElements[i].id);
            }

            if (allElements[i].className !='' && class_hashmap[allElements[i].className] != undefined) {
                hide_elements_class(allElements[i].className);

            }
        }
    });

    var class_hashmap={'ad1':'ad1','ad2':'ad2'}
    var id_hashmap ={'adid1':'adid1','adid2':'adid2'}

})
