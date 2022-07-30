import {
  AUTH_CHECK,
  AUTH_CHECK_SUCCESS,
  LOGIN,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from './auth-types';

const authCheck = () => {
  return { type: AUTH_CHECK }
}

const authCheckSuccess = (access_token) => {
  return { type: AUTH_CHECK_SUCCESS, payload: {access_token} }
}

const loginRequest = () => {
  return { type: LOGIN_REQUEST }
}

const loginSuccess = (user, access_token) => {
  return { type: LOGIN_SUCCESS, payload: {user, access_token} }
}

// const checkAuth = () => {
//
//   return dispatch => {
//     let data = JSON.parse(localStorage.getItem('porabote_user'));
//     if (data !== null && typeof data.id !== "undefined") {
//       dispatch(loginSuccess(data));
//     } else {
//       dispatch(loginFailure());
//     }
//   }
//
//   function loginFailure() { return { type: LOGIN_FAILURE } }
// }

const logout = () => {
    return dispatch => {
        localStorage.removeItem('access_token')
        dispatch({ type: LOGOUT })
    }
}


// const refreshToken = () => {
//     let currUser = JSON.parse(localStorage.getItem("userData"));
//     let getUserFormData = new FormData();
//     getUserFormData.append("grant_type", "refresh_token");
//     getUserFormData.append("refresh_token", currUser.refresh_token);
//     return new Promise((resolve, reject) => {
// //         API
// //             .post(`${URL}/token/url/`, getUserFormData, {
// //                 headers: {
// //                     Authorization: "Basic {secret_key}"
// //                 }
// //             })
// //             .then(async response => {
// //                 resolve(response);
// //             })
// //             .catch(error => {
// //                 reject(error);
// //             });
//     });
// };


export {
  authCheck,
  authCheckSuccess,
  loginRequest,
  loginSuccess,
	logout,
	//refreshToken
	}