/* App config.
mapConfig stores options for Leaflet maps.   tileLayer defines the provider
for background mapping.
*/

let mapConfig = {};
mapConfig.params = {
    center: [56.0019, -3.789],
    zoom: 13,
    maxZoom: 19,
    minZoom: 11,
    attributionControl: true,
    zoomControl: false
};
mapConfig.tileLayer = {
    uri: "https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png",
    params: {
        minZoom: 11,
        attribution: "&copy; OpenStreetMap contributors &amp; <a href=&quot;https://wikimediafoundation.org/wiki/Maps_Terms_of_Use&quot;>Wikimedia</a>",
        id: '',
        accessToken: ''
    }
};

export {
    mapConfig
};
