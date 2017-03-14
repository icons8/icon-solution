
let
  iconStyleSheet = null,
  iconSizeClassNames = {}
  ;

export default ({ config: { classes: { icon, sizePrefix } } }) => {


  function ensureIconStyleAdded() {
    if (!iconStyleSheet) {
      const content = `<style type="text/css" >.${icon}{display:inline-block}.${icon} svg{fill:currentColor}</style>`;

      const headElement = window.document.getElementsByTagName('head')[0];
      headElement.insertAdjacentHTML('afterbegin', content);

      const styleElement = headElement.getElementsByTagName('style')[0];
      iconStyleSheet = styleElement.sheet
    }
  }

  function makeIconSizeClassName({ width, height }) {
    const sizeClassName = sizePrefix + width + 'x' + height;

    if (!iconSizeClassNames[sizeClassName]) {
      ensureIconStyleAdded();
      iconStyleSheet.insertRule(`.${sizeClassName}{width:${width}px;height:${height}px}`, 0);

      iconSizeClassNames[sizeClassName] = true;
    }

    return sizeClassName;
  }


  return {
    ensureIconStyleAdded,
    makeIconSizeClassName
  }

}