import React, { PureComponent } from 'react';
//import PropTypes from 'prop-types';
import Button from './../Button'
import './App.scss';

const propTypes = {}
const defaultProps = {}

export default class App extends PureComponent {
    render() {
        return (
            <div>
                <Button />
            </div>
        );
    }
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;
