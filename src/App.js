import React, { Component } from 'react';
import logo from './logo.svg';
import styles from './App.css';

// import Router from 'react-router/BrowserRouter'
import Router from 'react-router/HashRouter'

import IPAddress from './IPAddress'
import AsyncApp from './AsyncApp'
import AnimateApp from './animate'

class App extends Component {
  componentDidUpdate(prevProps, prevState) {
    console.log('update')
  }

  render() {
    return (
      <Router>
        <div className={styles.App}>
          <IPAddress />
          <AsyncApp />
          <AnimateApp />
        </div>
      </Router>
    );
  }
}

export default App;
