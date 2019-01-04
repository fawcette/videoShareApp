import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Video} from './index'

/**
 * COMPONENT
 */
export class Room extends React.Component {

    constructor () {
        super()
    }

    render () {
        const {username} = this.props

        console.log(this.props)

        return (
            <div>
            <h3>Welcome, {username}</h3>
            <Video roomId = {this.props.match.params.username}/>
            </div>
        )
    }
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
