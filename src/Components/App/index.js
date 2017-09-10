import React, { Component } from 'react';
import { ActionData } from './../../utils/ActionData';
import parser from './../../utils/parser';
import { execute, sanitizeHTMLString } from './../../utils/Helpers';
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
        this.handleMesaageBoxClose = this.handleMesaageBoxClose.bind(this);
        this.onCopyClick = this.onCopyClick.bind(this);
        this.onDownloadFileClick = this.onDownloadFileClick.bind(this);
    }

    componentDidMount() {
        this.textEditor.focus();
        editor.addEventListener("paste", function(e) {
            e.preventDefault();
            var text = e.clipboardData.getData("text/plain");
            document.execCommand("insertHTML", false, text);
        })
    }

    convertIntoMarkdown() {
        let sampleString = sanitizeHTMLString(document.getElementById('editor').innerHTML);
        sampleString.length ? this.setState({ btnDisabled : false }) : this.setState({ btnDisabled : true })
        try{
            document.querySelector('.result-container textarea').value = parser.parse(sampleString)
        } catch(err){
            console.log("err", err);
        }
    }

    handleMesaageBoxClose() {
        this.setState({ showMessageBox: false })
    }

    onDownloadFileClick() {
        let text = document.querySelector('.result-container textarea').value;

        let blob = new Blob([text], {type: 'application/octet-stream'});
        let blobURL = window.URL.createObjectURL(blob);
        let tempLink = document.createElement('a');
        tempLink.href = blobURL;
        tempLink.setAttribute('download', "README.md");
        tempLink.setAttribute('target', '_blank');
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);

    }

    onCopyClick() {
        document.querySelector('.result-container textarea').select();
        try {
            var successful = document.execCommand('copy');
            if(successful){
                this.setState({
                    showMessageBox: true,
                    type:  successful ? "success" : "error",
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
                        <textarea readOnly></textarea>
                    </div>
                    <MessageBox 
                        type={this.state.type}
                        title={this.state.title}
                        showMessageBox={this.state.showMessageBox}
                        closeBtnProps= {
                            {
                                value:"x",
                                title:"Close button",
                                handleClick: this.handleMesaageBoxClose
                            }
                        }
                    />
                </div>
            </div>
        );
    }
}
