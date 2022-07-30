import { API_URL, API_VERSION } from "./constants";

class Api {
  /**
   * A BodyInit object or null to set request's body.
   */
  body?: BodyInit | null;
  // /**
  //  * A string indicating how the request will interact with the browser's cache to set request's cache.
  //  */
  // cache?: RequestCache;
  // /**
  //  * A string indicating whether credentials will be sent with the request always, never, or only when sent to a same-origin URL. Sets request's credentials.
  //  */
  // credentials?: RequestCredentials;
  /**
   * A Headers object, an object literal, or an array of two-item arrays to set request's headers.
   */
  headers?: HeadersInit;
  // /**
  //  * A cryptographic hash of the resource to be fetched by request. Sets request's integrity.
  //  */
  // integrity?: string;
  // /**
  //  * A boolean to set request's keepalive.
  //  */
  // keepalive?: boolean;
  /**
   * A string to set request's method.
   */
  method?: string;
  // /**
  //  * A string to indicate whether the request will use CORS, or will be restricted to same-origin URLs. Sets request's mode.
  //  */
  // mode?: RequestMode;
  props: any;

  constructor() {
    this.url = API_URL;
  }

  post: Function = async (uri: String, props: Object) => {

    this.props = props;
    const headers = {
      "Access-Control-Allow-Credentials": false,
      "Authorization": `bearer ${this.getToken()}`,
      "Accept": props.headers.accept || "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      "Api-Version": API_VERSION,
    };

    let body = { ...props.body };

    // Excluding Content type for correctly binding of data
    if (props.body instanceof FormData) {
      delete headersDefault["Content-Type"];
      body = props.body;
    } else {
      body = JSON.stringify(body);
    }

    let query = this.objectToQuerystring(props.query || {});
    if (query.length > 0) query = `?${query}`;

    const response = await fetch(`${this.url}${uri}${query}`, {
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

  getToken: Function = () => {
    const accessToken = localStorage.getItem("access_token");
    return accessToken;
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

}

export default new Api;