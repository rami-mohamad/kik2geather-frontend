import { useNavigate } from "react-router-dom";
import { Link as LinkScroll } from "react-scroll";
import { MdKeyboardArrowRight, MdArrowForward } from "react-icons/md";

import Video from "../assets/video/Soccer720.mp4";

import HeroIcon from "../assets/heroImages/GoldenFB.png";
import HeroImage from "../assets/heroImages/Rectangle.png";
import HeroLeftDots from "../assets/heroImages/LeftDots.png";
import HeroRightDots from "../assets/heroImages/RightDots.png";
import HeroTopPlayer from "../assets/heroImages/TopPlayer.png";
import HeroBottomPlayer from "../assets/heroImages/BottomPlayer.png";

function HeroSection() {
  const navigate = useNavigate();

  return (
    <section
      id="home"
      className="relative flex h-[800px] items-center justify-center overflow-hidden bg-[#0c0c0c] px-[30px]"
    >
      {/* overlay gradients (replacement for :before) */}
      <div className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(180deg,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.6)_100%),linear-gradient(180deg,rgba(0,0,0,0.2)_0%,transparent_100%)]" />

      {/* background video */}
      <div className="absolute inset-0 z-[1] h-full w-full overflow-hidden">
        <video
          className="h-full w-full object-cover bg-[#232a34]"
          autoPlay
          loop
          muted
          playsInline
          src={Video}
        />
      </div>

      {/* dots */}
      <img
        src={HeroLeftDots}
        alt="Hero Left Dots"
        className="absolute left-0 top-[200px] z-[5] h-[373px] w-[100px]"
      />
      <img
        src={HeroRightDots}
        alt="Hero Right Dots"
        className="absolute right-0 top-[340px] z-[5] h-[373px] w-[100px]"
      />

      {/* side texts (hidden below 920px like before) */}
      <p className="absolute left-[90px] top-[250px] z-[5] h-[100px] w-[200px] text-[14px] leading-[32px] text-[#fabf2f] max-[920px]:hidden">
        Use mixed grid with imagery, replace with your own photos and
        descriptions
      </p>
      <p className="absolute left-[90px] top-[480px] z-[5] h-[100px] w-[200px] text-[14px] leading-[32px] text-[#fabf2f] max-[920px]:hidden">
        Use mixed grid with imagery, replace with your own photos and
        descriptions
      </p>
      <p className="absolute right-[90px] top-[370px] z-[5] h-[100px] w-[200px] text-[14px] leading-[32px] text-[#fabf2f] max-[920px]:hidden">
        This is multipurpose grid, it fits for portfolio, services or agency web
        site
      </p>
      <p className="absolute right-[90px] top-[600px] z-[5] h-[100px] w-[200px] text-[14px] leading-[32px] text-[#fabf2f] max-[920px]:hidden">
        This is multipurpose grid, it fits for portfolio, services or agency web
        site
      </p>

      {/* content */}
      <div className="absolute z-[3] flex max-w-[1200px] flex-col items-center px-6 py-2">
        {/* title */}
        <h1
          className="
            absolute top-[-320px] z-[3]
            flex items-center text-center
            rounded-full px-10
            font-['Michroma',sans-serif]
            text-[55px] leading-[108px]
            tracking-[-3px]
            text-[#fabf2f]
            bg-[rgba(250,191,47,0.3)]
            max-md:h-[70px] max-md:px-[30px] max-md:text-[40px]
            max-[480px]:h-[70px] max-[480px]:px-[28px] max-[480px]:text-[35px]
          "
        >
          kick2gether
        </h1>

        {/* image overlay (Rectangle.png) */}
        <img
          src={HeroImage}
          alt="Hero Background Image"
          className="
            absolute top-[-250%] left-[8%] z-[2]
            w-[130%] opacity-40
            max-md:w-[600px]
            max-[501px]:hidden
          "
        />

        {/* players */}
        <img
          src={HeroTopPlayer}
          alt="Top Hero Player"
          className="absolute top-[-300px] z-[2] w-1/2 max-md:top-[-310px]"
        />
        <img
          src={HeroBottomPlayer}
          alt="Bottom Hero Player"
          className="absolute top-[270px] w-3/5 opacity-40 max-md:top-[140px]"
        />

        {/* text */}
        <p className="relative top-[-150px] z-[3] max-w-[800px] text-center font-['Michroma',sans-serif] text-[24px] text-white max-md:top-[-200px] max-md:text-[16px] max-[480px]:text-[14px]">
          create your own champions leauge every day
        </p>

        {/* golden icon */}
        <img
          src={HeroIcon}
          alt="Golden FB Icon"
          className="absolute top-[-50%] w-3/5 max-md:top-[-100%] max-[480px]:top-[-100%]"
        />

        {/* button wrapper */}
        <div className="mt-[55px] flex flex-col items-center">
          <div className="relative top-[200px] max-md:top-[65px] max-[480px]:top-[130px]">
            {/* Use LinkScroll for smooth scroll props if you still want them.
                But your action is navigating to /booking, so we handle onClick */}
            <LinkScroll
              to="home"
              smooth
              duration={500}
              spy
              offset={-80}
              onClick={() => navigate("/booking")}
              className="
                group inline-flex items-center justify-center
                whitespace-nowrap rounded-full
                px-[52px] py-[18px]
                text-[20px] text-[#ffde4c]
                cursor-pointer
                transition-all duration-200 ease-in-out
                bg-[linear-gradient(to_bottom,#ffe79e_13%,#897129_38%,#504630_98%)]
                hover:bg-white hover:text-[#010606] hover:shadow-inner
              "
              style={{ textDecoration: "none" }}
            >
              Get started
              <MdKeyboardArrowRight className="ml-2 text-[20px] group-hover:hidden" />
              <MdArrowForward className="ml-2 hidden text-[20px] group-hover:inline" />
            </LinkScroll>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
