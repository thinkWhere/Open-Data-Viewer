import React from 'react';
import L from 'leaflet';
import './map.css';
import { mapConfig }from '../config.js';
import OverPassAPIService  from '../services/overpass.js'

export default class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            map: null,
            geojson: null
            //geojsonMarkers: []
        };
        this.geojsonMarkers = [];
        this.map_node = null;
        this.APIService = new OverPassAPIService();
    }


    componentDidMount() {
        // Initialise map
        this.init(this.map_node);
    }

    init(id) {
        let map = L.map(id, mapConfig.params);
        // A reference to the leaflet map is stored in the component state
        this.setState({map: map});

        // Calls to setState are async (calls to this.state.map will only be valid after the component has rendered),
        // so to instantly access state.map we need to use an updater function.  Within this function, we can access the current state
        this.setState((state, props) => {
            L.control.scale({ position: "bottomleft"}).addTo(state.map);
            L.tileLayer(mapConfig.tileLayer.uri, mapConfig.tileLayer.params).addTo(state.map);

            // Add geojson data from the OSM API
            this.setTheme(state.map);
        });
    }

    setTheme(refMap) {
        this.APIService.getTheme((error, osmData) => {
            if (!error && osmData.features !== undefined) {
                let geojson = L.geoJSON(osmData, {
                    onEachFeature:this.onEachFeature
                }).addTo(refMap);

                // The geojson data received from OSM may include both points (nodes) and polygons(ways), but
                // leaflet only adds markers to points by default. So we need to add markers to the polyon
                // centroids
                geojson.eachLayer(function(layer) {
                    if (layer.feature.geometry.type === 'Polygon') {
                        let bounds = layer.getBounds();
                        let center = bounds.getCenter();
                        let marker = L.marker(center);
                        marker.addTo(refMap);
                    }});
                };
            })
        }

    onEachFeature(feature, layer) {
     layer.bindPopup(feature.properties.name);
     if (feature.geometry.type === 'Polygon') {
         let bounds = layer.getBounds();
         let center = bounds.getCenter();
         let marker = L.marker(bounds);
     }
 }


   addPolygonMarkers() {
       for (let marker of this.geojsonMarkers) {
           marker.addTo(this.state.map);
       }
   }
    render() {
        return <div ref={(node) => this.map_node = node} id="map"  />;
    }
}
