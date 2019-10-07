import React from 'react';
import {Redirect, withRouter, Route} from 'react-router-dom';
import STORAGE from "./localStore";

class Public extends React.Component{

  render() {
    const {
      component: Component,
      ...props
    } = this.props;

    const { from } = { from: { pathname: '/' } };

    return (
      <Route {...props}
        render={props =>
          STORAGE.get('UserName') !== null ?
            <Redirect to={from}/>
            :
            <Component {...props} {...this.props}/>
      }
      />
    )
  }
}

export default withRouter(Public);
