import React from 'react';

export default function InformationModal() {

    const infoModal = (
        <div className="modal fade" id="infoModal" tabIndex="-1" role="dialog"
             aria-labelledby="modalTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title font-weight-bold" id="modalTitle">Our Falkirk - Local Support
                            Services</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>
                            TBC..
                        </p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
    return infoModal;
}

