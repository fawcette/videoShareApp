import React from 'react'
import YouTube from 'react-youtube'
import socket from '../socket'
 
class Video extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            videoId: '92AEGJCuwXw', 
            videoIdField: '',
            videoPlayerTime: 0
        }
        this.videoPlayer = {}
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this._onStateChange = this._onStateChange.bind(this)
        this._onReady = this._onReady.bind(this)
        socket.on('change-video', videoId => {this.setState({videoId})})
        socket.on('get-video-time', videoPlayerTime => {
            if (Math.abs(videoPlayerTime - this.videoPlayer.getCurrentTime()) > 0.5) {
                this.videoPlayer.seekTo(videoPlayerTime)
            }
        })
    }

    componentDidMount () {
        socket.emit('join-room', this.props.roomId)
    }

    handleSubmit (event) {
        event.preventDefault()
        this.setState(prevState => (
            {videoId: prevState.videoIdField}
        ))
        socket.emit('change-video', this.state.videoIdField, this.props.roomId)
    }

    handleChange (event) {
        let textInput = event.target.value
        this.setState({videoIdField: textInput})
    }

    _onStateChange (event) {
        let roomId = this.props.roomId
        switch(event.data) {
            case 1: //play
                //socket.emit('set-video-time', roomId, event.target.getCurrentTime())
                break
            case 2: //pause
                //socket.emit('pause-video', roomId)
                break
            case 3: //buffer
                socket.emit('set-video-time', roomId, event.target.getCurrentTime())
                break
            default:
                break
        }
    }

    _onReady (event) {
        // access to player in all event handlers via event.target
        this.videoPlayer = event.target
      }

    render () { 
        const opts = {
            height: '429',
            width: '704',
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: 1,
                enablejsapi: 1,
                controls: 1, // set controls to 0 for non admin users
                mute: 1 // muted for testing
            }
        }

        return (
        <div>
            <YouTube
                videoId={this.state.videoId}
                opts={opts}
                onReady={this._onReady}
                onStateChange={this._onStateChange}
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