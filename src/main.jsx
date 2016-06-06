'use strict';
import 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import SongQueue from './components/SongQueue.jsx';
import SongPlayer from './components/SongPlayer.jsx'
import Songs from './components/Songs.jsx'

const socket = io();

class Slick extends React.Component {
  constructor() {
    //initial state is an empty array
    this.state = {
      firstSong: {},
      songInfo: [],
    };
    this.newSongClick = this.newSongClick.bind(this);
    this.onPlay = this.onPlay.bind(this);
    this.updateSong = this.updateSong.bind(this);
    this.handleServerPlayEvent = this.handleServerPlayEvent.bind(this);
    this.handleServerPlayCurrentSongEvent = this.handleServerPlayCurrentSongEvent.bind(this);
    this.handleServerPauseCurrentSongEvent = this.handleServerPauseCurrentSongEvent.bind(this);
    this.onEnded = this.onEnded.bind(this);

  }

  newSongClick(i) {
    const songObj = this.state.songInfo[i];
    const songUrl = songObj.trackUrl;
    socket.emit('playSong', songUrl);
  }

  handleServerPlayEvent(songUrl) {
    this.updateSong(songUrl);
  }

  updateSong(url) {
    const index = this.state.songInfo.indexOf()
    for (var i = 0; i < this.state.songInfo.length; i++) {
      if (this.state.songInfo[i].trackUrl === url)
        break;
    }
    let arraycopy = this.state.songInfo;
    let nextSong = arraycopy.splice(i, 1);
    this.setState({
      firstSong: nextSong[0],
      songInfo: arraycopy,
    });
  }

  onPlay(e) { socket.emit('playCurrent'); }
  handleServerPlayCurrentSongEvent () { this.audio.play(); }

  onPause(e) { socket.emit('pauseCurrent'); }
  handleServerPauseCurrentSongEvent () { this.audio.pause(); }

  onEnded() {
    this.updateSong(this.state.songInfo[0].trackUrl);
  }
  //doing async request in cdm
  componentDidMount() {
    //save reference to audio object in SongPlayer component
    this.audio = document.getElementsByTagName('audio')[0];

    let that = this;
    $.ajax({
      method: 'GET',
      url: `${this.props.hostAddress}/songQueue`,
      contentType: 'application/json',
      dataTyle: 'json',
      success: data => {
        that.setState({
          firstSong: data.shift(),
          songInfo: data
        });
      }
    });

    // listen for emit events from the server
    socket.on('playSong', this.handleServerPlayEvent);
    socket.on('playCurrent', this.handleServerPlayCurrentSongEvent);
    socket.on('pauseCurrent', this.handleServerPauseCurrentSongEvent);
    socket.on('songEnded', this.onEnded);
  }

  render() {
    //songplayer gets an empty string as props before the component mounds
    return (
      <div>
        <SongPlayer
          currSong={this.state.firstSong || ''}
          onPlay={this.onPlay}
          onPause={this.onPause}
          onEnded = {this.onEnded}
           />
        <SongQueue
          songInfo={this.state.songInfo}
          handleNewSongClick={this.newSongClick}
          />
      </div>
    )
  }
}

ReactDOM.render(
  <Slick hostAddress="YOUR_IP_ADDRESS:3000"/>,
  document.getElementById('content')
)
