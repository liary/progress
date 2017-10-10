module.exports = class extends think.Model {
	async edit(article, id) {
		if (typeof id === 'undefined') {
			return await this.add(article);
		}
		return await this.where({id}).update(article);
	}
}