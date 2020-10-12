import React,{ useEffect, useRef } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import {transform} from 'ol/proj.js';


import './App.css';

function App() {

  const map = useRef();

  useEffect(()=>{

    map.current = new Map({
      target: 'mapid',
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          })
        })
      ],
      view: new View({
        center: transform([ '-3.553118', '55.9124'], 'EPSG:4326', 'EPSG:3857'),
        zoom: 12
      }),
    });

  },[])

  return (
    <div className="App">
      <h2>West Lothian Litter Pickers</h2>
      <div id="mapid"></div>
    </div>
  );
}

export default App;
