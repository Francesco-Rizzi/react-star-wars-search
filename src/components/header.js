import React from 'react';
import STATES from '../utilities/states';

export default class Header extends React.Component {
	
	render(){
		
		return <div className='app-header'>
			<h1>React Star Wars Search <span role='img' aria-label="emojis">⚛💥👊</span></h1>
			<h2>Search, view and get details of your favorite <a href='https://www.starwars.com/' rel="noopener noreferrer" target='_blank'>Star Wars</a> characters.
			</h2>
			{this.renderLogOut()}
			{this.renderBackAction()}
		</div>;
		
	}
	
	renderLogOut(){
		
		const {appState, logOut} = this.props;
		
		if ( appState !== STATES.LOGIN ) {
			return <button className="app-header-logout" onClick={logOut}>
				Logout
			</button>;
		}
		return <div></div>;
		
	}
	
	renderBackAction(){
		
		const {appState, onBackAction} = this.props;
		
		if ( appState === STATES.DETAIL ) {
			return <button className="app-header-back" onClick={onBackAction}>
				Back
			</button>;
		}
		return <div></div>;
		
	}
	
}