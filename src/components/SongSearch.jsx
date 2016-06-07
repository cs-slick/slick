import React from 'react';

class SongSearch extends React.Component {

	//create array react components with song info as props
	createSearchResultList () {
		let searchTileArray = [];
		for (let i = 0; i < this.props.searchResults.length; i++) {
			let searchResultObject = this.props.searchResults[i];
			searchTileArray.push(
				<SongTile
					artist={searchResultObject.artist}
					title={searchResultObject.title}
					album={searchResultObject.album}
					videoUrl={searchResultObject.videoUrl}
					artistImg={searchResultObject.artistImg}
					albumImg={searchResultObject.albumImg}
				/>
				)
		}
		return searchTileArray;
	}

	render () {
		<div id="search-container">
			<form>
				<div className='search-bar'>
					<label htmlFor={"artist" + this.props.id}>Artist:</label>
					<input type="text" id="song-search-artist"/>
				</div>
				<div className='search-bar'>
					<label htmlFor={"song" + this.props.id}>Song:</label>
					<input type="text" id="song-search-title"/>
				</div>
			</form>
			<div id='search-results-list'>
				{createSearchResultList()}
			</div>
		</div>
	}
	
}

export default SongSearch;
