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

export {
    school
};
