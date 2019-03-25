const helpAdvice = {
    Name: "helpAdvice",
    Title: "Example Theme - Community Information and Advice ",
    Headline: "Shows locations of places where advice is provided",
    Description: "Shows community based help and advice offices",
    Author: "MartinClarke",
    AttributeTags: [
        {   attributeName: "Citizens Advice",
            attributeTag: "social_facility",
            attributeValues: ["citizens_advice"],
            icon: "hands-helping"
        },
        {
            attributeName: "Financial Support",
            attributeTag: "social_facility",
            attributeValues: ["financial_services"],
            icon: "hands-helping"
        },
        {
            attributeName: "Family Support & Social Advice",
            attributeTag: "social_facility",
            attributeValues: ["advice_service"],
            icon: "users"
        },
        {
            attributeName: "Mental Health Support",
            attributeTag: "healthcare",
            attributeValues: ["mental_health"],
            icon:"hands-helping"
        },
    ],
    overpassQuery: `[out:json];\
        (way["amenity"="social_facility"][~"^(healthcare|social_facility)$"~"(financial_services|advice_service|mental_health|citizens_advice)$"](around:20000,56.0019,-3.7893);\
        node["amenity"="social_facility"][~"^(healthcare|social_facility)$"~"(financial_services|advice_service|mental_health|citizens_advice)$"](around:20000,56.0019,-3.7893););\
        out body;>;out skel qt;`,
    mapConfig: {
         mapIcon: "hands-helping",
         color: "darkblue"
    }
};

const digiAccess = {
    Name: "digitalAccess",
    Title: "Example theme - Community Digital Access",
    Headline: "Shows community locations that provides access to digital Services",
    Description: "This theme shows community locations that provide access to digital services.  These include access to " +
    "printing facilities, access to computers for public use and Wifi / internet access",
    Author: "MartinClarke",
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
    helpAdvice, digiAccess
};
