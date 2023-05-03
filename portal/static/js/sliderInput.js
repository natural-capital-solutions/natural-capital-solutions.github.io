function sliderInput(a){
    //get a list of all layers currently active within the map; if one is the slider id, change it's opacity
    map.eachLayer(function(layer){
        if (layer.options.className == document.getElementById('data-checkbox' + a).value){
            if (layer.options.url.includes('Feature')){
                layer.setStyle({fillOpacity: document.getElementById('slider' + a).value});
            } else {
                layer.setOpacity(document.getElementById('slider' + a).value);
            }
        }
    });

};
