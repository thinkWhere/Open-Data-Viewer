import React from 'react';
import { appConfig } from '../../config';

export default () => {
    return (
        <div className="modal fade" id="infoModal" tabIndex="-1" role="dialog"
             aria-labelledby="modalTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title font-weight-bold" id="modalTitle">{appConfig.Title} - {appConfig.SubTitle}</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>
                            <span className="font-weight-bold">Our Falkirk</span> can help you find the location of useful local support services in Falkirk.
                        </p>
                        <p>
                            You can use the menu on the left hand side of the screen to select the type of service you
                            would like to see and these will be highlighted on the map. Simply click on a point on the
                            map to view the details of that service including its address and opening times.
                        </p>
                        <p className="lead font-italic text-danger">
                            Disclaimer – This map has been developed as a community tool. Falkirk Council doesn’t
                            endorse or verify the services displayed and would encourage users to contact individual
                            services directly for more information.
                        </p>
                        <p>
                            If you have any questions, comments or feedback please get in touch.
                        </p>
                        <p>
                            <a href="mailto:fairerfalkirk@falkirk.gov.uk">fairerfalkirk@falkirk.gov.uk</a>
                        </p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

