var $ = require("jquery");

var filterfav = function() {

  var elems = $(".item");
  var filter = localStorage.getItem("generator_favs");
  filter = JSON.parse(filter);



  if(filter && filter.length && filter.length == 0) {
    return
  }

  $(".item").addClass("disable_element");

  for (var j = 0; j < filter.length; j++) {

    var _filter = filter[j];

    for (var i = 0; i < elems.length; i++) {

      var targetFilter = $(elems[i]).attr("data-url");
      targetFilter = encodeURIComponent(targetFilter);

      if(targetFilter == _filter) {

        $(elems[i]).removeClass("disable_element");

      }

    }

  }


}


module.exports = filterfav;
