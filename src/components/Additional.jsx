import React, { useMemo, useState } from "react";

import Bg from "../assets/Media/Images/Additional/AdditionalBg.png"; // adjust
import ItemsImg from "../assets/Media/Images/Additional/items.png"; // adjust
import Step2Img from "../assets/Media/Images/Additional/step 2.png"; // adjust

function pad2(n) {
  return String(n).padStart(2, "0");
}

function repeatValue(qty, value) {
  const n = Number(qty) || 0;
  if (n <= 0) return [];
  return Array.from({ length: n }, () => value);
}

export default function Additional({ booking, setBooking, setShowPayment }) {
  console.log(booking);

  // normalize booking numbers
  const users = Number(booking?.users ?? 1);
  const field = Number(booking?.field ?? 1);
  const startHour = Number(booking?.startHour ?? 14);
  const hoursQuantity = Number(booking?.hoursQuantity ?? 1);
  const date = booking?.date ?? "";

  // state
  const [shoesQty, setShoesQty] = useState(0);
  const [shirtsQty, setShirtsQty] = useState(0);
  const [towelsQty, setTowelsQty] = useState(0);

  const [shoeSize, setShoeSize] = useState(40);
  const [shirtSize, setShirtSize] = useState("M");

  const shoesSizes = [36, 37, 38, 39, 40, 41, 42, 43, 44];
  const shirtSizes = ["S", "M", "L", "XL", "XXL"];

  const baseTotal = useMemo(() => {
    // your rule: 5€ per person per hour
    return users * hoursQuantity * 5;
  }, [users, hoursQuantity]);

  const addonsTotal = useMemo(() => {
    // you used 5€ each item
    return (shoesQty + shirtsQty + towelsQty) * 5;
  }, [shoesQty, shirtsQty, towelsQty]);

  const grandTotal = baseTotal + addonsTotal;

  const preparedBooking = useMemo(() => {
    const startTime = `${date}T${pad2(startHour)}:00`;
    const endTime = `${date}T${pad2(startHour + hoursQuantity)}:00`;

    return {
      field,
      startTime,
      endTime,
      numberOfPersons: users,
      hoursQuantity,
      tshirt: repeatValue(shirtsQty, String(shirtSize)),
      shoes: repeatValue(shoesQty, Number(shoeSize)),
      towels: Number(towelsQty),
    };
  }, [
    date,
    startHour,
    hoursQuantity,
    field,
    users,
    shirtsQty,
    shirtSize,
    shoesQty,
    shoeSize,
    towelsQty,
  ]);

  const clampInc = (setter) => setter((v) => Math.min(10, v + 1));
  const clampDec = (setter) => setter((v) => Math.max(0, v - 1));

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat pb-16"
      style={{ backgroundImage: `url(${Bg})` }}
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-8">
        {/* progress */}
        <div className="flex justify-center">
          <img
            src={Step2Img}
            alt="Progress step 2"
            className="w-full max-w-[900px]"
          />
        </div>

        {/* headings */}
        <div className="mt-10 text-center">
          <h2 className="text-2xl font-semibold tracking-wide text-black md:text-4xl">
            You forgot about your shoes? No problem!
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-sm font-medium tracking-wide text-black/80 md:text-lg">
            We offer the option to rent shoes or buy t-shirts, towels, etc.
          </p>
        </div>

        {/* summary card */}
        <div className="mt-10 rounded-2xl bg-[#eac66f] p-4 shadow-lg">
          <div className="grid grid-cols-4 gap-2 text-center text-xs font-semibold uppercase text-black md:text-sm">
            <div className="rounded-lg border border-white/60 bg-white/10 py-3">
              User
            </div>
            <div className="rounded-lg border border-white/60 bg-white/10 py-3">
              Field
            </div>
            <div className="rounded-lg border border-white/60 bg-white/10 py-3">
              Date & Time
            </div>
            <div className="rounded-lg border border-white/60 bg-white/10 py-3">
              Total
            </div>

            <div className="rounded-lg border border-white/60 bg-white/5 py-3">
              {users === 1 ? "USER_NAME" : `USER_NAME + ${users - 1}`}
            </div>
            <div className="rounded-lg border border-white/60 bg-white/5 py-3">
              {field}
            </div>
            <div className="rounded-lg border border-white/60 bg-white/5 py-3">
              {date} at {pad2(startHour)}:00
            </div>
            <div className="rounded-lg border border-white/60 bg-white/5 py-3">
              {baseTotal} €
            </div>
          </div>
        </div>

        {/* main content */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* left image */}
          <div className="lg:col-span-4">
            <div
              className="mx-auto aspect-[309/500] w-full max-w-[340px] bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${ItemsImg})` }}
            />
          </div>

          {/* addons table */}
          <div className="lg:col-span-4">
            <div className="rounded-2xl bg-[#eac66f] p-4 shadow-lg">
              <div className="grid grid-cols-3 text-center text-sm font-semibold uppercase">
                <div className="rounded-lg border border-white/70 bg-white/10 py-3">
                  Qty
                </div>
                <div className="rounded-lg border border-white/70 bg-white/10 py-3">
                  Size
                </div>
                <div className="rounded-lg border border-white/70 bg-white/10 py-3">
                  Price
                </div>
              </div>

              {/* row component */}
              <AddonRow
                label="Shoes"
                qty={shoesQty}
                onInc={() => clampInc(setShoesQty)}
                onDec={() => clampDec(setShoesQty)}
                sizeNode={
                  <select
                    value={shoeSize}
                    onChange={(e) => setShoeSize(Number(e.target.value))}
                    className="w-full rounded-xl border border-white/70 bg-white/20 px-3 py-2 text-center outline-none"
                  >
                    {shoesSizes.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                }
                price="5 €"
              />

              <AddonRow
                label="T-Shirt"
                qty={shirtsQty}
                onInc={() => clampInc(setShirtsQty)}
                onDec={() => clampDec(setShirtsQty)}
                sizeNode={
                  <select
                    value={shirtSize}
                    onChange={(e) => setShirtSize(e.target.value)}
                    className="w-full rounded-xl border border-white/70 bg-white/20 px-3 py-2 text-center outline-none"
                  >
                    {shirtSizes.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                }
                price="5 €"
              />

              <AddonRow
                label="Towel"
                qty={towelsQty}
                onInc={() => clampInc(setTowelsQty)}
                onDec={() => clampDec(setTowelsQty)}
                sizeNode={<div className="text-center font-semibold">M</div>}
                price="5 €"
                isLast
              />

              {/* totals */}
              <div className="mt-4 rounded-xl bg-white/15 p-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Add-ons total</span>
                  <span className="font-semibold">{addonsTotal} €</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-semibold">Grand total</span>
                  <span className="text-lg font-extrabold">{grandTotal} €</span>
                </div>
              </div>
            </div>
          </div>

          {/* info + checkout */}
          <div className="lg:col-span-4">
            <div className="rounded-2xl bg-white/80 p-6 shadow-lg backdrop-blur">
              <h4 className="text-lg font-bold text-black">
                Important Information
              </h4>
              <p className="mt-3 text-sm leading-6 text-black/80">
                After booking you will get your personal PIN code. Use it to
                enter and use your field. Everything you booked (towels, shoes
                or t-shirt) will be prepared in the clothes box.
              </p>

              <button
                type="button"
                onClick={() => {
                  setBooking(preparedBooking);
                  setShowPayment(true);
                }}
                className="mt-8 w-full rounded-full border border-black/10 bg-[linear-gradient(180deg,#eac66f_0%,rgba(255,255,255,0)_100%),linear-gradient(180deg,#858585_0%,#ffeaa7_100%)] px-6 py-4 text-xl font-semibold text-black shadow-md"
              >
                checkout
              </button>

              <div className="mt-4 text-xs text-black/60">
                Prepared booking payload:
                <pre className="mt-2 max-h-48 overflow-auto rounded-lg bg-black/5 p-3">
                  {JSON.stringify(preparedBooking, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AddonRow({ label, qty, onInc, onDec, sizeNode, price, isLast }) {
  return (
    <div
      className={["mt-3 grid grid-cols-3 gap-2", isLast ? "mb-1" : ""].join(
        " ",
      )}
    >
      {/* qty */}
      <div className="rounded-xl border border-white/70 bg-white/10 p-3">
        <div className="text-xs font-semibold uppercase text-black/70">
          {label}
        </div>
        <div className="mt-2 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={onDec}
            className="h-10 w-10 rounded-full bg-white/30 text-xl font-bold text-black hover:bg-white/40"
            aria-label={`Decrease ${label}`}
          >
            −
          </button>

          <div className="min-w-8 text-center text-xl font-extrabold">
            {qty}
          </div>

          <button
            type="button"
            onClick={onInc}
            className="h-10 w-10 rounded-full bg-white/30 text-xl font-bold text-black hover:bg-white/40"
            aria-label={`Increase ${label}`}
          >
            +
          </button>
        </div>
      </div>

      {/* size */}
      <div className="rounded-xl border border-white/70 bg-white/10 p-3 flex items-center">
        <div className="w-full">{sizeNode}</div>
      </div>

      {/* price */}
      <div className="rounded-xl border border-white/70 bg-white/10 p-3 flex items-center justify-center text-lg font-bold">
        {price}
      </div>
    </div>
  );
}
