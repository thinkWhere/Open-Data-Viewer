import { helpAdvice, digiAccess } from "./themes/example";

/* App config.
mapConfig stores options for Leaflet maps.   tileLayer defines the provider
for background mapping.
*/

const appConfig = {
    Title: "Open Data Viewer",
    SubTitle: "OpenSteetMap and Leaflet",
    Info: "An example open data web map using OpenSteetMap and Leaflet"
};

const mapConfig = {
    params: {
        center: [56.0019, -3.789],
        zoom: 13,
        attributionControl: true,
        zoomControl: false,
        maxBounds: ([[55.7, -4.3], [56.3, -3.1]]),
    },
    tileLayer: {
        uri: "https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png",
        params: {
            minZoom: 11,
            attribution: "&copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors &amp; <a href='https://wikimediafoundation.org/wiki/Maps_Terms_of_Use'>Wikimedia</a>",
            id: '',
            accessToken: ''
        },
    },
    search: {
        // Defines the parameter for OSM nominatim search
        // See https://wiki.openstreetmap.org/wiki/Nominatim for details on search params
        viewbox: "-3.9,55.9,-3.6,56.1",
        bounded: 1,
        limit: 10
    }
};

const appThemes = [helpAdvice, digiAccess];

export {
    mapConfig, appThemes, appConfig
};
