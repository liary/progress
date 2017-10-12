module.exports = class extends think.Service {
	async getList(num = 1, limit = 10) {
		const res = await this.model('post').where({
			status: 1
		}).page(num, limit).countSelect();
		return res;
	}
}