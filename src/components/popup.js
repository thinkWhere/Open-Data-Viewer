import React from 'react';
import ReactDOMServer from 'react-dom/server';
import './popup.css';

/**
 * React function component describes an OSM feature - name, address, phone, website
 * @param props - OSM feature properties
 * @return {React Component}
 */
function FeatureDetails(props) {
    const address = parseAddress(props.feature);
    const element = (
        <div>
            <h6 className="mb-0">{props.feature.name}</h6>
            <p className="mb-1 mt-0 text-muted">
                {address}<br/>
            </p>
            {props.feature.phone &&
            <div>
                <span className="fa fa-phone service-icon"></span>
                <span>{props.feature.phone}</span>
            </div>
            }
            {props.feature.website &&
            <div>
                <span className="fa fa-globe-europe service-icon"></span>
                <span><a href={props.feature.website} target="_blank" rel="noopener noreferrer">Website</a></span>
            </div>
            }
        </div>
    );
    return element;
}

/**
 * React function component describes the opening times of an OSM feature
 * @param props - OSM feature properties
 * @return {React Component}
 */
function OpeningTimes(props) {

    let openTimesList = props.feature.opening_hours ? props.feature.opening_hours.split(";") : null;
    let openTimesListElement = null;

    if (openTimesList) {
        if(openTimesList.length === 1){
            // Assume here we have a free text entry into the opening times tag, so return the text as is.
            openTimesListElement = (
                <tr key="{'open' + openTimesList.indexOf(oTime)}">
                    <td class="opening-times-td">{openTimesList[0]}</td>
                </tr>
            )
        }
        else {
            openTimesListElement = openTimesList.map((oTime) => {
                let splitTimes = oTime.trim().split(" ");
                let days = splitTimes[0];
                let times = splitTimes[1];
                let openTimesElement = (
                    <tr key="{'open' + openTimesList.indexOf(oTime)}">
                        <td class="opening-times-td">{days}</td>
                        <td class="opening-times-td">{times}</td>
                    </tr>
                )
                return openTimesElement;
            });
        }
    }

    const element = (
        <div class="pt-2"> {openTimesList &&
            <div>
                <a className="text-decoration-none text-reset" data-toggle="collapse" href="#address">
                    <em>Opening Times</em>
                    <span className="fa fa-chevron-down service-icon"></span>
                </a>
            </div>
            }
            <div className="collapse" id="address">
                <table class="table-sm">{openTimesListElement}</table>
            </div>
        </div>
    );
    return element;
}

/**
 * React function component describes the services associated with an OSM feature
 * @param props - OSM feature properties
 * @return {React Component}
 */
function Services(props) {
    let internetAccess = false;
    const internetTags = ['wlan', 'yes', 'terminal', 'wifi'];

    // Search for simple tags
    let internetTagValue = props.feature['internet_access'];
    if (internetTagValue && internetTags.includes(internetTagValue.toLowerCase())) {
        internetAccess = true;
    }

    // Search for compound tags
    // TODO search for compound tags for internet cost

    const element = (
        <div class="pt-2">
            <em>Services</em><br/>
            {internetAccess &&
            <div>
                <span className="fa fa-wifi service-icon"></span>
                <span>Internet Access</span>
            </div>
            }
        </div>

    );
    return element;
}

/**
 * React function component describes Wheelchair accessibility
 * @param props - OSM feature properties
 * @return {React Component}
 */
function WheelchairAccess(props) {
    let wheelchairAccess = props.feature['wheelchair'];
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
function Popup(props) {

    const element = (
            <div>
                <FeatureDetails feature={props} />
                <WheelchairAccess feature={props}/>
                <OpeningTimes feature={props} />
                <Services feature={props}/>
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
