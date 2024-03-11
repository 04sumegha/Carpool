import React from 'react';
import './App.css';
import Navbar from './Navbar';
import TextOverImage from './TextOverImage';
import Features from './Features';
import Benefits from './Benefits';
import Footer from './Footer';

function App() {
  const heading = (
    <>
      RIDE TOGETHER<br/>
      SAVE TOGETHER
    </>
  )
  
  const headingStyle = {
    fontSize: '70px',
    fontWeight: 'bold',
    marginTop: '-40px', 
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
  };



  const textColor = '#007dfe';

  return (
    <div className="App">
      <Navbar />
      <TextOverImage
        src="/carr.jpg"
        heading={heading}
        headingStyle={headingStyle}
        color={textColor} 
        height="600px"
      />
      <Features/>
      <Benefits/>
      <Footer/>
    </div>
  );
}

export default App;




