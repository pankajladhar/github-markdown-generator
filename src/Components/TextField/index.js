import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './TextField.scss';

const propTypes = {
    type: PropTypes.oneOf(['text', 'password', 'search']).isRequired,
    handleChange: PropTypes.func.isRequired,
}
const defaultProps = {    
    className: '',
}

export default class TextField extends PureComponent {
    render() {
        return (
                <input type={this.props.type} 
                    className={this.props.className.trim()}
                    name={this.props.name}
                    placeholder={this.props.placeholder}
                    onChange={this.props.handleChange}
                />
        );
    }
}

TextField.propTypes = propTypes;
TextField.defaultProps = defaultProps;
