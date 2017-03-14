

export default ({ iconHttpLoader, cssStyleProvider }) => {

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

  return (icons, callback) => {

    iconHttpLoader(icons, (err, icons) => {
      if (err) return callback(err);

      cssStyleProvider.ensureIconStyleAdded();
      icons = performIcons(icons);

      callback(null, icons);
    })

  }

}