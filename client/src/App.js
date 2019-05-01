import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import login from './components/login/login';
import dashboard from './components/dashboard/dashboard';
import register from './components/register/register';
import home from './components/home/home';
import './App.scss';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authentication';
import { SnackbarProvider } from 'notistack';



if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser());
  }
}




const pagenotfound = ({ location }) => (
  <div>
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
)

export default class App extends Component {
	

  render() {
    return (
	<Provider store = { store }>
      <SnackbarProvider maxSnack={3}>
          <div className="App">
              <Router>
                <div id="content">
                  <Switch>
                      <Route path='/' exact component={home} />
                      <Route path='/dashboard' component={dashboard} />
                      <Route path="/login" component={ login }/>
                      <Route path="/register" component={ register } />
                      <Route component={pagenotfound}/>
                  </Switch>
                </div>
              </Router>
          </div>
      </SnackbarProvider>
	</Provider>  
    );   


  }
}



