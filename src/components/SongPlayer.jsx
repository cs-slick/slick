import React from 'react';
import ReactDOM from 'react-dom';
import YouTube from 'react-youtube';
import SongPlayTile from './SongPlayTile.jsx';

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
        <SongPlayTile currSong={this.props.currSong}/>
      </div>
    );
  }
}

export default SongPlayer

// <div>{this.props.currSong.description}</div>
