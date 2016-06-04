'use strict';
import React from 'react';



const Songs = (props) => {

  return (
    <div className="songs-in-queue">
      <p>{props.artist} - {props.songName}</p>
    </div>
  )
}

export default Songs;
