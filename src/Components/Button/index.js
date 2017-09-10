import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    icon: PropTypes.string,
    name: PropTypes.string,
    handleClick: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
}
const defaultProps = {
    className: "",
    disabled: false
}

export default class Button extends PureComponent {
    render() {
        return (
                <button
                    className={`button ${this.props.className}`.trim()}
                    name={this.props.name} 
                    onClick={this.props.handleClick} 
                    title={this.props.title}
                    disabled={this.props.disabled}
                >
                {this.props.icon && <i className={`fa ${this.props.icon}`} aria-hidden="true"></i>}
                {!this.props.icon && this.props.value}
                </button>
        );
    }
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;
