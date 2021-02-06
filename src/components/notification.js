import React from 'react'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  } else {
    var styleColor = 'green'
    if (message.includes('wrong' || 'already')){
      styleColor = 'red'
    }
    const msgstyle = {
      color: styleColor,
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    }
    return (
      <div style = {msgstyle}>
        {message}
      </div>
    )
  }
}

export default Notification