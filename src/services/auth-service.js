import { API_URL } from "./constants";

class AuthService {
  post = async (uri, params) => {
    const url = (typeof params.url !== "undefined") ? params.url : API_URL;
    const response = await fetch(`${url}${uri}`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "omit",
      headers: {
        "Access-Control-Allow-Credentials": false,
        Authorization: "Basic",
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        "Api-Version": 2,
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(params.body),
    });
    const responseJSON = await response.json();
    return { ...responseJSON, ...{ response: { status: response.status } } };
  }

  getToken = () => {
    const accessToken = localStorage.getItem("access_token");
    return accessToken;
  }
}

export default new AuthService();
