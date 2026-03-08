import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";
import HeroSection from "../components/HeroSection";
import Price from "../components/PriceSection";
import InfoSection from "../components/InfoSection";
import Footer from "../components/FooterSection";
import authContext from "../auth/authContext";

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((v) => !v);

  const { checkAuthOnLoad } = useContext(authContext);

  useEffect(() => {
    checkAuthOnLoad();
  }, [checkAuthOnLoad]);

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
