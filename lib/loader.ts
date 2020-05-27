const PICK_REGEX = require('./config').PICK_REGEX

export = function (content: string, map: any) {
  if (PICK_REGEX.test(content)) {
    return PICK_REGEX.exec(content)[1]
  } else {
    return 'export default {}'
  }
}
