'use strict';
import React from 'react';
// import SoundPlayerComponents from 'react-soundplayer/components';
// import SoundPlayerAddon  from 'react-soundplayer/addons'


//will need to use react-songplayer
const SongPlayer = (props) => {
 console.log(props.currSong)
  return (
    <div className="song-player">
    <p>{props.currSong.artist} - {props.currSong.songName}</p>
    </div>
  )

}

export default SongPlayer;
