import { Injectable } from '@angular/core'
import { Http, Headers } from '@angular/http'
import 'rxjs/add/operator/map';

@Injectable()
export class ManuscriptService {
	constructor(private http:Http){
	}

	getUsers(){
		return this.http.get('/api/manuscripts')
			.map(res => {
				if (res.status < 200 || res.status >= 300)
					throw new Error();
				else
					return res.json();
		});
	}

	addManuscript(newMan) {
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this.http.post('/api/manuscripts', JSON.stringify(newMan), {headers: headers})
			.map(res => {
				if (res.status < 200 || res.status >= 300)
					throw new Error();
				else
					return res.json();
		});
	}
}