function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports = class extends think.Model {
	add() {
		var _this = this;

		return _asyncToGenerator(function* () {
			const data = _this.post();
			const user = yield _this.session('userInfo');
			const post = {
				read: 0,
				createTime: new Date().getTime().toString().slice(0, 10) >> 0,
				status: 1,
				category: data.category || '',
				title: data.title,
				content: data.content,
				author: user.user
			};
			const res = yield _this.add(post);
			return res;
		})();
	}
};
//# sourceMappingURL=post.js.map