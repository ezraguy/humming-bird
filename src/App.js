import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './components/home';
import Login from './components/sign-in';
import userService from './services/userService'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/common/protected-route'
import Navbar from './components/navbar';
import SignUp from './components/sign-up';
import Logout from './components/logout';
import AddPost from './components/add-post';
import myposts from './components/my-posts';
import editPost from './components/edit-post'
import MyFavorites from './components/my-favorites';
class App extends Component {
  state = {}
  componentDidMount = () => {
    const user = userService.getCurrentUser();
    this.setState({ user })
  }
  render() {
    const { user } = this.state

    return (
      <React.Fragment>
        <header>
          <ToastContainer />
          <Navbar user={user} />
        </header>
        <main>
          <Switch>
            <ProtectedRoute path='/my-posts/edit/:id' component={editPost} />

            <Route path="/login" component={Login} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/user/logout" component={Logout} />
            <ProtectedRoute path='/add-post' component={AddPost} />
            <ProtectedRoute path='/my-posts' component={myposts} />
            <ProtectedRoute path='/my-favorites' component={MyFavorites} />
            <ProtectedRoute path='/' component={Home} />
          </Switch>
        </main>
      </React.Fragment >
    );
  }

}

export default App;

