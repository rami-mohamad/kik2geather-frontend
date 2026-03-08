import React, { useState } from "react";
import axios from "axios";

import Background from "../assets/FooterImages/BackgroundField.png";
import UserIcon from "../assets/FooterImages/icon-user.png";
import EmailIcon from "../assets/FooterImages/icon-mail.png";
import EditIcon from "../assets/FooterImages/icon-edit.png";

import FB from "../assets/FooterImages/icon-facebook.png";
import IN from "../assets/FooterImages/icon-linkedin.png";
import S from "../assets/FooterImages/icon-slack.png";
import T from "../assets/FooterImages/icon-twitter.png";

export default function Footer() {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const inputChange = (e) => {
    setContact((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (
      !contact.name.trim() ||
      !contact.email.trim() ||
      !contact.message.trim()
    ) {
      setStatus({
        type: "error",
        message: "Please fill in your name, email, and message.",
      });
      return;
    }

    setIsSending(true);
    setStatus({ type: "", message: "" });

    try {
      const baseURL = import.meta.env.VITE_API_URL || "http://localhost:4000";

      const { data } = await axios.post(`${baseURL}/user/contact`, contact, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Contact sent:", data);

      setStatus({
        type: "success",
        message: "Your message has been sent successfully.",
      });

      setContact({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Send failed:", err);

      setStatus({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSending(false);
    }
  };

  const socialIcons = [
    { src: FB, alt: "Facebook", href: "#" },
    { src: IN, alt: "LinkedIn", href: "#" },
    { src: S, alt: "Slack", href: "#" },
    { src: T, alt: "Twitter", href: "#" },
  ];

  const infoLinks = [
    { label: "About K2G app", href: "#about" },
    { label: "Get in touch", href: "#footer" },
    { label: "Things we like", href: "#things" },
    { label: "Privacy policy", href: "#privacy" },
    { label: "Terms of service", href: "#terms" },
    { label: "Resources", href: "#resources" },
  ];

  const sectionLabel =
    "text-[11px] font-extrabold uppercase tracking-[2.5px] text-white/60";

  const inputBaseClass = `
    w-full rounded-xl border border-white/15
    bg-white/10 text-white placeholder:text-[#f7c948]/90
    px-4 py-3 text-sm outline-none transition-all
    focus:border-[#fabf2f] focus:bg-white/15 focus:shadow-[0_0_0_3px_rgba(250,191,47,0.15)]
    hover:bg-white/15
    max-md:bg-white/85 max-md:text-black max-md:placeholder:text-black/70
  `;

  return (
    <footer
      id="contact"
      className="relative bg-center bg-cover bg-no-repeat text-white"
      style={{
        backgroundImage: `url(${Background})`,
      }}
    >
      <div className="bg-black/70 backdrop-blur-[2px]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-12">
          <div
            className="
              grid gap-10 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl
              md:p-8 lg:grid-cols-2 lg:p-10
            "
          >
            {/* LEFT */}
            <div className="flex flex-col justify-between gap-10">
              <div>
                <p className={sectionLabel}>Follow us</p>
                <h2 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">
                  Let’s stay connected
                </h2>
                <p className="mt-4 max-w-md text-sm leading-7 text-white/75">
                  Follow our journey, see updates, and stay in touch with the
                  K2G community.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-4">
                  {socialIcons.map((ic) => (
                    <a
                      key={ic.alt}
                      href={ic.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={ic.alt}
                      className="
                        flex h-12 w-12 items-center justify-center rounded-full
                        border border-white/15 bg-white/10 transition-all
                        hover:-translate-y-1 hover:bg-[#fabf2f]/20 hover:shadow-lg
                      "
                    >
                      <img src={ic.src} alt={ic.alt} className="w-5" />
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <p className={sectionLabel}>Information</p>

                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {infoLinks.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="
                        text-sm text-[#fabf2f] transition-all
                        hover:translate-x-1 hover:text-white
                      "
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="rounded-2xl border border-white/10 bg-black/20 p-5 md:p-6">
              <div className="mb-6">
                <p className={sectionLabel}>Subscribe us</p>
                <p className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
                  hello@k2g.com
                </p>
              </div>

              <form onSubmit={submitHandler} className="space-y-4">
                <div>
                  <p className={`${sectionLabel} mb-3`}>Keep in touch</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    type="text"
                    name="name"
                    value={contact.name}
                    onChange={inputChange}
                    placeholder="Your Name"
                    className={inputBaseClass}
                    style={{
                      backgroundImage: `url(${UserIcon})`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "20px",
                      backgroundPosition: "right 14px center",
                      paddingRight: "44px",
                    }}
                  />

                  <input
                    type="email"
                    name="email"
                    value={contact.email}
                    onChange={inputChange}
                    placeholder="E-mail"
                    className={inputBaseClass}
                    style={{
                      backgroundImage: `url(${EmailIcon})`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "20px",
                      backgroundPosition: "right 14px center",
                      paddingRight: "44px",
                    }}
                  />
                </div>

                <textarea
                  name="message"
                  value={contact.message}
                  onChange={inputChange}
                  placeholder="Leave your message"
                  rows="5"
                  className={`${inputBaseClass} min-h-[140px] resize-none`}
                  style={{
                    backgroundImage: `url(${EditIcon})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "20px",
                    backgroundPosition: "right 14px top 14px",
                    paddingRight: "44px",
                  }}
                />

                {status.message && (
                  <p
                    className={`text-sm ${
                      status.type === "success"
                        ? "text-green-300"
                        : "text-red-300"
                    }`}
                  >
                    {status.message}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSending}
                  className="
                    inline-flex h-12 min-w-[140px] items-center justify-center rounded-xl
                    bg-[#fabf2f] px-6 font-semibold text-black transition-all
                    hover:-translate-y-0.5 hover:shadow-lg
                    disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer
                  "
                >
                  {isSending ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm text-white/60 md:flex-row">
            <p>© {new Date().getFullYear()} K2G. All rights reserved.</p>
            <p>Designed for a cleaner and more modern user experience.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
