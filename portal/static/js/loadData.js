$(document).ready(function(){
    //set all checkboxes to unchecked (resolves issue with custom css checkboxes keeping checked styles when page is refreshed)
    $('input[type="checkbox"]').prop('checked', false); 
    //set all sliders to max value
    $('input[type="range"]').prop('value', 1);
});   


//-------------------ECOSYSTEM DATASET FUNCTION------------------------
function esDataClick() {
    //deselect all other checkboxes that are not 'this' (the one clicked)
    $('#ecosystem-services input[type="checkbox"]').on('change', function() {
        $('#ecosystem-services input[type="checkbox"]').not(this).prop('checked', false);

        //onChange, clear the layers from the layerGroup, and legend
        esLayerGroup.clearLayers();
        
        //check all the checkboxes, if they are checked, display their transparency-slider. otherwise, hide
        $("#ecosystem-services input:checkbox").each(function() {
            if ($(this).is(":checked")) {
                let id = $(this).attr("id").replace('data-checkbox', ''); //extract only the id number
                document.getElementById('slider' + id).style.display = 'block';
                document.getElementById('legend' + id).style.display = 'flex';
                document.getElementById('legend-text' + id).style.display = 'block';
            } else {
                let id = $(this).attr("id").replace('data-checkbox', '');
                document.getElementById('slider' + id).style.display = 'none';
                document.getElementById('legend' + id).style.display = 'none';
                document.getElementById('legend-text' + id).style.display = 'none';
            }
        });

        //if checkbox selected, add the wms layer to the layerGroup
        if($('#ecosystem-services input[type="checkbox"]').is(':checked')){

            //console.log(this.value);
            rasterLayer =  (L.esri.tiledMapLayer(
                                {
                                    url: "https://tiles.arcgis.com/tiles/2dT1dGqgpAhCIa24/arcgis/rest/services/" + this.value + "/MapServer",
                                    className: this.value, //needed to access layer for opacity change on slider input
                                    zIndex: 10,
                                    pane: 'datasetPane'
                                }
                            )
            );
            rasterLayer.addTo(esLayerGroup);
        }
    })
};

//-------------------OPPORTUNITY DATASET FUNCTION------------------------
function oppDataClick() {
    //deselect all other checkboxes that are not 'this' (the one clicked)
    $('#opportunities input[type="checkbox"]').on('change', function() {
        $('#opportunities input[type="checkbox"]').not(this).prop('checked', false);

        //onChange, clear the layers from the layerGroup, and legend
        oppLayerGroup.clearLayers();
        
        //check all the checkboxes, if they are checked, display their transparency-slider. otherwise, hide
        $("#opportunities input:checkbox").each(function() {
            if ($(this).is(":checked")) {
                let id = $(this).attr("id").replace('data-checkbox', ''); //extract only the id number
                document.getElementById('slider' + id).style.display = 'block';
                document.getElementById('legend' + id).style.display = 'flex';
                document.getElementById('legend-text' + id).style.display = 'block';
            } else {
                let id = $(this).attr("id").replace('data-checkbox', '');
                document.getElementById('slider' + id).style.display = 'none';
                document.getElementById('legend' + id).style.display = 'none';
                document.getElementById('legend-text' + id).style.display = 'none';
            }
        });

        //if checkbox selected, add the wms layer to the layerGroup
        if($('#opportunities input[type="checkbox"]').is(':checked')){

            let featureLayer =  (L.esri.featureLayer(
                                {
                                    url: "https://services5.arcgis.com/2dT1dGqgpAhCIa24/arcgis/rest/services/" + this.value + "/FeatureServer/0",
                                    className: this.value, //needed to access layer for opacity change on slider input
                                    pane: 'datasetPane',
                                    style: (feature) => {
                                        let style = {
                                          color: null, // no outline color
                                          fillOpacity: 100
                                        };
                                        if (feature.properties.opprtn_ === "10% tile - highest") {
                                          style.fillColor = "#14505C";
                                        } else if (feature.properties.opprtn_ === "25% tile - high") {
                                          style.fillColor = "#4CA38F";
                                        } else if (feature.properties.opprtn_ === "50% tile - medium") {
                                          style.fillColor = "#C7E5BE";
                                        } else {
                                          style.fillColor = "#BEBEBE";
                                        }
                            
                                        return style;
                                      }
                                      
                                }
                            )

            );

            featureLayer.bindPopup(function (layer) {

                return "<b>Opportunity</b><br>" + layer.feature.properties.opprtn_;
        
            });      
               
            featureLayer.addTo(oppLayerGroup)
            
        }
    })
};

