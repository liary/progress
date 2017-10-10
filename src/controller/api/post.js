module.exports = class extends think.limama.api {
	async __before() {
		const loginStatus = await this.islogin();
		this.loginInfo = {
			status: loginStatus,
			message: {
				0: '未登陆',
				1: '已登陆',
				2: '账号在别处登陆'
			}[loginStatus]
		};
	}
	async listAction() {
		const model = this.model('post');
		// const res = await model.getList(page);
		const res = await model.where({
			status: 1
		}).page(this.get('page') || 1, 10).countSelect();
		// newUser.createTime = parseInt(new Date().getTime().toString().slice(0, 10));
		// newUser.password = think.md5(newUser.password);
		// const res = await model.adduser(newUser);
		// model.adduser(newUser);
		this.success(res);
		
	}

	async addAction() {
		if (this.loginInfo.status !== 1) {
			return this.fail(this.loginInfo.message);
		}
		const model = this.model('content/post');
		const post = this.post();
		const user = await this.session('userInfo');
		const article = Object.assign(think._.pick(post, ['title', 'content', 'category']), {
			read: 0,
			createTime: new Date().getTime().toString().slice(0, 10)>>0,
			status: 1,
			author: user.user
		});
		const res = await model.edit(article);
		this.success(res);
	}

	async editAction() {
		if (this.loginInfo.status !== 1) {
			return this.fail(this.loginInfo.message);
		}
		const model = this.model('content/post');
		const post = this.post();
		const article = think._.pick(post, ['title', 'content', 'category']);
		const res = await model.edit(article, post.id);
		this.success(res);
	}
	
	/**
	 * 判断是否登陆
	 * 
	 * @returns {number} 2: 账号在别处登陆 0: 未登陆 1: 已登陆
	 */
	async islogin() {
		const user = await this.session('userInfo');
		let res = 0;
		if (!think.isEmpty(user) && user.login) {
			res = user.ip === this.ip ? 1 : 2;
		}
		return res;
	}
}