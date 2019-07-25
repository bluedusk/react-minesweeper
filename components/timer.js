import React from "react";
import "../style.css";

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0
    };
  }

  componentDidUpdate(prevProps, prevState) {
    // restart game
    if (this.props.gameStatus === 0 && !this.timer) {
      this.start();
    } else if (this.props.gameStatus !== prevProps.gameStatus) {
      clearInterval(this.timer);
      this.start();
    }
    if (this.props.gameStatus === -1) {
      clearInterval(this.timer);
    }
    // game fail
  }

  // getSnapshotBeforeUpdate(prevProps, prevState) {}

  start = () => {
    this.setState({ time: 0 });
    var startTime = Date.now();
    this.timer = setInterval(() => {
      var elapsedTime = Date.now() - startTime;
      this.setState({ time: (elapsedTime / 1000).toFixed(1) });
    }, 100);
  };

  stop = () => {};

  render() {
    return (
      <div className="timer">
        <h1>{this.state.time}</h1>
      </div>
    );
  }
}

export default Timer;
