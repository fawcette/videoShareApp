import React from 'react'
import YouTube from 'react-youtube'
import socket from '../socket'
 
class Video extends React.Component {

    constructor () {
        super()
        this.state = {videoId: '92AEGJCuwXw', videoIdField: ''}
        socket.on('change-video', videoId => {
            this.setState({videoId})})
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleSubmit (event) {
        event.preventDefault()
        this.setState(prevState => (
            {videoId: prevState.videoIdField}
        ))
        socket.emit('change-video', this.state.videoIdField)
    }

    handleChange (event) {
        let textInput = event.target.value
        this.setState({videoIdField: textInput})
    }
 
    _onReady (event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo()
      }

    render () { 
        const opts = {
        height: '429',
        width: '704',
        playerVars: { // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
            mute: 0,
            muted: 0,
            allow: 'autoplay'
        }
        };
    
        return (
        <div>
            <YouTube
                videoId={this.state.videoId}
                opts={opts}
                onReady={this._onReady}
            />

            <form onSubmit={this.handleSubmit}>
                <label htmlFor='videoId'>
                    Video ID:
                </label>
                <input name='videoId' type='text' onChange={this.handleChange}/>

                <button type='submit'>Submit</button>
            </form>
        </div>
        );
    }
 
}

export default Video