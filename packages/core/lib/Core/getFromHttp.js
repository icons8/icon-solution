
function parseSymbols(context, content) {
  const symbols = {};

  content.replace(/<symbol([^>]+?)id="([^"]+)"([^>]*>)((?:.|\n)*?)<\/symbol>/g, (m, h1, id, h2, body) => {

    const head = h1 + h2;

    const [ , viewBox ] = head.match(/viewBox="([^"]+)"/) || [];
    if (!viewBox) return;

    const [ , width, height ] = viewBox.match(/\d+\s+\d+\s+(\d+)\s+(\d+)/) || [];
    if (!width || !height) return;

    const svg = '<svg ' +
      'xmlns="http://www.w3.org/2000/svg" ' +
      'version="1.0" ' +
      'preserveAspectRatio="xMidYMid meet" ' +
      'height="100%" ' +
      'width="100%" ' +
      'style="display: inline-block; pointer-events: none" ' +
      `viewBox="${viewBox}">` +
      body +
      '</svg>';

    const sizeClassName = context.classes.sizePrefix + width + 'x' + height;

    symbols[id] = {
      svg,
      sizeClassName: sizeClassName
    }
  });

  return symbols;
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

      const icons = parseSymbols(context, content);

      callback(null, icons);

    }
  })

}