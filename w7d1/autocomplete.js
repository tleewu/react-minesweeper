var Autocomplete = React.createClass({
  getInitialState: function(){
    return {search: ''};
  },
  handleChange: function(e){
    this.setState({ search: e.target.value });
  },
  handleClick: function(name, e){
    this.setState({ search: name.toString() });
  },
  render: function(){
    var names = this.props.items
    var search = this.state.search.trim().toLowerCase();
    var self = this;

    if (this.state.search.length > 0){
      names = names.filter(function(l){
        return l.toLowerCase().slice(0,search.length).match(search);
      });
    } else {
      names = [];
    }
    return (
      <div>
        <input
          type="text"
          value={this.state.search}
          onChange={this.handleChange}
          placeholder="Type here"
        />

        <ul>
          {
            names.map(function(l){
              return <li id={l} onClick={self.handleClick.bind(self, l)}> {l} </li>
            })
          }
        </ul>
      </div>
    );
  }
});

var names = [
  "Theodore Wu",
  "Sheng",
  "Jeff",
  "Ned",
  "Jon",
  "Eric",
  "Kobe",
  "Judy"
]

React.render(
  <Autocomplete items={names}/>,
  document.getElementById('autocomplete')
);
