import React from 'react';
import ReactDOM from 'react-dom';
import YouTube from 'react-youtube';
// import io from 'socket.io';
// const socket = io();

class SongPlayer extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   //videoId: 'Ux2WXNsqfe8',
    //   player: null,
    // };

    //this.onReady = this.onReady.bind(this);
    //this.onChangeVideo = this.onChangeVideo.bind(this);
    this.onPlayVideo = this.onPlayVideo.bind(this);
    this.onPauseVideo = this.onPauseVideo.bind(this);
    this.onEndVideo = this.onEndVideo.bind(this);
  }

  // onReady(event) {
  //   // console.log(`YouTube Player object for videoId: "${this.state.video}" has been saved to state.`); // eslint-disable-line
  //   this.setState({
  //     player: event.target,
  //   });
  // }

  // socket.on('playCurrent', this.state.player.playVideo());
  // socket.on('pauseCurrent', this.state.player.pauseVideo());

  onPlayVideo() {
    // socket.emit('playCurrent');
    this.props.onPlay();
    //this.state.player.playVideo();
  }

  onPauseVideo() {
    // socket.emit('pauseCurrent');
    this.props.onPause();
    // this.state.player.pauseVideo(); 
  }

  onEndVideo() {
    //this.props.onEnded();
    this.state.videoID = '-DX3vJiqxm4';
  }

  // onChangeVideo() {
  //   this.setState({
  //     videoId: this.state.videoId === videoIdA ? videoIdB : videoIdA,
  //   });
  // }

  render() {
    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        autoplay: 1,
        fs: 0,
        enablejsapi: 1,
      }
    };
    return (
      <div>
        <YouTube opts={opts} videoId={this.props.currSong.videoId} onReady={this.props.onReady} onPlay={this.onPlayVideo} onPause={this.onPauseVideo} onEnd={this.onEndVideo}/>
      </div>
    );
  }
}

export default SongPlayer
