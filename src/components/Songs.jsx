'use strict';
import React from 'react';
import SongPlayer from './SongPlayer.jsx'



const Songs = (props) => {


  return (
    <div className="songs-in-queue" onClick={props.handleNewSongClick}>
      <p>{props.artist} - {props.songName}</p>
    </div>
  )
}

export default Songs;
