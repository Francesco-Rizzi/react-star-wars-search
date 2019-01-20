import React, {Component} from 'react';

import Header from './components/header';
import LoginView from './components/loginView';
import SearchView from './components/searchView';
import DetailView from './components/detailView';

import AUTH from './utilities/auth';
import STATES from './utilities/states';
import HTTPAPI from './utilities/api';

import './styles/App.css';

export default class App extends Component {
	
	constructor( props ){
		
		super(props);
		this.state = {
			appState       : STATES.LOGIN,
			items          : [],
			options        : [ 'People', 'Films', 'Starships', 'Vehicles', 'Species', 'Planets' ],
			selectedOption : 'People',
			selectedItem   : null
		};
		
	}
	
	render(){
		
		let view;
		switch ( this.state.appState ) {
			
			case STATES.LOGIN:
				view = <LoginView logIn={this.logIn.bind(this)} />;
				break;
			
			case STATES.SEARCH:
				view =
					<SearchView options={this.state.options} items={this.state.items} onOptionChange={this.onOptionChange.bind(this)} onItemSelect={this.onItemSelect.bind(this)} selectedOption={this.state.selectedOption} />;
				break;
			
			case STATES.DETAIL:
				view = <DetailView item={this.state.selectedItem} />;
				break;
			
			default:
				view = <div></div>;
				break;
			
		}
		
		return (<div className="App">
			<Header logOut={this.logOut.bind(this)} onBackAction={this.onDetailBack.bind(this)} appState={this.state.appState} />
			{view}
		</div>);
		
	}
	
	componentWillMount(){
		//TRY AUTO-LOGIN
		if ( AUTH.isUserLoggedIn() ) {
			this.changeAppState(STATES.SEARCH);
			this.updateItems(this.state.selectedOption);
		}
	}
	
	changeAppState( state ){
		return this.setState({
			appState : state
		});
	}
	
	onOptionChange( e ){
		const option = e.target.value;
		this.setState({
			selectedOption : option
		});
		this.updateItems(option);
	}
	
	onItemSelect( item ){
		this.setSelectedItem(item);
		this.changeAppState(STATES.DETAIL);
	}
	
	onDetailBack(){
		this.setSelectedItem(null);
		this.changeAppState(STATES.SEARCH);
	}
	
	setSelectedItem( val ){
		this.setState({
			selectedItem : val
		});
	}
	
	setItems( val ){
		this.setState({
			items : val
		});
	}
	
	updateItems( option ){
		this.setItems([]);
		HTTPAPI.request(option).then(v => {
			this.setItems(v);
		});
	}
	
	logOut(){
		AUTH.logOut();
		this.changeAppState(STATES.LOGIN);
	}
	
	logIn( username, password ){
		if ( !AUTH.logIn(username, password) ) {
			return false;
		}
		this.updateItems(this.state.selectedOption);
		this.changeAppState(STATES.SEARCH);
	}
	
}
