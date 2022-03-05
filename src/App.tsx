import React, { useEffect } from 'react';
import './App.css';
import { Map, Overlay } from 'ol';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat, transform } from 'ol/proj';
import { OSM } from 'ol/source';
import 'ol/ol.css';
import { Coordinate } from 'ol/coordinate';
import { getCenterOfExtent } from './helpers/getCenterOfExtent';
import { DataSetService } from './services/DataSetService';

const App: React.FC = () => {

  const dataSetService: DataSetService = new DataSetService();
  let dataSet: object = dataSetService.getDataSet();
  let index: number = 0;
  let serialNumbers: string[] = ["FA-AA-AAAM"];

  let map: Map = new Map({
    target: 'map',
    layers: [
        new TileLayer({
          source: new OSM()
        })
    ],
    view: new View({
        center: fromLonLat([-74.006,40.712]), // Coordinates of New York
        zoom: 7 //Initial Zoom Level
    })
  });

  const lower: number[] = [156.24702734375,-51.040750041469];
  const upper: number[] = [360+(-170.48637109375),-30.939046030799]
  const lowerXY: Coordinate = transform(lower, 'EPSG:4326', 'EPSG:3857');
  const upperXY: Coordinate = transform(upper, 'EPSG:4326', 'EPSG:3857');
  const extent: Coordinate = lowerXY.concat(upperXY);
  const center: Coordinate = getCenterOfExtent(extent);
  map.getView().setCenter(center);
  map.getView().fit(extent);
  
  const canvas = document.createElement('canvas');
  let markerOverlay: Overlay;

  useEffect(() => {
    console.log(canvas);
    canvas.id = "a_boat";
    canvas.width = 20;
    canvas.height = 20;
    canvas.style.zIndex = '1';
    canvas.style.position = "absolute";
    canvas.style.border = "1px solid";
    document.body.appendChild(canvas);
  })

  markerOverlay = new Overlay({
    element: canvas,
    positioning: 'center-center',
    stopEvent: false,
    autoPan: true,
    offset: [-10,-10]
  });

  const updateOverlay = () => {
    let lat: any;
    let lng: any;
    for(let i = 0; i < serialNumbers.length; i++) {
      if(serialNumbers[i] in dataSet) {
        let gps_set: any = dataSet[serialNumbers[i]]["1"];
        if(index >= gps_set["1"].length) {
            
        }
        if (index < gps_set["1"].length ) {
            lat = gps_set["1"][index];
            lng = gps_set["2"][index];
        }
        let lat_lng = [lat, lng];
        let lat_lngXY = transform(lat_lng, 'EPSG:4326', 'EPSG:3857');
        markerOverlay.setPosition(lat_lngXY);
        map.addOverlay(markerOverlay);
        map.render();
      }
    }
  }

  setInterval(() => {
    updateOverlay();
    index = index+1;
  }, 1000);

  return (
    <div id="map"></div>
  );
}

export default App;