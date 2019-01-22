import query_overpass from "query-overpass";

export default class OverPassAPIService {
    getTheme(theme, callback) {
        const query = theme.definition.overpassQuery;
        const options = {
            // Flatten geojson structure
            flatProperties: true
        };

        query_overpass(query, callback, options);
    }
}
