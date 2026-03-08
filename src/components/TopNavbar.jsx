import React from "react";
import { Link } from "react-scroll";

export default function TopNavbar() {
  const items = [
    { label: "Corona", to: "corona" },
    { label: "Contact", to: "contact" },
    { label: "FAQ", to: "faq" },
  ];

  return (
    <nav className="sticky top-0 z-10 flex h-10 items-center justify-center bg-black text-base">
      <div className="flex h-[50px] w-full max-w-[1100px] items-center justify-end px-[5%]">
        <ul className="flex items-center">
          {items.map((item) => (
            <li key={item.to} className="mx-4 my-4">
              <Link
                to={item.to}
                smooth
                duration={500}
                offset={-80}
                className="
                  cursor-pointer select-none
                  text-white
                  transition-all duration-300
                  hover:text-[#ffde4c]
                  hover:bg-white/10
                  px-2 py-1 rounded
                "
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
