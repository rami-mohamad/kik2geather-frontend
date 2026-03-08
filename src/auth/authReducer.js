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

export default function authReducer(state, action) {
  switch (action.type) {
    case AUTH_SET_LOADING:
      return { ...state, loading: true };

    case AUTH_REGISTER_SUCCESS:
      return { ...state, loading: false, error: null };

    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user ?? null,
        token: action.payload.token ?? null,
        error: null,
      };

    case AUTH_USER_LOADED:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };

    case AUTH_REGISTER_FAIL:
    case AUTH_LOGIN_FAIL:
    case AUTH_USER_LOADED_ERROR:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: action.payload,
      };

    case AUTH_LOGOUT:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        token: null,
      };

    case AUTH_CLEAR_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
}
