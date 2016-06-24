'use strict';
import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import SongQueue from './components/SongQueue.jsx';
import SongPlayer from './components/SongPlayer.jsx';
import SongQueueTile from './components/SongQueueTile.jsx';
import SongSearch from './components/SongSearch.jsx';
import request from 'request';

const socket = io();

class Slick extends React.Component {
  constructor() {
    super();
    this.state = {
      currentSong: '',
      songInfo: [], //the queue of songs
      searchResults: [],
      player: null,
    };
    //All methods need to be registerd here
    this.newSongClick = this.newSongClick.bind(this);
    this.addSongToQueue = this.addSongToQueue.bind(this);
    this.handleServerPlayEvent = this.handleServerPlayEvent.bind(this);
    this.onEnded = this.onEnded.bind(this);
    this.searchForNewSongs = this.searchForNewSongs.bind(this);
    this.onPlay = this.onPlay.bind(this);
    this.handleServerPlayCurrentSongEvent = this.handleServerPlayCurrentSongEvent.bind(this);
    this.onPause = this.onPause.bind(this);
    this.handleServerPauseCurrentSongEvent = this.handleServerPauseCurrentSongEvent.bind(this);
    this.updateYoutubePlayer = this.updateYoutubePlayer.bind(this);
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
    // when the result is clicked we want to take the whole object and add it to the songInfo state object.
    let currSongList = this.state.songInfo;
    let searchResultList = this.state.searchResults;
    currSongList.push(searchResultList.splice(i, 1)[0]);
    let newSongClientState = {
      songInfo: currSongList,
      searchResults: searchResultList,
    };
    let newSongSharedState = {songInfo: currSongList};
    //send event to socket to update all clients
    socket.emit('updateQueue', newSongSharedState);
    this.setState(newSongClientState);
  }

  handleServerPlayEvent(newSongState) {
    //document.getElementsByClassName('song-play-tile')[0].style.display = inline-block;
    this.setState(newSongState);
  }

  onPlay(e) { socket.emit('playCurrent'); }
  handleServerPlayCurrentSongEvent () { this.state.player.playVideo(); }

  onPause(e) { socket.emit('pauseCurrent'); }
  handleServerPauseCurrentSongEvent () { this.state.player.pauseVideo(); }

  onEnded() {
    let songList = this.state.songInfo;
    let nextSong = songList.splice(0,1)[0];
    socket.emit('updateQueue', {songInfo: songList, currentSong: nextSong});
    this.setState({songInfo: songList, currentSong: nextSong});
  }

  updateYoutubePlayer(event) {
    this.setState({
      player: event.target,
    });
  }

  //Adding ajax post request for song searches
  //Input JSON object with artist and title
  //Receives JSON object array data of length 5 with info
  searchForNewSongs(e) {
    e.preventDefault();
    let that = this;
    const searchData = {
      artist: document.getElementById('song-search-artist').value,
      title: document.getElementById('song-search-title').value,
    };
    console.log('searchData ', searchData);
  //   request.post({url: `${this.props.hostAddress}/search`, json: searchData})
  //     .on(data => {
  //       console.log('data is ', JSON.parse(data));
  //       that.setState({
  //         searchResults: JSON.parse(data),
  //       });
  //     })
  //     .catch(err => console.log('error getting search results'));
    $.ajax({
      method:'POST',
      url: `${this.props.hostAddress}/search`,
      data: searchData,
      //contentType: 'application/json',
      error: (err) => {
        console.log('error getting search results');
        console.log(err);
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

  componentDidUpdate() {
    console.log('state is ', this.state);
     $('#content').css("background-image", `url(${this.state.currentSong.artistImg})`);
  }

  componentDidMount() {
      //doing async request in componentDidMount
    let that = this;
    $.ajax({
      method: 'GET',
      url: '/songQueue',
      contentType: 'application/json',
      dataType: 'json',
      success: data => {
        that.setState(data);
      }
    });
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
// style={{backgroundImage: 'url("https://i.scdn.co/image/8cff70e0360bb20ca403ad003108bd5c5ea5378d")'}}
  render() {
    //songplayer gets an empty string as props before the component mounts
    return (
      <div className='app'>
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
          onReady={this.updateYoutubePlayer}
          player={this.state.player}
           />
        <SongQueue
          songInfo={this.state.songInfo}
          handleNewSongClick={this.newSongClick}
          />
      </div>
    )
  }
}

const divStyle = {
  display: "none",
};

ReactDOM.render(<Slick hostAddress="http://192.168.1.66:3000"/>,document.getElementById('content'));
