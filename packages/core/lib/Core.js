import Context from './Context'
import getIconsSvgFromHttp from './getIconsSvgFromHttp'
import getIconSvgBatched from './getIconSvgBatched'
import config from './config'

export default (config) => {

  const context = Context({
    getIconsSvgFromHttp,
    getIconSvgBatched,
    config
  });

  Object.assign(context, config);

  return {

    getIcon(icon, callback) {
      context.getIconSvgBatched(icon, callback);
    }

  }
}