function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports = class extends think.Model {
	adduser(user) {
		var _this = this;

		return _asyncToGenerator(function* () {
			const resId = yield _this.add(user);
			return resId;
		})();
	}
	login(user) {
		var _this2 = this;

		return _asyncToGenerator(function* () {
			const userInfo = yield _this2.where({
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
		})();
	}
};
//# sourceMappingURL=user.js.map