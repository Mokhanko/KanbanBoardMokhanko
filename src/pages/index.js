import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { GlobalStyle } from '../globalStyles';
import Drawer from '../components/Drawer';
import BoardContainer from './Board';

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
      <Route exact path='/' component={BoardContainer} />
    </Switch>
  </MainContainer>
);

export default App;
