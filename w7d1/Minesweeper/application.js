var Game = React.createClass ({
  getInitialState: function () {
    return {board: new window.Minesweeper.Board(9,10), gameOver: false, gameWon: false};
  },

  updateGame: function (position, flagged) {
    // debugger;
    var tile = this.state.board.grid[position[0]][position[1]];

    if (flagged){
      tile.toggleFlag();
    } else {
      if (tile.bombed){
        this.setState({gameOver: true});
      } else {
        tile.explore();
      }
    }
    if(tile.board.won()){
      this.setState({gameWon: true});
    }
    // debugger;
    this.setState({board: tile.board});
  },

  render: function () {
    var message = "";
    if(this.state.gameOver){
      message = "You Lost!"
    } else if(this.state.gameWon) {
      message = "You Win!"
    }
    return (
      <div>
         {message}
         <br/>
         <Board brd={this.state.board} update={this.updateGame}/>
      </div>
    );
  }
});

var Board = React.createClass ({
  render: function(){
    var that = this;

    return(
      <div id="board">
        {
          this.props.brd.grid.map(function(row, rIdx){
            return (
              <div key={rIdx}>
              {
                row.map(function(el, cIdx){
                  return <Tile position={[rIdx,cIdx]} update={that.props.update} key={cIdx} tile = {el}/>;
                })
              }
              </div>
            );
          })
        }
      </div>
    );
  }
});

var Tile = React.createClass ({

  handleClick: function (e) {
    this.props.update(this.props.position, e.altKey);
  },

  render: function(){
    var sym = "T",
        state = "tile",
        addClick = this.handleClick;
    var t = this.props.tile;

    if (t.explored) {
      state += " revealed";
      addClick = "";
      if(t.adjacentBombCount){
        sym = t.adjacentBombCount().toString();
      } else {
        sym = " ";
      }
    } else if (t.bombed) {
      state += " bombed";
      sym = "B";
    } else if (t.flagged) {
      state += " flagged";
      sym = "F";
    }

    return (
      <div className = {state} onClick={addClick} >
        {sym}
      </div>
    );
  }
});

React.render(
  <Game/>,
  document.getElementById('minesweeper')
)
