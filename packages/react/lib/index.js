
import Core from 'icons8-icon-core'
import httpGet from 'icons8-icon-core/lib/providers/httpGet'

const core = Core({ httpGet });

core.getIcon('color-search', (err, content) => {
  console.log('color-search', err, content);
});
core.getIcon('color-news', (err, content) => {
  console.log('color-news', err, content);
});
core.getIcon('color-print', (err, content) => {
  console.log('color-print', err, content);
});
