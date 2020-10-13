import React,{ useEffect, useRef } from 'react';
import  {Button } from '@material-ui/core';
import { Room } from '@material-ui/icons';
import Draw from 'ol/interaction/Draw';
import Map from 'ol/Map';
import View from 'ol/View';
import {Tile, Vector as VectorLayer} from 'ol/layer';
import {  XYZ, Vector} from 'ol/source';
import {transform} from 'ol/proj.js';
import Overlay from 'ol/Overlay';
import 'ol/ol.css';

import './App.css';


function App() {

  const map = useRef();

  useEffect(()=>{

    const tileLayer = new Tile({
      source: new XYZ({
        url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      })
    });

    const vectorSource = new Vector();

    const vectorLayer = new VectorLayer({source: vectorSource});

    var overlay = new Overlay({
      element: document.getElementById('popup'),
      autoPan: true,
      autoPanAnimation: {
        duration: 250,
      },
    });

    map.current = new Map({
      target: 'mapid',
      layers: [tileLayer, vectorLayer],
      view: new View({
        center: transform([ '-3.553118', '55.9124'], 'EPSG:4326', 'EPSG:3857'),
        zoom: 12
      }),
      overlays: [overlay]
    });

    map.current.on('singleclick', function(evt) {
      overlay.setPosition(evt.coordinate)
    });
    map.current.addInteraction(new Draw({
      source: vectorSource,
      type: 'Polygon',
    })) 



  },[])


  return (
    <div className="App">
      <div className="headerSection">
      <h2>West Lothian Litter Pickers</h2>
      <Button>Add Marker</Button>
      <Button>Draw Boundary</Button>
      </div>
      <div id="popup"> <Room/></div>
      <div id="mapid"></div>
    </div>
  );
}

export default App;
