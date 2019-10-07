import React from 'react';
import { connect } from 'react-redux';
import { Switch, Router } from 'react-router-dom';
import { compose } from 'recompose';
import styled from 'styled-components';
import {GlobalStyle} from '../globalStyles';
import Private from '../services/private';
import Public from '../services/public';
import { history } from '../store';
import { logOut } from '../reducer/User';
import Drawer from '../components/Drawer';
import Board from './Board';
import Auth from './Authentication';

const MainContainer = styled.div`
  width: 80%;
  height: 100vh;
  margin: 0 auto;
`;

const App = ({ logOut }) => (
  <Router history={history}>
    <MainContainer>
      <GlobalStyle />
      <Drawer logOut={logOut}/>
      <Switch>
        <Private  exact path='/' component={Board} />
        <Public  exact path='/auth' component={Auth} />
      </Switch>
    </MainContainer>
  </Router>
);

export default compose(
  connect(
    state => ({

    }),
    {
      logOut
    }
  )
)(App);
