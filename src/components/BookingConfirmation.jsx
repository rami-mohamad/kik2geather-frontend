import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import CheckIcon from "../assets/Media/Images/PaymentConfirmation/checkmark-circle 1.png";

export default function BookingConfirmation({ email }) {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => {
      navigate("/dashboard", { replace: true });
    }, 3000);

    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#e0dfdf]">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-4 py-14 text-center">
        <h2 className="text-2xl font-semibold text-black sm:text-3xl">
          Thanks for your booking!
        </h2>

        <div className="mt-8">
          <img
            src={CheckIcon}
            alt="Booking confirmed"
            className="h-[220px] w-[220px] sm:h-[280px] sm:w-[280px]"
          />
        </div>

        <p className="mt-8 text-base text-black/80 sm:text-lg">
          You will receive a confirmation email in a few minutes at the
          following address:
        </p>

        <p className="mt-2 text-base font-semibold text-black sm:text-lg">
          {email}
        </p>

        <p className="mt-10 text-sm text-black/60">Redirecting to dashboard…</p>
      </div>
    </div>
  );
}
