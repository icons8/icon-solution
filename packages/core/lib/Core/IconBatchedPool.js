
export default ({ timeout, iconProvider, iconCache }) => {
  const
    BATCH_PHASE_TIME = 0
  ;

  return () => {
    let
      batchPhase = false,
      stack = []
      ;

    function ensureBatchPhase() {
      if (!batchPhase) {
        timeout(finishBatchPhase, BATCH_PHASE_TIME);
        batchPhase = true;
      }
    }

    function finishBatchPhase() {
      const batchStack = stack;

      stack = [];
      batchPhase = false;

      const index = {};
      for (let { name } of batchStack) {
        index[name] = true;
      }

      const names = Object.keys(index);

      iconProvider(names, (err, icons) => {
        if (err) {
          for (let { callback } of batchStack) {
            callback(err)
          }

        } else {
          const index = {};

          for (let icon of icons) {
            index[icon.name] = icon;
          }

          for (let { name, callback } of batchStack) {
            callback(null, index[name]);
          }

        }
      });
    }


    return {

      getIcon(name, callback) {

        if (iconCache.has(name)) {
          callback(null, iconCache.get(name))

        } else {
          ensureBatchPhase();
          stack.push({ name, callback });
        }

      }

    }
  };

}