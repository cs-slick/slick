'use strict';
import React from 'react';
// import SoundPlayerComponents from 'react-soundplayer/components';
// import SoundPlayerAddon  from 'react-soundplayer/addons'


//will need to use react-songplayer
const SongPlayer = (props) => {
 const audioUrl = props.currSong.trackUrl + "?client_id=0937b0d9c276c8ed417e401221c65323";
 console.log(typeof audioUrl);
  return (
    <div className="song-player">
    <p>{props.currSong.artist}:  {props.currSong.songName}</p>
    <audio src={audioUrl} controls autoPlay="true" />
    </div>
  )

}

export default SongPlayer;
