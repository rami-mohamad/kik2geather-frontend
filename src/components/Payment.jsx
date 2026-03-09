import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Bg from "../assets/Media/Images/Payment/PaymentBg.png";
import Step3Img from "../assets/Media/Images/Payment/step 3.png";
import AttentionImg from "../assets/Media/Images/Payment/Attention.png";

import KlarnaImg from "../assets/Media/Images/Payment/klarna-sofort-alt 1.png";
import PaypalImg from "../assets/Media/Images/Payment/paypal.png";
import ApplePayImg from "../assets/Media/Images/Payment/applepay 1.png";
import GooglePayImg from "../assets/Media/Images/Payment/googlepay 1.png";
import VisaImg from "../assets/Media/Images/Payment/visa-electron 1.png";
import MastercardImg from "../assets/Media/Images/Payment/mastercard 1.png";
import PaydirektImg from "../assets/Media/Images/Payment/paydirekt 1.png";
import { api } from "../lib/api";

export default function Payment({ booking, setEmail }) {
  const [method, setMethod] = useState("Paypal");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const normalized = useMemo(() => {
    const hours = Number(booking?.hoursQuantity ?? 1);
    const persons = Number(booking?.numberOfPersons ?? booking?.users ?? 1);

    const shoesQty = Array.isArray(booking?.shoes) ? booking.shoes.length : 0;
    const tshirtQty = Array.isArray(booking?.tshirt)
      ? booking.tshirt.length
      : 0;
    const towelsQty = Number(booking?.towels ?? 0);

    const base = hours * persons * 5;
    const addons = (shoesQty + tshirtQty + towelsQty) * 5;
    const total = base + addons;

    return {
      hours,
      persons,
      shoesQty,
      tshirtQty,
      towelsQty,
      base,
      addons,
      total,
      field: booking?.field,
      shoesSize: shoesQty ? booking?.shoes?.[0] : null,
      tshirtSize: tshirtQty ? booking?.tshirt?.[0] : null,
    };
  }, [booking]);

  const finishBook = async () => {
    setErrorMsg("");
    setIsSubmitting(true);

    try {
      const res = await api.post("/booking/book", booking);

      if (res?.data?.needsAuth || res?.data?.status === "NEEDS_AUTH") {
        navigate("/registration");
        return;
      }

      const success = res?.data?.success === true;

      if (!success) {
        throw new Error(res?.data?.message || "Booking failed");
      }

      if (res?.data?.email) setEmail(res.data.email);

      if (res?.data?.emailSent === false) {
        setErrorMsg(
          "Booking succeeded, but confirmation email could not be sent.",
        );
      } else {
        setErrorMsg("");
      }

      navigate("/dashboard");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong. Please try again.";

      setErrorMsg(msg);

      if (err?.response?.status === 401) {
        navigate("/registration");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const paymentOptions = [
    {
      key: "Rechnung",
      label: "Rechnung",
      right: <img className="h-9" src={KlarnaImg} alt="Klarna" />,
    },
    {
      key: "Paypal",
      label: "Paypal",
      right: <img className="h-9" src={PaypalImg} alt="PayPal" />,
    },
    {
      key: "Kreditkarte",
      label: "Kreditkarte",
      right: (
        <div className="flex items-center gap-2">
          <img className="h-8" src={ApplePayImg} alt="Apple Pay" />
          <img className="h-8" src={GooglePayImg} alt="Google Pay" />
          <img className="h-8" src={VisaImg} alt="Visa" />
          <img className="h-8" src={MastercardImg} alt="Mastercard" />
        </div>
      ),
    },
    {
      key: "Lastschrift",
      label: "Lastschrift",
      right: <img className="h-9" src={PaydirektImg} alt="Paydirekt" />,
    },
  ];

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat pb-16"
      style={{ backgroundImage: `url(${Bg})` }}
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-8">
        <div className="flex justify-center">
          <img
            src={Step3Img}
            alt="Progress step 3"
            className="w-full max-w-[900px]"
          />
        </div>

        <h3 className="mt-10 text-center text-xl font-semibold tracking-wide text-black md:text-3xl">
          Dear <span className="text-fuchsia-600">User_Name</span>, please check
          your details again.
        </h3>

        <div className="mx-auto mt-6 flex max-w-3xl items-center justify-center gap-4 rounded-xl bg-red-500/10 px-4 py-3 text-center text-sm font-medium text-red-600 md:text-lg">
          <img src={AttentionImg} alt="Attention" className="h-7 w-7" />
          <div>Please complete your payment details.</div>
        </div>

        <div className="mx-auto mt-8 max-w-3xl overflow-hidden rounded-2xl border border-black/10 shadow-lg">
          <div className="bg-[#eac66f] py-3 text-center text-base font-semibold md:text-lg">
            PAYMENT METHOD
          </div>

          <div className="bg-[#dcdbdb]">
            {paymentOptions.map((opt) => {
              const active = method === opt.key;

              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setMethod(opt.key)}
                  className="flex w-full items-center justify-between border-t border-black/10 px-4 py-4 text-left hover:bg-black/5"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#858585]">
                      {active ? (
                        <div className="h-4 w-4 rounded-full bg-black blur-[2px]" />
                      ) : null}
                    </div>
                    <div className="text-base font-semibold text-black">
                      {opt.label}
                    </div>
                  </div>
                  <div className="shrink-0">{opt.right}</div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-5xl">
          <div className="border-b-4 border-black pb-2 text-2xl font-semibold text-black md:text-3xl">
            Your Payment Chart
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-black/10 bg-white/70 shadow-lg backdrop-blur">
            <div className="grid grid-cols-4 gap-2 border-b border-black/10 px-4 py-3 text-sm font-semibold text-black/70 md:text-base">
              <div>Item</div>
              <div className="text-right">Details</div>
              <div className="text-right">Size</div>
              <div className="text-right">Price</div>
            </div>

            <RowLine
              item="Booked Field"
              details={`Field: ${normalized.field ?? "-"}`}
              size="—"
              price={`${normalized.base} €`}
            />

            {normalized.shoesQty > 0 && (
              <RowLine
                item="Shoes"
                details={`Quantity: ${normalized.shoesQty}`}
                size={`Size: ${normalized.shoesSize}`}
                price={`${normalized.shoesQty * 5} €`}
              />
            )}

            {normalized.tshirtQty > 0 && (
              <RowLine
                item="T-Shirt"
                details={`Quantity: ${normalized.tshirtQty}`}
                size={`Size: ${normalized.tshirtSize}`}
                price={`${normalized.tshirtQty * 5} €`}
              />
            )}

            {normalized.towelsQty > 0 && (
              <RowLine
                item="Towels"
                details={`Quantity: ${normalized.towelsQty}`}
                size="Size: M"
                price={`${normalized.towelsQty * 5} €`}
              />
            )}

            <div className="flex flex-col gap-3 px-4 py-5 md:flex-row md:items-center md:justify-between">
              <div className="text-sm font-semibold text-black/70">Total</div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={finishBook}
                  disabled={isSubmitting}
                  className={[
                    "relative flex h-14 w-56 items-center justify-center rounded-full px-6 text-base font-bold text-black shadow-md transition",
                    "bg-[linear-gradient(180deg,#eac66f_0%,rgba(255,255,255,0)_100%),linear-gradient(180deg,#858585_0%,#ffeaa7_100%)]",
                    isSubmitting
                      ? "opacity-70 cursor-not-allowed"
                      : "hover:scale-[1.02]",
                  ].join(" ")}
                >
                  <span className={isSubmitting ? "opacity-0" : "opacity-100"}>
                    Confirm Payment
                  </span>

                  {isSubmitting && (
                    <div className="absolute flex items-center justify-center">
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent"></div>
                    </div>
                  )}
                </button>

                <div className="flex h-14 w-36 items-center justify-center rounded-full bg-white text-xl font-extrabold text-black shadow">
                  {normalized.total} €
                </div>
              </div>
            </div>

            {errorMsg ? (
              <div className="px-4 pb-4 text-sm font-medium text-red-600">
                {errorMsg}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function RowLine({ item, details, size, price }) {
  return (
    <div className="grid grid-cols-4 gap-2 px-4 py-3 text-sm text-black md:text-base">
      <div className="font-semibold">{item}</div>
      <div className="text-right text-black/80">{details}</div>
      <div className="text-right text-black/60">{size}</div>
      <div className="text-right font-semibold">{price}</div>
    </div>
  );
}
