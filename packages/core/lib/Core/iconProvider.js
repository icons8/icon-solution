
export default ({ iconHttpLoader, cssStyleProvider, iconCache }) => {

  function performIcons(icons) {
    const result = [];

    for (let icon of icons) {
      let { name, svg, width, height } = icon;

      const sizeClassName = cssStyleProvider.makeIconSizeClassName({ width, height });

      result.push({
        name,
        svg,
        sizeClassName
      })
    }

    return result
  }

  return (names, callback) => {

    const cachedIcons = names
      .filter(iconCache.has)
      .map(iconCache.get);

    if (cachedIcons.length > 0) {
      names = names.filter(iconCache.hasNot);
    }

    if (names.length > 0) {
      iconHttpLoader(names, (err, icons) => {
        if (err) return callback(err);

        cssStyleProvider.ensureIconStyleAdded();
        icons = performIcons(icons);

        iconCache.add(icons);

        callback(null, cachedIcons.concat(icons));
      })

    } else {
      callback(null, cachedIcons);
    }

  }

}