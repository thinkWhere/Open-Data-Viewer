import React from 'react';
import './navbar.css';

export default class Navbar extends React.Component {
    render() {
        return (
            <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light navbar-component-top">
                <a className="navbar-brand" href="http://www.falkirk.gov.uk/services/people-communities/poverty-strategy.aspx"
                target="_blank" rel="noopener noreferrer">Fairer Falkirk - Alpha</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link"
                               href="http://www.falkirk.gov.uk/services/people-communities/poverty-strategy.aspx"
                               target="_blank" rel="noopener noreferrer">
                                About <span class="fa fa-info-circle"></span></a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}
