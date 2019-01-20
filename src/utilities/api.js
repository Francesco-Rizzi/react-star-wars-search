const HTTPAPI = {
	
	baseEndpoint : "https://swapi.co/api/",
	
	request( option ){
		return this._request(this.baseEndpoint + option.toLowerCase());
	},

	//RECURSIVE SEARCH ALL ELEMENTS
	_request( url, res = [] ){
		return fetch(url).then(r => {
			return r.json();
		}).then(json => {
			res = res.concat(json.results);
			if ( json.next ) {
				return this._request(json.next, res);
			}
			return res;
		});
		
	},
	
};

export default HTTPAPI;