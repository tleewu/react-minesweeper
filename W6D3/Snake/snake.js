(function() {
  if (typeof window.Snake === 'undefined') {
    window.Snake = {};
  }

  var Utils = window.Snake.utils = {};
  Utils.Coordinate = function(x, y) {
    this.x = x;
    this.y = y;
  }

  Utils.Coordinate.prototype.plus = function(cord1) {
    return new Utils.Coordinate(this.x + cord1.x, this.y + cord1.y);
  };

  Utils.Coordinate.prototype.equals = function(other_cord) {
    return (this.x === other_cord.x && this.y === other_cord.y);
  }

  // wrapping function
  // Utils.Coordinate.isOpposite = function(other_cord) {
  //
  // }

  var Snake = window.Snake.Snake = function() {
    this.dir = "N";
    this.DIRS = { "N" : new Utils.Coordinate(0,-1),
                  "S" : new Utils.Coordinate(0,1),
                  "E" : new Utils.Coordinate(1, 0),
                  "W" : new Utils.Coordinate(-1,0)
                };
    this.segments = [new Utils.Coordinate(50,50)];
  };

  Snake.prototype.move = function(){
    var dirCoords = this.DIRS[this.dir];
    // debugger;
    var newHead = this.segments[0].plus(dirCoords);
    this.segments.pop();
    this.segments.unshift(newHead);
    console.log(this.segments.length);
  };

  Snake.prototype.turn = function(newDir){
    this.dir = newDir;
  }

}());
