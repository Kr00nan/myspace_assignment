import React from 'react';
import Home from './components/Home';
import NoMatch from './components/NoMatch';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import FetchUser from './components/FetchUser';
import ProtectedRoute from './components/ProtectedRoute';
import MyFriends from './components/MyFriends';
import { Switch, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import ViewBlog from './components/ViewBlog';

const App = () => {
  return (
    <div>
      <>
        <Navbar />
        <FetchUser>
          <Container>
            <Switch>
              <ProtectedRoute exact path='/' component={Home} />
              <ProtectedRoute exact path='/my_friends' component={MyFriends} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
              <ProtectedRoute exact path='/users/:user_id/blogs/:id(' component={ViewBlog} />
              <Route component={NoMatch} />
            </Switch>
          </Container>
        </FetchUser>
      </>
    </div>
  );
};

export default App;