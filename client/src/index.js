import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import store from './store';
import 'typeface-roboto';
import App from './pages';

const theme = createMuiTheme({
  palette: {
    primary: {
      main:'#0398fc'
    },
    secondary: {
      main: '#ed1000'
    }
  },
  typography: {
    useNextVariants: true,
  }
});

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>
,
  document.getElementById('root')
);

