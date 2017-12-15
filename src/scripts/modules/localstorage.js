var $ = require("jquery");

var store_data = function() {


  var nodes_collection = $(".item.fav_item");
  var favs = [];

  nodes_collection.each(function() {

    var url = $(this).attr("data-url");
    url = encodeURIComponent(url)
    favs.push(url);

  });

  localStorage.setItem("generator_favs", JSON.stringify(favs));

}

module.exports = store_data;
