import React from 'react';
import './spinner.css';

export default class Spinner extends React.Component {

    render() {
        const element = (
            <div>
            {this.props.showSpinner &&
            <div className="spinner-border text-secondary spinner-center" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            }
            </div>
        );
        return element;
    }
}
