import React, { useReducer, useCallback, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import AlertContext from "./alertContext";
import alertReducer from "./alertReducer";
import { ALERT_ADD, ALERT_REMOVE, ALERT_CLEAR } from "./alertTypes";

const AlertState = ({ children }) => {
  const [state, dispatch] = useReducer(alertReducer, []);

  const removeAlert = useCallback((id) => {
    dispatch({ type: ALERT_REMOVE, payload: id });
  }, []);

  const clearAlerts = useCallback(() => {
    dispatch({ type: ALERT_CLEAR });
  }, []);

  /**
   * type examples: "success" | "error" | "warning" | "info"
   * timeout in ms (default 2500)
   */
  const addAlert = useCallback(
    (message, type = "error", timeout = 2500) => {
      const id = uuidv4();

      dispatch({
        type: ALERT_ADD,
        payload: { id, message, type },
      });

      if (timeout && timeout > 0) {
        setTimeout(() => removeAlert(id), timeout);
      }

      return id; // useful if you want manual remove
    },
    [removeAlert],
  );

  const value = useMemo(
    () => ({
      alerts: state,
      addAlert,
      removeAlert,
      clearAlerts,
    }),
    [state, addAlert, removeAlert, clearAlerts],
  );

  return (
    <AlertContext.Provider value={value}>{children}</AlertContext.Provider>
  );
};

export default AlertState;
