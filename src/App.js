import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './components/home';
import Login from './components/login';


class App extends Component {
  state = {}

  render() {
    return (

      <div className="App">
        <main>

          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/" component={Home} />
          </Switch>
        </main>
      </div>
    );
  }

}

export default App;

