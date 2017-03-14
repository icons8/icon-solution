
function resolveUrl(url, query) {
  if (!query) return url;

  let parts = [];
  for (let key in query) {
    if (query.hasOwnProperty(key)) {
      parts.push(key + '=' + encodeURIComponent(query[key]))
    }
  }

  if (!parts.length) return url;

  url += (url.indexOf('?') == -1) ? '?' : '&';
  url += parts.join('&');

  return url;
}

function httpRequest(url, headers, callback) {
  const req = new XMLHttpRequest();

  req.addEventListener('load', function() {
    callback(null, this.responseText)
  });

  req.addEventListener('error', () => {
    callback('Request failed');
  });

  req.addEventListener('abort', () => {
    callback('Request canceled');
  });

  req.open('GET', url);

  if (headers) {
    for (let name in headers) {
      if (headers.hasOwnProperty(name)) {
        req.setRequestHeader(name, headers[name]);
      }
    }
  }

  req.send();
}


export default ({ url, query, headers, callback }) => {
  url = resolveUrl(url, query);
  httpRequest(url, headers, callback);
}