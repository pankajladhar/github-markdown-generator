import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from './../Button';
import './ActionBar.scss';

const propTypes = {
    actions: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        handleClick: PropTypes.func.isRequired
    })).isRequired
}
const defaultProps = {}

export default class ActionBar extends PureComponent {
    render() {
        return (
            <div className="actionbar-container">
                 {this.props.actions.map((action, index) => {
                     return <Button key={index} 
                                className="action"
                                handleClick={action.handleClick} 
                                value={action.value}
                                title={action.title}
                            />
                })}
            </div>
        );
    }
}

ActionBar.propTypes = propTypes;
ActionBar.defaultProps = defaultProps;
