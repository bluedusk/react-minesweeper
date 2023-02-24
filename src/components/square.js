import React from "react";
import "./square.css";

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayValue: "",
    };
  }
  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   // console.log("componentDidUpdate");
  //   // console.log(this.props === prevProps);
  //   if (this.props !== prevProps) {
  //     this.setState({ displayValue: this.props.displayValue });
  //   }
  // }

  click(e) {
    if (this.props.gameStatus === -1) {
      return;
    }
    // console.log(e.target);
    let [x, y] = e.target.attributes.getNamedItem("data-index").value.split(",");
    if (e.type === "click") {
      // let value = e.target.attributes.getNamedItem("data-value").value;
      this.props.onClick(x / 1, y / 1, "left");
    } else if (e.type === "contextmenu") {
      e.preventDefault();
      this.props.onClick(x / 1, y / 1, "right");
    }
  }

  display() {
    switch (this.props.displayValue) {
      case -1:
        return "*";
      case 9:
        return "♥️";
      default:
        return this.props.displayValue;
    }
  }

  toogleStyle() {
    switch (this.props.gameStatus) {
      case -1:
        return `square lose`;
      case 1:
        return "square win";
      default:
        return "square";
    }
  }
  render() {
    return (
      <div
        className={" visited"}
        data-value={this.props.value}
        // style={styles}
        data-index={this.props.index}
        onClick={(e) => this.click(e)}
        onContextMenu={(e) => this.click(e)}
      >
        {this.display()}
      </div>
    );
  }
}

export default Square;
