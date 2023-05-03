$(document).ready(function(){
    $("#printMap").click(function(){
    console.log('Print button clicked');

    const modeToUse = L.control.browserPrint.mode.auto(margin = 0);
		map.printControl.print(modeToUse);
    })

    // map.on("browser-print-start", function(e){
    //     /*on print start we already have a print map and we can create new control and add it to the print map to be able to print custom information */
    //     legend.addTo(e.printMap);
    // });
})