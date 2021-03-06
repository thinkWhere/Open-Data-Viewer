import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './sidebar.css';
import 'leaflet.awesome-markers/dist/leaflet.awesome-markers.css';

export default class Sidebar extends React.Component {

    constructor(props) {
        super(props);
        this.switchTheme = this.switchTheme.bind(this);
    }

    /**
     * Toggles a theme between true (visible) or false (not visible)
     * @param themeName
     */
    switchTheme(themeName) {
        const currentState = this.props.themeToggle[themeName];
        this.props.updateAppTheme({[themeName]: !currentState});
    }

    generateMenuItems() {
        return (this.props.themes.map((theme) =>
            <div className="menu-item" key="{'menuItem' + this.props.themes.indexOf(theme)}">
                <div className={this.props.themeToggle[theme.Name] ? 'theme-active media' : 'theme-disable media'}
                     onClick={((e) => this.switchTheme(theme.Name))} data-id={theme.Name}>
                    <div className={`align-self-end mr-3 awesome-marker-icon-${theme.mapConfig.color} awesome-marker`}>
                        <i className={`fa fa-${theme.mapConfig.mapIcon} icon-white fa-inverse`}></i>
                    </div>
                    <div className="media-body">
                        <h6 className="mt-2 active">{theme.Title}</h6>
                    </div>
                </div>
            </div>
        ));
    }

    render() {
        return (
            <Menu noOverlay>
                <div className="menu-item">
                    <h4 className="theme-active">Our Services</h4>
                </div>
                {this.generateMenuItems()}
            </Menu>
        );
    }
};