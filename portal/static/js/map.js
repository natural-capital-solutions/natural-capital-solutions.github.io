console.log("loaded map.js");

//create map and set view, zoom
const map = L.map('map', {
    maxZoom: 18,
    zoomControl: false
});

map.createPane('datasetPane')
map.getPane('datasetPane').style.zIndex = 450;

//set the zoom control to a variable to append to the tools-side div
const zoom = L.control.zoom({
    position: 'bottomright'
})

zoom.addTo(map);

//append the zoom variable to the tools-side. places the zoom control outside of the map in a custom div
document.getElementById("tools-side").appendChild(zoom.getContainer());

map.setView([52.319, -0.86], 12);



//basemaps-------------------------	
const OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
        {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            zIndex: 1
        }
).addTo(map);

const Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', 
        {
            maxZoom: 19,
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community;',
            zIndex: 1
        }
);

const CartoDB_DarkMatterNoLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png', 
        {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>;',
            subdomains: 'abcd',
            maxZoom: 19,
            zIndex: 1
        }
);

//as vector layer
const habitatsTile = L.esri.Vector.vectorTileLayer(
                        "https://vectortileservices5.arcgis.com/2dT1dGqgpAhCIa24/arcgis/rest/services/basemap/VectorTileServer",
                        {
                            zIndex: 1
                        }
                    );


const basemaps = {
    '<img id = "basemap-previews-osm" class = "basemap-previews" src = "static/assets/osm.png"> <div class = "basemap-names">OpenStreetMap</div>': OpenStreetMap_Mapnik, 
    '<img id = "basemap-previews-satellite" class = "basemap-previews" src = "static/assets/satellite.png"> <div class = "basemap-names">Satellite</div>': Esri_WorldImagery, 
    '<img id = "basemap-previews-dark" class = "basemap-previews" src = "static/assets/dark.png"> <div class = "basemap-names">Dark</div>': CartoDB_DarkMatterNoLabels, 
    '<img id = "basemap-previews-habitats" class = "basemap-previews" src = "static/assets/habitats.png"> <div class = "basemap-names">Habitats</div>': habitatsTile
    };


L.control.layers(basemaps, null, {position: 'topright', collapsed:true}).addTo(map); //first argument is for basemaps/datasets that the user switches between. Use 'null' if not using any. Second argument is for check box datasets (on/off)
L.control.scale().addTo(map);

//create a blank layerGroups for wms layers to be added to. must be declared outside of a function to allow global scope
let esLayerGroup = L.layerGroup().addTo(map);
let oppLayerGroup = L.layerGroup({pane: 'datasetPane'}).addTo(map);

//print button
const printDiv = L.control.browserPrint({title: 'Print',
                        documentTitle: 'Map',
                        printModes: ["Portrait", "Landscape", "Custom"],
                        position: 'bottomleft',
                        closePopupsOnPrint: false,
                        customPrintStyle: {color: 'red'}
})


printDiv.addTo(map)

//listen to when zoom event occurs and log the zoom level (will be used for the basemap legends)
let scaleLevel = map.getZoom();
let layerIndex = 0;

//geocoder plugin (search function using OSM)
let geocoder = L.Control.geocoder({
    defaultMarkGeocode: false,
    showResultIcons: true,
    suggestMinLength: 1
  })
    .on('markgeocode', function(e) {
      let bbox = e.geocode.bbox;
      let poly = L.polygon([
        bbox.getSouthEast(),
        bbox.getNorthEast(),
        bbox.getNorthWest(),
        bbox.getSouthWest()
      ])
      map.fitBounds(poly.getBounds());
    })
    .addTo(map);
    
document.getElementById("tools-side").appendChild(geocoder.getContainer());

