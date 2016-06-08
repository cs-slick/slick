import React from 'react';

class SongResultTile extends React.Component {

	render () {
    return (
  		<div className="song-result-tile" onClick={this.props.addSongToQueue.bind(this, this.props.itemNum)}>
  			<img src={this.props.albumImg}/>
        <ul className="song-tile-list">
          <li>{this.props.artist}</li>
    			<li>{this.props.title}</li>
    			<li>{this.props.album}</li>
        </ul>
  		</div>
    )
  }
}

export default SongResultTile;
