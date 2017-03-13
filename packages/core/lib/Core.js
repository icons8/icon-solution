import getBatchedPool from './Core/getBatchedPool'
import config from './Core/config'

export default (options) => {

  const context = Object.assign({}, config, options);
  const pool = getBatchedPool(context);

  return {

    classes: context.classes,

    getIcon(icon, callback) {
      pool.getIcon(icon, callback);

      return {
        cancel: () => {}
      }
    }
  }
}