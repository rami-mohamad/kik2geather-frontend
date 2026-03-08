import React, { useMemo, useState } from "react";
import NavbarHistory from "../components/NavbarHistory";

import Fields from "../components/Fields";
import FieldsMobile from "../components/FieldsMobile";
import Additional from "../components/Additional";
import Payment from "../components/Payment";
import BookingConfirmation from "../components/BookingConfirmation";

function useIsMobile(breakpointPx = 800) {
  const query = `(max-width: ${breakpointPx}px)`;

  const get = () =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false;

  const [isMobile, setIsMobile] = useState(get);

  React.useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e) => setIsMobile(e.matches);

    // set initial (in case)
    setIsMobile(mql.matches);

    // modern + fallback
    if (mql.addEventListener) mql.addEventListener("change", handler);
    else mql.addListener(handler);

    return () => {
      if (mql.removeEventListener) mql.removeEventListener("change", handler);
      else mql.removeListener(handler);
    };
  }, [query]);

  return isMobile;
}

export default function Booking() {
  const isMobile = useIsMobile(800);

  // step: "fields" -> "additional" -> "payment" -> "confirm"
  const [step, setStep] = useState("fields");

  // keep booking object (better than boolean)
  const [booking, setBooking] = useState(null);

  // email should be string or null
  const [email, setEmail] = useState(null);

  const content = useMemo(() => {
    if (step === "confirm" && email) {
      return <BookingConfirmation email={email} />;
    }

    if (step === "fields") {
      return isMobile ? (
        <FieldsMobile
          booking={booking}
          setBooking={(b) => {
            setBooking(b);
            setStep("additional"); // move forward when booking selected
          }}
        />
      ) : (
        <Fields
          booking={booking}
          setBooking={(b) => {
            setBooking(b);
            setStep("additional");
          }}
        />
      );
    }

    if (step === "additional") {
      return (
        <Additional
          booking={booking}
          setBooking={setBooking}
          setShowPayment={() => setStep("payment")}
        />
      );
    }

    if (step === "payment") {
      return (
        <Payment
          booking={booking}
          setEmail={(val) => {
            setEmail(val);
            setStep("confirm");
          }}
        />
      );
    }

    return null;
  }, [step, email, isMobile, booking]);

  return (
    <div className="min-h-screen bg-[#0c0c0c]">
      <NavbarHistory />
      <div className="mx-auto w-full max-w-6xl px-4 py-6">{content}</div>
    </div>
  );
}
