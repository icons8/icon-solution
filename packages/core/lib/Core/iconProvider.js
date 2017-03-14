

export default ({ iconHttpLoader, config: { classes } }) => {

  function performIcons(icons) {
    const result = [];

    for (let icon of icons) {
      let { name, svg, width, height } = icon;

      const sizeClassName = classes.sizePrefix + width + 'x' + height;

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

      icons = performIcons(icons);
      callback(null, icons);
    })

  }

}