$.TweetCompose = function(el) {
  this.$el = $(el);
  this.composing = false;
  this.$el.on("click", ".tweet-submit", function (e) {
    this.trigger(e);
  }.bind(this));
};

$.TweetCompose.prototype.trigger = function(e) {
  e.preventDefault();

  if (this.composing) {
    return;
  }

  this.composing = true;
  var $form = $(e.currentTarget);
  var data = {tweet: {}};
  debugger;
  $form.serializeArray().forEach(function(obj) {
    data.tweet[obj.name] = obj.value;
  });

  debugger;

  this.disableInput();

  $.ajax({
    type: 'post',
    url: '/tweets',
    dataType: 'json',
    data: data,
    success: function(responseData) {
      debugger;
      this.handleSuccess(responseData);
    }.bind(this),
    error: function(serverData) {
      debugger;
      this.enableInput();
      this.composing = false;
    }.bind(this)
  });
};

$.TweetCompose.prototype.handleSuccess = function (response) {
  this.enableInput();
  this.composing = false;
  this.clearInput();

  var $feed = $(this.$el.data("tweets-ul"));
  $feed.append()
};

$.TweetCompose.prototype.clearInput = function () {
  $(":input").val("");
};

$.TweetCompose.prototype.disableInput = function () {
  $(":input").attr("disabled", true);
};

$.TweetCompose.prototype.enableInput = function () {
  $(":input").attr("disabled", false);
};

$.fn.tweetCompose = function () {
  return this.each(function () {
    new $.TweetCompose(this);
  });
};

$(function () {
  $(".tweet-compose").tweetCompose();
})
