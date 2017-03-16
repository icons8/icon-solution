

export default ({ httpGet, config: { apiUrl }, verification, logger }) => {

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
        'style="display:inline-block; pointer-events:none" ' +
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
    const
      REQUESTED_STATE = 0,
      RECEIVED_STATE = 1
    ;

    const states = {};
    for (let name of names) {
      states[name] = REQUESTED_STATE;
    }

    httpGet({
      url: apiUrl,
      query: {
        verification: verification.value,
        icons: names.join()
      },
      callback: (err, content) => {
        if (err) return callback(err);

        const icons = parseIcons(content);

        for (let { name } of icons) {
          states[name] = RECEIVED_STATE;
        }
        for (let name of Object.keys(states)) {
          if (states[name] == REQUESTED_STATE) {
            logger.error(`Error: Icon "${name}" not found`);
          }
        }

        callback(null, icons);

      }
    })

  }

}