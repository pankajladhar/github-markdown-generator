import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import { ActionData } from './../../utils/ActionData';
import ActionBar from './../ActionBar';

import './App.scss';

const propTypes = {}
const defaultProps = {}

export default class App extends Component {
    constructor(props) {
        super(props);
        this.actions = ActionData;
    }
    render() {
        return (
            <div>
                <div className="container">
                    <div className="editor-container">
                        <ActionBar actions={this.actions}/>
                        <div id="editor" 
                            className="editor markdown-body" 
                            onInput={this.onGenerateClick} 
                            contentEditable="true" ref={(editor) => { this.textEditor = editor }}>
                        </div>
                    </div>
                    <div className="result-container">
                        <textarea readOnly className="editor1"></textarea>
                    </div>
                </div>
            </div>
        );
    }
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;
