import React from 'react';
import './spinner.css';

export default (props) => {
    return (
        <React.Fragment>
            {props.showSpinner &&
                <div className="spinner-border text-secondary spinner-center" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            }
        </React.Fragment>
    );
}