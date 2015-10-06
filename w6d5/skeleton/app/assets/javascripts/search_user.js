$.UsersSearch = function (el) {
  this.$el = $(el);
  this.input = $(".users-search input");
  this.matches = $(".users");

  this.$el.on("keyup", "input", function (e) {
    this.handleInput(e);
  }.bind(this));
};

$.UsersSearch.prototype.handleInput = function (e) {
  e.preventDefault();
  // "url?cat=gizmo"
  $.ajax({
    type: 'get',
    url: "/users/search",
    data: {
      query: this.input.val()
    },
    dataType: 'json',
    success: function(responseData) {
      this.renderResults(responseData);
    }.bind(this),
    failure: function() {

    }
  })
};

$.UsersSearch.prototype.renderResults = function (data) {
  // empty out the ul
  this.matches.text("");
  // fetch array of users
  data.forEach (function (current) {
    var followState = current.followed ? "followed" : "unfollowed";
    var $li = this.matches.append("<li>" + current.username + "</li>");
    var $button = $("<button type='button' class='follow-toggle' data-user-id='"
                + current.id +
                "' data-initial-follow-state='" + followState + "'></button>");
    $button.followToggle();
    $li.append($button);
  }.bind(this));
};

$.fn.userSearch = function () {
  return this.each(function () {
    new $.UsersSearch(this);
  });
};

$(function () {
  $(".users-search").userSearch();
}

);
