import React, { useState } from 'react';
import { Box } from '@mui/material';
import './mainColorSelect.scss';

export default function MainColorSelect({ onMainImageChange }) {
  const [showSelect, setShowSelect] = useState(false);
  const [color, setColor] = useState('white');

  const handleColorSelect = (selectedColor) => {
    // console.log('Selected Color:', selectedColor);
    onMainImageChange({ url: selectedColor.url, color: selectedColor.color});
    // console.log('Palette:', { url: selectedColor.url, color: selectedColor.color});
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
    <div className="background-pic-select-container">
      <Box
        onClick={() => setShowSelect(!showSelect)}
        className={`background-pic-select-box ${showSelect ? 'active' : ''}`}
      >

        {/* DROPDOWN */}
        {showSelect && (
          <div className="background-pic-dropdown">
            {predefinedImages.map((color, index) => (
              <div
                key={index}
                onClick={() => handleColorSelect(color)}
                className="background-pic-dropdown-item"
              >
                {color.color}
              </div>
            ))}
          </div>
        )}

        <div className="background-pic-main-color">
          <Box
            className="background-pic-main-color-box"
            style={{ backgroundColor: color }}
          />
          <b>Main</b>
        </div>
      </Box>
    </div>
  );
}
