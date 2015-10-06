(function() {
  if (typeof window.Snake === 'undefined') {
    window.Snake = {};
  }

  var Board = window.Snake.Board = function (){
    this.snake = new Snake.Snake();
    this.apples = [];

    this.makeGrid(100, 100);
    this.render();
  }

  Board.prototype.render = function(){
    var output = "";
    this.makeGrid(100, 100);
    for(i = 0; i < this.grid.length; i++){
      for(var j = 0; j < this.grid[i].length; j++)
      {
        output += this.grid[i][j];
      }
      output += "\n";
    }
    return output;
  }

  Board.prototype.makeGrid = function(height, width){
    this.grid = [];
    for(var i = 0; i < height; i++){
      this.grid.push([]);
      for(var j = 0; j < width; j++){
        this.grid[i].push(".");

        }
      }
    for (var i = 0; i < this.snake.segments.length; i++) {
      var snakeX = this.snake.segments[i].x;
      var snakeY = this.snake.segments[i].y;
      this.grid[snakeY][snakeX] = "S";
    }
  }
}());
