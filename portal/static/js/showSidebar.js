$(document).ready(function(){
    $("#showSidebar").click(function(){
        $("#sidebar").show();
        $("#showSidebar").hide();
        //$("#showSidebar").fadeOut();
        //$("#sidebar").fadeIn(500);
    })

    $("#hideSidebar").click(function(){
        $("#sidebar").hide();
        $("#showSidebar").show();
        //$("#sidebar").fadeOut(1000);
        //$("#showSidebar").fadeIn(1500);
    })
})