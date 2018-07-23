const PICK_REGEX = require('./config').PICK_REGEX

module.exports = function (content, map) {
  if (PICK_REGEX.test(content)) {
    return PICK_REGEX.exec(content)[1]
  } else {
    return 'export default {}'
  }
}
