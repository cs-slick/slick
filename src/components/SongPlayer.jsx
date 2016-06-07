import React from 'react';
import ReactDOM from 'react-dom';
import YouTube from 'react-youtube';
import SongResultTile from './SongResultTile.jsx'

const videoIdA = 'XxVg_s8xAms';
const videoIdB = '-DX3vJiqxm4';

class SongPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoId: videoIdA,
      player: null,
    };

    this.onReady = this.onReady.bind(this);
    this.onChangeVideo = this.onChangeVideo.bind(this);
    this.onPlayVideo = this.onPlayVideo.bind(this);
    this.onPauseVideo = this.onPauseVideo.bind(this);
    this.onEndVideo = this.onEndVideo.bind(this);
  }

  onReady(event) {
    console.log(`YouTube Player object for videoId: "${this.state.videoId}" has been saved to state.`); // eslint-disable-line
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

  onChangeVideo() {
    this.setState({
      videoId: this.state.videoId === videoIdA ? videoIdB : videoIdA,
    });
  }

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
        <YouTube opts={opts} videoId={this.state.videoId} onReady={this.onReady} onPlay={this.onPlayVideo} onPause={this.onPauseVideo} onEnd={this.onEndVideo}/>
        <
      </div>
    );
  }
}

export default SongPlayer
