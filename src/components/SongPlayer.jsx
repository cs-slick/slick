import React from 'react';
import ReactDOM from 'react-dom';
import YouTube from 'react-youtube';

class SongPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //videoUrl: 'Ux2WXNsqfe8',
      player: null,
    };

    this.onReady = this.onReady.bind(this);
    //this.onChangeVideo = this.onChangeVideo.bind(this);
    this.onPlayVideo = this.onPlayVideo.bind(this);
    this.onPauseVideo = this.onPauseVideo.bind(this);
    this.onEndVideo = this.onEndVideo.bind(this);
  }

  onReady(event) {
    console.log(`YouTube Player object for videoUrl: "${this.state.videoUrl}" has been saved to state.`); // eslint-disable-line
    this.setState({
      player: event.target,
    });
  }

  onPlayVideo() {
    this.props.onPlay();
    this.state.player.playVideo();
  }

  onPauseVideo() {
    this.props.onPause();
    this.state.player.pauseVideo();
  }

  onEndVideo() {
    //this.props.onEnded();
    this.state.videoID = '-DX3vJiqxm4';
  }

  // onChangeVideo() {
  //   this.setState({
  //     videoUrl: this.state.videoUrl === videoUrlA ? videoUrlB : videoUrlA,
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
        <YouTube opts={opts} videoId={this.props.currSong.videoUrl} onReady={this.onReady} onPlay={this.onPlayVideo} onPause={this.onPauseVideo} onEnd={this.onEndVideo}/>
      </div>
    );
  }
}

export default SongPlayer
