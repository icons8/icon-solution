
export default ({ config: { verification } }) => {
  let value = '';

  const meta = window.document.querySelector('meta[name="icons8-verification"]');

  if (meta) {
    const metaContent = meta.getAttribute('content');
    value = metaContent || value;
  }

  return {
    value
  }

}