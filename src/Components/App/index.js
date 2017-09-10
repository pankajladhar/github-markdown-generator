import React, { Component } from 'react';
import { ActionData } from './../../utils/ActionData';
import parser from './../../utils/parser';
import { execute, sanitizeHTMLString, downloadAsFile, pastewithOutStyle } from './../../utils/Helpers';
import ActionBar from './../ActionBar';
import Button from './../Button';
import MessageBox from './../MessageBox';


import './App.scss';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.actions = ActionData;
        this.state = {
            showMessageBox: false,
            title: "",
            type: "success",
            btnDisabled: true
        };
        this.convertIntoMarkdown = this.convertIntoMarkdown.bind(this);
        this.handleMessageBoxClose = this.handleMessageBoxClose.bind(this);
        this.onCopyClick = this.onCopyClick.bind(this);
        this.onDownloadFileClick = this.onDownloadFileClick.bind(this);
    }

    componentDidMount() {
        this.textEditor.focus();
        pastewithOutStyle(this.textEditor)
    }

    convertIntoMarkdown() {
        let sampleString = sanitizeHTMLString(this.textEditor.innerHTML);
        sampleString.length ? this.setState({ btnDisabled : false }) : this.setState({ btnDisabled : true })
        try{
            this.resultContainer.value = parser.parse(sampleString)
        } catch(err){   
            this.setState({
                showMessageBox: true,
                type: "error",
                title : "You have entered some text which is not supported \n" + err.toString()
            });
        }
    }

    handleMessageBoxClose() {
        this.setState({ showMessageBox: false })
    }

    onDownloadFileClick() {
        downloadAsFile(this.resultContainer.value, 'README.md');
    }

    onCopyClick() {
        this.resultContainer.select();
        try {
            var successful = document.execCommand('copy');
            if(successful){
                this.setState({
                    showMessageBox: true,
                    type:  "success",
                    title : 'Copied Successfully',
                })
            }
            else{
                this.setState({
                    showMessageBox: true,
                    type: "error",
                    title : "Oops, unable to copy"
                })    
            }
            
        } catch (err) {
            this.setState({
                showMessageBox: true,
                type: "error",
                title : "Oops, unable to copy"
            })
        }
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="editor-container">
                        <ActionBar actions={this.actions}/>
                        <div id="editor" 
                            className="editor markdown-body" 
                            onInput={this.convertIntoMarkdown} 
                            contentEditable="true" ref={(editor) => { this.textEditor = editor }}>
                        </div>
                    </div>
                    <div className="result-container">
                        <div className="btn-wrapper">
                            <Button
                                icon="fa-copy"
                                className="action"
                                title="Copy Generated Markdown"
                                value="Copy Generated Markdown"
                                disabled={this.state.btnDisabled}
                                handleClick={this.onCopyClick}
                            />
                            <Button
                                icon="fa-download"
                                className="action"
                                title="Download as README.md file"
                                value="Download as README.md file"
                                disabled={this.state.btnDisabled}
                                handleClick={this.onDownloadFileClick}
                            />
                        </div>
                        <textarea ref={(result) => { this.resultContainer = result }} readOnly></textarea>
                    </div>
                    <MessageBox 
                        type={this.state.type}
                        title={this.state.title}
                        showMessageBox={this.state.showMessageBox}
                        closeBtnProps= {
                            {
                                value:"x",
                                title:"Close button",
                                handleClick: this.handleMessageBoxClose
                            }
                        }
                    />
                </div>
            </div>
        );
    }
}
