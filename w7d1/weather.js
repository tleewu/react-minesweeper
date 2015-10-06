var Clock = React.createClass({
  getInitialState: function () {
    return {date: new Date(), weather: "", temp: ""};
  },

  componentDidMount: function(){
    var self = this;

    navigator.geolocation.getCurrentPosition(function (position) {
      var lat = position.coords.latitude.toFixed(2);
      var lon = position.coords.longitude.toFixed(2);
      var request = new XMLHttpRequest();
      var url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon;
      request.open('GET', url);

      request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
          // Success!
          var resp = JSON.parse(request.responseText);
          var w = resp.weather[0]['description'];
          var t = (resp.main.temp - 273).toFixed(2) + " Celsius";
          self.setState({weather: w, temp: t});
        } else {
          // We reached our target server, but it returned an error

        }
      };
      request.send();
    });
    this.setState({interval: setInterval(this._tick , 1000)});
  },

  componentWillUnmount: function () {
    clearInterval(this.state.interval);
  },

  _tick: function () {
    var current = new Date(this.state.date.getTime());
    current.setSeconds(current.getSeconds() + 1);
    this.setState({date: current});
  },

  render: function () {
    return (
      <div>
        {this.state.date.toString()}
        <br/>
        {this.state.weather}, {this.state.temp}
      </div>
    );
  }
});

React.render(
  <Clock/>,
  document.getElementById('weatherclock')
);
