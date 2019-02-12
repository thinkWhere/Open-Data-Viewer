import React, { Component } from 'react';
import Map from './components/map/map';
import Sidebar from './components/sidebar/sidebar';
import Navbar from './components/navbar/navbar';
import './App.css';
import { appThemes } from "./config"
import Spinner from './components/spinner/spinner';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            themeChange: null,
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
        this.setState({themeChange:{[theme]: status}});
    }

    onDataLoad(theme) {
        this.setState({dataLoaded:true});
        this.setState({loadedThemes: [...this.state.loadedThemes, theme]})
    }


    render() {
        return (
            <div>
                <Navbar/>
                <Sidebar updateAppTheme={this.setThemeState} themes={this.state.loadedThemes}/>
                <Spinner showSpinner={!this.state.dataLoaded}/>
                <div id="page-wrap">
                    <Map themes={this.appThemes} themeChange={this.state.themeChange} dataLoaded={this.onDataLoad} />
                </div>
            </div>
        )
    }
}

export default App;
