'use strict';
import React from 'react';
import Songs from './Songs.jsx'


const SongQueue = (props) => {
  //iterating over json to make song divs
  const createList = () => {
    return props.songInfo.map((songz, i) => {
      return (<Songs
        key = {i}
        artist={songz.artist}
        songName = {songz.songName}
        thumbnailUrl = {songz.thumbnailUrl}
        handleNewSongClick={props.handleNewSongClick.bind(this, i)}
        />)
    })
  }

  return (
    <div className="song-queue">
      {createList()}
    </div>
  )
}

export default SongQueue;
