import React, { Component } from "react";

class Card extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <img src={this.props.srcImg} alt={this.props.altText} />
      </div>
    );
  }
}

export default Card;
