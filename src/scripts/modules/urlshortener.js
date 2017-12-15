var $ = require("jquery");

var shorturl = function(longURL, callback) {

  if(longURL == null) { return }

  $.ajax({
    url: 'https://www.googleapis.com/urlshortener/v1/url?shortUrl=http://goo.gl/fbsS&key=AIzaSyBcODYpaQvT2oczaUqV0QFU86SyN3Rny94',
    type: 'POST',
    contentType: 'application/json; charset=utf-8',
    data: '{ longUrl: "' + longURL +'"}',
    dataType: 'json',
    success: function(response) {
      callback(response);
    }
 });

}

module.exports = shorturl;
