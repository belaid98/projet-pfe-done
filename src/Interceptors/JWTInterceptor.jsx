import axios from "axios";
import Cookies from "js-cookie";

export function jwtInterceptor() {
  axios.interceptors.request.use((request) => {
    // add auth header with jwt if user is logged in and request is sent to the api url
    const isApiUrl = request.url.startsWith(process.env.REACT_APP_API_URL);

    console.log("Interceptor: ", request.headers.common.Authorization);
    let t = Cookies.get("token");
    if (t && isApiUrl) {
      request.headers.common.Authorization = t;
    }
    console.log("Request After: ", request.headers);
    return request;
  });
  return axios.interceptors.request.eject(jwtInterceptor);
}
