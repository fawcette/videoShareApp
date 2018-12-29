import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Video} from './index'

/**
 * COMPONENT
 */
export const Room = props => {
  const {username} = props

  return (
    <div>
      <h3>Welcome, {username}</h3>
      <Video />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.user.username
  }
}

export default connect(mapState)(Room)

/**
 * PROP TYPES
 */
Room.propTypes = {
  username: PropTypes.string
}
