import React from 'react';
import SongResultTile from './SongResultTile.jsx'

class SongSearch extends React.Component {

	//create array react components with song info as props
	createSearchResultList () {
		let searchTileArray = [];
		for (let i = 0; i < this.props.searchResults.length; i++) {
			let searchResultObject = this.props.searchResults[i];
			searchTileArray.push(
				<SongResultTile
          key={i}
          addSongToQueue={this.props.addSongToQueue}
          itemNum={i}
					artist={searchResultObject.artist}
					title={searchResultObject.title}
					album={searchResultObject.album}
					videoUrl={searchResultObject.videoUrl}
					artistImg={searchResultObject.artistImg}
					albumImg={searchResultObject.albumImg}
				/>
				)
		}
		return (searchTileArray.length > 0) ? searchTileArray : null;
	}

	render () {
    return (
		<div id="search-container">
			<form>
				<div className='search-bar'>
					<input type="text" id="song-search-artist" placeholder="Artist" />
				</div>
				<div className='search-bar'>
					<input type="text" id="song-search-title" placeholder="Title"/>
				</div>
        <button className='search-button' onClick={this.props.handleSearchEvent.bind(this)}>Search</button>
			</form>
      <div id='search-results-list'>
          {this.createSearchResultList()}
      </div>
		</div>
    )
	}

}

export default SongSearch;
