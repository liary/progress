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
	async adduserAction() {
		const newUser = this.post();
		const model = this.model('admin/user');
		newUser.createTime = parseInt(new Date().getTime().toString().slice(0, 10));
		newUser.password = think.md5(newUser.password);
		const res = await model.adduser(newUser);
		// model.adduser(newUser);
		this.success(res);
	}
	async loginAction() {
		if (this.loginInfo.status === 1) {
			this.redirect('/index');
		}
		const model = this.model('admin/user');
		const loginInfo = this.post();
		const user = await model.login(loginInfo);
		console.log(user)
		if (think.isEmpty(user)) {
			this.fail('login failed');
		} else {
			await this.session('userInfo', {
				user: user.name,
				ip: this.ip,
				login: true
			});
			this.success(true);
		}
	}
	async logoutAction() {
		await this.session(null);
		this.success(true);
	}
	// async changeInfo(field, value, psw) {
	// 	if (field === 'password') {
	// 		return this.resetPassword;
	// 	}
	// }
	
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