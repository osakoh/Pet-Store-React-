import React from 'react';
import PropTypes from 'prop-types'


// destructuring alert from props
const Alert = ({ alert }) => {
    return (
        // if alert is not null(true), show the div
        alert !== null && (
            <div className={`alert alert-${alert.type}`}>
                <i className="fas fa-info-circle"> {alert.msg}</i>
            </div>
        )
    )
}

// proTypes
Alert.propTypes = {
    alert: PropTypes.func.isRequired,
}
export default Alert
