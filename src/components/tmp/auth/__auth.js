import React from 'react'
import { connect } from 'react-redux';
import { checkAuth } from './store/auth-actions';

class Auth extends React.Component {

  constructor(props) {
    super(props);

    this.props.checkAuth();
  }


  parseJwt = token => {
    var base64Url = token.split('.')[1];

    if(base64Url === undefined) return null;

    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };

  render() {
    return this.props.children;
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    checkAuth: () => {
      dispatch(checkAuth());
    },
  }
}

export default connect(null, mapDispatchToProps)(Auth);