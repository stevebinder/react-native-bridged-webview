let queue = [];

const call = (type, payload) => {
  const bridge = window.__REACT_NATIVE_BRIDGED_WEBVIEW__;
  if (!bridge) {
    queue.push(() => call(type, payload));
  } else {
    bridge(`__${type}__`, payload);
  }
};

if (window && window.addEventListener) {
  window.addEventListener(
    'bridgedwebview',
    () => {
      queue.forEach(fn => setTimeout(fn));
      queue = [];
    },
  );
}

const device = call;
device.statusbar = 20;
device.alert = text => call('alert', text);
device.log = (...args) => call('log', args);

export default device;