import React, { Component } from 'react';
import logo from './logo.svg';
import styles from './App.css';

import Router from 'react-router/BrowserRouter'

import IPAddress from './IPAddress'
import AsyncApp from './AsyncApp'

class App extends Component {
  render() {
    return (
      <Router>
        <div className={styles.App}>
          <div className={styles.App_header}>
            <img src={logo} className={styles.App_logo} alt="logo"/>
            <h2>Welcome to React</h2>
          </div>
          <p className={styles.App_intro}>
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
          <IPAddress />
          <AsyncApp />
        </div>
      </Router>
    );
  }
}

export default App;
