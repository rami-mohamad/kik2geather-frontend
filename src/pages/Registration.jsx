import React from "react";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import Alerts from "../components/Alerts";
import NavbarHistory from "../components/NavbarHistory";

// images (adjust paths!)
import HeaderImg from "../assets/Header-1.png";
import LeftBg from "../assets/Section 1.png";
import RightBg from "../assets/rightside.png";
import CenterLogo from "../assets/Golden FB Icon.png";

import ContactBg from "../assets/Subtract (1).png";
import PhoneIcon from "../assets/phonelink_ring.png";
import MailIcon from "../assets/mail_outline.png";

import SocialBg from "../assets/Subtract 2.png";
import SocialIcons from "../assets/social icons.png";

function ContactCard() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url(${ContactBg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative">
        <p className="text-xs font-extrabold uppercase tracking-[2.5px] text-white/70">
          Contact
        </p>
        <div className="mt-5 space-y-4 text-white">
          <div className="flex items-center gap-3">
            <img src={PhoneIcon} alt="Phone" className="h-6 w-6" />
            <p className="text-sm">+49-17000000000</p>
          </div>
          <div className="flex items-center gap-3">
            <img src={MailIcon} alt="Mail" className="h-6 w-6" />
            <p className="text-sm">kik2gether.outlook.de</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SocialCard() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url(${SocialBg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative">
        <p className="text-xs font-extrabold uppercase tracking-[2.5px] text-white/70">
          Social
        </p>
        <div className="mt-5">
          <img
            src={SocialIcons}
            alt="Social icons"
            className="w-[240px] max-w-full opacity-90"
          />
        </div>
      </div>
    </div>
  );
}

export default function Registration() {
  return (
    <>
      <NavbarHistory />

      <main className="relative min-h-[calc(100vh-50px)] overflow-hidden bg-[#0c0c0c]">
        {/* background gradient */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#000_0%,rgba(255,255,255,0)_100%),linear-gradient(180deg,rgba(255,255,255,0.5)_0%,rgba(255,255,255,0)_100%),#535353]" />

        {/* left / right background images (desktop) */}
        <div className="absolute inset-y-0 left-0 hidden w-1/2 lg:block">
          <div
            className="h-full w-full bg-right bg-no-repeat"
            style={{
              backgroundImage: `url(${LeftBg})`,
              backgroundSize: "100% 100%",
            }}
          />
        </div>

        <div className="absolute inset-y-0 right-0 hidden w-1/2 lg:block">
          <div
            className="h-full w-full bg-right bg-no-repeat"
            style={{
              backgroundImage: `url(${RightBg})`,
              backgroundSize: "100% 100%",
            }}
          />
        </div>

        {/* header + center logo (desktop) */}
        <div className="pointer-events-none absolute left-1/2 top-10 z-10 hidden -translate-x-1/2 lg:block">
          <img
            src={HeaderImg}
            alt="Header"
            className="w-[40vw] max-w-[700px]"
          />
        </div>

        <div className="pointer-events-none absolute left-1/2 top-[22vh] z-10 hidden -translate-x-1/2 lg:block">
          <img
            src={CenterLogo}
            alt="Logo"
            className="w-[30vw] max-w-[520px] opacity-90"
          />
        </div>

        <Alerts />

        <div className="relative z-20 mx-auto w-full max-w-[1400px] px-4 py-10 lg:py-14">
          {/* ✅ DESKTOP: no absolute bottom boxes - 2 rows per side */}
          <div className="hidden lg:grid lg:grid-cols-2 lg:gap-0">
            {/* LEFT SIDE (SignUp + Contact) */}
            <div className="grid min-h-[820px] grid-rows-[1fr_auto]">
              <div className="pt-[140px]">
                <div className="ml-[13%] w-[420px] max-w-[calc(100%-13%-16px)]">
                  <SignUp />
                </div>
              </div>

              <div className="pb-10">
                <div className="ml-[13%] w-[420px] max-w-[calc(100%-13%-16px)]">
                  <ContactCard />
                </div>
              </div>
            </div>

            {/* RIGHT SIDE (SignIn + Social) */}
            <div className="grid min-h-[820px] grid-rows-[1fr_auto]">
              <div className="pt-[140px]">
                <div className="ml-auto mr-[13%] w-[420px] max-w-[calc(100%-13%-16px)]">
                  <SignIn />
                </div>
              </div>

              <div className="pb-10">
                <div className="ml-auto mr-[13%] w-[420px] max-w-[calc(100%-13%-16px)]">
                  <SocialCard />
                </div>
              </div>
            </div>
          </div>

          {/* MOBILE/TABLET: stacked */}
          <div className="grid grid-cols-1 gap-8 lg:hidden">
            <SignUp />
            <SignIn />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <ContactCard />
              <SocialCard />
            </div>
            <div className="h-6" />
          </div>
        </div>
      </main>
    </>
  );
}
