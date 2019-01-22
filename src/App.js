import React, { Component } from 'react';
import Map from "./components/map";
import Sidebar from "./components/sidebar";
import Navbar from './components/navbar';
import './app.css';
import { digitalAccess } from "./themes/digital-access";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            themeChange: null
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
    }

    setThemeState(theme, status) {
        this.setState({themeChange:{[theme]: status}});
    }

    render() {
        return (
            <div>
                <Navbar/>
                <Sidebar updateAppTheme={this.setThemeState} themes={this.appThemes}/>
                <div id="page-wrap">
                    <Map themes={this.appThemes} themeChange={this.state.themeChange} />
                </div>
            </div>
        )
    }
}

export default App;
