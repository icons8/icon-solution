

export default (providers, parent) => {

  const context = parent
    ? Object.create(parent)
    : {};

  function defService(name, provider) {

    Object.defineProperty(context, name, {
      get: function() {

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


  for (let name in providers) {
    if (providers.hasOwnProperty(name)) {
      defService(name, providers[name]);
    }
  }

  return context
}