

export default ({ httpGet, config: { apiUrl } }) => {

  function parseIcons(content) {
    const icons = [];

    content.replace(/<symbol([^>]+?)id="([^"]+)"([^>]*>)((?:.|\n)*?)<\/symbol>/g, (m, h1, name, h2, body) => {

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

      icons.push({
        name,
        svg,
        width,
        height
      })
    });

    return icons;
  }


  return (names, callback) => {

    httpGet({
      url: apiUrl,
      query: {
        icons: names.join()
      },
      callback: (err, content) => {
        if (err) return callback(err);

        const icons = parseIcons(content);
        callback(null, icons);

      }
    })

  }

}