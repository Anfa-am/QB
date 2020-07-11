var { ipcRenderer } = require('electron')
var $ = require( "jquery" ); !function(t){t.fn.suggest=function(e,s){var i=t.extend({suggestionColor:"#FC6D58",moreIndicatorClass:"suggest-more",moreIndicatorText:"&hellip;"},s);return this.each(function(){$this=t(this);var s=t("<div/>",{css:{position:"absolute",height:$this.height(),width:$this.width(),top:$this.css("borderTopWidth"),left:$this.css("borderLeftWidth"),padding:$this.cssShortForAllSides("padding"),margin:$this.cssShortForAllSides("margin"),fontFamily:$this.css("fontFamily"),fontSize:$this.css("fontSize"),fontStyle:$this.css("fontStyle"),lineHeight:$this.css("lineHeight"),fontWeight:$this.css("fontWeight"),letterSpacing:$this.css("letterSpacing"),backgroundColor:$this.css("backgroundColor"),color:i.suggestionColor}}),n=t("<span/>",{css:{position:"absolute",top:s.height()+parseInt($this.css("fontSize"),10)/2,left:s.width(),display:"block",fontSize:$this.css("fontSize"),fontFamily:$this.css("fontFamily"),color:i.suggestionColor},class:i.moreIndicatorClass}).html(i.moreIndicatorText).hide();$this.attr({autocomplete:"off",spellcheck:"false",dir:"ltr"}).css({background:"transparent"}).wrap(t("<div/>",{css:{position:"relative",paddingBottom:"1em"}})).bind("keydown.suggest",function(e){var i=e.keyCode?e.keyCode:e.which;if(9!=i||e.altKey){if(13==i)s.is(":empty")||e.preventDefault();else if(38==i||40==i){e.preventDefault();var n=t(this).data("suggestions");n.all.length>1&&(40==i&&n.index<n.all.length-1?n.suggest.html(n.all[++n.index]):38==i&&n.index>0&&n.suggest.html(n.all[--n.index]),t(this).data("suggestions").index=n.index)}}else e.preventDefault()}).bind("keyup.suggest",function(i){var o=i.keyCode?i.keyCode:i.which;if(38==o||40==o)return!1;n.hide();var r=t(this).val(),l=r.replace(" ","&nbsp;");if((9==o||13==o)&&s.text().length>0){i.preventDefault();var h=t(this).data("suggestions");return t(this).val(h.terms[h.index]),s.empty(),!1}if(s.empty(),!t.trim(r).length)return!1;for(var a=new RegExp("^"+r.replace(/[-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&"),"i"),g=(h=[],[]),c=0,d=e;c<d.length;c++)a.test(d[c])&&(g.push(d[c]),h.push(l+d[c].slice(r.length)));h.length>0&&(h[0]!==r&&s.html(h[0]),t(this).data("suggestions",{all:h,terms:g,index:0,suggest:s}),h.length>1&&n.show())}).bind("blur.suggest",function(){s.empty()}),s.insertAfter($this),n.insertAfter(s)})},t.fn.cssShortForAllSides=function(e){var s=t(this),i=[],n=t.map(["Top","Right","Bottom","Left"],function(t){return e+t});return t.each(n,function(t,e){i.push(s.css(e)||"0")}),i.join(" ")}}($);

var av = 0

                //movies            lib     audio   workspaces    reminders
var defaultCmds = ['watch ','game ', 'read ', 'play ', 'switch to ', 'remind me to ']
var activeCmds = defaultCmds

var webTemplate = '<webview transparent="true" class="page" src="{{src}}" preload="./preload.js" autosize="on" useragent="Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko"></webview>'
var tabTemplate = '<div class="tab"> <img src="{{src}}"/> <span> {{title}} <span> <i class="close"/> </div>'

ipcRenderer.on('closeTab', function (event, store) { closeTab(av) });
ipcRenderer.on('newTab', function (event, store) { newTab('https://duckduckgo.com') });
ipcRenderer.on('refreshTab', function (event, store) { refreshTab() });
ipcRenderer.on('cycleTab', function (event, store) { cycleTab(true) });
ipcRenderer.on('cycleTabBack', function (event, store) { cycleTab(false) });
ipcRenderer.on('toggleBarre', function (event, store) { toggleBarre() });

function toggleBarre(){
    if(!$('.barre').hasClass('active')){
        $('.tabs-list').addClass('inactive')
        $('.barre').addClass('active')
        $('.barre input').focus().select()
    }else{
        $('.tabs-list').removeClass('inactive')
        $('.barre').removeClass('active')
    }
}

$('.barre input').keypress(function(event) {
    var input = $('.barre input').val()
    if (event.keyCode == 13) {
        if(input.split(' ')[0] == 'watch'){
            openTheater(input.replace('watch', ''))
        }

        if(input.split(' ')[0] == 'game'){
            openStadium(input.replace('game', ''))
        }

        if(defaultCmds.indexOf(input.split(' ')[0]) == -1){
            if(input.indexOf('.') == -1){
                $('.page')[av].loadURL(`https://duckduckgo.com?q=${encodeURIComponent(input)}`)
            }else{

                $('.page')[av].loadURL(`https://${input}`)
            }
        }

        toggleBarre()
    }
});

$('.barre input').on('input', debounce( function(e){ }, 150))
$('.barre input').suggest(activeCmds);

function refreshTab(){
    $('.page')[av].reload();
}

function cycleTab(direction){
    if(direction == true){
        if(av == ( document.querySelectorAll('.page').length - 1 )){
            av = 0
            focusTab(av)
        }else{
            av = av + 1
            focusTab(av)
        }
    }
    if(direction == false){
        if(av == (0)){
            av =  document.querySelectorAll('.page').length - 1 
            focusTab(av)
        }else{
            av = av - 1
            focusTab(av)
        }
    }
}

function closeTab(passAv){
    $('.page').eq(passAv).remove()
    $('.tab').eq(passAv).remove()
    av = passAv - 1
    focusTab(av)
    $('.page').eq(av).focus()
}

function updateTab(e){
    $('.tab')[av].innerHTML = tabTemplate.replace('{{src}}', e.args[0].favicon).replace('{{title}}', e.args[0].title).replace('</div>', '').replace('<div class="tab">', '');
    focusTab(av)
}

function focusTab(tab){
    $('.page').removeClass('active')
    $('.page').eq(tab).addClass('active')
    $('.tab').removeClass('active')
    $('.tab').eq(tab).addClass('active')
}

function newTab(url){
    $('.webviews').append(webTemplate.replace('{{src}}', url))
    $('.tabs-list').append('<div class="tab"></div>')
    
    av = ( document.querySelectorAll('.page').length - 1 )
    focusTab(av)

    $('.page')[av].addEventListener("ipc-message", function (e) {
      if (e.channel === "updateTab") { updateTab(e) }
      if (e.channel === "cycleTab") { cycleTab(true) }
      if (e.channel === "cycleTabBack") { cycleTab(false) }
      if (e.channel === "closeTab") { closeTab(av) }
      if (e.channel === "refreshTab") { refreshTab() }
      if (e.channel === "newTab") { newTab('https://duckduckgo.com') }
      if (e.channel === "toggleBarre") { toggleBarre() }
    })

    $('.page')[av].addEventListener('dom-ready', function () {
        $('.page')[av].insertCSS('*::-webkit-scrollbar{ display: none;}')
        //$('.page')[av].send("test", false);
        //$('.page')[av].executeJavaScript("")
        //$('.page')[av].openDevTools();
    });

    $('.page')[av].addEventListener('new-window', (e) => {
        const protocol = require('url').parse(e.url).protocol
        if (protocol === 'http:' || protocol === 'https:') {
          newTab(e.url);
        }
    })

    $('.tab').eq(av).click(function(){
        av = $(this).index()
        focusTab(av)
    })
}

newTab('https://duckduckgo.com')

function openTheater(title){
    ipcRenderer.send("openTheater", title)
}

function openStadium(game){
    ipcRenderer.send("openStadium", game)
}


function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

//view.goBack();
//view.openDevTools();
//view.addEventListener('did-start-loading', )
//view.addEventListener('did-finish-load', );
