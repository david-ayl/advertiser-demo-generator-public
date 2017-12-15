var $                 = require("jquery");
var _                 = require("lodash");
var splitids          = require("./modules/splitids");
var populateFilters   = require("./modules/populateFilters");
var populateList      = require("./modules/populateList");
var filterList        = require("./modules/filterlist.js");
var store_data        = require("./modules/localstorage.js");
var filterfav         = require("./modules/filterfav.js");
var makeurl           = require("./modules/makeurl.js");
var database          = require("./modules/database.js");
var urlshortener      = require("./modules/urlshortener.js");
var loader            = require("./modules/loader.js");


var sizeListWrapper = function() {

  $(".items_list_wrapper").height($(window).height() - $("#native_generator").height() - 50 + "px");

};

$(window).resize(function() {

  sizeListWrapper();

});

$(document).ready(function() {

  if(document.location.href.indexOf("?Campaign=") !== -1) {

    var url = document.location.href;
    splitids(
      url,
      $("#campaign"),
      $("#track_id"),
      $("#creative_id")
    );


  }

  //loader();

  database();

  sizeListWrapper();

  var filter = localStorage.getItem("generator_favs");
  filter = JSON.parse(filter);

  $.getJSON( "db/db.json", function(data) {

    var filterDatas = _.mapValues(data);
    populateFilters(filterDatas);

    var listDatas = _.mapValues(data);
        console.log(filterDatas);
    populateList(listDatas);


  });

  $(document).on("mouseup keyup", "input[type=text]", function() {

    var _val = $(this).val();
    splitids(
      _val,
      $("#campaign"),
      $("#track_id"),
      $("#creative_id")
    );

  })

  .on("click", ".favorite", function(e) {

    if($(this).hasClass("selected_fav")) {

      $("#fav_added").removeClass("show");

      $("#fav_removed").addClass("show");
      setTimeout(function() {
        $("#fav_removed").removeClass("show");
      }, 2000);

    }
    else{

      $("#fav_removed").removeClass("show");

      $("#fav_added").addClass("show");
      setTimeout(function() {
        $("#fav_added").removeClass("show");
      }, 2000);

    }

    $(this).toggleClass("selected_fav");
    $(this).closest(".item").toggleClass("fav_item");
    store_data();

    return false;

  })


  .on("click", "#clear_all", function() {

    $("#search").val("").keyup();
    $(".input_option").val("all").change();

  })

  .on("click", "#clear_url", function() {

    $("#full_url").val("").keyup();
    $("[name='campaign']").val("").keyup();
    $("[name='track_id']").val("").keyup();
    $("[name='creative_id']").val("").keyup();

  })

  .on("click", "#filter_favorite", function() {

    filterfav();

  })

  .on("click", ".item", function(e) {



    if($("#campaign").val() == "" || ! /[a-zA-Z0-9]{32}/.test($("#campaign").val())) {
      return;
    }

    if ($(e.target).attr("class") == "toggle_short") {

      var item_container = $(e.target).closest(".item");
      item_container.toggleClass("shorted");

      urlshortener(makeurl(item_container), function(data) {

        item_container.find(".shortenedurl").text(data.id);

      });

      return;

    }

    if($(this).hasClass("shorted")) {
      return;
    }

    window.open(makeurl($(this).closest(".item")));




  })
  .on("click", "#responsive_menu", function() {

    $("#menu_left_responsive").css("top", "0%");

  })

  .on("click", "#close_menu", function() {

    $("#menu_left_responsive").css("top", "100%");

  })

  .on("click", function() {

    if(event && event.target && $(event.target).hasClass("toggle_short")) {

      return;

    }

    if($(".shorted").length > 0) {

      $(".shorted").removeClass("shorted");

    }

  })
  .on("keyup", function() {

    if(event.keyCode == 27) {

      if($(".shorted").length > 0) {

        $(".shorted").removeClass("shorted");

      }

    }

  });


  setTimeout(function() {
    filterList.init();

    if(filter && filter.length && filter.length > 0) {


      $(".item").each(function() {

        for (var i = 0; i < filter.length; i++) {

          var url = decodeURIComponent(filter[i]);
          if($(this).attr("data-url") == url) {

            $(this).addClass("fav_item");
            $(this).find(".favorite").addClass("selected_fav");

          }

        }

      });

    }

  }, 100);

});
