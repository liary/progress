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
	adduserAction() {
		var _this2 = this;

		return _asyncToGenerator(function* () {
			const newUser = _this2.post();
			const model = _this2.model('admin/user');
			newUser.createTime = parseInt(new Date().getTime().toString().slice(0, 10));
			newUser.password = think.md5(newUser.password);
			const res = yield model.adduser(newUser);
			// model.adduser(newUser);
			_this2.success(res);
		})();
	}
	loginAction() {
		var _this3 = this;

		return _asyncToGenerator(function* () {
			if (_this3.loginInfo.status === 1) {
				_this3.redirect('/index');
			}
			const model = _this3.model('admin/user');
			const loginInfo = _this3.post();
			const user = yield model.login(loginInfo);
			console.log(user);
			if (think.isEmpty(user)) {
				_this3.fail('login failed');
			} else {
				yield _this3.session('userInfo', {
					user: user.name,
					ip: _this3.ip,
					login: true
				});
				_this3.success(true);
			}
		})();
	}
	logoutAction() {
		var _this4 = this;

		return _asyncToGenerator(function* () {
			yield _this4.session(null);
			_this4.success(true);
		})();
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
//# sourceMappingURL=admin.js.map