function toggleEsDatasets(a) {
    let ed = document.getElementById("ecosystem-datasets");
    if (ed.style.display === "none") {
        ed.style.display = "block";
        document.getElementById(a).innerHTML = "<i class='fas fa-angle-down'></i>";
    } else {
        ed.style.display = "none";
        document.getElementById(a).innerHTML = "<i class='fas fa-angle-up'></i>";
    }
}

function toggleOppDatasets(a) {
    let od = document.getElementById("opportunity-datasets");
    if (od.style.display === "none") {
        od.style.display = "block";
        document.getElementById(a).innerHTML = "<i class='fas fa-angle-down'></i>";
    } else {
        od.style.display = "none";
        document.getElementById(a).innerHTML = "<i class='fas fa-angle-up'></i>";
    }
}