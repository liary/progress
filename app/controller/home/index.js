function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports = class extends think.limama.center {
	indexAction() {
		var _this = this;

		return _asyncToGenerator(function* () {
			// const items = await this.fetch('http://me.idaodan.com/api/post/list').then(res => {
			// 	console.log(res);
			// 	res.json();
			// });
			const items = yield _this.service('api/post').getList();
			_this.assign('items', items);
			return _this.displayHome('index');
		})();
	}

	displayHome(fileName) {
		return this.display(`home/${fileName}`);
	}
};
//# sourceMappingURL=index.js.map