import React from 'react';

export default class LoginView extends React.Component {
	
	constructor( props ){
		
		super(props);
		this.state = {
			username : '',
			password : '',
			error    : null
		};
		
	}
	
	render(){
		
		return <form className='app-login' onSubmit={this.onSubmit.bind(this)}>
			<input type='text' placeholder='Username (admin)' required name='username' value={this.state.username} onChange={e => this.setState({username : e.target.value})} />
			<input type='password' placeholder='Password (admin)' required name='password' value={this.state.password} onChange={e => this.setState({password : e.target.value})} />
			<button type='submit' className='app-login-btn'>login</button>
			{this.state.error && <div className='app-login-error'>{this.state.error}</div>}
		</form>;
		
	}
	
	onSubmit( e ){
		
		e.preventDefault();
		
		this.setState({error : null});
		let {username, password} = this.state;
		
		if(!this.props.logIn(username, password)){
			this.setState({error : "Username or Password wrong."});
		}
		
	}
	
}