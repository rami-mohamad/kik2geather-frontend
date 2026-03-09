import React, { useContext } from "react";
import AlertContext from "../alert/alertContext";

const typeStyles = {
  success: "border-green-500/40 bg-green-500/10 text-green-200",
  error: "border-red-500/40 bg-red-500/10 text-red-200",
  danger: "border-red-500/40 bg-red-500/10 text-red-200",
  warning: "border-yellow-500/40 bg-yellow-500/10 text-yellow-100",
  info: "border-sky-500/40 bg-sky-500/10 text-sky-200",
};

export default function Alerts() {
  const { alerts = [], removeAlert } = useContext(AlertContext);

  if (!alerts.length) return null;

  return (
    <div className="fixed right-4 top-4 z-[9999] flex w-[min(420px,calc(100vw-32px))] flex-col gap-3">
      {alerts.map((a) => {
        const styles = typeStyles[a.type] || typeStyles.error;

        return (
          <div
            key={a.id}
            className={[
              "flex items-start justify-between gap-3",
              "rounded-2xl border px-4 py-3 shadow-lg backdrop-blur",
              styles,
            ].join(" ")}
            role="alert"
          >
            <div className="min-w-0">
              <p className="text-sm font-medium">Notification</p>
              <p className="mt-1 text-sm opacity-90 break-words">{a.message}</p>
            </div>

            {removeAlert ? (
              <button
                type="button"
                onClick={() => removeAlert(a.id)}
                className="shrink-0 rounded-lg px-2 py-1 text-sm opacity-80 hover:opacity-100 hover:bg-white/10"
                aria-label="Close alert"
              >
                ✕
              </button>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
