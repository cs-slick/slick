'use strict';
import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import SongQueue from './components/SongQueue.jsx';
import SongPlayer from './components/SongPlayer.jsx';
import SongQueueTile from './components/SongQueueTile.jsx';
import SongSearch from './components/SongSearch.jsx';

const socket = io();

class Slick extends React.Component {
  constructor() {
    //initial state is an empty
    super();
    this.state = {
      //TODO: change to current song
      currentSong: '',
      //TODO: change to queue and store the song list as changed
      songInfo: [],
      searchResults: [],
    };
    //TODO: add any new methods here
    this.newSongClick = this.newSongClick.bind(this);
    this.onPlay = this.onPlay.bind(this);
    //this.updateSong = this.updateSong.bind(this);
    this.handleServerPlayEvent = this.handleServerPlayEvent.bind(this);
    this.handleServerPlayCurrentSongEvent = this.handleServerPlayCurrentSongEvent.bind(this);
    this.handleServerPauseCurrentSongEvent = this.handleServerPauseCurrentSongEvent.bind(this);
    this.onEnded = this.onEnded.bind(this);
    this.searchForNewSongs = this.searchForNewSongs.bind(this);
    this.setDummySearchResultsData = this.setDummySearchResultsData.bind(this);
    this.addSongToQueue = this.addSongToQueue.bind(this);
  }

  newSongClick(i) {
    let songQueueArray = this.state.songInfo;
    let newSongState = {
      currentSong: songQueueArray.splice(i,1)[0],
      songInfo: songQueueArray,
    }
    socket.emit('playSong', newSongState);
    this.setState(newSongState);
  }

  addSongToQueue(i) {
    // when the result is clicked we want to take the whole object and ad it to the songInfo state object.
    let currSongList = this.state.songInfo;
    let searchResultList = this.state.searchResults;
    currSongList.push(searchResultList.splice(i, 1)[0]);
    let newSongState = {
      songInfo: currSongList,
      searchResults: searchResultList,
    };
    //send event to socket to update all clients
    socket.emit('updateQueue', newSongState);
    this.setState(newSongState);
  }

  ComponentDidUpdate() {
    //send event to socket to update all clients
    socket.emit('updateQueue', this.state.songInfo);
  }

  handleServerPlayEvent(newSongState) {
    this.setState(newSongState);
  }

  // updateSong(url) {
  //   const index = this.state.songInfo.indexOf()
  //   for (var i = 0; i < this.state.songInfo.length; i++) {
  //     if (this.state.songInfo[i].trackUrl === url)
  //       break;
  //   }
  //   let arraycopy = this.state.songInfo;
  //   let nextSong = arraycopy.splice(i, 1);
  //   this.setState({
  //     currentSong: nextSong[0],
  //     songInfo: arraycopy,
  //   });
  // }

  onPlay(e) { socket.emit('playCurrent'); }
  handleServerPlayCurrentSongEvent () { this.audio.play(); }

  onPause(e) { socket.emit('pauseCurrent'); }
  handleServerPauseCurrentSongEvent () { this.audio.pause(); }

  onEnded() {
    this.updateSong(this.state.songInfo[0].trackUrl);
  }
  //doing async request in componentDidMount
  componentDidMount() {
    // listen for emit events from the server
    socket.on('playSong', this.handleServerPlayEvent);
    socket.on('playCurrent', this.handleServerPlayCurrentSongEvent);
    socket.on('pauseCurrent', this.handleServerPauseCurrentSongEvent);
    socket.on('updateQueue', (newSongState) => {
      this.setState(newSongState);
    });
    // add event listener for song added and song deleted
    socket.on('songEnded', this.onEnded);
  }

  //Adding ajax post request for song searches
  //Input JSON object with artist and title
  //Receives JSON object array data of length 5 with info
  searchForNewSongs(e) {
    e.preventDefault();
    let that = this;
    const searchData = {
      artist: $('form #song-search-artist').val(),
      title: $('form #song-search-title').val(),
    };
    console.log('searchData ', searchData);
    $.ajax({
      method:'POST',
      url: '/search',
      data: searchData,
      //contentType: 'application/json',
      error: () => {
        console.log('error getting search results');
      },
      success: data => {
        //data sets state for search results
        //data should come in formatted as needed
        console.log('data is ', JSON.parse(data));
        that.setState({
          searchResults: JSON.parse(data),
        })
      },
    });
  }

  //dummy data for search queue
  //not turned on to set state right now
  setDummySearchResultsData(e) {
    e.preventDefault();
    this.setState({
      searchResults: [
      {
       artist: 'KC and the Sunshine Band',
       title: 'Boogie Shoes',
       album: 'Saturday Night Fever',
       videoId: 'Ux2WXNsqfe8',
       artistImg: 'http://rymimg.com/lk/o/a/290ada14c16c3ee387ae7978de563d39/949113.jpg',
       albumImg: 'https://upload.wikimedia.org/wikipedia/en/c/c5/KC_and_the_Sunshine_Band_album_cover.jpg',
      },
      {
       artist: 'Kanye West',
       title: 'I Am a God',
       album: 'Yeezus',
       videoId: 'OwSpn4pmv9Q',
       artistImg: 'http://cos.h-cdn.co/assets/16/06/980x490/landscape-1455221555-kanye-west-pablo-cover-art-news-021116.jpg',
       albumImg: 'http://www.billboard.com/files/styles/article_main_image/public/media/kanye-west-yeezus-650.jpg',
      }
    ]});
  };

  render() {
    //songplayer gets an empty string as props before the component mounts
    return (
      <div>
        <SongSearch
          addSongToQueue={this.addSongToQueue}
          searchResults={this.state.searchResults}
          handleSearchEvent={this.searchForNewSongs}
          />
        <SongPlayer
          currSong={this.state.currentSong}
          onPlay={this.onPlay}
          onPause={this.onPause}
          onEnded={this.onEnded}
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
  <Slick hostAddress="http://localhost:3000"/>,
  document.getElementById('content')
)
