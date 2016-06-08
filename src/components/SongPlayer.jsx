import React from 'react';
import ReactDOM from 'react-dom';
import YouTube from 'react-youtube';

class SongPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.onPlayVideo = this.onPlayVideo.bind(this);
    this.onPauseVideo = this.onPauseVideo.bind(this);
    this.onEndVideo = this.onEndVideo.bind(this);
  }

  onPlayVideo() {
    this.props.onPlay();
  }

  onPauseVideo() {
    this.props.onPause();
  }

  onEndVideo() {
    this.props.onEnded();
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
        <YouTube opts={opts} videoId={this.props.currSong.videoId} onReady={this.props.onReady} onPlay={this.props.onPlay} onPause={this.props.onPause} onEnd={this.props.onEnded}/>
      </div>
    );
  }
}

export default SongPlayer
