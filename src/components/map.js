import React from 'react';
import L from 'leaflet';
import './map.css';
import { mapConfig }from '../config.js';
import OverPassAPIService  from '../services/overpass.js';
import { Popup } from "./popup";


export default class Map extends React.Component {
    constructor(props) {
        super(props);

        this.mapNode = null;
        this.APIService = new OverPassAPIService();
        this.map = null;
        this.geoJSONLayers = {};
        this.markerLayers = {};

        // Bind class methods
        this.setTheme = this.setTheme.bind(this);
        this.updateMapThemes = this.updateMapThemes.bind(this);

    }

    componentDidMount() {
        // Initialise map
        this.init(this.mapNode);
    }

    componentDidUpdate() {
        if (this.props.themeChange){
            this.updateMapThemes();
        }
    }

    init(id) {
        // A reference to the leaflet map is stored in the component properties
        this.map = L.map(id, mapConfig.params);

        L.control.scale({ position: "bottomright"}).addTo(this.map);
        L.control.zoom({ position: 'topright' }).addTo(this.map);
        L.tileLayer(mapConfig.tileLayer.uri, mapConfig.tileLayer.params).addTo(this.map);

        // Add geojson data from the OSM API
        this.props.themes.forEach(theme => {
            this.setTheme(theme);
        });
    }

    /**
    * Sets a geojson theme as a layer on the mapNode
    * @param {object} theme - A theme description object
    */
    setTheme(theme) {
        this.APIService.getTheme(theme, (error, osmData) => {
            if (!error && osmData.features !== undefined) {

                /* A reference to a geojson layer is stored in the class prop geoJSONLayers object
                in the format {layerName: <instance of L.Layer>}, this allows us to reference
                it later when we want to add / remove layers from the map.
                 */
                this.geoJSONLayers[theme.name] = L.geoJSON(osmData, {
                    onEachFeature: this.onEachFeature
                }).addTo(this.map);

                /* The geojson data received from OSM may include both points (nodes) and polygons(ways), but
                 leaflet only adds markers to points by default. So we need to add markers to the polygon
                 centroids.  Marker layers are stored as a layerGroup as this allows us to add / remove
                 all markers at once.  The reference to the layerGroup is stored in the class prop markerLayers
                 in the format {layerGroupName: <instance of L.LayerGroup}.
                 */
                this.markerLayers[theme.name] = L.layerGroup();
                this.geoJSONLayers[theme.name].eachLayer(layer => {
                    if (layer.feature.geometry.type === 'Polygon') {
                        let bounds = layer.getBounds();
                        let center = bounds.getCenter();
                        let marker = L.marker(center);
                        marker.bindPopup(Popup(layer.feature.properties));
                        this.markerLayers[theme.name].addLayer(marker);
                    }
                });
                this.markerLayers[theme.name].addTo(this.map);
            }
        })
    }
                                                                               
    onEachFeature(feature, layer) {
        if (feature.properties.name) {
            layer.bindPopup(Popup(layer.feature.properties))
        }
     }

    /**
     * Adds / removes a layer from the map based on the themeChange object
     * passed to the component - {themeName: status}, where status is either
     * true (visible) or false (not visible)
     */
    updateMapThemes() {
        let themeName = Object.keys(this.props.themeChange)[0];
        let themeStatus = this.props.themeChange[themeName];

        if (themeStatus) {
            try {
                this.map.addLayer(this.geoJSONLayers[themeName]);
                // Also add any marker layers
                this.map.addLayer(this.markerLayers[themeName]);
            } catch (ex) {
                /* No action taken on the exception.  Here, we are just trying to catch Leaflet errors caused by
                passing a dud link to a layer, which will cause Leaflet to complain.
                 */
            }
        }
        else {
            try {
                this.map.removeLayer(this.geoJSONLayers[themeName]);
                this.map.removeLayer(this.markerLayers[themeName]);
            }
            catch (ex) {
                // Ignoring this exception - see comment above
            }
        }
    }

    render() {
        return <div ref={(node) => this.mapNode = node} id="map" />;
    }
}
