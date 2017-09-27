module.exports = class extends think.Model {
	async add() {
		const data = this.post();
		const user = await this.session('userInfo');
		const post = {
			read: 0,
			createTime: new Date().getTime().toString().slice(0, 10)>>0,
			status: 1,
			category: data.category || '',
			title: data.title,
			content: data.content,
			author: user.user
		}
		const res = await this.add(post);
		return res;
	}
}