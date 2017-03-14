import Context from './Core/Context'
import config from './Core/config'

import IconBatchedPool from './Core/IconBatchedPool'
import iconProvider from './Core/iconProvider'
import iconHttpLoader from './Core/iconHttpLoader'

export default (options) => {

  const context = Context({ config }, options);

  context.define({
    IconBatchedPool,
    iconProvider,
    iconHttpLoader
  });

  return context.invoke(({ IconBatchedPool }) => {

    const pool = IconBatchedPool();

    return {

      classes: context.config.classes,

      getIcon(icon, callback) {
        pool.getIcon(icon, callback);

        return {
          cancel: () => {}
        }
      }
    }

  });

}