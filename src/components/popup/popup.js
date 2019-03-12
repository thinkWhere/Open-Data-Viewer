import React from 'react';
import ReactDOMServer from 'react-dom/server';
import './popup.css';

/**
 * React function component describes an OSM feature name and address
 * @return {React Component}
 */
function AddressDetails(props) {
    const address = parseAddress(props);
    return (
        <React.Fragment>
            <h6 className="mb-0">{props.name}</h6>
            {address &&
                <p className="mb-1 mt-0 text-muted">
                    {address}<br/>
                </p>
            }
        </React.Fragment>
    );
}

/**
 * React function component describes an OSM feature deatails- phone, website
 * @param props - OSM feature properties
 * @return {React Component}
 */
function FeatureDetails(props) {
    const hasFeatureDetails = !!(props.phone || props.website || props.wheelchair);
    if (!hasFeatureDetails) { return null };

    const featureDetails = (
        <React.Fragment>
            {props.phone &&
                <div>
                    <span className="fa fa-phone service-icon"></span>
                    <span>{props.phone}</span>
                </div>
            }
            {props.website &&
                <div>
                    <span className="fa fa-globe-europe service-icon"></span>
                    <span><a href={props.website} target="_blank" rel="noopener noreferrer">Website</a></span>
                </div>
            }
        </React.Fragment>
    );

    return (
        <div className="pt-2"> {hasFeatureDetails &&
            <div>
                <a className="text-decoration-none text-reset" data-toggle="collapse" href="#featureDetails">
                    <em>Details</em>
                    <span className="fa fa-chevron-down service-icon"></span>
                </a>
            </div>
            }
            <div className="collapse" id="featureDetails">
                <table className="table-sm">{featureDetails}</table>
                <WheelchairAccess {...props}/>
            </div>
        </div>
    );
}


/**
 * React function component describes the opening times of an OSM feature
 * @param props - OSM feature properties
 * @return {React Component}
 */
function OpeningTimes(props) {

    let openTimesList = props.opening_hours ? props.opening_hours.split(";") : null;
    let serviceTimesList = props.service_times ? props.service_times.split(";") : null;
    if (serviceTimesList) {
        /* We make a decision here that service times overrides opening times.   We could display both but 'srvice times
        may be confusing to the user */
        openTimesList = serviceTimesList;
    }

    let openTimesListElement = null;

    if (openTimesList) {
        if(openTimesList.length === 1){
            // Assume here we have a free text entry into the opening times tag, so return the text as is.
            openTimesListElement = (
                <tr>
                    <td className="opening-times-td">{openTimesList[0]}</td>
                </tr>
            )
        }
        else {
            openTimesListElement = openTimesList.map((oTime) => {
                let splitTimes = oTime.trim().split(" ");
                let days = splitTimes[0];
                let times = splitTimes[1];
                let openTimesElement = (
                    <tr key={`open + ${openTimesList.indexOf(oTime)}`}>
                        <td className="opening-times-td">{days}</td>
                        <td className="opening-times-td">{times}</td>
                    </tr>
                );
                return openTimesElement;
            });
        }
    }

    const element = (
        <div className="pt-2"> {openTimesList &&
            <div>
                <a className="text-decoration-none text-reset" data-toggle="collapse" href="#address">
                    <em>Opening Times</em>
                    <span className="fa fa-chevron-down service-icon"></span>
                </a>
            </div>
            }
            <div className="collapse" id="address">
                <table className="table-sm">{openTimesListElement}</table>
            </div>
        </div>
    );
    return element;
}

/**
 * React function component describes the attributes associated with an OSM feature
 * @param props - OSM feature properties
 * @return {React Component}
 */
function ThemeDetails(props) {
    let themeDetailsList = [];

    for (let attribute of props.theme.AttributeTags) {
        let featureTagValue = props.props[attribute.attributeTag];
        if (!featureTagValue) {
            continue;
        }

        /* The tag value might be a ';' delimited list (An osm convention) so we need to check for
         this possibility */
        let featureTagList = featureTagValue.split(';');

        let attributeValuesList = attribute.attributeValues;
        let attributeType = attribute.type;

        let featureHasAttributeValue = false;
        if (attributeValuesList.length === 0 ) {
            // Empty list in config signifies that all values are permitted
            featureHasAttributeValue = true;
        } else {
            for (let tag of featureTagList) {
                if (attributeValuesList.includes(tag.toLowerCase())) {
                    featureHasAttributeValue = true;
                    break;
                }
            }
        }

        if (featureHasAttributeValue) {
            let attributeDetail = (
                <div className="pt-1" key={attribute.attributeName}>
                    {(attributeType && attributeType === "description")
                        ? <div className="media">
                            <div className="feature-icon-container d-flex justify-content-center">
                                <div>
                                    <span className={`fa fa-${attribute.icon}`} style={{color: attribute.iconColor}}></span>
                                </div>
                            </div>
                            <div className="media-body">
                                {featureTagValue}
                            </div>
                        </div>
                        : <div className="media">
                            <div className="feature-icon-container d-flex justify-content-center">
                                <div>
                                    <span className={`fa fa-${attribute.icon} icon-centre`} style={{color: attribute.iconColor}}></span>
                                </div>
                            </div>
                            <div className="media-body">
                                {attribute.attributeName}
                            </div>
                        </div>
                    }
                </div>
            );
            themeDetailsList.push(attributeDetail);
        }
    }

    if (themeDetailsList.length > 0) {
        const element = (
            <div className="pt-1">
                <div>
                    <em>{props.theme.Title}</em><br/>
                    {themeDetailsList}
                </div>
            </div>
        );
        return element;
        } else {
            return null;
        }
    }

/**
 * React function component describes Wheelchair accessibility
 * @param props - OSM feature properties
 * @return {React Component}
 */
function WheelchairAccess(props) {
    let wheelchairAccess = props['wheelchair'];
    if (!wheelchairAccess) {return null};

    const element = (
        <div>
            {wheelchairAccess.toLowerCase() === 'yes' &&
            <div>
                <span className="fa fa-wheelchair service-icon wheelchair-access"></span>
                <span>Wheelchair Accessible</span>
            </div>

            }
            {wheelchairAccess.toLowerCase() === 'no' &&
            <div>
                <span className="fa fa-wheelchair service-icon wheelchair-no-access"></span>
                <span>No wheelchair access</span>
            </div>
            }
            {wheelchairAccess.toLowerCase() === 'limited' &&
            <div>
                <span className="fa fa-wheelchair service-icon wheelchair-partial-access"></span>
                <span>Limited wheelchair access</span>
            </div>
            }
        </div>
    );

    return element;
}

/**
 * React Function component defines an information popup for Leaflet
 * @param props - osm feature props
 * @return {string} The react element rendered as a string
 */
function Popup(props, theme) {

    const element = (
            <div>
                <AddressDetails {...props}/>
                <ThemeDetails props={props} theme={theme}/>
                <FeatureDetails {...props} />
                <OpeningTimes {...props} />
            </div>
    );
    // Return a string as this is format required by leaflet to bind to a feature
    return ReactDOMServer.renderToString(element);
}


/**
 * Parse OSM address tags from format <"addr:city":"cityName"> to an address string
 * @param props - osm feature properties
 * @return {string} Parsed address object "housenumber, street, place, city, postcode"
 */
function parseAddress(props){

    /* A Map() data structure allows us to add address details in the order we want to
    return them went we iterate over the Map object, this allowing us to return the address
    in a defined hierarchy
    */
    let addressDetails = new Map();

    addressDetails.set('housenumber', null);
    addressDetails.set('street', null);
    addressDetails.set('place', null);
    addressDetails.set('city', null);
    addressDetails.set('postcode', null);

    const addressTags = ["housenumber", "street", "place", "city", "postcode"];
    // Populate our parsedAddress object with address details
    Object.keys(props).forEach(addressTag => {
        let addr = addressTag.split(":")[1];  // AddressTag will be in the form "addr:xx"
        if (addressTags.includes(addr)) {
            addressDetails.set(addr, props[addressTag]);
        }
    });

    let addressItems = [];
    for (let value of addressDetails.values()) {
        if (value !=null) {
            addressItems.push(value);
        }
    }
    return addressItems.join(', ');
}

export {
    Popup
};
