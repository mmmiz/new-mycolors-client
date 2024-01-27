import { Box } from '@mui/material';
import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import './othersSelect.scss';

export default function OthersSelect({
  label,
  onMainColorChange,
  onAboutUsColorChange,
  onProductsColorChange,
  onNewsColorChange,
  onContactColorChange,
  }) 
 { 
    const [color, setColor] = useState('white');
    const [showSelect, setShowSelect] = useState(false);

    const handleColorChange = (newColor) => {
      setColor(newColor.hex);
      // console.log(newColor)

      switch (label) {
        case 'Main':
          if (onMainColorChange) {
            onMainColorChange(newColor.hex);
          }
          break;
        case 'About':
          if (onAboutUsColorChange) {
            onAboutUsColorChange(newColor.hex);
          }
          break;
        case 'Products':
          if (onProductsColorChange) {
            onProductsColorChange(newColor.hex);
          }
          break;
        case 'News':
          if (onNewsColorChange) {
            onNewsColorChange(newColor.hex);
          }
          break;
        case 'Contact':
          if (onContactColorChange) {
            onContactColorChange(newColor.hex);
          }
          break;

        default:
          break;
    }
  };


  return (
    <>
      <div className="color-select-container">
       
       <Box
          onClick={() => setShowSelect(!showSelect)}
          className={`color-select-box ${showSelect ? 'active' : ''}`}
         >
          <div className="color-select-main-color">
            <Box
              className="color-select-main-color-box"
              style={{ backgroundColor: color }}
              />
              <b>{label}</b>
          </div>
       </Box>
       {showSelect && (
          <div className="color-select-dropdown-item">
            <SketchPicker 
              color={color} 
              onChange={handleColorChange}
              onClick={() => setShowSelect(false)}
              />
          </div>
       )}



      </div>
    </>
  );
}
