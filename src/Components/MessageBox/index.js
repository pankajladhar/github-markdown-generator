import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from './../Button';
import './MessageBox.scss';

const propTypes = {
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['error', 'success']),
    showMessageBox: PropTypes.bool,
    autoClosingTimeInterval: PropTypes.number
}

const defaultProps = {
    showMessageBox: false,
    autoClosingTimeInterval: 2000
}

export default class MessageBox extends PureComponent {
    
    constructor(props){
        super(props)
    }
    
    componentDidMount(){
        setTimeout(()=> {
            this.props.closeBtnProps.handleClick();
        }, this.props.autoClosingTimeInterval);
    }

    getMessageBoxClasses(){
        let isShowing = this.props.showMessageBox == true ? "show" : "hide";
        return `alert ${this.props.type} ${isShowing}`;
    }

    render() {
        return (
            <div className={this.getMessageBoxClasses()}>
                {
                    this.props.showMessageBox &&
                        <div>
                            {this.props.title}
                            <Button className="close-btn"
                                title={this.props.closeBtnProps.title}
                                value={this.props.closeBtnProps.value}
                                handleClick={this.props.closeBtnProps.handleClick}   
                            />
                        </div>
                }
            </div>
        );
    }
}

MessageBox.propTypes = propTypes;
MessageBox.defaultProps = defaultProps;
