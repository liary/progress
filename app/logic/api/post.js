module.exports = class extends think.Logic {
	getListAction() {
		this.allowMethods = 'get';
		this.rules = {
			page: {
				int: { min: 1 },
				default: 1
			}
		};
	}

	addArticleAction() {
		this.allowMethods = 'post';
		this.rules = {
			title: {
				required: true,
				trim: true
			},
			content: {
				required: true,
				trim: true
			}
		};
	}
};
//# sourceMappingURL=post.js.map