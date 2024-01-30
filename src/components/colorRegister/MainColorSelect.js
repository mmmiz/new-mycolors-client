import React, { useState } from 'react'
import '../colorRegister/colorRegister.scss';


export default function MainColorSelect({onMainImageChange}) {
  const [showSelect, setShowSelect] = useState(false);
  const [color, setColor] = useState('white');

    const handleColorSelect = (selectedColor) => {
    onMainImageChange({ url: selectedColor.url, color: selectedColor.color });
    setColor(selectedColor.color);
  };

  const predefinedImages = [
    { url: 'black.jpg', color: 'black' },
    { url: 'blue.jpg', color: 'blue' },
    { url: 'green.jpg', color: 'green' },
    { url: 'orange.jpg', color: 'orange' },
    { url: 'pink.jpg', color: 'pink' },
    { url: 'purple.jpg', color: 'purple' },
    { url: 'red.jpg', color: 'red' },
    { url: 'white.jpg', color: 'white' },
    { url: 'yellow.jpg', color: 'yellow' },
  ];

  return (
    <div className="background-select-container">

      <div onClick={() => setShowSelect(!showSelect)} className={`color-select-box ${showSelect ? 'active' : ''}`}>
  
        <div className="background-color">
          <div
            className="background-color-box"
            style={{ backgroundColor: color }}
          />
          <b>Main</b>
        </div>

        {/* dropdown */}
        {showSelect && (
          <div className='dropdown'>
            {predefinedImages.map((color, index) => (
              <div key={index} 
                className='dropdown-item'
                onClick={() => handleColorSelect(color)}>
                {color.color}
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}




