import Context from './Context'
import getIconsSvg from './getIconsSvg'
import getIconSvgBatched from './getIconSvgBatched'

export default (config) => {

  const context = Context({
    getIconsSvg,
    getIconSvgBatched
  });

  Object.assign(context, config);

  return {

    getIcon(icon, callback) {
      context.getIconSvgBatched(icon, callback);
    }

  }
}