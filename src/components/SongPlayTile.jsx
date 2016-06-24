import React from 'react';
const divStyle = {
  display: "none",
};
//style={divStyle}
class SongPlayTile extends React.Component {

	render () {
    return (
  		<div className="song-play-tile" >
  			<img src={this.props.currSong.albumImg}/>
        <ul className="song-tile-list">
          <li>{this.props.currSong.artist}</li>
    			<li>{this.props.currSong.title}</li>
    			<li>{this.props.currSong.album}</li>
        </ul>
  		</div>
    )
  }
}

export default SongPlayTile;
