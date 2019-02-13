import React from 'react';
import './navbar.css';
import  InformationModal from '../infoModal/InformationModal';

export default class Navbar extends React.Component {
    render() {
        return (
            <div>
                <InformationModal/>
                <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light navbar-component-top">
                    <a className="navbar-brand"
                       href="http://www.falkirk.gov.uk/services/people-communities/poverty-strategy.aspx"
                       target="_blank" rel="noopener noreferrer">Fairer Falkirk - Alpha</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <button type="button" className="btn btn-unstyled"
                                        data-toggle="modal" data-target="#infoModal">
                                    About <span className="fa fa-info-circle"></span></button>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}
