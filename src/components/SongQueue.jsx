'use strict';
import React from 'react';
import SongQueueTile from './SongQueueTile.jsx'

const SongQueue = (props) => {
  //iterating over json to make song divs
  const createList = () => {
    return props.songInfo.map((songDataObject, i) => {
      return (<SongQueueTile
        key={i}
        itemNum = {i}
        artist={songDataObject.artist}
        title = {songDataObject.title}
        album = {songDataObject.album}
        videoId = {songDataObject.videoId}
        artistImg = {songDataObject.artistImg}
        albumImg = {songDataObject.albumImg || 'http://3.bp.blogspot.com/-PzpJFD56NmM/U4OEGvGR5pI/AAAAAAAAIO8/s9UBNaw800A/s1600/soundcloud.png'}
        handleNewSongClick={props.handleNewSongClick}
        numberOfSongs = {props.songInfo.length}
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
