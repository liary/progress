module.exports = class extends think.Logic {
	listAction() {
		this.allowMethods = 'get';
		this.rules = {
			page: {
				int: {min: 1},
				default: 1
			}
		}
	}

	addAction() {
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
		}
	}

	editAction() {
		this.addAction = 'post';
		this.rules = {
			title: {
				required: true,
				trim: true
			},
			content: {
				required: true,
				trim: true
			},
			id: {
				required: true,
				trim: true,
				int: true
			}
		}
	}
}