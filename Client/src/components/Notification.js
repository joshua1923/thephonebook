import React from 'react';

const Notification = ({message, classValue}) => {
    if (message === null) {
       return null 
    }

    return (
        <div style={classValue}>
            {message}
        </div>
    )
}

export default Notification;