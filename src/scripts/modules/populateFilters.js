var $ = require("jquery");
var _ = require("lodash");


var populateFilters = function(data) {


  var generateOptions = function(val, dest) {

    $("#" + dest).append($("<option value='" + val + "' data-filter='" + val + "'>" + val + "</option>"));

  };

  var _uniqs = {};
  //_uniqs.publisher = _.uniq(_.map(data, "publisher"));
  _uniqs.vertical = _.flatten(_.map(data, "vertical"));
  _uniqs.vertical = _.uniq(_uniqs.vertical);
  _uniqs.integrationtype = _.uniq(_.map(data, "integrationtype"));
  _uniqs.device = _.uniq(_.map(data, "device"));
  _uniqs.section = _.uniq(_.map(data, "section"));

  $.each(Object.keys(_uniqs), function(ind, key) {

    var alphaOrdered = _.sortBy(_uniqs[key])

    $.each(alphaOrdered, function(_ind, _key) {

      generateOptions(_key, key)

    });

  });

}


module.exports = populateFilters;
