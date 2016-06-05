import React from 'react';

class SongPlayer extends React.Component {
  componentDidMount() {
    // change clientId to your own client id
    this.clientId = '0937b0d9c276c8ed417e401221c65323';
    this.refs.audio.addEventListener('playing', this.props.onPlay);
    this.refs.audio.addEventListener('pause', this.props.onPause);
    this.refs.audio.addEventListener('ended', this.props.onEnded);
  }

  render() {
    // convenient way of passing audio url using SoundCloud API to <audio>
    // element
    const audioUrl = this.props.currSong.trackUrl + `?client_id=${this.clientId}`;
    return (
      <div className="song-player">
        <img src={this.props.currSong.thumbnailUrl}></img>
        <p className="currently-playing">
          {this.props.currSong.artist}:  {this.props.currSong.songName}
        </p>
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
