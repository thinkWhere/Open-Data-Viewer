import React from 'react';
import './navbar.css';

export default function Navbar() {
        const navbar = (
            <React.Fragment>
                <nav className="navbar fixed-top navbar-expand-sm navbar-dark bg-primary navbar-component-top navbar-style">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                    <a className="navbar-brand"
                       href="http://www.falkirk.gov.uk/services/people-communities/poverty-strategy.aspx"
                       target="_blank" rel="noopener noreferrer">Our Falkirk – Local Support Services</a>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <button type="button" className="btn btn-unstyled navbar-btn-style"
                                        data-toggle="modal" data-target="#infoModal">
                                    About <span className="fa fa-info-circle"></span></button>
                            </li>
                            <li className="nav-item">
                                <button type="button" className="btn btn-unstyled navbar-btn-style"
                                        data-toggle="modal" data-target="#themeModal">Map Themes</button>
                            </li>
                        </ul>
                    </div>
                </nav>
            </React.Fragment>
        );
        return navbar;
}
