import { HiOutlineHome } from "react-icons/hi";
import { IoIosPricetags } from "react-icons/io";
import { TiInfoLargeOutline } from "react-icons/ti";
import { FaTimes } from "react-icons/fa";
import { Link as LinkScroll } from "react-scroll";
import { Link as LinkRouter } from "react-router-dom";

const Sidebar = ({ isOpen, toggle }) => {
  const linkBase =
    "flex items-center justify-center gap-2 rounded-lg px-6 py-4 text-white text-lg transition-colors hover:text-[#ffde4c] hover:bg-white/10";

  return (
    <div
      className={[
        "fixed inset-0 z-60 transition-all duration-300",
        isOpen ? "opacity-100 visible" : "opacity-0 invisible",
      ].join(" ")}
      onClick={toggle}
      aria-hidden={!isOpen}
    >
      <div className="absolute inset-0 bg-black/70" />

      <aside
        className={[
          "absolute right-0 top-0 h-full w-full max-w-[420px]",
          "bg-gradient-to-b from-black via-[#2a2a2a] to-black",
          "shadow-2xl",
          "transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-end p-6">
          <button
            type="button"
            onClick={toggle}
            className="text-white transition-colors hover:text-[#ffde4c]"
            aria-label="Close menu"
          >
            <FaTimes className="text-2xl" />
          </button>
        </div>

        <div className="flex h-[calc(100%-72px)] flex-col justify-between px-6 pb-8">
          <nav className="mt-2">
            <ul className="flex flex-col gap-3">
              <li>
                <LinkScroll
                  to="home"
                  smooth
                  duration={500}
                  spy
                  offset={-80}
                  onClick={toggle}
                  className={linkBase}
                >
                  <HiOutlineHome className="text-xl" />
                  K2G
                </LinkScroll>
              </li>

              <li>
                <LinkScroll
                  to="price"
                  smooth
                  duration={500}
                  spy
                  offset={-80}
                  onClick={toggle}
                  className={linkBase}
                >
                  <IoIosPricetags className="text-xl" />
                  Price
                </LinkScroll>
              </li>

              <li>
                <LinkScroll
                  to="info"
                  smooth
                  duration={500}
                  spy
                  offset={-80}
                  onClick={toggle}
                  className={linkBase}
                >
                  <TiInfoLargeOutline className="text-xl" />
                  Info
                </LinkScroll>
              </li>
            </ul>
          </nav>

          <div className="pt-6">
            <LinkRouter
              to="/registration"
              onClick={toggle}
              className="
                flex w-full items-center justify-center
                rounded-full
                bg-[linear-gradient(to_bottom,#ffe79e_13%,#897129_38%,#504630_98%)]
                px-2 py-2
                text-[#ffde4c]
                transition-all duration-200
                hover:bg-white hover:text-black hover:shadow-inner
              "
            >
              <span className="px-6 py-2 text-base">Sign In | Up</span>
            </LinkRouter>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
