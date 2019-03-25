const school = {
    Name: "schools",
    Title: "Example theme - Schools",
    Headline: "Shows locations of schools",
    Description: "An example OpenStreetMap theme, showing the location of schools.",
    Author: "Martin Clarke",
    AttributeTags: [
         {  attributeName: "Internet Access",
            attributeTag: "internet_access",
            attributeValues: ["wlan", "yes", "terminal", "wifi", "service"],
            icon: "wifi"
        }
        ],
    overpassQuery: `[out:json];\
        (way["amenity"~"(school)$"](around:5000,56.0019,-3.7893);\
        relation["amenity"~"(school)$"](around:5000,56.0019,-3.7893);\
        node["amenity"~"(school)$"](around:5000,56.0019,-3.7893););\
        out body;>;out skel qt;`,
    mapConfig: {
         mapIcon: "school",
         color: "blue"
    }
};


const digiAccess = {
    Name: "digitalAccess",
    Title: "Digital Access",
    Headline: "Shows locations of places that provides access to digital Services",
    Description: "This theme shows locations that provide access to digital services.  These include access to " +
    "printing facilities, access to computers for public use and Wifi / internet access",
    Author: "MartinClarke",
    OSMFeatures: ["ways", "relations", "nodes"],
    GeoTags: {
        "amenity": ["library", "community_centre"]
    },
    AttributeTags: [
         {  attributeName: "Internet Access",
            attributeTag: "internet_access",
            attributeValues: ["wlan", "yes", "terminal", "wifi", "service"],
            icon: "wifi"
        },
        {   attributeName: "Printing Facilities",
            attributeTag: "digital_access",
            attributeValues: ["printer"],
            icon: "print"
        },
        {   attributeName: "Computer Access",
            attributeTag: "digital_access",
            attributeValues: ["computer"],
            icon: "desktop"
        },
        {   attributeName: "Membership Required",
            attributeTag: "digital_access:membership",
            attributeValues: ["yes"],
            icon: "exclamation",
            iconColor: "red"
        },

    ],
    overpassQuery: `[out:json];\
        (way["amenity"~"(library|community_centre)$"][~"^(internet_access|digital_access)$"~"."](around:20000,56.0019,-3.7893);\
        node["amenity"~"(library|community_centre)$"][~"^(internet_access|digital_access)$"~"."](around:20000,56.0019,-3.7893););\
        out body;>;out skel qt;`,
    mapConfig: {
         mapIcon: "wifi",
         color: "blue"
    }
    };

export {
    school, digiAccess
};
