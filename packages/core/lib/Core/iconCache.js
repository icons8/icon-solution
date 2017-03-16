const
  cache = {}
  ;

export default () => {

  return {

    has(name) {
      return cache.hasOwnProperty(name)
    },

    hasNot(name) {
      return !cache.hasOwnProperty(name)
    },

    get(name) {
      return cache[name]
    },

    add(icons) {
      for (let icon of icons) {
        cache[ icon.name ] = icon;
      }
    }

  }

}