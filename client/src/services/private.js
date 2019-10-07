import React from 'react';
import { Redirect, withRouter, Route } from 'react-router-dom';
import STORAGE from "./localStore";

class Private extends React.Component {
  render() {
    const {
      component: Component,
      ...props
    } = this.props;

    const {from} = {from: {pathname: '/auth'}};

    return (
      <Route {...props}
             render={() =>
               STORAGE.get('UserName') !== null ?
                 <Component {...props}/>
                 :
                 <Redirect to={from}/>
             }
      />
    )
  }
}

export default withRouter(Private);
