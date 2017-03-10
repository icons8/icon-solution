
function parseSvgSymbols(svg) {

  svg.replace(/<symbol([^>]+)id="([^"]+)".*?<\/symbol>/g, (...args) => {
    console.log(...args);
  });

}


export default ({ httpGet, config }) => {

  return (icons, callback) => {

    httpGet({
      url: config.apiUrl,
      query: {
        icons: icons.join()
      },
      callback: (err, content) => {
        if (err) return callback(err);

        parseSvgSymbols(content);

      }
    })

  }

}