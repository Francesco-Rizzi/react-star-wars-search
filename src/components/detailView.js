import React from 'react';

export default class detailView extends React.Component {
	
	render(){
		
		const {item} = this.props;
		console.log(item);
		return <div className='app-detail'>
			<h1>{item.name || item.title}</h1>
			<table>
				{Object.keys(item).map(k => this.renderProp(item, k))}
			</table>
		</div>;
		
	}
	
	renderProp( item, key ){
		
		if ( key === 'created' || key === 'edited' ) {
			return null;
		}
		
		const prop = item[ key ];
		key        = key.split('_').join(' ');
		
		switch ( typeof prop ) {
			
			case 'string':
			case 'number':
				return <tr key={key}><td><b>{key}:</b></td> <td>{renderSimpleValue(prop)}</td></tr>;
			
			//ASSUME 1 LEVEL ONLY
			case 'object':
				if(prop.length){
					return <tr key={key}><td><b>{key}:</b></td>
						<td>
							<ul>
								{prop.map(i => <li key={i}>{renderSimpleValue(i)}</li>)}
							</ul>
						</td>
					</tr>;
				}
			
			default:
				return null;
			
		}
		
		function renderSimpleValue( v ){
			if ( typeof v === 'string' && v.startsWith('http') ) {
				return <a href={v} target='_blank' rel="noopener noreferrer">{v}</a>;
			} else {
				return v;
			}
		}
		
	}
	
}