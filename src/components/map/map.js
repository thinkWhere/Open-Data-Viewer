import React from 'react';
import L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet-geosearch/assets/css/leaflet.css';
import './map.css';
import 'leaflet.awesome-markers';
import 'leaflet.awesome-markers/dist/leaflet.awesome-markers.css';
import { mapConfig }from '../../config.js';
import OverPassAPIService  from '../../services/overpass.js';
import { Popup } from "../popup/popup";

export default class Map extends React.Component {
    constructor(props) {
        super(props);

        this.mapNode = null;
        this.APIService = new OverPassAPIService();
        this.map = null;
        this.geoJSONLayers = {};
        this.loadingTheme = null;

        // Bind class methods
        this.setTheme = this.setTheme.bind(this);
        this.updateMapThemes = this.updateMapThemes.bind(this);
        this.createCustomMarker = this.createCustomMarker.bind(this);
        this.bindCustomPopup = this.bindCustomPopup.bind(this);
    }

    componentDidMount() {
        // Initialise map
        this.init(this.mapNode);
    }

    componentDidUpdate() {
        if (this.props.themeToggle){
            this.updateMapThemes();
        }
    }

    init(id) {
        // A reference to the leaflet map is stored in the component properties
        this.map = L.map(id, mapConfig.params);

        L.control.scale({ position: "bottomright"}).addTo(this.map);
        L.control.zoom({ position: 'topright' }).addTo(this.map);
        L.tileLayer(mapConfig.tileLayer.uri, mapConfig.tileLayer.params).addTo(this.map);

        const zoomReset = this.setResetZoom();
        this.map.addControl(zoomReset);

        const searchControl = this.setLocationSearch();
        this.map.addControl(searchControl);

        // Add geojson data from the OSM API
        this.props.themes.forEach(theme => {
            this.setTheme(theme);
        });
    }

    /**
     * Set the OSM Nominatim search control
     */
    setLocationSearch() {
        let params = mapConfig.search;
        let provider = new OpenStreetMapProvider({params: params});
        let searchControl = new GeoSearchControl({
            provider: provider,
            style: 'button',
            position: 'topright',
            searchLabel: 'Search for a location or feature',
            autoClose: true,
            keepResult: true
        });

        return searchControl;
    }

    /**
     * Defines a custom zoom control to reset map to default zoom
     * @return {L.Control}
     */
    setResetZoom() {
        let control = new L.Control({position: 'topright'});
        control.onAdd = map => {
            let controlDiv = L.DomUtil.create('div', 'leaflet-control-zoom leaflet-bar leaflet-control');
            let controlZoomReset = L.DomUtil.create('a', 'leaflet-control-zoom fa fa-globe fa-2x', controlDiv);
            controlZoomReset.title = "Reset Map View";

            L.DomEvent
                .addListener(controlZoomReset, 'click', function () {
                    map.setView(map.options.center, map.options.zoom);
                }, controlZoomReset);
            return controlDiv;
        };
        return control;
    }


    /**
    * Sets a geojson theme as a layer on the mapNode
    * @param {object} theme - A theme description object
    */
    setTheme(theme) {
        this.APIService.getTheme(theme, (error, osmData) => {
            if (!error && osmData.features !== undefined) {
                this.loadingTheme = theme;

                /* A reference to a geojson layer is stored in the class prop geoJSONLayers object
                in the format {layerName: <instance of L.Layer>}, this allows us to reference
                it later when we want to add / remove layers from the map.
                 */
                this.geoJSONLayers[theme.Name] = L.geoJSON(osmData, {
                    onEachFeature: this.bindCustomPopup,
                    pointToLayer: this.createCustomMarker
                });

                /* The geojson data received from OSM may include both points (nodes) and polygons(ways), but
                leaflet only adds markers to points by default. To get around this, points are created for each
                polygon centroid and then added to the osm geojson layer.
                */
                const geoJSONPointLayers = this.createGeoJSONPoints(this.geoJSONLayers[theme.Name]);

                geoJSONPointLayers.forEach((geoJSONLayer) => {
                    geoJSONLayer.eachLayer(layer => {
                        this.geoJSONLayers[theme.Name].addLayer(layer)
                    })
                });

                this.geoJSONLayers[theme.Name].addTo(this.map);
                this.props.dataLoaded(theme);
            }
        })
    }

    /**
     * Converts any polygon features within an L.geoJSON layer to a point based on the polygon centroid.
     * Feature properties from the polygon are copied across to the point, and custom markers and popups added
     * @param {L.geoJSON} geoJSONLayer
     * @return {Array} - Array of L.GeoJSON objects
     */
    createGeoJSONPoints(geoJSONLayer) {
        let geoJSONPoints = [];
        geoJSONLayer.eachLayer(layer => {
            if (layer.feature.geometry.type === 'Polygon') {
                const polygonProps = layer.feature.properties;
                const bounds = layer.getBounds();
                const center = bounds.getCenter();
                const marker = new L.marker(center);
                const markerGeoJson = marker.toGeoJSON();

                let pointLayer = L.geoJSON(markerGeoJson, {
                    pointToLayer: this.createCustomMarker,
                    onEachFeature: (feature, layer) => {
                    // Copy across the feature properties from the polygon to point
                        layer.feature.properties = polygonProps;
                        if (feature.properties.name) {
                            layer.bindPopup(Popup(layer.feature.properties, this.loadingTheme))
                        }
                    }
                });
                geoJSONPoints.push(pointLayer);
            }
        });
        return geoJSONPoints;
    }

    /**
     * Creates custom AwesomeMarker at specified lat / long
     * @param feature - geoJSON point feature passed by leaflet by default
     * @param {L.latlng} latlng - feature coordinates in lat / long
     * @return {L.marker}
     */
    createCustomMarker(feature, latlng) {
        let awesomeMarker = L.AwesomeMarkers.icon({
            icon: this.loadingTheme.mapConfig.mapIcon,
            markerColor: this.loadingTheme.mapConfig.color,
            prefix: 'fa',
        });
        return L.marker(latlng, {icon:awesomeMarker})
    }

    /**
     * Binds a popup to a geojson point feature.  Polygon geometries are ignored
     * @param feature
     * @param {L.geoJSON} layer
     */
    bindCustomPopup(feature, layer) {
        if (layer.feature.geometry.type === 'Polygon') {
            // Popups are limited to point features only
            return;
        }

        if (feature.properties.name) {
            layer.bindPopup(Popup(layer.feature.properties, this.loadingTheme))
        }
    }

    /**
     * Adds / removes a layer from the map based on the themeChange object
     * passed to the component - {themeName: status}, where status is either
     * true (visible) or false (not visible)
     */
    updateMapThemes() {
        const themeName = Object.keys(this.props.themeToggle)[0];
        const themeStatus = this.props.themeToggle[themeName];

        if (themeStatus) {
            try {
                this.map.addLayer(this.geoJSONLayers[themeName]);
            } catch (ex) {
                /* No action taken on the exception.  Here, we are just trying to catch Leaflet errors caused by
                passing a dud link to a layer, which will cause Leaflet to complain.
                 */
            }
        }
        else {
            try {
                this.map.removeLayer(this.geoJSONLayers[themeName]);
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
