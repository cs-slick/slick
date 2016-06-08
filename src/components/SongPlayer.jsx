import React from 'react';
import ReactDOM from 'react-dom';
import YouTube from 'react-youtube';

class SongPlayer extends React.Component {
  constructor(props) {
    super(props);
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
