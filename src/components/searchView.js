import React from 'react';

import SearchItem from './searchItem';

export default class searchView extends React.Component {
	
	constructor( props ){
		
		super(props);
		this.state = {
			filter : '',
		};
		
	}
	
	render(){
		
		let {items, selectedOption, options} = this.props;
		let {filter}                         = this.state;
		let filteredItems                    = [];
		
		if ( filter !== '' ) {
			filteredItems = items.filter(i => {
				let k = (i.name || i.title).toLowerCase();
				return k.indexOf(filter) !== -1;
			});
		} else {
			filteredItems = items;
		}
		
		return <div className='app-search'>
			<div className="app-search-filter">
				<input type='text' name='filter' value={filter} onChange={e => this.setState({filter : e.target.value})} placeholder='Filter...' />
			</div>
			<ul className='app-search-options'>
				{options.map(o => <li key={o}>
					<label className={o === selectedOption ? 'mod-selected' : ''}>
						<input type='radio' name='option' value={o} onChange={this.props.onOptionChange} checked={o === selectedOption} disabled={!items.length} />
						{o}
					</label>
				</li>)}
			</ul>
			<div className="app-search-items">
				{!items.length && <div className='app-search-loader'><img alt='loader' src='./loader.svg' /></div>}
				{!!items.length && filter && !filteredItems.length &&
				 <div className='app-search-nofound'>No items found.</div>}
				{filteredItems.map(i => <SearchItem item={i} key={i.url} onSelect={this.props.onItemSelect} />)}
			</div>
		</div>;
		
	}
	
}