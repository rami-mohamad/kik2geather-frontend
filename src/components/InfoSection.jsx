import { useNavigate } from "react-router-dom";

import Icon1 from "../assets/infoImages/IconOne.png";
import Icon2 from "../assets/infoImages/IconTwo.png";
import Icon3 from "../assets/infoImages/IconThree.png";
import Icon4 from "../assets/infoImages/IconFour.png";
import Dots from "../assets/infoImages/3Dots.png";

function BulletItem({ text }) {
  return (
    <li className="flex items-start gap-3 text-sm leading-6 text-white/85">
      <span className="mt-[7px] h-2.5 w-2.5 shrink-0 rounded-full bg-[#fabf2f]" />
      <span>{text}</span>
    </li>
  );
}

export default function InfoSection({
  id = "info",
  lightBg = false,
  topLine = "Info",
  headline = "Why Kick2Gether works",
  buttonLabel = "Book now",
  image,
  alt = "Info image",
}) {
  const navigate = useNavigate();

  const cards = [
    {
      icon: Icon1,
      title: "Easy Support",
      desc: "Fast help whenever you need it, with a smooth booking experience from start to finish.",
      bullets: [
        "Simple registration process",
        "Quick support when needed",
        "Clear booking confirmation",
      ],
    },
    {
      icon: Icon2,
      title: "Better Experience",
      desc: "A structured system that makes planning, booking, and organizing your match much easier.",
      bullets: [
        "Clear steps for every booking",
        "Comfortable user flow",
        "Less confusion for players",
      ],
    },
    {
      icon: Icon3,
      title: "Smart Team Booking",
      desc: "Perfect for groups, companies, and friends who want a reliable and flexible football booking setup.",
      bullets: [
        "Good for teams and events",
        "Flexible group planning",
        "Reliable slot overview",
      ],
    },
    {
      icon: Icon4,
      title: "Useful Extras",
      desc: "Optional extras like shirts, shoes, and towels make the whole experience more practical.",
      bullets: [
        "Extras available directly",
        "Everything in one place",
        "More comfort for players",
      ],
    },
  ];

  return (
    <section
      id={id}
      className={[
        "w-full px-5 py-16",
        lightBg
          ? "bg-[#f7f7f7] text-black"
          : "bg-[linear-gradient(180deg,#050505_0%,#0d0d0d_100%)] text-white",
      ].join(" ")}
    >
      <div className="mx-auto w-full max-w-[1200px]">
        <div
          className="
            relative overflow-hidden
            rounded-[36px]
            border border-white/10
            bg-white/5
            px-6 py-10
            shadow-[0_18px_60px_rgba(0,0,0,0.35)]
            backdrop-blur-sm
            md:px-10 md:py-12
          "
        >
          {image ? (
            <img
              src={image}
              alt={alt}
              className="pointer-events-none absolute right-[-2%] top-1/2 w-[36%] -translate-y-1/2 opacity-10 max-lg:hidden"
            />
          ) : null}

          <img
            src={Dots}
            alt="Dots left"
            className="pointer-events-none absolute left-4 top-6 w-[90px] opacity-20"
          />
          <img
            src={Dots}
            alt="Dots right"
            className="pointer-events-none absolute bottom-6 right-4 w-[90px] rotate-180 opacity-20"
          />

          <div className="relative z-10">
            <div className="mx-auto mb-10 max-w-[760px] text-center">
              <p className="mb-3 font-['Michroma',sans-serif] text-[14px] uppercase tracking-[1.6px] text-[#fabf2f] md:text-[16px]">
                {topLine}
              </p>

              <h2 className="mb-4 text-2xl font-semibold leading-snug text-white md:text-[34px]">
                {headline}
              </h2>

              <p className="mx-auto max-w-[680px] text-sm leading-7 text-white/75 md:text-base">
                Kick2Gether gives players and teams a simple, clear, and modern
                way to plan football sessions with less effort and better
                organization.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {cards.map((card) => (
                <div
                  key={card.title}
                  className="
                    rounded-[28px]
                    border border-white/12
                    bg-[linear-gradient(180deg,rgba(255,255,255,0.10)_0%,rgba(255,255,255,0.04)_100%)]
                    p-6
                    shadow-[0_10px_30px_rgba(0,0,0,0.22)]
                    transition-all duration-300
                    hover:-translate-y-1 hover:border-[#fabf2f]/35 hover:shadow-[0_14px_38px_rgba(0,0,0,0.32)]
                    md:p-7
                  "
                >
                  <div className="mb-4 flex items-center gap-4">
                    <div
                      className="
                        flex h-14 w-14 items-center justify-center
                        rounded-2xl border border-[#fabf2f]/25
                        bg-[#fabf2f]/10
                      "
                    >
                      <img
                        src={card.icon}
                        alt={`${card.title} icon`}
                        className="w-7"
                      />
                    </div>

                    <h3 className="text-lg font-semibold text-white md:text-xl">
                      {card.title}
                    </h3>
                  </div>

                  <p className="mb-5 text-sm leading-7 text-white/75 md:text-[15px]">
                    {card.desc}
                  </p>

                  <ul className="space-y-3">
                    {card.bullets.map((item) => (
                      <BulletItem key={item} text={item} />
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => navigate("/booking")}
                className="
                  inline-flex items-center justify-center
                  rounded-full
                  bg-[#fabf2f]
                  px-8 py-3.5
                  text-[16px] font-semibold text-black
                  shadow-[0_8px_24px_rgba(250,191,47,0.28)]
                  transition-all duration-200
                  hover:-translate-y-[1px] hover:bg-[#ffd45c]
                  active:scale-[0.98]
                  md:px-10 md:py-4 md:text-[17px] cursor-pointer
                "
              >
                {buttonLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
