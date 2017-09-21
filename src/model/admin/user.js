module.exports = class extends think.Model {
	async adduser(user) {
		const resId = await this.add(user);
		return resId;
	}
	async login(user) {
		const userInfo = await this.where({
			phone: user.name,
			email: user.name,
			name: user.name,
			_logic: 'OR'
		}).find();
		// if (!think.isEmpty(userInfo) && userInfo.password === user.password) {
		if (!think.isEmpty(userInfo) && userInfo.password === think.md5(user.password)) {
			return userInfo;
		} else {
			return {};
		}
	}
}