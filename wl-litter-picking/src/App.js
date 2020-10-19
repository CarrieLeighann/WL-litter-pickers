import React,{ useEffect, useState, useRef } from 'react';
import  {Button } from '@material-ui/core';
import Feature from 'ol/Feature';
import { Point } from 'ol/geom';
import { Style, Text, Stroke, Fill } from 'ol/style';
import Draw from 'ol/interaction/Draw';
import Map from 'ol/Map';
import View from 'ol/View';
import {Tile, Vector as VectorLayer} from 'ol/layer';
import { XYZ, Vector} from 'ol/source';
import {transform} from 'ol/proj.js';
import 'ol/ol.css';

import './App.css';


function App() {

  const [drawingEnabled, setDrawingEnabled] = useState(false);
  const [addMarkerEnabled, setAddMarkerEnabled] = useState(false);

  const map = useRef();




  useEffect(()=>{
    
    const vectorLayer = new VectorLayer({source: new Vector()});

    const drawingLayer = new VectorLayer({
        source: new Vector({    
          }),
          style: new Style({
            fill: new Fill({
              color: 'rgba(225, 225, 225, 0.4)',
            }),
            stroke: new Stroke({
              width: 2,
              color: 'blue'
            })
        })
    });

    const tileLayer = new Tile({
      source: new XYZ({
        url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attributions: '© OpenStreetMap contributors'
      })
    });

    map.current = new Map({
      target: 'mapid',
      layers: [tileLayer, vectorLayer, drawingLayer],
      view: new View({
        center: transform([ '-3.553118', '55.9124'], 'EPSG:4326', 'EPSG:3857'),
        zoom: 12
      }),
    });
    
    const drawingInteraction =new Draw({
      type: 'Polygon',
      source: map.current.getLayers().item(2).getSource(),
    });
  
    map.current.addInteraction(drawingInteraction);
    
  },[])

  const fn = useRef(event => {
    var iconFeature = new Feature({
      geometry: new Point(event.coordinate)
  })

  var iconStyle = new Style({
    text: new Text({
      text: 'room',                         // fa-play, unicode f04b
      font: '900 30px "Material Icons"',
      color: '#008000' // font weight must be 900
    })
  }); 

  iconFeature.setStyle(iconStyle);
  map.current.getLayers().item(1).getSource().addFeature(iconFeature);
  });

  useEffect(()=>{
    if (addMarkerEnabled) {
      if(drawingEnabled) setDrawingEnabled(false);
      map.current.on('singleclick', fn.current );
    } else {
      map.current.un('singleclick', fn.current);
    }
  }, [addMarkerEnabled, drawingEnabled])

  useEffect(()=> {
    if(map.current) {
   
      if (addMarkerEnabled && drawingEnabled) setAddMarkerEnabled(false);
      map.current.getInteractions().forEach(interaction => {
        if(interaction instanceof Draw){
          if (drawingEnabled) interaction.setActive(true);
          else interaction.setActive(false);
        } 
      });
    }
  }, [drawingEnabled, addMarkerEnabled])

  return (
    <div className="App">
      <div className="headerSection">
      <h2>West Lothian Litter Pickers</h2>
      <Button onClick={() => setAddMarkerEnabled(!addMarkerEnabled)} color={addMarkerEnabled ? 'primary' : 'default'}>Add Marker</Button>
      <Button onClick={()=> setDrawingEnabled(!drawingEnabled)} color={drawingEnabled ? 'primary' : 'default'}>Draw Boundary</Button>
      </div>
      <div id="popup"></div>
      <div id="mapid"></div>
    </div>
  );
}

export default App;