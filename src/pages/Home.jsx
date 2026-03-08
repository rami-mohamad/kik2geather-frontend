import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";
import HeroSection from "../components/HeroSection";
import Price from "../components/PriceSection";
import InfoSection from "../components/InfoSection";
import Footer from "../components/FooterSection";

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((v) => !v);

  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <TopNavbar />
      <Navbar toggle={toggle} />
      <HeroSection />
      <Price />
      <InfoSection />
      <Footer />
    </>
  );
}

export default Home;
