var $ = require("jquery");

var makeurl = function(elem) {

  var queryparams;
  var path;

  if($("#campaign").val() !== ""  || ! /[a-zA-Z0-9]{32}/.test($("#campaign").val())) {

    path = $(elem).attr("data-url");

    queryparams = "?campaign=" + $("#campaign").val();

    if($("#track_id").val() !== ""  || /[a-zA-Z0-9]{32}/.test($("#track_id").val())) {

      queryparams += "&Track=" + $("#track_id").val();

      if($("#creative_id").val() !== ""  || /[a-zA-Z0-9]{32}/.test($("#creative_id").val())) {

        queryparams += "&Crea=" + $("#creative_id").val();

      }

    }

    return window.FRbaseURL + path + queryparams;

  }

}

module.exports = makeurl;
