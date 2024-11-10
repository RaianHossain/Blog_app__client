import axios from 'axios';
import { useEffect } from "react";
import { api } from "../api";
import useAuth from "./useAuth";
import { useNavigate, useLocation } from "react-router-dom";

const useAxios = () => {
  const { auth, setAuth, setAuthStorage } = useAuth();
  const navigate = useNavigate()
  const location = useLocation();

  useEffect(() => {
    // Add a request interceptor
    const requestIntercept = api.interceptors.request.use(
      (config) => {
        const authToken = auth?.authToken;
        if (authToken) {
          config.headers.Authorization = `Bearer ${authToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add a response interceptor
    const responseIntercept = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        // If the error status is 401 and there is no originalRequest._retry flag,
        // it means the token has expired and we need to refresh it
        // console.log(error);
        if (error?.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refToken = auth?.refreshToken;
            const response = await axios.post(
              `${import.meta.env.VITE_SERVER_BASE_URL}/auth/refresh-token`,
              { refreshToken: refToken }
            );
            const { accessToken, refreshToken } = response.data;
            // console.log(response.data)
            console.log(`New Token: ${accessToken}`);
            setAuth({...auth, accessToken: accessToken, refreshToken: refreshToken})

            // Retry the original request with the new token
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return axios(originalRequest);
          } catch (error) {
            throw error;
          }
        }
        
        if (error.response?.status === 403 && !originalRequest._retry) {
            originalRequest._retry = false;
            setAuth({});
            setAuthStorage("");
            const wantToLogin = confirm('Session Expired. Login Again?');
            if(wantToLogin) {
              console.log(location.pathname)
              navigate('/login', {state: {from: location.pathname} });                
            }  
        }

        return Promise.reject(error);
      }
    );
    return () => {
      api.interceptors.request.eject(requestIntercept);
      api.interceptors.response.eject(responseIntercept);
    }
  }, [auth.authToken]);

  return {api};
};

export default useAxios;