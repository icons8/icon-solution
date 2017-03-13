
function parseSymbols(content) {
  const symbols = {};

  content.replace(/<symbol([^>]+)id="([^"]+)"((?:.|\n)*?)<\/symbol>/g, (m, m1, m2, m3) => {
    symbols[m2] = '<svg' + m1 + m3 + '</svg>';
  });

  return symbols;
}

function parseIcon(content) {
  const m = content.match(/<svg[^>]+?viewBox="([^"]+)"[^>]*>((?:.|\n)*?)<\/svg>/);
  if (!m) return null;

  const [ _, viewBox, body ] = m;
  return {
    viewBox,
    body
  }
}

function symbolsToIcons(symbols) {
  const icons = {};

  for (let id in symbols) {
    if (symbols.hasOwnProperty(id)) {
      let icon = parseIcon(symbols[id]);
      if (icon) icons[id] = icon;
    }
  }

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

      const symbols = parseSymbols(content);
      const icons = symbolsToIcons(symbols);

      callback(null, icons);

    }
  })

}