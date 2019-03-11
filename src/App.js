import React, { Component } from 'react';
import Map from './components/map/map';
import Sidebar from './components/sidebar/sidebar';
import Navbar from './components/navbar/navbar';
import './App.css';
import { appThemes } from "./config"
import Spinner from './components/spinner/spinner';
import InformationModal from "./components/infoModal/informationModal";
import MapThemesModal from "./components/mapThemesModal/mapThemesModal";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            themeVisibility: {},
            themeToggle: {},
            dataLoaded: false,
            loadedThemes: []
        };

        // appThemes stores the available themes for the map
        this.appThemes = appThemes;

        // Bind methods to class
        this.setThemeState = this.setThemeState.bind(this);
        this.onDataLoad = this.onDataLoad.bind(this);
    }

    setThemeState(theme, status) {
        this.setState(
            {
                themeVisibility: {...this.state.themeVisibility, ...{[theme]: status}},
                themeToggle: {[theme] : status},
            });

    }

    onDataLoad(theme) {
        this.setState({dataLoaded:true});
        this.setThemeState(theme.Name, true);
        this.setState({loadedThemes: [...this.state.loadedThemes, theme]})
    }


    render() {
        return (
            <div>
                <InformationModal/>
                <MapThemesModal themes={this.state.loadedThemes}/>
                <Navbar/>
                {this.state.dataLoaded && <Sidebar updateAppTheme={this.setThemeState} themes={this.state.loadedThemes}
                                                   themeToggle={this.state.themeVisibility} />}
                <Spinner showSpinner={!this.state.dataLoaded}/>
                <div id="page-wrap">
                    <Map themes={this.appThemes} themeToggle={this.state.themeToggle} dataLoaded={this.onDataLoad} />
                </div>
            </div>
        )
    }
}

export default App;
