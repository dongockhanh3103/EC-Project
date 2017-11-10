var magicJSAddEventMethod = 'je1';
    if(typeof(magicJS.Doc.je1) == 'undefined') magicJSAddEventMethod = 'jAddEvent';


$mjs(window)[magicJSAddEventMethod]('DOMContentLoaded', function() {
    
    magictoolboxBindSelectors();
})

function magictoolboxBindSelectors() {
    
    var magic360Container = document.getElementsByClassName('m360container')[0];
    var mainImageContainer = document.getElementById(idimg); //id sets in module.php
    
    if(magic360Container) {

        var magicToolboxSelectors =  $('.MagicToolboxSelectorsContainer a');
        var switchFunction = function(e) {
            
            var objThis = e.target || e.srcElement;
            
            if(objThis.tagName.toLowerCase() == 'img') {
                objThis = objThis.parentNode;   
            }
            
            var isMagic360Visible = magic360Container.style.display != 'none';
            var isThisMagic360Selector = objThis.href.match(/360icon/);
            
            if(isThisMagic360Selector && !isMagic360Visible) { //click on 360 selector action
                mainImageContainer.style.display = 'none';
                magic360Container.style.setProperty ("display", "block");
                for(var k = 0; k < magicToolboxSelectors.length; k++) { 
                    $mjs(magicToolboxSelectors[k]).jRemoveClass('active-selector mz-thumb-selected');
                }
                
                $mjs(magicToolboxSelectors[0]).jAddClass('active-selector mz-thumb-selected');
            } else if(isMagic360Visible && !isThisMagic360Selector) { //click on zoom selector after 360
                
                magic360Container.style.setProperty ("display", "none");
                mainImageContainer.style.display = 'block';
                
                mainImageContainer.style.position = 'relative'; 
                mainImageContainer.style.left = 'initial';
                
                $mjs(objThis).jAddClass('mz-thumb-selected active-selector');
                $mjs(magicToolboxSelectors[0]).jRemoveClass('active-selector mz-thumb-selected');
            }
            if(mainImageContainer.className.match(new RegExp('(?:\\s|^)MagicZoom(?:\\s|$)'))) {

                MagicZoom.switchTo('MagicZoomPlusImage_Main', objThis); //switch image
             
            }
            return false;
        };
        if(mainImageContainer.className.match(new RegExp('(?:\\s|^)MagicZoom(?:\\s|$)'))) {
            var switchEvent = (magictoolboxEvent == 'click' ? 'btnclick' : magictoolboxEvent);
        }
        
        for(var j = 0; j < magicToolboxSelectors.length; j++) {
            if ($mjs(magicToolboxSelectors[j]).href.match(/360icon/)) {
                $mjs(magicToolboxSelectors[j]).jAddClass('active-selector mz-thumb-selected');
            } else {
                $mjs(magicToolboxSelectors[j]).jRemoveClass('active-selector mz-thumb-selected');
            }
            if(mainImageContainer.className.match(new RegExp('(?:\\s|^)MagicZoom(?:\\s|$)'))) {
                $mjs(magicToolboxSelectors[j])[magicJSAddEventMethod](switchEvent+' tap', switchFunction, 1);
            } else if(mainImageContainer.className.match(new RegExp('(?:\\s|^)MagicThumb(?:\\s|$)'))) {
                $mjs(magicToolboxSelectors[j])[magicJSAddEventMethod](magictoolboxEvent, switchFunction);
                $mjs(magicToolboxSelectors[j])[magicJSAddEventMethod]('touchstart', switchFunction);
            }
        }
    }
}