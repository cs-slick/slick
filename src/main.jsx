'use strict';
import 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import SongQueue from './components/SongQueue.jsx';
import SongPlayer from './components/SongPlayer.jsx'
import Songs from './components/Songs.jsx'
import ReactAudioPlayer from 'react-audio-player';

class Slick extends React.Component {
  constructor() {
    //initial state is an empty array
    this.state = {
      firstSong: {},
      songInfo: []
    };
    this.newSongClick = this.newSongClick.bind(this);
    this.onPlay = this.onPlay.bind(this);
    this.updateSong = this.updateSong.bind(this);
    this.handleServerPlayEvent = this.handleServerPlayEvent.bind(this);
  }

  newSongClick(i) {
    // get song object from index
    const songObj = this.state.songInfo[i];

    // get song url from object
    const songUrl = songObj.trackUrl;

    // emit playSong event
    this.socket.emit('playSong', songUrl);
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

  onPlay() {

  }

  //doing async request in cdm
  componentDidMount() {
    this.socket = io();
    let that = this;
    $.ajax({
      method: 'GET',
      url: "http://192.168.1.19:3000/songQueue",
      contentType: 'application/json',
      dataTyle: 'json',
      success: data => {
        that.setState({
          firstSong: data.shift(),
          songInfo: data
        });
        // listen for playSong emit events
        this.socket.on('playSong', this.handleServerPlayEvent);
      }
    });
  }


  render() {
    //songplayer gets an empty string as props before the component mounds
    return (
      <div>
        <SongPlayer
          currSong = {this.state.firstSong || ''}
          onPlay = {this.onPlay}
           />
        <SongQueue
          songInfo = {this.state.songInfo}
          handleNewSongClick={this.newSongClick}
          />
      </div>
    )
  }
}


ReactDOM.render(
  <Slick />,
  document.getElementById('content')
)
