const basemap_url = "https://vectortileservices5.arcgis.com/2dT1dGqgpAhCIa24/arcgis/rest/services/basemap/VectorTileServer/resources/styles/root.json?f=pjson"

console.log(basemap_url);

const basemapLegend = L.control({position: 'bottomright'});

basemapRequest = (a) => $.ajax({
    url: a,
    dataType: "json",
    success: function(response){
        console.log(response);
        let legTitle = response.layers[0].source;
        
        basemapLegend.onAdd = function(map) {
            let div = L.DomUtil.create("div", "basemap-legend");
            div.setAttribute('id', 'basemap-legend'); //add a id name to the div
            div.innerHTML += '<h2>'+ legTitle + '</h2>';
            //loop through legend Entries
            for (i in response.layers){
                let entryID = response.layers[i].id
                entryID = entryID.replace(legTitle + "/", "") //remove source name from entry
                let entryColour = response.layers[i].paint["fill-color"]
                if (entryID != "<all other values>"){
                    div.innerHTML += '<div class = "legendEntry"><div class = "legendEntryColour" style="background-color:' + entryColour + '"></div><div class = "legendEntryLabel">' + entryID + '</div></div>';
                }
            }
            
            //prevent map clicks if legend clicked
            L.DomEvent.on(div, 'click', function (e) {
                L.DomEvent.stopPropagation(e);
            });

            return div;
        };
        
        map.addControl(basemapLegend); 
    }
});

