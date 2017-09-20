const lodash = require('lodash');
const path = require('path');
module.exports = {
  _: lodash,
  resource: path.join(think.ROOT_PATH, 'www'),
  limama: {
    // info: require(path.join(think.ROOT_PATH, 'package.json')),
    // admin: require(path.join(think.ROOT_PATH, 'src', 'controller', 'cmswing', 'admin')),
    // home: require(path.join(think.ROOT_PATH, 'src', 'controller', 'cmswing', 'home')),
    center: require(path.join(think.ROOT_PATH, 'src', 'controller', 'base', 'center'))
    // modIndex: require(path.join(think.ROOT_PATH, 'src', 'controller', 'cmswing', 'modindexbase')),
    // modAdmin: require(path.join(think.ROOT_PATH, 'src', 'controller', 'cmswing', 'modadminbase')),
    // extIndex: require(path.join(think.ROOT_PATH, 'src', 'controller', 'cmswing', 'extindexbase')),
    // extAdmin: require(path.join(think.ROOT_PATH, 'src', 'controller', 'cmswing', 'extadminbase')),
    // rest: require(path.join(think.ROOT_PATH, 'src', 'controller', 'cmswing', 'rest'))
  }
};
//# sourceMappingURL=think.js.map