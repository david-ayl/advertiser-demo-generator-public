
var splitids = function(str, campaignInput, trackInput, creativeInput) {


  var _regexp = new RegExp(/(\?Campaign\=|.*admin\.adyoulike\.com.*|.*public\.adyoulike\.com(\.s3\.amazonaws\.com)?\/rwDemos.*|.*public\.adyoulike\.com(\.s3\.amazonaws\.com)?\/advertiser\-demo\-generator.*)/, "g");

  if(_regexp.test(str)) {

    var _id = new RegExp(/^[a-zA-Z0-9]{32}$/);

    var campaignItem, trackItem, creaItem;


    /*CAMPAIGNS*/
    if(str.indexOf("campaigns") !== -1) {
      campaignItem = "campaigns";
    }
    else if (str.indexOf("campaign") !== -1) {
      campaignItem = "campaign";
    }
    else if (str.indexOf("camp") !== -1 ) {
      campaignItem = "camp";
    }
    else if (str.indexOf("Campaign") !== -1) {
      campaignItem = "Campaign";
    }

    /*TRACK*/
    if(str.indexOf("tracks") !== -1) {
      trackItem = "tracks";
    }
    else if (str.indexOf("Track") !== -1) {
      trackItem = "Track";
    }

    /*CREA*/
    if(str.indexOf("creatives") !== -1) {
      creaItem = "creatives";
    }
    else if (str.indexOf("Creative") !== -1) {
      creaItem = "Creative";
    }
    else if (str.indexOf("Crea") !== -1) {
      creaItem = "Crea";
    }


    var extractId = function(str, item) {

      if(item) {

        var startIndex = (str.indexOf(item) + item.length + 1),
        endIndex = startIndex + 32;

        if(_id.test(str.substring(startIndex, endIndex))) {
          return str.substring(startIndex, endIndex);
        }

      }

    }

    campaignInput.val(extractId(str, campaignItem));

    trackInput.val(extractId(str, trackItem));

    creativeInput.val(extractId(str, creaItem));

  }


}

module.exports = splitids;
