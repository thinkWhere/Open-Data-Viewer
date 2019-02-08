import React, { Component } from 'react';
import Map from './components/map/map';
import Sidebar from './components/sidebar/sidebar';
import Navbar from './components/navbar/navbar';
import './App.css';
import { digitalAccess } from './themes/digital-access';
import Spinner from './components/spinner/spinner';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            themeChange: null,
            dataLoaded: false
        };

        //todo get and set themes
        this.appThemes = [
            {
                name: 'digital',
                definition: digitalAccess
            }
        ];

        // Bind methods to class
        this.setThemeState = this.setThemeState.bind(this);
        this.onDataLoad = this.onDataLoad.bind(this);
    }

    setThemeState(theme, status) {
        this.setState({themeChange:{[theme]: status}});
    }

    onDataLoad() {
        this.setState({dataLoaded:true});
    }


    render() {
        return (
            <div>
                <Navbar/>
                <Sidebar updateAppTheme={this.setThemeState} themes={this.appThemes}/>
                <Spinner showSpinner={!this.state.dataLoaded}/>
                <div id="page-wrap">
                    <Map themes={this.appThemes} themeChange={this.state.themeChange} dataLoaded={this.onDataLoad} />
                </div>
            </div>
        )
    }
}

export default App;
