# Application Configuration and Setup

The configuration for this project is split between an application config, that controls the map options and what
data to include, and individual 'map theme' definitions.   The map themes describe the type of data to load from 
OSM via the Overpass API.


## App Config
The coniguration for the app is stored in the file src/themes/config.js

The mapConfig sets the configuration options for leaflet. 
Here, there are options to set the map centre when the application loads, the initial zoom level and the map bounds. 
The most important options here set the map centre and bounds:

`center: [56.0019, -3.789]`   - sets the map centre to the specified lat / long
 `maxBounds: ([[55.7, -4.3], [56.3, -3.1]])`  - sets the bounding box of the map canvas

For more information see the leaflet [documentation](https://leafletjs.com/reference-1.4.0.html#map-factory) 

The tileLayer options sets the source of the background map tiles.  The default tileserver we are using is from 
[wikimedia](https://maps.wikimedia.org).  The application is agnostic to the tileLayer used - there are a number 
of different options here, including the OSM project or commercial services provided by organisations such as 
[MapBox](https://www.mapbox.com/). * Note for commercial services ensure the 'accessToken' option has been completed.

`accessToken: ''` - my access token goes here

The 'appThemes' list specifies what map themes the application will load.   These themes are defined in separate files
within the src/themes folder.  The theme files must be included in the import statement for the config.js file 
before they can be referenced in the appThemes list. (see the example usage below.)

`import { example } from "./themes/example"`

`...`

`const appThemes = [example];`


## Defining Map Themes

Map themes are stored as separate JavaScipt files, that reside in the src/themes folder. 

An example theme is listed in src/themes/example.js

The theme object is a Javascript object specifying the name, title, description and the OpenStreetMap OverPass query 
used to query the data on the OpenStreetMap servers. 

The different options for the theme definition are described below: 

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |




