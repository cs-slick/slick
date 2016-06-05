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
        thumbnailUrl = {songz.thumbnailUrl || 'http://3.bp.blogspot.com/-PzpJFD56NmM/U4OEGvGR5pI/AAAAAAAAIO8/s9UBNaw800A/s1600/soundcloud.png'}
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
