import React from 'react';
import L from 'leaflet';
import './map.css';
import { mapConfig }from '../config.js';

export default class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            map: null,
        };
        this.map_node = null;
    }

    componentDidMount() {
        // Initialise map
        this.init(this.map_node);
    }

    init(id) {
        let map = L.map(id, mapConfig.params);
        L.control.scale({ position: "bottomleft"}).addTo(map);

        // Define the basemap
        const tileLayer = L.tileLayer(mapConfig.tileLayer.uri, mapConfig.tileLayer.params).addTo(map);
    }

    render() {
        return <div ref={(node) => this.map_node = node} id="map"  />;
    }
}
