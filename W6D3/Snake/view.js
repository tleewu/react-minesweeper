(function() {
  if (typeof window.Snake === 'undefined') {
    window.Snake = {};
  }

  var View = window.Snake.View = function($el) {
    this.$el = $el;
    this.board = new Snake.Board();
    this.keyBinding();
    setInterval(step.bind(this), 200);
  }

  var step = function(){
    this.board.snake.move();
    this.$el.html(this.board.render());
  }

  View.prototype.keyBinding = function() {
    var keyCodes = {38: "N", 39: "E", 40: "S", 37: "W" };
    $(window).on('keydown', function(e) {
      var dir = keyCodes[e.keyCode];
      this.board.snake.turn(dir);
    }.bind(this));
  };
}());
