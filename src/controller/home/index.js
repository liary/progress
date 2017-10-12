module.exports = class extends think.limama.center {
	async indexAction() {
		// const items = await this.fetch('http://me.idaodan.com/api/post/list').then(res => {
		// 	console.log(res);
		// 	res.json();
		// });
		const items = await this.service('api/post').getList();
		this.assign('items', items);
		return this.displayHome('index');
	}


	displayHome(fileName) {
		return this.display(`home/${fileName}`);
	}
}