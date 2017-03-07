yootil.random = class {

	constructor(seed){
		this.m = 2147483647;
		this.a = 1103515245;
		this.c = 12345;
		this.seed = seed || Math.floor(Math.random() * this.m);
	}

	current(){
		return this.seed / this.m;
	}

	next(){
		this.seed = (this.a * this.seed + this.c) % this.m;

		return this.seed / this.m;
	}

};