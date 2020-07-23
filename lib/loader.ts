import path = require('path');
import webpack = require('webpack');
import generate from '@udock/vue-plugin-auto-router/lib/generator'
const FRAMEWORK_NAMESPACE = 'udock'
const PICK_REGEX = /<route-config[^>]*>([\s\S]*)<\/route-config>/

export = function udockBootstrapLoader(this: webpack.loader.LoaderContext, content: string, map: any) {
  if (PICK_REGEX.test(content)) {
    return PICK_REGEX.exec(content)![1]
  } else {
    const configPath = path.resolve(`./src/${FRAMEWORK_NAMESPACE}.config.js`)
    delete require.cache[configPath]
    this.addDependency(configPath)
    let autoRouterConfig = {
      ignore: 'ar.ignore',
      path: 'src', // 生成路由扫描的根目录
      'chunk-name': [
        '2'
      ]
    }

    try {
      const config = require(configPath)
      autoRouterConfig = config.plugins['auto-router']
    } catch (e) {
      console.log('\nframework config error:')
      this.callback(e)
      return
    }

    return generate(this, autoRouterConfig).then((result: any) => {
      console.log('======== auto-router =========')
      console.log(result.define)
      console.log('======== =========== =========')
      return result.define
    })
  }
}
