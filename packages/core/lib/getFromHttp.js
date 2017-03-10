
function parseSymbols(symbols) {
  const icons = {};

  symbols.replace(/<symbol([^>]+)id="([^"]+)"((?:.|\n)*?)<\/symbol>/g, (m, m1, m2, m3) => {
    icons[m2] = '<svg' + m1 + m3 + '</svg>';
  });

  return icons;
}


export default (context, icons, callback) => {
  const
    { httpGet, apiUrl } = context
  ;

  httpGet({
    url: apiUrl,
    query: {
      icons: icons.join()
    },
    callback: (err, content) => {
      if (err) return callback(err);

      const icons = parseSymbols(content);

      callback(null, icons);

    }
  })

}