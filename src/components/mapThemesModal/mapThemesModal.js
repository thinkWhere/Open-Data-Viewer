import React from 'react';
import './mapThemesModal.css';

export default class MapThemesModal extends React.Component {

    render() {
        let themeInformation = null;
        if (this.props.themes) {
            themeInformation = this.props.themes.map((theme) =>
                <div className="media" key={`mapThemesModal + ${this.props.themes.indexOf(theme)}`}>
                    <div className="icon-container">
                        <span className={`fa fa-2x fa-${theme.mapConfig.mapIcon} align-self-start`}></span>
                    </div>
                    <div className="media-body">
                        <h5 className="font-weight-bold">{theme.Title}</h5>
                        <p>{theme.Description}</p>
                    </div>
                </div>
            )
        }

        const element = (
            <div className="modal fade" id="themeModal" tabIndex="-1" role="dialog"
                 aria-labelledby="modalTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title font-weight-bold" id="modalTitle">Map Themes</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {themeInformation}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        );
        return element;
    }
}

