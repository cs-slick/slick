'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import SongQueue from './components/SongQueue.jsx';
import SongPlayer from './components/SongPlayer.jsx'
import Songs from './components/Songs.jsx'
// import * as fetch from 'whatwg-fetch';



class Slick extends React.Component {
  constructor() {
    //initial state is an empty array
    this.state = {songInfo: []};
  }

  //doing async request in cdm
  componentDidMount() {
    // fetch('URLHERE')
    //   .then(res => {
    //     return res.json()
    //   })
    //   .then(json => {
    //     this.setState = {songInfo: json}
    //   });

    this.setState({
      songInfo: [{
        artist: 'cool guy',
        songName: 'cool name',
        pictureUrl: 'rlycoolurl.jpg',
      },
      {
        artist: 'cool guy',
        songName: 'cool name',
        pictureUrl: 'rlycoolurl.jpg',
      },
      {
        artist: 'cool guy',
        songName: 'cool name',
        pictureUrl: 'rlycoolurl.jpg',
      },
      {
        artist: 'cool guy',
        songName: 'cool name',
        pictureUrl: 'rlycoolurl.jpg',
      }
    ]
    });
  }


  render() {
    //songplayer gets an empty string as props before the component mounds
    return (
      <div>
        <SongPlayer
          currSong = {this.state.songInfo[0] || ''}
           />
        <SongQueue
          songInfo = {this.state.songInfo}
          />
      </div>
    )
  }

}


ReactDOM.render(
  <Slick />,
  document.getElementById('content')
)
