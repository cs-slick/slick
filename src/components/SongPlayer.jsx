'use strict';
import React from 'react';

const socket = io();


class SongPlayer extends React.Component {


  componentDidMount() {
    this.refs.audio.addEventListener('playing', this.props.onPlay);
  }

  render() {
    const audioUrl = this.props.currSong.trackUrl + "?client_id=0937b0d9c276c8ed417e401221c65323";
    return (
      <div className="song-player">
        <img src={this.props.currSong.thumbnailUrl}></img><p className="currently-playing">{this.props.currSong.artist}:  {this.props.currSong.songName}</p>
        <audio src={audioUrl}
          ref="audio"
          controls
          autoPlay="true"
          />
      </div>
    )

  }
}



export default SongPlayer;
