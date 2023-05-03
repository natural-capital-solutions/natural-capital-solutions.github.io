function descInfo(x) {
    let dd = document.getElementById("dataset-desc" + x);
    if (dd.style.display === "none" || dd.style.display == '') {
        dd.style.display = "block";
        //change the value of the input class when clicked
        document.getElementById("desc-info" + x).innerHTML = "<i class='fas fa-minus-circle'></i>";
    } else {
        dd.style.display = "none";
        document.getElementById("desc-info" + x).innerHTML = "<i class='fas fa-info-circle'></i>";
    }
}