import { Routes, Route, Navigate } from "react-router-dom";

import AuthState from "./auth/AuthState";
import AlertState from "./alert/AlertState";

// ✅ Tailwind alerts (not reactstrap)
import Alerts from "./components/Alerts";

// Pages / screens
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import Booking from "./pages/Booking";

import BookingConfirmation from "./components/BookingConfirmation";
import Dashboard from "./components/Dashboard";

const App = () => {
  return (
    <AuthState>
      <AlertState>
        {/* show alerts globally */}
        <Alerts />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/booking/confirm" element={<BookingConfirmation />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AlertState>
    </AuthState>
  );
};

export default App;
