import { Injectable } from '@angular/core'
import { Http, Headers } from '@angular/http'
import 'rxjs/add/operator/map';

@Injectable()
export class ManuscriptsService {
	constructor(private http:Http){
	}

	getManuscripts(){
		return this.http.get('/api/manuscripts')
			.map(res => {
				if (res.status < 200 || res.status >= 300)
					throw new Error();
				else
					return res.json();
		});
	}

	getPageByID(id){
		return this.http.get('/api/pages/'+id)
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

/* Page Annotations  */

	getPageAnnotationByID(id){
		return this.http.get('/api/pageAnnotations/'+id)
			.map(res => {
				if (res.status < 200 || res.status >= 300)
					throw new Error();
				else
					return res.json();
		});
	}

	updatePageAnnotaion(id, options) {
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this.http.put('/api/pageAnnotations/'+id, options)
			.map(res => {
				if (res.status < 200 || res.status >= 300)
					throw new Error();
				else
					return res.json();
		});
	}
	/*================= Page ===================*/
	createPage(page){
		console.log(page)
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this.http.post('/api/pages', JSON.stringify(page), {headers: headers})
		.map(res => {
			if (res.status < 200 || res.status >= 300)
				throw new Error();
			else
				return res.json();
	});
	}
}