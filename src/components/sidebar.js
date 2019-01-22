import React from 'react';
import {slide as Menu} from 'react-burger-menu';
import './sidebar.css';

export default class Sidebar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // Todo set themes from props passed from app
            digital: true
        };
        this.toggleTheme = this.toggleTheme.bind(this);
    }

    toggleTheme() {
        //todo get the active theme as function prop
        const currentState = this.state.digital;
        this.setState({digital: !currentState});
        this.setState((state) => {
            this.props.updateAppTheme('digital', state.digital);
        });
    }

    render() {
        return (
            <Menu noOverlay>
                <div className="menu-item">
                    <h3 className="theme-active">Services</h3>
                </div>
                <div className="menu-item">
                    <div className={this.state.digital ? 'theme-active media' : 'theme-disable media'}
                         onClick={this.toggleTheme} data-id="theme">
                        <span className="align-self-end mr-3 fa fa-2x fa-wifi"></span>
                        <div className="media-body">
                            <h5 className="mt-0 active">Digital Access</h5>
                        </div>
                    </div>
                </div>
            </Menu>
        );
    }
};