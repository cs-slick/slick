'use strict';
import 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import SongQueue from './components/SongQueue.jsx';
import SongPlayer from './components/SongPlayer.jsx'
import Songs from './components/Songs.jsx'
import ReactAudioPlayer from 'react-audio-player';

const socket = io();

class Slick extends React.Component {
  constructor() {
    //initial state is an empty array
    this.state = {
      firstSong: {},
      songInfo: []
    };
    this.newSongClick = this.newSongClick.bind(this);
    this.onPlay = this.onPlay.bind(this);
  }
  
  newSongClick(i) {
    let nextSong = this.state.songInfo.splice(i, 1);
    this.setState({
      firstSong: nextSong[0],
      songInfo: this.state.songInfo
    });

    // emit playSong event
  }

  onPlay() {

  }

  //doing async request in cdm
  componentDidMount() {
    let that = this;
    $.ajax({
      method: 'GET',
      url: "http://localhost:3000/songQueue",
      contentType: 'application/json',
      dataTyle: 'json',
      success: data => {
        that.setState({
          firstSong: data.shift(),
          songInfo: data
        });
        // listen for playSong emit events
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
