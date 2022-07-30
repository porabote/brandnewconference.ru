import { API_URL, API_VERSION } from "./constants";

class Api {

  post = async (uri, params) => {
    const url = (typeof params.url !== "undefined") ? params.url : API_URL;

    const headersDefault = {
      "Access-Control-Allow-Credentials": false,
      Authorization: `bearer ${this.getToken()}`,
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      "Api-Version": API_VERSION,
    };

    let body = { ...params.body };

    // Excluding Content type for correctly binding of data
    if (params.body instanceof FormData) {
      delete headersDefault["Content-Type"];
      body = params.body;
    } else {
      body = JSON.stringify(body);
    }

    const headers = Object.assign(headersDefault, params.headers);

    const response = await fetch(`${url}${uri}`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "omit",
      headers,
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body,
    });

    const responseJSON = await response.json();
    return { ...responseJSON, ...{ response: { status: response.status } } };
  }

  get = async (uri, params = {}) => {
    let queryUri = uri;

    const url = (typeof params.url !== "undefined") ? params.url : API_URL;

    if (typeof params.query !== "undefined") {
      const query = this.objectToQuerystring(params.query);
      queryUri = `${queryUri}?${query}`;
    }

    const response = await fetch(`${url}${queryUri}`, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "omit",
      headers: {
        "Access-Control-Allow-Credentials": false,
        Authorization: `bearer ${this.getToken()}`,
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        "Api-Version": 2,
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    });

    const responseJSON = await response.json();
    return { ...responseJSON, ...{ response: { status: response.status } } };
  }

  /**
   * Parsing Object to URI
   */
  objectToQuerystring = (obj, prefix) => {
    const str = [];
    Object.keys(obj).map((key) => {
      const k = prefix ? `${prefix}[${key}]` : key;
      const v = obj[key];
      str.push((v !== null && typeof v === "object")
        ? this.objectToQuerystring(v, k)
        : `${encodeURIComponent(k)}=${encodeURIComponent(v)}`);
      return k;
    });

    return str.join("&");
  }

  /**
   * Parsing URI to Object
   */
  queryStringToObject = (uri) => {
    let uriArray = uri.replace(/^\?*/, "");
    if (uriArray.length === 0) return {};

    uriArray = uriArray.split("&");

    const uriObj = {};
    for (let i = 0; i < uriArray.length; i += 1) {
      const chainArray = uriArray[i].split("=");
      uriObj[chainArray[0]] = { ...chainArray[1] };
    }

    return uriObj;
  }

  getToken = () => {
    let accessToken = localStorage.getItem("access_token");
    if (typeof accessToken === "object") {
      accessToken = "";
    }
    return accessToken;
  }
  
}

export default new Api();
