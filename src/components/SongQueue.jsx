'use strict';
import React from 'react';
import Songs from './Songs.jsx'


const SongQueue = ({songInfo}) => {
  //iterating over json to make song divs
  const createList = () => {
    let i = 0;
    return songInfo.map(songz => {
      return (<Songs
        key = {i++}
        artist={songz.artist}
        songName = {songz.songName}
        thumbnailUrl = {songz.thumbnailUrl}
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
