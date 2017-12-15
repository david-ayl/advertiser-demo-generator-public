var $ = require("jquery");

var loader = function() {

  $("#main_loader").addClass("loaded");

  setTimeout(function(){

    $("#main_loader").animate({
      opacity: 0,
    }, 300, function() {
      $("#main_loader").fadeOut();
    });

  }, 2000);

}

module.exports = loader;
