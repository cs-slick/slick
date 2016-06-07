import React from 'react';

class SongResultTile extends React.Component {

	render () {
		<div class="song-result-tile" onClick={this.props.addSongToQueue}>
			<img src={this.props.albumImg}/>
			<p>{this.props.artist}</p>
			<p>{this.props.title}</p>
			<p>{this.props.album}</p>
		</div>
	}
	
}

export default SongResultTile;
