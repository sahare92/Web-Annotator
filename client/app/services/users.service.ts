import { Injectable } from '@angular/core'
import { Http, Headers } from '@angular/http'
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {

	constructor(private http:Http){
	}

	getUsers(query){
		var url = '/api/users?';
		for(var p in query){
			if(query.hasOwnProperty(p)){
				url = url.concat(p + '=' + query[p]);
				url = url.concat("&")
			}
		}
		return this.http.get(url)
			.map(res => {
				if (res.status < 200 || res.status >= 300)
					throw new Error();
				else
					return res.json();
		});
	}

	addUser(newUser) {
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this.http.post('/api/users', JSON.stringify(newUser), {headers: headers})
			.map(res => {
				if (res.status < 200 || res.status >= 300)
					throw new Error();
				else
					return res.json();
		});
	}

	updateUser(user){
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this.http.put('/api/users/'+user._id, JSON.stringify(user), {headers: headers})
			.map(res => {
				if (res.status < 200 || res.status >= 300)
					throw new Error();
				else
					return res.json();
		});
	}

	deleteUser(id){
		return this.http.delete('/api/users/'+id)
			.map(res => {
				if (res.status < 200 || res.status >= 300)
					throw new Error();
				else
					return res.json();
		});
	}

	loginUser(userDetails){
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this.http.post('/api/login', JSON.stringify(userDetails), {headers: headers})
			.map(res => {
				if (res.status < 200 || res.status >= 300)
					throw new Error();
				else
					return res.json();
		});
	}

	getLoggedUser(){
		return this.http.get('/api/login')
			.map(res => {
				if (res.status < 200 || res.status >= 300)
					throw new Error();
				else
					return res.json();
		});
	}

	logOutUser(){
		return this.http.delete('/api/login')
			.map(res => {
				if (res.status < 200 || res.status >= 300)
					throw new Error();
				else
					return res.json();
		});
	}
}