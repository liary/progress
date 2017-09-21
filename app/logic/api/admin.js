module.exports = class extends think.Logic {
	adduserAction() {
		this.allowMethods = 'post';
		this.rules = {
			name: {
				required: true,
				trim: true,
				alphaNumericDash: true
			},
			phone: {
				required: true,
				mobile: true,
				trim: true
			},
			email: {
				required: true,
				email: true,
				trim: true
			},
			password: {
				required: true,
				byteLength: { min: 6, max: 20 },
				trim: true
			}
		};
	}
	loginAction() {
		this.allowMethods = 'post';
		this.rules = {
			name: {
				required: true,
				trim: true
			},
			password: {
				required: true
				// md5: true
			}
		};
	}
};
//# sourceMappingURL=admin.js.map