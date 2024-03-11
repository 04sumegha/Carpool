import React from 'react';

function TextOverImage(props) {
  const { src, heading, paragraph, color, headingStyle, paragraphStyle, height, ...style } = props;


  const containerStyle = {
    display: 'flex', 
    alignItems: 'center', 
    width: '100%', 
    height: height || 'auto', 
  };

  
  const imageStyle = {
    width: '60%', 
    height: '100%', 
  };

  
  const textContainerStyle = {
    width: '60%', 
    padding: '0 20px', 
  };
  

  const textStyle = {
    ...style, 
  };
  const textColor = color || 'black';

  return (
    <div style={containerStyle}>
      <img src={src} alt="background" style={imageStyle} />
      <div style={textContainerStyle}>
        <h1 style={{ ...headingStyle, color: textColor }}>{heading}</h1>
      </div>
    </div>
  );
}



export default TextOverImage;
