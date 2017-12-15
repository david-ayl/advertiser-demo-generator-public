var $ = require("jquery");
var _ = require("lodash");


var populateList = function(data) {

  var list = _.orderBy(data, "name");

  var elem = function(device, integrationtype, vertical, url, name) {

    var verticalString = vertical.join();
    verticalString = verticalString.replace(/\,/g, " ");

    return $("<div class='item' data-device='" + device + "' data-integrationtype='" + integrationtype + "' data-vertical='" + verticalString + "' data-url='" + url + "'><span class='toggle_short'></span><span class='name item_name_size'>" + name.toLowerCase() + "</span></span></div>");
  }

  $(list).each(function() {
    var _verticals = [];
    _verticals.push($(this)[0].vertical);

    var   _device           = $(this)[0].device,
          _integrationtype  = $(this)[0].integrationtype,
          _url              = $(this)[0].slug,
          _name             = $(this)[0].name;
    $("#list_wrapper").append(elem(_device, _integrationtype, _verticals, _url, _name));
  });

}

module.exports = populateList;
