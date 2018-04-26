/* ~-------------------------------------~*/
/// Public Variables
/* ~-------------------------------------~*/
var body = $("body");
var left = $("#left-side");
var right = $("#right-side");
var leftO = $("#hidden-overlay-l");
var rightO = $("#hidden-overlay-r");
var initial = $(".initial-content");
var following = $(".following-content");
var lights = $(".lights");
var vs = $(".vs");
var goToRight = $("#go-to-right");
var goToLeft = $("#go-to-left");
var intro = $("#introduction");
var panelClose = $(".panel-close");

/* ~-------------------------------------~*/
/// Public Functions
/* ~-------------------------------------~*/

// Global scene transition
function enterLeft() {

    body.css("overflow-y", "scroll");
    // Remove the intro event listeners
    leftO.remove();
    rightO.remove();
    vs.fadeOut();
    intro.fadeOut();

    // Expand the called side, retract the opposite
    left.css("width", "100%");
    right.css("width", "0%");
    left.find(lights).css("background-color", "rgba(0, 0, 0, 0.85)");

    // Add the initiated class after entry (tightens some loose ends)
    setTimeout(function() {
        left.addClass("initiated"); // scss/styles.scss - Line 156
    }, 2000);

    // Wait and drop the content in after the page transition
    left.find(following).delay(2500).slideDown(1000, function(){
        left.css("height", "100%");
        goToRight.fadeIn();
    });
}

// Global scene transition
function enterRight() {

    body.css("overflow-y", "scroll");
    // Remove the intro event listeners
    rightO.remove();
    leftO.remove();
    vs.fadeOut();
    intro.fadeOut();

    // Expand the called side, retract the opposite
    right.css("width", "100%");
    left.css("width", "0%");
    right.find(lights).css("background-color", "rgba(0, 0, 0, 0.85)");

    // Add the initiated class after entry (tightens some loose ends)
    setTimeout(function() {
        right.addClass("initiated"); // scss/styles.scss - Line 156
    }, 2000);

    // Wait and drop the content in after the page transition
    right.find(following).delay(2500).slideDown(1000, function(){
        right.css("height", "100%");
        goToLeft.fadeIn();
    });
}

// Handles the right side scene switch
function switchToRight() {

    // Reset the user to the top of the browser
    $('html,body').animate({ scrollTop: 0 }, 500);

    // Show and hide the appropriate content before switching
    left.find(following).css("opacity", 0);
    right.find(following).css("opacity", 1);

    left.find("h1").css("opacity", 0);

    left.find(lights).css("opacity", 0);
    right.find(lights).css("opacity", 1);

    // Trigger the entry function
    goToRight.fadeOut(500, function(){
        enterRight();

        // Cleans up after the transition
        setTimeout(function(){
            right.find("h1").css("opacity", 1);
            left.find(following).hide();
        }, 2000);
    });

}

// Handles the left side scene switch
function switchToLeft() {

    // Reset the user to the top of the browser
    $('html,body').animate({ scrollTop: 0 }, 500);

    // Show and hide the appropriate content before switching
    left.find(following).css("opacity", 1);
    right.find(following).css("opacity", 0);

    right.find("h1").css("opacity", 0);

    right.find(lights).css("opacity", 0);
    left.find(lights).css("opacity", 1);

    // Trigger the entry function
    goToLeft.fadeOut(500, function(){
        enterLeft();

        // Cleans up after the transition
        setTimeout(function(){
            right.find(following).hide();
            left.find("h1").css("opacity", 1);
        }, 2000);
    });

}

/* ~-------------------------------------~*/
/// Init
/* ~-------------------------------------~*/

function init() {

    /* ~-------------------------------------~*/
    /// Intro Interactivity
    /* ~-------------------------------------~*/

    // Hover states that rely on the intro listener elements
    leftO.hover( function() {
        left.css("width", "60%");
        left.find(lights).css("background-color", "rgba(0, 0, 0, 0.3)");
    }, function() {
        left.css("width", "50%");
        left.find(lights).css("background-color", "rgba(0, 0, 0, 0.8)");
    });

    rightO.hover( function() {
        right.css("width", "60%");
        right.find(lights).css("background-color", "rgba(0, 0, 0, 0.3)");
    }, function() {
        right.css("width", "50%");
        right.find(lights).css("background-color", "rgba(0, 0, 0, 0.8)");
    });

    // Handles modal close button
    panelClose.on("click", function() {
        intro.fadeOut();
    });

    // Element event listenters
    leftO.on("click", enterLeft);
    rightO.on("click", enterRight);

    goToRight.on("click", switchToRight);
    goToLeft.on("click", switchToLeft);


}

$(document).ready(function(){

    init();

    // Smooth scroll to anchors
    $('.smooth').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
          || location.hostname == this.hostname) {

        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 1000);
          return false;
        }
      }
    });

});
