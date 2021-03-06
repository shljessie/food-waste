import React from "react";

export default class Button extends React.Component { 

  saySomething(something) {
      console.log(something);
  }

  handleClick(e) {
      this.saySomething("element clicked");
  }

  componentDidMount() {
      this.saySomething("component did mount");
  }

  render() {
      return <button onClick={this.handleClick.bind(this)} value="Click me" />;
  }
}