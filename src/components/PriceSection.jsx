import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../assets/priceImages/Icon.png";
import Background from "../assets/priceImages/Gradient.png";

const checkItems = [
  "Components-driven system",
  "Components-driven system",
  "Components-driven system",
  "Components-driven system",
];

function Bullet({ text }) {
  return (
    <p className="flex items-start gap-2 text-[14px] text-white">
      <img src={Icon} alt="icon" className="relative top-[4px] w-[20px]" />
      <span className="max-w-[250px]">{text}</span>
    </p>
  );
}

export default function Price() {
  const navigate = useNavigate();

  return (
    <section
      id="price"
      className="
        relative flex flex-col items-center justify-start
        h-[720px]
        bg-[linear-gradient(180deg,#050505_0%,#0d0d0d_100%)]
        max-[1000px]:h-[1200px]
        max-md:h-[1650px]
        max-[480px]:h-[1620px]
      "
      style={{
        // only on small screens (like your old CSS)
        backgroundImage:
          "linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(194,194,194,0.239583)_10.42%,rgba(137,137,137,0.463542)_46.35%,rgba(137,137,137,0.463542)_87.5%,#000_100%),linear-gradient(180deg,#000_0%,#fff_100%),linear-gradient(180deg,#fff_0%,rgba(255,255,255,0)_100%),linear-gradient(180deg,#2d3436_0%,rgba(45,52,54,0)_100%)",
      }}
    >
      {/* mobile background image like your old css (only under 768) */}
      <div
        className="pointer-events-none absolute inset-0 hidden max-md:block"
        style={{
          backgroundImage: `url(${Background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.25,
        }}
      />

      {/* header */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1000px] flex-col items-start px-5 py-5 font-bold">
        <h2 className="mb-[26px] flex justify-start font-['Michroma',sans-serif] text-[16px] font-bold uppercase tracking-[1.4px] text-[#fabf2f]">
          Price
        </h2>

        <h3 className="mb-[36px] font-['Michroma',sans-serif] text-[16px] text-white">
          Our promise: 100% fair prices!
        </h3>

        <p className="mb-[34px] font-['Michroma',sans-serif] text-[20px] text-[#fabf2f] max-md:text-[16px]">
          Regardless of whether it is a single booking or a subscription - you
          benefit from low prices 365 days a year.
        </p>
      </div>

      {/* cards */}
      <div
        className="
          relative z-10 mx-auto grid w-full max-w-[1000px] place-items-center gap-4
          grid-cols-3
          max-[1000px]:grid-cols-2
          max-md:grid-cols-1
          max-md:px-5
        "
      >
        {/* Card 1 */}
        <div
          className="
  group flex h-[350px] w-[300px] flex-col justify-between
  rounded-2xl border border-white/15
  bg-white/10 backdrop-blur-md
  p-6 text-white
  shadow-[0_10px_30px_rgba(0,0,0,0.35)]
  transition-all duration-300
  hover:-translate-y-1 hover:border-[#fabf2f]/40 hover:shadow-[0_16px_40px_rgba(0,0,0,0.45)]
"
        >
          <div className="h-[30px] w-[200px] text-[16px]">👤 Individual</div>

          <div className="mt-2 max-w-[280px] text-[20px] text-[#fabf2f]">
            Whole Field 50€/ Person
          </div>

          <div className="mt-6 grid gap-4">
            {checkItems.map((t, idx) => (
              <Bullet key={idx} text={t} />
            ))}
          </div>

          <div className="mt-8 h-[50px]">
            <button
              type="button"
              onClick={() => navigate("/registration")}
              className="
                h-full w-full rounded-[10px]
                bg-[#fabf2f] text-black hover:bg-[#ffd95e]
                transition-all duration-200
                hover:bg-white hover:text-black hover:shadow-inner cursor-pointer
              "
            >
              SIGN IN or UP
            </button>
          </div>
        </div>

        {/* Card 2 */}
        <div
          className="
  group flex h-[350px] w-[300px] flex-col justify-between
  rounded-2xl border border-white/15
  bg-white/10 backdrop-blur-md
  p-6 text-white
  shadow-[0_10px_30px_rgba(0,0,0,0.35)]
  transition-all duration-300
  hover:-translate-y-1 hover:border-[#fabf2f]/40 hover:shadow-[0_16px_40px_rgba(0,0,0,0.45)]
"
        >
          <div className="h-[30px] w-[200px] text-[16px]">👥 Corporate</div>

          <div className="mt-2 max-w-[280px] text-[20px] text-[#fabf2f]">
            Full Group 5€/ Person
          </div>

          <div className="mt-6 grid gap-4">
            {[
              "Awesome Feather icons pack",
              "Awesome Feather icons pack",
              "Awesome Feather icons pack",
              "Awesome Feather icons pack",
            ].map((t, idx) => (
              <Bullet key={idx} text={t} />
            ))}
          </div>

          <div className="mt-8 h-[50px]">
            <button
              type="button"
              onClick={() => navigate("/registration")}
              className="
                h-full w-full rounded-[10px]
               bg-[#fabf2f] text-black hover:bg-[#ffd95e]
                transition-all duration-200
                hover:bg-white hover:text-black hover:shadow-inner cursor-pointer
              "
            >
              SIGN IN or UP
            </button>
          </div>
        </div>

        {/* Card 3 */}
        <div
          className="
  group flex h-[350px] w-[300px] flex-col justify-between
  rounded-2xl border border-white/15
  bg-white/10 backdrop-blur-md
  p-6 text-white
  shadow-[0_10px_30px_rgba(0,0,0,0.35)]
  transition-all duration-300
  hover:-translate-y-1 hover:border-[#fabf2f]/40 hover:shadow-[0_16px_40px_rgba(0,0,0,0.45)]
"
        >
          <p className="text-[16px] pb-[30px]">How it works</p>

          <p className="max-w-[280px] text-[20px] text-[#fabf2f]">
            Information
          </p>

          <div className="mt-6 grid gap-4">
            {[
              "why it's better",
              "why it's better",
              "why it's better",
              "why it's better",
              "why it's better",
            ].map((t, idx) => (
              <Bullet key={idx} text={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
