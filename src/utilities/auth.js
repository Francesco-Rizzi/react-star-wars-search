const AUTH = {
	
	secret     : "adminadmin", //@TODO STORE HASHED PASSWORD + VALIDATE SERVER SIDE!
	storageKey : "_userCredentials",
	
	isUserLoggedIn(){
		return this._auth(localStorage.getItem(this.storageKey));
	},
	
	logIn( username, password ){
		localStorage.setItem(this.storageKey, username + password);
		return this._auth(username + password);
	},
	
	logOut(){
		localStorage.removeItem(this.storageKey);
	},
	
	_auth( data ){
		return data === this.secret;
	}
	
};

export default AUTH;