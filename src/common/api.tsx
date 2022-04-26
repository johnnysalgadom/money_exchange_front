import axios from 'axios';
import {LOGOUT} from "../constants/constants";
import makeStore from '../redux/store';
import { history } from './route';
import jwtDecode, { JwtPayload } from "jwt-decode";

const defaultOptions = {
  baseURL: 'http://localhost:8090/api',
  headers: {
    'Content-Type': 'application/json',
  },
};


const instance = axios.create(defaultOptions);

instance.interceptors.request.use(config => {
  const expiration = checkTokenExpirationMiddleware();
  if (expiration > 0) {
    if (Date.now() >= expiration) {
      clearData()
    }
  }

  const accessToken = window.localStorage.getItem('accessToken');
  console.log("accessToken - locals: " + window.localStorage.getItem('accessToken'));
  config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : '';
  return config
}, error => {
  Promise.reject(error)
})

instance.interceptors.response.use((response) => {
  return response
}, async (err) => {
  const {config, response: {status}} = err;
  const originalConfig = config;
  const expiration = checkTokenExpirationMiddleware();
  if (expiration > 0) {
    if (Date.now() >= expiration) {
      clearData()
    }
  }
  
  if (status === 401 && !originalConfig._retry) {
    originalConfig._retry = true;
    const refreshToken = window.localStorage.getItem('refreshToken');
    const body = {refresh_token: refreshToken}
    const res = await instance.put('/auth/refresh-token', body)
    window.localStorage.setItem('accessToken', res.data.token)
    window.localStorage.setItem('refreshToken', res.data.token)
    axios.defaults.headers['Authorization'] = res.data.token ? `Bearer ${res.data.token}` : '';
    originalConfig.headers['Authorization'] = res.data.token ? `Bearer ${res.data.token}` : '';
    return instance(originalConfig)
  }

  return Promise.reject(err)
})

const checkTokenExpirationMiddleware = (): number => {
  const refreshToken: string = localStorage.getItem('refreshToken') || "";
  if (refreshToken !== "") {
    const decoded = jwtDecode<JwtPayload>(refreshToken);
    return ((decoded.exp || 0) * 1000) - 60000
  }
  return 0;
};

const clearData = () => {
  window.localStorage.removeItem("accessToken")
  window.localStorage.removeItem("refreshToken")
  makeStore.makeStore.dispatch({type: LOGOUT, action: undefined})
  history.push("/")
}


export default instance;