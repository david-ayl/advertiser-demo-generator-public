var $ = require("jquery");
var _ = require("lodash");

var filterlist = {

  selecteds : {
    text : ""
  },

  get filters() {
    return $("select[name]");
  },

  items : function() {
    var el = [];
    $(".item").each(function() {

      if(! $(this).hasClass("disable_element")) {
        el.push($(this));
      }

    });
    return el;
  },

  init : function() {

    filterlist.get_population_length();

    $(filterlist.filters).each(function() {
      var _key = $(this).attr("name");
      filterlist.selecteds[_key] = "all";
    });

    $(filterlist.filters).on("change", function(e) {

      var _name = $(e.target).attr("name");
      var _val = e.target.value;

      if(_val !== "all" && e.target.getAttribute("type") !== "text") {
        $(e.target).addClass("selected");
      }
      else {
        $(e.target).removeClass("selected");
      }

      filterlist.update_vars();
      filterlist.clean_filters();
      filterlist.apply_list_filters();
      filterlist.get_population_length();

    });

    $(document).on("keyup", "#search", function(e) {

      if(e.keyCode == 8) {
        filterlist.update_text("");
        filterlist.update_text($(e.target).val());
      }

      filterlist.update_text($(e.target).val());

    });

    filterlist.filters;
    this.items();
  },

  update_text : function(val) {

    if(val == "") {
      filterlist.clean_filters();
    }

    filterlist.text_search();
    filterlist.apply_list_filters();

  },

  update_vars : function() {

    var filters = filterlist.filters;

    $(filters).each(function() {

      var type = $(this).attr("name");
      var val = $(this).val();

      filterlist.selecteds[type] = val;

    });

  },

  apply_list_filters : function() {

    for(var i = 0; i < Object.keys(filterlist.selecteds).length; i++) {

      var _key = Object.keys(filterlist.selecteds)[i];
      var _val = filterlist.selecteds[_key];

      if(_key == "text" && _val !== "") {
        filterlist.except("text", null, _val).addClass("disable_element");
        break;
      }
      else {
        if(_val !== "all") {
          filterlist.except("filter", _key, _val).addClass("disable_element");
        }

      }

    }

  },

  clean_filters : function() {

    $(".item").removeClass("disable_element");

  },

  text_search : function() {

    filterlist.selecteds.text = $("#search").val();

  },

  get_population_length : function() {

    $(".input_option").each(function() {

      var _that = $(this);

      _that.find("option").each(function() {

        var   _this           = $(this),
              key             = _that.attr("name"),
              val             = _this.val(),
              filtered_items  = $(".item[data-" + key + "*='" + val + "']"),
              ln              = filtered_items.not(".disable_element").length;

        if(_this.val() == "all") {
          return
        }
        else if(ln == 0) {
          _this.attr("disabled", "disabled");
        }
        else {
          _this.removeAttr("disabled");
        }

      });

    });

  },

  except : function(type, key, val) {

    if (type == "text") {

      var   reg                 = new RegExp(val),
            whole_collection    = $(".item").not(".disable_element"),
            ln                  = whole_collection.length,
            filtered_collection = $();

      for (var i = 0; i < ln; i++) {

        if ( reg.test($(whole_collection[i]).find(".name").text()) ) {

          filtered_collection = filtered_collection.add($(whole_collection[i]));

        }

      }

    }
        else if (type == "filter") {

      var whole_collection = $(".item[data-" + key + "]");
      var filtered_collection = $(".item[data-" + key + "*='" + val + "']");

    }
    else if (type == "filter_length") {

      var whole_collection = $(".item");
      whole_collection = whole_collection.not(".disable_element");
      var filtered_collection = $("[data-" + key + "*='" + val + "']");

    }

    return whole_collection.not(filtered_collection);

  }

}

module.exports = filterlist;
