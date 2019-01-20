import React from 'react';

export default class searchItem extends React.Component {
	
	render(){
		
		const {item, onSelect} = this.props;
		
		return <div className='app-search-item' onClick={() => onSelect(item)}>
			<h3>{item.name || item.title}</h3>
		</div>;
		
	}
	
}