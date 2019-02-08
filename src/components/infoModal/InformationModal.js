import React from 'react';

export default class InformationModal extends React.Component {

    render() {

        const element = (
            <div className="modal fade" id="infoModal" tabindex="-1" role="dialog"
                 aria-labelledby="modalTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalTitle">Fairer Falkrik Services  TBC..</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            TBC..
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

