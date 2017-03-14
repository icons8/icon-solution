
function Context(parent, ...objects) {

  const context = parent
    ? Object.create(parent)
    : {};

  Object.assign(context, ...objects);

  function defineService(name, provider) {

    Object.defineProperty(context, name, {
      get() {

        const service = provider(context);
        Object.defineProperty(context, name, {
          value: service,
          configurable: false
        });

        return service;
      },
      configurable: true
    });

  }

  Object.assign(context, {

    new(...objects) {
      return Context(this, ...objects);
    },

    define(providers) {
      for (let name in providers) {
        if (providers.hasOwnProperty(name)) {
          defineService(name, providers[name]);
        }
      }
      return this;
    },

    invoke(fn) {
      return fn(this);
    }

  });

  return context;
}


export default (...objects) => {
  return Context(null, ...objects);
}
