/**
 * Uses a basic LCG algorithm for seeded random numbers.
 *
 * @example
 * let rnd = new yootil.random(555);
 *
 * console.log(rnd.next()); // 0.19470878187320603
 *
 */

yootil.random = class {

	/**
	 * @param {Number} seed - The seed
	 */

	constructor(seed){
		this.m = 2147483647;
		this.a = 1103515245;
		this.c = 12345;
		this.seed = (seed && typeof seed === "string")? yootil.hash_code(seed) :  Math.floor(Math.random() * this.m);
	}

	/**
	 * @returns {Number}
	 */

	current(){
		return this.seed / this.m;
	}

	/**
	 * @returns {Number} - Returns next random number.
	 */

	next(){
		this.seed = (this.a * this.seed + this.c) % this.m;

		return this.seed / this.m;
	}

};