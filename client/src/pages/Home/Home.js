import React from "react";
import Navbar from '../../components/Navbar/Navbar';
import TextOverImage from '../../TextOverImage';
import Features from '../../components/Features/Features';
import Benefits from '../../components/Benefits/Benefits';
import Footer from '../../components/Footer/Footer';

function Home() {
  const heading = (
    <>
      RIDE TOGETHER
      <br />
      SAVE TOGETHER
    </>
  );

  const headingStyle = {
    fontSize: "70px",
    fontWeight: "bold",
    marginTop: "-40px",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
  };

  const textColor = "#007dfe";

  return (
    <div className="home">
      <Navbar />
      <TextOverImage
        src="/carr.jpg"
        heading={heading}
        headingStyle={headingStyle}
        color={textColor}
        height="600px"
      />
      <Features />
      <Benefits />
      <Footer />
    </div>
  );
}

export default Home;
