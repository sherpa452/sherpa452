
function openGrid(tabContent) {
    var i, x
    x = document.getElementsByClassName('tab')
    for (i = 0; i < x.length; i++) {
        x[i].style.display = 'none'
    }
    document.getElementById(tabContent).style.display = 'block'
}

function openContent(button) {
    var i, x
    x = document.getElementsByClassName('content')
    for (i = 0; i < x.length; i++) {
        x[i].style.display = 'none'
    }
    button.nextElementSibling.style.display = 'block'
}

/*
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
}
*/