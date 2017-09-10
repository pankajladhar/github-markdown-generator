import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    handleClick: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
}
const defaultProps = {
    className: ""
}

export default class Button extends PureComponent {
    render() {
        return (
                <input type="button"
                    className={`button ${this.props.className}`.trim()}
                    name={this.props.name} 
                    onClick={this.props.handleClick} 
                    title={this.props.title}
                    value={this.props.value} />
        );
    }
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;
