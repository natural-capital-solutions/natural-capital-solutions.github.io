$(document).ready(function(){

    const habitats_background = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', 
                                    {
                                        maxZoom: 19,
                                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
                                    }
                                )

    $("#basemap-previews-osm").css("border-color","rgba(0, 96, 223, 0.8)")

        //log the basemap change (used to update layer control image)
        map.on('baselayerchange', function (e) {
            x = e.name;
            if (x.includes("osm")){
                map.removeLayer(habitats_background);
                map.removeControl(basemapLegend);
                $(".leaflet-touch .leaflet-control-layers-toggle").css('background-image', "url('static/assets/osm.png')")
                $('.basemap-previews').css("border-color", "rgba(221, 221, 221, 0.8)") //reset all
                $("#basemap-previews-osm").css("border-color","rgba(0, 96, 223, 0.8)")

            } else if (x.includes("satellite")){
                map.removeLayer(habitats_background);
                map.removeControl(basemapLegend);
                $(".leaflet-touch .leaflet-control-layers-toggle").css('background-image', "url('static/assets/satellite.png')")
                $('.basemap-previews').css("border-color", "rgba(221, 221, 221, 0.8)") 
                $("#basemap-previews-satellite").css("border-color","rgba(0, 96, 223, 0.8)")

            } else if (x.includes("dark")){
                map.removeLayer(habitats_background);
                map.removeControl(basemapLegend);
                $(".leaflet-touch .leaflet-control-layers-toggle").css('background-image', "url('static/assets/dark.png')")
                $('.basemap-previews').css("border-color", "rgba(221, 221, 221, 0.8)") 
                $("#basemap-previews-dark").css("border-color","rgba(0, 96, 223, 0.8)")

            } else if (x.includes("habitats")){
                habitats_background.addTo(map);
                basemapRequest(basemap_url);
                $(".leaflet-touch .leaflet-control-layers-toggle").css('background-image', "url('static/assets/habitats.png')")
                $('.basemap-previews').css("border-color", "rgba(221, 221, 221, 0.8)") 
                $("#basemap-previews-habitats").css("border-color","rgba(0, 96, 223, 0.8)")
            }
        });
    })

   