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
    this.state = {
      firstSong: {},
      songInfo: []
    };
    this.newSongClick = this.newSongClick.bind(this);
  }


  newSongClick(e, i) {
    let index = i.slice(i.indexOf('$') + 1);
    let nextSong = this.state.songInfo.splice(index, 1);
    console.log(nextSong)
    this.setState({
      firstSong: nextSong[0],
      songInfo: this.state.songInfo
    });
  }

  //doing async request in cdm
  componentDidMount() {
    // fetch('URLHERE')
    //   .then(res => {
    //     return res.json()
    //   })
    //   .then(json => {
    //     this.setState = {songInfo: json(slice(1))}
    //   });

    this.setState({
      firstSong: {
        'artist': 'first cool guy',
        'songName': 'cool name',
        'pictureUrl': 'rlycoolurl.jpg',
      },
      songInfo: [{
        artist: 'second cool guy',
        songName: 'cool name',
        pictureUrl: 'rlycoolurl.jpg',
      },
      {
        artist: 'third cool guy',
        songName: 'cool name',
        pictureUrl: 'rlycoolurl.jpg',
      },
      {
        artist: 'fourth cool guy',
        songName: 'cool name',
        pictureUrl: 'rlycoolurl.jpg',
      },
      {
        artist: 'fifth cool guy',
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
          currSong = {this.state.firstSong || ''}
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
