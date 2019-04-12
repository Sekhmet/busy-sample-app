import React, { Component } from "react";
import { createClient } from "@sekhmetdev/busy-sdk";
import logo from "./logo.svg";
import "./App.css";

const client = createClient(window.parent, ["http://localhost:3000"]);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      error: null,
      username: null
    };
  }

  componentDidMount() {
    this.login();
  }

  login = () => {
    client.call("steem/get_username").then(username =>
      this.setState({
        username
      })
    );
  };

  handleUpvoteClick = () => {
    client
      .call("steem/vote", [
        "steemguest",
        "singhalbhavna",
        "identify-and-escape-form-credit-card-debt",
        10000
      ])
      .then(console.log)
      .catch(console.error);
  };

  handleCommentClick = () => {
    client
      .call("steem/comment", [
        "",
        "test",
        "steemguest",
        "4mdrbf-test",
        "test",
        "test content",
        "{}"
      ])
      .then(console.log)
      .catch(console.error);
  };

  handleSteemTransferClick = () => {
    client
      .call("steem/transfer", ["steemguest", "sekhmet", "0.001 STEEM", "hey"])
      .then(console.log)
      .catch(console.error);
  };

  handleEthereumTransferClick = () => {
    client
      .call("eth/transfer", [
        "0x16C391f56a3372EC8Cd3E0264548745a93Abc320",
        "0.001"
      ])
      .then(console.log)
      .catch(console.error);
  };

  handleRefreshClick = () => {
    client
      .call("get_rooms", [])
      .then(rooms =>
        this.setState({
          rooms,
          error: null
        })
      )
      .catch(err => {
        this.setState({
          rooms: [],
          error: err.message
        });
      });
  };

  render() {
    const { username, error } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          {username && <h2>Logged in as: {username}</h2>}
        </header>
        <h2>Steem</h2>
        <button onClick={this.handleUpvoteClick}>Upvote</button>
        <button onClick={this.handleCommentClick}>Comment</button>
        <button onClick={this.handleSteemTransferClick}>Transfer</button>
        <h2>Ethereum (Rospen)</h2>
        <button onClick={this.handleEthereumTransferClick}>Transfer</button>
        <h2>Rooms</h2>
        {error ? <p>{error}</p> : null}
        <button onClick={this.handleRefreshClick}>
          {error ? "Retry" : "Load"}
        </button>
        <ul>
          {this.state.rooms.map(room => (
            <li key={room.id}>{room.displayName}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
