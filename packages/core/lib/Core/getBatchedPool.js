import getFromHttp from './getFromHttp'

export default (context) => {
  const BATCH_PHASE_TIME = 0;

  const { timeout } = context;

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
    for (let { icon } of batchStack) {
      index[icon] = true;
    }

    const icons = Object.keys(index);

    getFromHttp(context, icons, (err, icons) => {
      if (err) {
        for (let { callback } of batchStack) {
          callback(err)
        }

      } else {
        for (let { icon, callback } of batchStack) {
          callback(null, icons[icon]);
        }

      }
    });
  }


  return {

    getIcon(icon, callback) {
      ensureBatchPhase();
      stack.push({ icon, callback });
    }

  }
}