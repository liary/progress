function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports = class extends think.limama.api {
	__before() {
		var _this = this;

		return _asyncToGenerator(function* () {
			const loginStatus = yield _this.islogin();
			_this.loginInfo = {
				status: loginStatus,
				message: {
					0: '未登陆',
					1: '已登陆',
					2: '账号在别处登陆'
				}[loginStatus]
			};
		})();
	}
	listAction() {
		var _this2 = this;

		return _asyncToGenerator(function* () {
			const model = _this2.model('post');
			// const res = await model.getList(page);
			const res = yield model.where({
				status: 1
			}).page(_this2.get('page') || 1, 10).countSelect();
			// newUser.createTime = parseInt(new Date().getTime().toString().slice(0, 10));
			// newUser.password = think.md5(newUser.password);
			// const res = await model.adduser(newUser);
			// model.adduser(newUser);
			_this2.success(res);
		})();
	}

	addAction() {
		var _this3 = this;

		return _asyncToGenerator(function* () {
			if (_this3.loginInfo.status !== 1) {
				return _this3.fail(_this3.loginInfo.message);
			}
			const model = _this3.model('content/post');
			const post = _this3.post();
			const user = yield _this3.session('userInfo');
			const article = Object.assign(think._.pick(post, ['title', 'content', 'category']), {
				read: 0,
				createTime: new Date().getTime().toString().slice(0, 10) >> 0,
				status: 1,
				author: user.user
			});
			const res = yield model.edit(article);
			_this3.success(res);
		})();
	}

	editAction() {
		var _this4 = this;

		return _asyncToGenerator(function* () {
			if (_this4.loginInfo.status !== 1) {
				return _this4.fail(_this4.loginInfo.message);
			}
			const model = _this4.model('content/post');
			const post = _this4.post();
			const article = think._.pick(post, ['title', 'content', 'category']);
			const res = yield model.edit(article, post.id);
			_this4.success(res);
		})();
	}

	/**
  * 判断是否登陆
  * 
  * @returns {number} 2: 账号在别处登陆 0: 未登陆 1: 已登陆
  */
	islogin() {
		var _this5 = this;

		return _asyncToGenerator(function* () {
			const user = yield _this5.session('userInfo');
			let res = 0;
			if (!think.isEmpty(user) && user.login) {
				res = user.ip === _this5.ip ? 1 : 2;
			}
			return res;
		})();
	}
};
//# sourceMappingURL=post.js.map