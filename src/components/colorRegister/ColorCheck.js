import React, { useEffect, useState } from 'react'

export default function ColorCheck({ onColorSelection }) {
  const [selectedColors, setSelectedColors] = useState([]);
  const colors = ['black', 'grey', 'white', 'red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'brown', 'beige'];

  const handleColorSelection = (color) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c) => c !== color));  // uncheck colors
    } else {
      setSelectedColors([...selectedColors, color]); 
    };
  }

  //   asynchronous
  useEffect(() => {
    onColorSelection(selectedColors);
    // console.log('Selected Colors:', selectedColors);
  }, [selectedColors]); 


  return (
    <div style={{display: "flex", flexWrap: 'wrap', marginTop: '10px'}}>
      {colors.map((color, index) => (
        <div key={index}>
          <input
            type='checkbox'
            checked={selectedColors.includes(color)}
            onChange={() => handleColorSelection(color)}
           />
          <label>{color}</label>
        </div>
      ))}
    </div>
  )
}
