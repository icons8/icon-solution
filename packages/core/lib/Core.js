import getBatchedPool from './getBatchedPool'
import config from './config'

export default (options) => {

  const context = Object.assign({}, config, options);
  const pool = getBatchedPool(context);

  return {
    getIcon(icon, callback) {
      pool.getIcon(icon, callback);

      return {
        cancel: () => {}
      }
    }
  }
}