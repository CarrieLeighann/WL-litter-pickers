import React,{ useState } from 'react';
import  {Button } from '@material-ui/core';
import MapContainer from './Map/MapContainer';

import './App.css';

function App() {

  const [drawingEnabled, setDrawingEnabled] = useState(false);
  const [addMarkerEnabled, setAddMarkerEnabled] = useState(false);

  return (
    <div className="App">
      <h1>West Lothian Litter Pickers</h1>
      <div className="headerSection">
      <Button onClick={() => setAddMarkerEnabled(!addMarkerEnabled)} color={addMarkerEnabled ? 'primary' : 'default'}>Add Marker</Button>
      <Button onClick={()=> setDrawingEnabled(!drawingEnabled)} color={drawingEnabled ? 'primary' : 'default'}>Draw Boundary</Button>
      </div>
      <div className="mapData">
      <div className="sidebar">
        Sidebar
      </div>
      <MapContainer 
        drawingEnabled={drawingEnabled} 
        addMarkerEnabled={addMarkerEnabled} 
        setDrawingEnabled={setDrawingEnabled} 
        setAddMarkerEnabled={setAddMarkerEnabled}
      />
      </div>
    </div>
  );
}

export default App;