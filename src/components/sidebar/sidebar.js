import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './sidebar.css';
import 'leaflet.awesome-markers/dist/leaflet.awesome-markers.css';

export default class Sidebar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.toggleTheme = this.toggleTheme.bind(this);
    }

    /**
     * React lifecycle hook is used to check if themes property has changed; new themes are
     * added to the state and set to true (i.e. visible) by default
     * @param {object} prevProps - The previous component properties, passed automatically by react
     */
    componentDidUpdate(prevProps) {
        if (prevProps.themes !== this.props.themes) {
            this.props.themes.forEach((theme) => {
                // We set a state object for each theme which records whether the theme is active (i.e. visible)
                this.setState({[theme.Name]: true});
            });
        }}

    /**
     * Toggles a theme between true (visible) or false (not visible)
     * @param themeName
     */
    toggleTheme(themeName) {
        let currentState = this.state[themeName];
        this.setState({[themeName]: !currentState});
        this.setState((state) => {
            this.props.updateAppTheme(themeName, state[themeName]);
        });
    }

    render() {
        const menuItems = this.props.themes.map((theme) =>
            <div className="menu-item" key="{'menuItem' + this.props.themes.indexOf(theme)}">
                <div className={this.state[theme.Name] ? 'theme-active media' : 'theme-disable media'}
                     onClick={((e) => this.toggleTheme(theme.Name))} data-id={theme.Name}>
                    <div className={`align-self-end mr-3 awesome-marker-icon-${theme.mapConfig.color} awesome-marker`}>
                        <i className={`fa fa-${theme.mapConfig.mapIcon} icon-white fa-inverse`}></i>
                    </div>
                    <div className="media-body">
                        <h5 className="mt-2 active">{theme.Title}</h5>
                    </div>
                </div>
            </div>
        );

        return (
            <Menu noOverlay>
                <div className="menu-item">
                    <h3 className="theme-active">Services</h3>
                </div>
                {menuItems}
            </Menu>
        );
    }
};