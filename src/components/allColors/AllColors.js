import React, { useEffect, useState } from 'react';

// import "./allcolors.scss";
import axios from 'axios';
import { Box } from '@mui/material';
import EachColor from './EachColor';

export default function AllColors() {
  const [allColors, setAllColors] = useState([]);


  // GET all colors
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/colors");
        setAllColors(res.data);
        // console.log(res.data);
      } catch (err) {
      }
    };
    fetchData();
  }, []);

  // <div className='color-box'>
  //   {allColors.map((c) => (
  //     <div key={c._id}>
  //     {/* <div key={c._id} className='color-detail'> */}
  //       {colorAttributes.map((att) => (
  //         <div key={`${c._id}-${att}`} className='color-item'>
  //           {att === "Main" ? 
  //             (<p>{c.mainColor.color} Main</p>) : 
  //             ( <p>{`${c[`${att.toLowerCase()}Color`]} ${att} `}</p> )
  //           }
  //         </div>
  //       ))}
  //       <div>

  //         <Button onClick={() => navigate(`/allcolors/${c.orderNumber}`, { state: c })}>
  //           Detail
  //         </Button>

  //         {c.userId === currentUser._id ?
  //         ( <button onClick={deleteHandle}>Delete</button>) 
  //         : 
  //         ( <p>like</p>)}
        
  //       </div>
  //     </div>
  //   ))}
  //   </div>

  return (
    <div className='allcolors-container'>
      <h2>All COLORS</h2>

      <Box className='color-box'>
        {allColors.map((c) => (
          <EachColor key={c._id} color={c} 
            setAllColors={setAllColors}
            context="allLikedColors" />
        ))}
      </Box>
      
    </div>
  );
};






