import { getBrowser } from 'toolkit/core/common/web-extensions';

export function injectCSS(path) {
  const link = document.createElement('link');
  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('type', 'text/css');
  link.setAttribute('href', getBrowser().runtime.getURL(path));

  document.getElementsByTagName('head')[0].appendChild(link);
}

export function injectScript(path, attributes = {}) {
  const script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', getBrowser().runtime.getURL(path));

  Object.entries(attributes).forEach(([key, value]) => {
    script.setAttribute(key, value);
  });

  document.getElementsByTagName('head')[0].appendChild(script);
}
