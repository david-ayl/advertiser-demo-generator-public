var $ = require("jquery");

var database = function() {

  $.getJSON("config.json", function(data) {

    window.FRbaseURL = data.websites.fr;
    window.sitelist = data.database.fr;

  });

}

module.exports = database;
