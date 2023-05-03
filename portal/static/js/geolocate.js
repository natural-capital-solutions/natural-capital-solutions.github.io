$(document).ready(function(){
    $("#geolocate").click(function(){
        map.locate({setView: true});
    })
})