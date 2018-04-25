/* ----------------------------------------
   Public Vars
--------------------------------------- */
var left = $("#left-side");
var right = $("#right-side");

/* ----------------------------------------
   Init
--------------------------------------- */

function init() {

    left.on("click", function(e) {
        e.preventDefault();

        left.css("width", "100%");
        right.css("width", "0%");
    });

    right.on("click", function(e) {
        e.preventDefault();

        right.css("width", "100%");
        left.css("width", "0%");
    });

}

$(document).ready(function(){

    init();

});
