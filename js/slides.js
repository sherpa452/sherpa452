var slideIndex = 0;
var milliseconds = 3000;

plusDivs();

function plusDivs() {
    showDivs();
    setTimeout(plusDivs, milliseconds);
}

function showDivs() {
    var i;
    var x = document.getElementsByClassName("my_slides");
    slideIndex %= x.length;
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[slideIndex].style.display = "block";
    slideIndex++;
}