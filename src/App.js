import React, { Component } from "react";
import { createClient } from "@sekhmetdev/busy-sdk";
import logo from "./logo.svg";
import "./App.css";

const client = createClient(window.parent, "http://localhost:3000");

let id = 0;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: []
    };
  }

  handleRefreshClick = () => {
    client.call(id++, "get_rooms", []).then(rooms =>
      this.setState({
        rooms
      })
    );
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <h2>Rooms</h2>
        <button onClick={this.handleRefreshClick}>Refresh</button>
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
