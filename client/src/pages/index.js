import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { GlobalStyle } from '../globalStyles';
import Drawer from '../components/Drawer';
import Board from './Board';
import Auth from './Authentication';

const MainContainer = styled.div`
  width: 80%;
  height: 100vh;
  margin: 0 auto;
`;

const App = () => (
  <MainContainer>
    <GlobalStyle />
    <Drawer />
    <Switch>
      <Route exact path='/' component={Board} />
      <Route exact path='/auth' component={Auth} />
    </Switch>
  </MainContainer>
);

export default App;
