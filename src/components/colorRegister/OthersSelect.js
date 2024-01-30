import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import '../colorRegister/colorRegister.scss';

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
      <div className="background-select-container">
       
       <div
          onClick={() => setShowSelect(!showSelect)}
          className={`color-select-box ${showSelect ? 'active' : ''}`} >
        
          <div className="background-color">
            <div
              className="background-color-box"
              style={{ backgroundColor: color }}
            />
              <b>{label}</b>
          </div>

        {showSelect && (
        <div className="sketch-picker" style={{width: '60px'}}>
          <SketchPicker 
            color={color} 
            onChange={handleColorChange}
            onClick={() => setShowSelect(false)}
            />
        </div>
        )}

       </div>

      </div>
  );
}
