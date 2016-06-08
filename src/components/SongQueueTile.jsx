'use strict';
import React from 'react';
import SongPlayer from './SongPlayer.jsx'

const SongQueueTile = (props) => {
  return (
    <div className="songs-in-queue" onClick={props.handleNewSongClick.bind(this, props.itemNum)}>
      <img src={props.albumImg}></img><p>{props.artist} - {props.title} - {props.album} - {Number(props.itemNum) + 1} of {props.numberOfSongs}</p>
  </div>
  )
}

export default SongQueueTile;
