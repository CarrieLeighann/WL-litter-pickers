import React,{ useEffect, useState, useRef } from 'react';
import  {Button } from '@material-ui/core';
import Feature from 'ol/Feature';
import { Point } from 'ol/geom';
import { Style, Icon, Text } from 'ol/style';
import { Room } from '@material-ui/icons';
import Draw from 'ol/interaction/Draw';
import Map from 'ol/Map';
import View from 'ol/View';
import {Tile, Vector as VectorLayer} from 'ol/layer';
import { XYZ, Vector} from 'ol/source';
import {transform} from 'ol/proj.js';
import Overlay from 'ol/Overlay';
import 'ol/ol.css';

import './App.css';


function App() {

  const [drawingEnabled, setDrawingEnabled] = useState(false);
  const [addMarkerEnabled, setAddMarkerEnabled] = useState(false);

  const map = useRef();




  useEffect(()=>{
    
    const vectorSource = new Vector();

    const vectorLayer = new VectorLayer({source: vectorSource});

    const tileLayer = new Tile({
      source: new XYZ({
        url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      })
    });

   
    map.current = new Map({
      target: 'mapid',
      layers: [tileLayer, vectorLayer],
      view: new View({
        center: transform([ '-3.553118', '55.9124'], 'EPSG:4326', 'EPSG:3857'),
        zoom: 12
      }),
    });
    
  },[])

  


  
  
  /* const toggleMarker = () => {
    //st showOverlay = 
    if (!addMarkerEnabled){
      map.current.addOverlay(overlay)

      setAddMarkerEnabled(true);
      return;
    }

    map.current.removeOverlay(overlay)
    setAddMarkerEnabled(false); 
  } */
  
  

 
  const fn = useRef(event => {
    var iconFeature = new Feature({
      geometry: new Point(event.coordinate)
  })


  var iconStyle = new Style({
    text: new Text({
      text: 'room',                         // fa-play, unicode f04b
      font: '900 30px "Material Icons"', // font weight must be 900
  })
  }); 

  iconFeature.setStyle(iconStyle);
  const layers  = map.current.getLayers().item(1).getSource().addFeature(iconFeature);

  });

  useEffect(()=>{
    if (addMarkerEnabled) {
      map.current.on('singleclick', fn.current );
    } else {
      map.current.un('singleclick', fn.current);

    }
  }, [addMarkerEnabled])


  return (
    <div className="App">
      <div className="headerSection">
      <h2>West Lothian Litter Pickers</h2>
      <Button onClick={() => setAddMarkerEnabled(!addMarkerEnabled)} color={addMarkerEnabled ? 'primary' : 'default'}>Add Marker</Button>
      <Button onClick={()=>{}}>Draw Boundary</Button>
      </div>
      <div id="popup"></div>
      <div id="mapid"></div>
    </div>
  );
}

export default App;
