importScripts('/localforage.js');
// import * as localforage from '/localforage.js';

const ls = localforage.createInstance({ storeName:'lls', name:'ls' });


self.addEventListener('message', ({ data }) => {
  console.log(data, ls);
  throw new Error('xx')
  ls.setItem('data', data);
});

self.addEventListener('close', () => {
  ls.setItem('last', Date.now());
});
