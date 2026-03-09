import React, { useEffect, useMemo, useState } from "react";
import { api } from "../lib/api";
import Field from "./Field";

import Bg from "../assets/Media/Images/Booking/Booking_BG.png";
import ProgressImg from "../assets/Media/Images/Booking/statusBar_ step1.png";

const MAX_PLAYERS = 10;

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export default function FieldsMobile({ setBooking }) {
  const today = new Date();
  const minDate = today.toISOString().slice(0, 10);
  const maxDate = addDays(today, 90).toISOString().slice(0, 10);

  const [form, setForm] = useState({
    users: 1,
    date: minDate,
    startHour: 14,
    hoursQuantity: 1,
    field: 1,
  });

  const [daySlots, setDaySlots] = useState({});
  const [fieldInfo, setFieldInfo] = useState({ 1: 0, 2: 0, 3: 0, 4: 0 });
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    let alive = true;

    async function fetchSlots() {
      setLoading(true);
      setLoadError(null);
      try {
        const { data } = await api.post("/booking/search", { date: form.date });
        if (!alive) return;
        setDaySlots(data || {});
      } catch (err) {
        if (!alive) return;
        setLoadError(
          err?.response?.data?.message ||
            err?.message ||
            "Failed to load slots",
        );
        setDaySlots({});
      } finally {
        if (alive) setLoading(false);
      }
    }

    fetchSlots();
    return () => {
      alive = false;
    };
  }, [form.date]);

  useEffect(() => {
    const start = Number(form.startHour);
    const end = start + Number(form.hoursQuantity);

    const next = { 1: 0, 2: 0, 3: 0, 4: 0 };

    for (let hour = start; hour < end; hour++) {
      const slot = daySlots?.[hour];
      if (!slot) continue;

      next[1] = Math.max(next[1], Number(slot.field_1 || 0));
      next[2] = Math.max(next[2], Number(slot.field_2 || 0));
      next[3] = Math.max(next[3], Number(slot.field_3 || 0));
      next[4] = Math.max(next[4], Number(slot.field_4 || 0));
    }

    setFieldInfo(next);
  }, [daySlots, form.startHour, form.hoursQuantity]);

  const availableForSelectedField = useMemo(() => {
    const f = Number(form.field);
    const blocked = Number(fieldInfo[f] || 0);
    return MAX_PLAYERS - blocked;
  }, [form.field, fieldInfo]);

  const bookingPossible = useMemo(() => {
    return Number(form.users) <= availableForSelectedField;
  }, [form.users, availableForSelectedField]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "date" ? value : Number(value),
    }));
  };

  const onBook = () => {
    if (!bookingPossible) return;

    setBooking({
      users: Number(form.users),
      date: form.date,
      startHour: Number(form.startHour),
      hoursQuantity: Number(form.hoursQuantity),
      field: Number(form.field),
    });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat pb-16"
      style={{ backgroundImage: `url(${Bg})` }}
    >
      <div className="mx-auto w-full max-w-3xl px-4 py-6">
        <div className="flex justify-center pt-6">
          <img
            src={ProgressImg}
            alt="Progress step 1"
            className="w-full max-w-[900px]"
          />
        </div>

        <div className="mt-8 rounded-3xl border border-black/10 bg-white/80 p-4 shadow-lg backdrop-blur sm:p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold text-black/70">
                Players
              </label>
              <select
                name="users"
                value={form.users}
                onChange={onChange}
                className="mt-2 w-full rounded-2xl border border-[#5c5c5c]/40 bg-white px-4 py-3 text-[#5c5c5c] shadow-inner outline-none focus:bg-[#dadada]"
              >
                <option value={1}>User_Name</option>
                <option value={2}>User_Name + 1</option>
                <option value={3}>User_Name + 2</option>
                <option value={4}>User_Name + 3</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-black/70">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={onChange}
                min={minDate}
                max={maxDate}
                className="mt-2 w-full rounded-2xl border border-[#5c5c5c]/40 bg-white px-4 py-3 text-[#5c5c5c] shadow-inner outline-none focus:bg-[#dadada]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-black/70">
                Start
              </label>
              <select
                name="startHour"
                value={form.startHour}
                onChange={onChange}
                className="mt-2 w-full rounded-2xl border border-[#5c5c5c]/40 bg-white px-4 py-3 text-[#5c5c5c] shadow-inner outline-none focus:bg-[#dadada]"
              >
                {[14, 15, 16, 17, 18, 19, 20, 21].map((h) => (
                  <option key={h} value={h}>
                    {String(h).padStart(2, "0")}:00
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-black/70">
                Duration
              </label>
              <select
                name="hoursQuantity"
                value={form.hoursQuantity}
                onChange={onChange}
                className="mt-2 w-full rounded-2xl border border-[#5c5c5c]/40 bg-white px-4 py-3 text-[#5c5c5c] shadow-inner outline-none focus:bg-[#dadada]"
              >
                {[1, 2, 3, 4].map((h) => (
                  <option key={h} value={h}>
                    Book for {h} Hour{h > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-black/70">
                Field
              </label>
              <select
                name="field"
                value={form.field}
                onChange={onChange}
                className="mt-2 w-full rounded-2xl border border-[#5c5c5c]/40 bg-white px-4 py-3 text-[#5c5c5c] shadow-inner outline-none focus:bg-[#dadada]"
              >
                {[1, 2, 3, 4].map((f) => (
                  <option key={f} value={f}>
                    Field {f}
                  </option>
                ))}
              </select>

              <div className="mt-2 text-sm text-black/70">
                Availability for Field {form.field}:{" "}
                <span className="font-semibold text-black">
                  {availableForSelectedField}/{MAX_PLAYERS}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-2 text-sm text-black/80">
            <div className="flex items-center gap-3">
              <span className="h-4 w-4 rounded-full border-2 border-[#858585] bg-white" />
              <span>Empty</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="h-4 w-4 rounded-full border-2 border-[#858585] bg-red-600" />
              <span>Booked</span>
            </div>
            <div className="text-xs text-black/60">
              * Randomly picked positions for the players
            </div>
          </div>

          <div className="mt-6">
            {loading ? (
              <p className="text-sm text-black/70">Loading slots…</p>
            ) : loadError ? (
              <p className="text-sm text-red-700">{loadError}</p>
            ) : null}
          </div>

          <div className="mt-6 flex justify-center">
            <button
              type="button"
              disabled={!bookingPossible}
              onClick={onBook}
              className={[
                "h-[70px] w-[220px] rounded-full border-2 border-[#858585] text-xl",
                "bg-[linear-gradient(180deg,#eac66f_0%,rgba(255,255,255,0)_100%),linear-gradient(180deg,rgba(234,198,111,0.9)_18.75%,rgba(109,88,36,0.9)_41.67%,rgba(16,16,14,0.9)_100%)]",
                "text-black shadow-lg transition-opacity",
                bookingPossible
                  ? "opacity-100"
                  : "opacity-50 cursor-not-allowed",
              ].join(" ")}
            >
              book here
            </button>
          </div>
        </div>

        <div className="mt-8 space-y-8">
          <div className="flex justify-center">
            <Field blocked={fieldInfo[1]} field={1} />
          </div>
          <div className="flex justify-center">
            <Field blocked={fieldInfo[2]} field={2} />
          </div>
          <div className="flex justify-center">
            <Field blocked={fieldInfo[3]} field={3} />
          </div>
          <div className="flex justify-center">
            <Field blocked={fieldInfo[4]} field={4} />
          </div>
        </div>
      </div>
    </div>
  );
}
