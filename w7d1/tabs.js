var Tabs = React.createClass({
  getInitialState: function () {
    return {selected: 0};
  },

  handleClick: function (idx, e) {
    this.setState({selected: idx});
  },

  render: function () {
    var self = this;
    var currentTab = this.props.items[this.state.selected];
    var divStyle;
    return (
    <div>
       <ul>
        {
          this.props.items.map(function (el, idx) {
            divStyle = (idx === self.state.selected) ? {color: 'blue', fontWeight: 'bold'} : {fontWeight: 'normal'};

            return <li id={idx} onClick={self.handleClick.bind(self, idx)} style={divStyle}> {el.title} </li>
          })
        }
      </ul>

      <article> {currentTab.content} </article>
    </div>
    );
  }

});

var names = [
  {title: "Theodore Wu", content: "Short content on Theo."},
  {title:"Sheng", content: "Short content on Sheng."},
  {title:"Jeff", content: "Short content on Jeff." },
  {title:"Ned", content: "Short content on Ned." },
  {title:"Jon", content: "Short content on Jon." },
  {title:"Eric", content: "Short content on Eric." },
  {title:"Kobe", content: "Short content on Kobe." },
  {title:"Judy", content: "Short content on Judy." },
]

React.render(
  <Tabs items={names}/>,
  document.getElementById('tabs')
);

// onClick={self.handleClick.bind(self, el)}
