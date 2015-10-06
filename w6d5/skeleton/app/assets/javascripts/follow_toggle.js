  $.FollowToggle = function (el) {

    this.$el = $(el);
    this.userId = this.$el.data("user-id");
    this.followState = this.$el.data("initial-follow-state");
    this.render();
    this.inProcess = false;
    this.$el.on("click", function(e) {
      this.render();
      this.handleClick(e);
    }.bind(this));
  };

  // $( elem ).prop( "checked" )

  $.FollowToggle.prototype.handleClick = function (e) {
    e.preventDefault();
    if (this.inProcess) { return false; }

    this.inProcess = true;
    var method = this.followState === "followed" ? "DELETE" : "POST";

    $.ajax({
      url: "/users/" + this.userId + "/follow",
      type: method,
      dataType: "json",
      success: function (responseData) {
        this.inProcess = false;
        this.toggleState();
        this.render();
      }.bind(this),
      error: function (jqXHR, response, status) {
        this.inProcess = false;
      }.bind(this)
    });
  }

  $.FollowToggle.prototype.toggleState = function () {
    this.followState = this.followState === "followed" ? "unfollowed" : "followed"
  };

  $.FollowToggle.prototype.render = function () {
    if (this.inProcess) {
      this.$el.prop("disabled", true);
    } else {
      this.$el.prop("disabled", false);
    }

    if (this.followState === "followed") {
      this.$el.text("Unfollow!");
    } else {
      this.$el.text("Follow!");
    }
  };

  $.fn.followToggle = function () {
    return this.each(function () {
      new $.FollowToggle(this);
    });
  };

  $(function () {
    $("button.follow-toggle").followToggle();
  });
