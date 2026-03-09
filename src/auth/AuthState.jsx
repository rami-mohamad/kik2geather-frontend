import React, { useReducer, useCallback } from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import { api } from "../lib/api";
import {
  AUTH_REGISTER_SUCCESS,
  AUTH_REGISTER_FAIL,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAIL,
  AUTH_LOGOUT,
  AUTH_CLEAR_ERROR,
  AUTH_SET_LOADING,
  AUTH_USER_LOADED,
  AUTH_USER_LOADED_ERROR,
} from "./authTypes";

function getErrorMessage(err) {
  const msg =
    err?.response?.data?.message ||
    err?.response?.data?.error ||
    err?.message ||
    "Something went wrong";

  return Array.isArray(msg) ? msg.join(", ") : String(msg);
}

const AuthState = ({ children }) => {
  const initialState = {
    isAuthenticated: false,
    loading: false,
    user: null,
    error: null,
    token: null,
    authChecking: true,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const clearError = useCallback(() => {
    dispatch({ type: AUTH_CLEAR_ERROR });
  }, []);

  const register = useCallback(async (formData) => {
    dispatch({ type: AUTH_SET_LOADING });
    try {
      await api.post("/user/register", formData);
      dispatch({ type: AUTH_REGISTER_SUCCESS });
      return true;
    } catch (err) {
      dispatch({ type: AUTH_REGISTER_FAIL, payload: getErrorMessage(err) });
      return false;
    }
  }, []);

  const login = useCallback(async (formData) => {
    dispatch({ type: AUTH_SET_LOADING });
    try {
      const { data } = await api.post("/user/login", formData);

      if (data?.token)
        localStorage.setItem("token", JSON.stringify(data.token));

      dispatch({ type: AUTH_LOGIN_SUCCESS, payload: data });
      return true;
    } catch (err) {
      dispatch({ type: AUTH_LOGIN_FAIL, payload: getErrorMessage(err) });
      return false;
    }
  }, []);

  const loadUser = useCallback(async () => {
    dispatch({ type: AUTH_SET_LOADING });
    try {
      const { data } = await api.get("/booking/dashboard");

      dispatch({ type: AUTH_USER_LOADED, payload: data });

      return data;
    } catch (err) {
      console.log("loadUser error:", err);
      dispatch({ type: AUTH_USER_LOADED_ERROR, payload: getErrorMessage(err) });
      return null;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";
      await api.post(`${baseUrl}/user/logout`, {}, { withCredentials: true });
      dispatch({ type: AUTH_LOGOUT });
    } catch (error) {
      console.log("logout error:", error);
    }
  }, []);

  const checkAuthOnLoad = useCallback(async () => {
    try {
      const { data } = await api.get("/user/me", { withCredentials: true });
      dispatch({ type: AUTH_USER_LOADED, payload: data });
    } catch (error) {
      console.log(error);

      dispatch({ type: AUTH_USER_LOADED_ERROR });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        token: state.token,

        register,
        login,
        loadUser,
        logout,
        clearError,
        checkAuthOnLoad,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
