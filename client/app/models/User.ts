export class User {
	_id: string;
	name: string;
	family_name: string;
	password: string;
	email: string;
	affiliation: string;
	role: string;

	constructor(data){
		if(data != null){
			this._id = data._id;
			this.name = data.name;
			this.family_name = data.family_name;
			this.password = data.password;
			this.email = data.email;
			this.affiliation = data.affiliation;
			this.role = data.role;
		}
	}
}