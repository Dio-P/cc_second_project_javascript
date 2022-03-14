import React, { useState, useEffect, useContext } from 'react'
import DiscreteSliderMarks from './components/DiscreteSliderMarks';
import Map from './containers/Map';
import BattlesDataContext from './context/battlesDataContext';
import {reverseCoordinates} from './helpers/reverseCoordinates'

import './App.css';


function App() {
  const [battlesData, setBattlesData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5050/api/battles")
    .then(res => res.json())
    .then(res => {
      const battlesReversed = res.map( battle => {
        return { 
          ...battle,
          geojson: { 
            ...battle.geojson,
            geometry: {
              ...battle.geojson.geometry,
              coordinates: 
              reverseCoordinates(battle.geojson.geometry.coordinates)
            }
           }
        }
      });
      console.log("battlesReversed", battlesReversed);
      setBattlesData(battlesReversed);
    })
    
  }, []);

  
  return (
    <div>
      <BattlesDataContext.Provider value={{battlesData}}>
        <Map battlesData={battlesData} />
      </BattlesDataContext.Provider>
      {/* <DiscreteSliderMarks/> */}
    </div>
  );
}

export default App;
