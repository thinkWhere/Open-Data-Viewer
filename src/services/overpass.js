import query_overpass from "query-overpass";
import { digitalAccess } from "../themes/digital-access";

export default class OverPassAPIService {
    getTheme(callback) {
        const query = digitalAccess.overpassQuery;
        const options = {
            // Flatten geojson structure
            flatProperties: true
        };

        query_overpass(query, callback, options);
    }
}
